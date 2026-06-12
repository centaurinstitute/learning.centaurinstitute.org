import { ArrowBack } from "@mui/icons-material";
import { getFallbackThumbnail } from "../../utils/fallbackThumbnail";
import useVideos from "../../hooks/useVideos";

import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

type VideoDetailLocationState = {
  from?: string;
};

const RelatedVideoThumbnail = ({
  thumbnail,
  title,
  event,
}: {
  thumbnail: string;
  title: string;
  event?: string | null;
}) => {
  const fallbackThumbnail = getFallbackThumbnail(event);
  const [imageSrc, setImageSrc] = useState(thumbnail || fallbackThumbnail);

  return (
    <Box
      component="img"
      src={imageSrc}
      alt={title}
      onError={() => {
        if (imageSrc !== fallbackThumbnail) {
          setImageSrc(fallbackThumbnail);
        }
      }}
      sx={{
        width: 50,
        height: 50,
        objectFit: "cover",
        borderRadius: 1,
        mr: 1,
      }}
    />
  );
};

const VideoDetail = () => {
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;
  const eventByRoute: Record<string, string> = {
    "/learning": "SS2025",
    "/learning/2024": "SS2024",
    "/learning/2023": "SS2023",
    "/learning/2022": "SS2022",
    "/learning/ww2024": "WW2024",
    "/learning/ww2023": "WW2023",
    "/learning/ww2022": "WW2022",
  };

  const fromPath = from ? from.split("?")[0] : undefined;
  const event = fromPath ? eventByRoute[fromPath] : undefined;

  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();
  const { getVideo, getRelatedVideos } = useVideos();
  const { video, loading: videoLoading } = getVideo(videoId!);
  const { relatedVideos, loading: relatedLoading } = getRelatedVideos(
    event ? { event } : undefined,
  );

  const backTarget =
    (location.state as VideoDetailLocationState | null)?.from || "/learning";

  const handleBack = () => {
    navigate(backTarget);
  };

  if (videoLoading || relatedLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  if (!video || !videoId) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          variant="outlined"
          sx={{ mb: 2 }}
        >
          Back to Learning Hub
        </Button>
        <Typography variant="h6">Video not found</Typography>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          variant="outlined"
          sx={{ mb: 3, borderRadius: 2 }}
        >
          Back to Learning Hub
        </Button>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Card sx={{ borderRadius: 3, overflow: "hidden", mb: 3 }}>
              <Box
                sx={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                }}
              >
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  frameBorder="0"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </Card>

            <Card sx={{ borderRadius: 3, p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box>
                  <Typography variant="h6" fontWeight="600">
                    {video.title}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {video.tags?.map((tag) => (
                  <Chip
                    onClick={() => {
                      navigate(`/learning?tag=${encodeURIComponent(tag)}`);
                    }}
                    key={tag}
                    label={`${tag}`}
                    size="small"
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      fontWeight: 500,
                      "&:hover": { backgroundColor: "primary.dark" },
                    }}
                  />
                ))}
                {video.category && (
                  <Chip
                    label={video.category}
                    size="small"
                    sx={{
                      backgroundColor: "text.secondary",
                      color: "white",
                      fontWeight: 500,
                      "&:hover": {
                        backgroundColor: "text.secondary",
                        cursor: "default",
                      },
                    }}
                  />
                )}
              </Box>
            </Card>
          </Box>

          <Box sx={{ width: { xs: "100%", lg: 400 } }}>
            <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
              More Videos
            </Typography>
            <Stack spacing={2}>
              {relatedVideos?.map((relatedVideo) => (
                <Card
                  key={relatedVideo.id}
                  sx={{
                    borderRadius: 2,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 2,
                    },
                  }}
                  onClick={() =>
                    navigate(`/learning/video/${relatedVideo.id}`, {
                      state: { from: backTarget },
                    })
                  }
                >
                  <Box sx={{ display: "flex", p: 1 }}>
                    <RelatedVideoThumbnail
                      thumbnail={relatedVideo.thumbnail}
                      title={relatedVideo.title}
                      event={relatedVideo.event}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        fontWeight="600"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {relatedVideo.title}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default VideoDetail;
