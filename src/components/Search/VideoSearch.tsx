import { getFallbackThumbnail } from "../../utils/fallbackThumbnail";
import useVideos from "../../hooks/useVideos";

import {
  Avatar,
  Box,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Portal,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Fuse, { IFuseOptions } from "fuse.js";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Video = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: number;
  likes: number;
  dislikes: number;
  channelName: string;
  channelAvatar: string;
  uploadDate: string;
  tags: string[];
  authors?: string[];
  event?: string | null;
};

const getRelatedTags = (video: Video, query: string): string[] => {
  if (!video.tags || video.tags.length === 0) return [];

  const q = query.toLowerCase().trim();
  if (!q) return video.tags.slice(0, 3);

  const matched = video.tags.filter((t) => t.toLowerCase().includes(q));

  const base = matched.length > 0 ? matched : video.tags;
  return base.slice(0, 3);
};

const SearchResultThumbnail = ({
  thumbnail,
  title,
  event,
  size = 72,
}: {
  thumbnail: string;
  title: string;
  event?: string | null;
  size?: number;
}) => {
  const fallbackThumbnail = getFallbackThumbnail(event);
  const [imageSrc, setImageSrc] = useState(thumbnail || fallbackThumbnail);

  return (
    <Avatar
      variant="rounded"
      src={imageSrc}
      alt={title}
      sx={{ width: size, height: size }}
      slotProps={{
        img: {
          onError: () => {
            if (imageSrc !== fallbackThumbnail) {
              setImageSrc(fallbackThumbnail);
            }
          },
        },
      }}
    />
  );
};

const VideoSearch = ({
  placeholder = "Search videos...",
}: {
  placeholder?: string;
} = {}) => {
  const [query, setQuery] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();
  const { getVideos } = useVideos();
  const { videos, loading } = getVideos();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const anchorRef = useCallback((node: HTMLDivElement | null) => {
    setAnchorEl(node);
  }, []);

  const [rect, setRect] = useState<DOMRect | undefined>();

  useEffect(() => {
    if (!anchorEl) return;
    const update = () => setRect(anchorEl.getBoundingClientRect());
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [anchorEl]);

  const fuse = useMemo(() => {
    const options: IFuseOptions<Video> = {
      keys: ["title", "description", "tags", "authors"],
      threshold: 0.35,
      ignoreLocation: true,
    };
    return new Fuse(videos ?? [], options);
  }, [videos]);

  const results: Video[] = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).map((r) => r.item);
  }, [fuse, query]);

  return (
    <Box ref={anchorRef} sx={{ width: "100%" }}>
      <TextField
        fullWidth
        value={query}
        placeholder={loading ? "Loading..." : placeholder}
        onChange={(e) => setQuery(e.target.value)}
        size="medium"
        disabled={loading}
      />

      {!!query && rect && (
        <Portal>
          <Paper
            elevation={8}
            sx={{
              position: "fixed",
              top: rect.bottom + 8,
              left: isMobile ? 8 : rect.left,
              right: isMobile ? 8 : "auto",
              width: isMobile ? "auto" : rect.width,
              zIndex: 1400,
              borderRadius: 2,
              maxHeight: `calc(100vh - ${rect.bottom + 16}px)`,
              overflowY: "auto",
            }}
          >
            {results.length === 0 ? (
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  No results for {query}
                </Typography>
              </Box>
            ) : (
              <List dense>
                {results.map((video) => {
                  const relatedTags = getRelatedTags(video, query);

                  return (
                    <ListItem key={video.id} disableGutters>
                      <ListItemButton
                        sx={{
                          "&:hover": { cursor: "pointer" },
                          alignItems: "flex-start",
                          gap: isMobile ? 1 : 0,
                          py: isMobile ? 1 : 0.75,
                        }}
                        onClick={() => {
                          setQuery("");
                          navigate(`/learning/video/${video.id}`, {
                            state: {
                              from: `${location.pathname}${location.search}`,
                            },
                          });
                        }}
                      >
                        <ListItemAvatar sx={{ minWidth: "auto" }}>
                          <SearchResultThumbnail
                            thumbnail={video.thumbnail}
                            title={video.title}
                            event={video.event}
                            size={isMobile ? 56 : 72}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle2" fontWeight={600}>
                              {video.title}
                            </Typography>
                          }
                          secondary={
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 0.5,
                              }}
                            >
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                display="block"
                              >
                                {video.channelName} • {video.duration}
                              </Typography>
                              {video.authors && video.authors.length > 0 && (
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  display="block"
                                >
                                  By {video.authors.join(", ")}
                                </Typography>
                              )}
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {video.description}
                              </Typography>

                              {relatedTags.length > 0 && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                    mt: 0.5,
                                  }}
                                >
                                  {relatedTags.map((tag, index) => (
                                    <Chip
                                      key={index}
                                      size="small"
                                      label={tag}
                                    />
                                  ))}
                                </Box>
                              )}
                            </Box>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            )}
          </Paper>
        </Portal>
      )}
    </Box>
  );
};

export default VideoSearch;
