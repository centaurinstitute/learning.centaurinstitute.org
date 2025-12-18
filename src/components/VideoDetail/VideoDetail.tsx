import FollowUs from "../FollowUs";
import React from "react";
import useVideos from "../../hooks/useVideos";

import {
  AccessTime,
  ArrowBack,
  Share,
  ThumbDown,
  ThumbUp,
  Visibility,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { formatDate, formatViews } from "../../utils/format";
import { useNavigate, useParams } from "react-router-dom";

const VideoDetail = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();
  const { getVideos } = useVideos();
  const { videos, loading } = getVideos();

  const handleBack = () => {
    navigate("/learning");
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  const video = videos?.find(
    (v: {
      id: string;
      title: string;
      videoUrl: string;
      thumbnail: string;
      channelName: string;
      channelAvatar: string;
      views: number;
      uploadDate: string;
      likes: number;
      dislikes: number;
      description: string;
      tags?: string[];
    }) => v.id === videoId
  );

  if (!video) {
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
      <FollowUs />
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

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mb: 2, lineHeight: 1.2 }}
              >
                {video.title}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Visibility
                      sx={{ fontSize: 16, color: "text.secondary" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {formatViews(video.views)} views
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    •
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <AccessTime
                      sx={{ fontSize: 16, color: "text.secondary" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(video.uploadDate)}
                    </Typography>
                  </Box>
                </Box>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    startIcon={<ThumbUp />}
                    size="small"
                    sx={{ borderRadius: 2 }}
                  >
                    {formatViews(video.likes)}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ThumbDown />}
                    size="small"
                    sx={{ borderRadius: 2 }}
                  >
                    {formatViews(video.dislikes)}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Share />}
                    size="small"
                    sx={{ borderRadius: 2 }}
                  >
                    Share
                  </Button>
                </Stack>
              </Box>
            </Box>

            <Card sx={{ borderRadius: 3, p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar
                  src={video.channelAvatar}
                  sx={{ width: 48, height: 48, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6" fontWeight="600">
                    {video.channelName}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="body1"
                sx={{ mb: 3, lineHeight: 1.8, whiteSpace: "pre-line" }}
              >
                {video.description}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {video.tags?.map((tag) => (
                  <Chip
                    key={tag}
                    label={`#${tag}`}
                    size="small"
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      fontWeight: 500,
                      "&:hover": { backgroundColor: "primary.dark" },
                    }}
                  />
                ))}
              </Box>
            </Card>
          </Box>

          <Box sx={{ width: { xs: "100%", lg: 400 } }}>
            <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
              More Videos
            </Typography>
            <Stack spacing={2}>
              {videos
                ?.filter((v) => v.id !== videoId)
                ?.slice(0, 6)
                ?.map((relatedVideo) => (
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
                      navigate(`/learning/video/${relatedVideo.id}`)
                    }
                  >
                    <Box sx={{ display: "flex", p: 1 }}>
                      <Box
                        component="img"
                        src={relatedVideo.thumbnail}
                        alt={relatedVideo.title}
                        sx={{
                          width: 120,
                          height: 68,
                          objectFit: "cover",
                          borderRadius: 1,
                          mr: 2,
                        }}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          fontWeight="600"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            mb: 0.5,
                          }}
                        >
                          {relatedVideo.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block" }}
                        >
                          {relatedVideo.channelName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatViews(relatedVideo.views)} views •{" "}
                          {formatDate(relatedVideo.uploadDate)}
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
