import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import Fuse, { IFuseOptions } from "fuse.js";
import React, { useMemo, useState } from "react";

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
};

const getRelatedTags = (video: Video, query: string): string[] => {
  if (!video.tags || video.tags.length === 0) return [];

  const q = query.toLowerCase().trim();
  if (!q) return video.tags.slice(0, 3);

  const matched = video.tags.filter((t) => t.toLowerCase().includes(q));

  const base = matched.length > 0 ? matched : video.tags;
  return base.slice(0, 3);
};

const VideoSearch = ({
  videos,
  placeholder = "Search videos...",
}: {
  videos: Video[];
  placeholder?: string;
}) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const fuse = useMemo(() => {
    const options: IFuseOptions<Video> = {
      keys: ["title", "description", "tags"],
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
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        value={query}
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        size="medium"
      />

      {query && (
        <Box
          sx={{
            mt: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            maxHeight: 480,
            overflowY: "auto",
            bgcolor: "background.paper",
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
                      onClick={() => {
                        setQuery("");
                        navigate(`/learning/video/${video.id}`);
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          variant="rounded"
                          src={video.thumbnail}
                          alt={video.title}
                          sx={{ width: 72, height: 40 }}
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
                                {relatedTags.map((tag) => (
                                  <Chip key={tag} size="small" label={tag} />
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
        </Box>
      )}
    </Box>
  );
};

export default VideoSearch;
