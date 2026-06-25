import VideoCard from "../components/VideoCard/VideoCard";
import { getEventLabel } from "../utils/eventLabel";
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

type LearningWidgetProps = {
  event?: string;
};

const LearningWidget = ({ event }: LearningWidgetProps) => {
  const { getVideos } = useVideos();
  const navigate = useNavigate();
  const location = useLocation();

  const tagQuery = useMemo(() => {
    const sp = new URLSearchParams(location.search);
    return sp.get("tag") || undefined;
  }, [location.search]);

  const { videos, loading } = getVideos(
    tagQuery ? { tags: tagQuery } : { event },
  );

  const searchQuery = useMemo(() => {
    const sp = new URLSearchParams(location.search);
    return (sp.get("q") || "").toLowerCase().trim();
  }, [location.search]);

  const filteredVideos = useMemo(
    () => {
      const eventVideos =
        !tagQuery && event
          ? (videos || []).filter((v) => v.event === event)
          : videos || [];
      if (!searchQuery) return eventVideos;
      const q = searchQuery;
      return eventVideos.filter((v) => {
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
                .includes(q),
            )
          : false;
        return inTitle || inDesc || inTags;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [event, videos, searchQuery],
  );

  const handleVideoClick = (videoId: string) => {
    navigate(`/learning/video/${videoId}`, {
      state: { from: `${location.pathname}${location.search}` },
    });
  };

  return (
    <>
      <Box sx={{ width: "100%", padding: { xs: 2, md: 3 } }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight="800">
            {tagQuery
              ? `"${tagQuery.slice(0)}" related videos`
              : event
                ? `${getEventLabel(event)}`
                : "Learning Hub"}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={idx}>
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
                  category: string | null;
                }) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={video.id}>
                    <VideoCard
                      video={video}
                      videoClick={() => handleVideoClick(video.id)}
                    />
                  </Grid>
                ),
              )}
        </Grid>
      </Box>
    </>
  );
};

export default LearningWidget;
