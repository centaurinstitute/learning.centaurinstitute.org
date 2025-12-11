import FollowUs from "../components/FollowUs";
import VideoCard from "../components/VideoCard/VideoCard";
import VideoSearch from "../components/Search/VideoSearch";
import useVideos from "../hooks/useVideos";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LearningWidget = () => {
  const { getVideos } = useVideos();
  const { videos, loading } = getVideos();
  const navigate = useNavigate();
  const location = useLocation();

  const searchQuery = useMemo(() => {
    const sp = new URLSearchParams(location.search);
    return (sp.get("q") || "").toLowerCase().trim();
  }, [location.search]);

  const filteredVideos = useMemo(() => {
    if (!searchQuery) return videos;
    const q = searchQuery;
    return (videos || []).filter((v) => {
      const inTitle = String(v.title || "")
        .toLowerCase()
        .includes(q);
      const inDesc = String(v.description || "")
        .toLowerCase()
        .includes(q);
      const inTags = Array.isArray(v.tags)
        ? v.tags.some((t: string) =>
            String(t || "")
              .toLowerCase()
              .includes(q)
          )
        : false;
      return inTitle || inDesc || inTags;
    });
  }, [videos, searchQuery]);

  const handleVideoClick = (videoId: string) => {
    navigate(`/learning/video/${videoId}`);
  };

  return (
    <>
      <FollowUs />
      <Box sx={{ width: "100%", padding: { xs: 2, md: 3 } }}>
        <VideoSearch videos={videos || []} />
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight="800">
            Learning Hub
          </Typography>
          <Typography variant="h6" color="text.secondary" fontWeight="300">
            Discover amazing educational content
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                  <Card sx={{ borderRadius: 3 }}>
                    <Skeleton variant="rectangular" height={200} />
                    <CardContent>
                      <Skeleton variant="text" width="80%" height={24} />
                      <Skeleton variant="text" width="60%" height={20} />
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
                        <Skeleton variant="circular" width={24} height={24} />
                        <Skeleton
                          variant="text"
                          width="40%"
                          height={16}
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : filteredVideos?.map(
                (video: {
                  id: string;
                  title: string;
                  thumbnail: string;
                  duration: string;
                  channelName: string;
                  channelAvatar: string;
                  views: number;
                  uploadDate: string;
                }) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
                    <VideoCard
                      video={video}
                      videoClick={() => handleVideoClick(video.id)}
                    />
                  </Grid>
                )
              )}
        </Grid>
      </Box>
    </>
  );
};

export default LearningWidget;
