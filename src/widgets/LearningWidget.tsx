import VideoCard from "../components/VideoCard/VideoCard";
import { getEventLabel } from "../utils/eventLabel";
import { getTagLabel } from "../utils/tagLabels"; // import tag map utility function
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

  const { tagQuery, categoryQuery, speakerQuery, searchQuery } = useMemo(() => {
    const params = new URLSearchParams(location.search);

    return {
      tagQuery: params.get("tag")?.trim() || undefined,
      categoryQuery: params.get("category")?.trim() || undefined,
      speakerQuery: params.get("speaker")?.trim() || undefined,
      searchQuery: (params.get("q") || "").toLowerCase().trim(),
    };
  }, [location.search]);

  const hasMetadataFilter = Boolean(
    tagQuery || categoryQuery || speakerQuery,
  );

  const { videos, loading } = getVideos({
    tags: tagQuery,
    category: categoryQuery,
    speaker: speakerQuery,
    event: hasMetadataFilter ? undefined : event,
  });

  const filteredVideos = useMemo(() => {
    const items = videos || [];

    if (!searchQuery) return items;

    const q = searchQuery;

    return items.filter((video) => {
      const inTitle = String(video.title || "").toLowerCase().includes(q);

      const inDescription = String(video.description || "")
        .toLowerCase()
        .includes(q);

      const inTags =
        Array.isArray(video.tags) &&
        video.tags.some(
          (tag: string) =>
            tag.toLowerCase().includes(q) ||
            getTagLabel(tag).toLowerCase().includes(q),
        );

      const inCategory = String(video.category || "")
        .toLowerCase()
        .includes(q);

      const inSpeakers =
        Array.isArray(video.authors) &&
        video.authors.some((author: string) =>
          author.toLowerCase().includes(q),
        );

      return (
        inTitle ||
        inDescription ||
        inTags ||
        inCategory ||
        inSpeakers
      );
    });
  }, [videos, searchQuery]);

  const filterTitle = [
    categoryQuery ? "Category: " + categoryQuery : undefined,
    speakerQuery ? "Speaker: " + speakerQuery : undefined,
    tagQuery
      ? '"' + getTagLabel(tagQuery) + '" related videos'
      : undefined,
  ]
    .filter(Boolean)
    .join(" · ");

  const handleVideoClick = (videoId: string) => {
    navigate(`/learning/video/${videoId}`, {
      state: { from: `${location.pathname}${location.search}` },
    });
  };

  return (
    <>
      <Box sx={{ width: "100%", padding: { xs: 2, md: 3 } }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              color: "#ce4a25",
              fontWeight: "400",
              fontFamily: "var(--title-font)",
            }}
            variant="h3"
          >
            {filterTitle || (event ? getEventLabel(event) : "Learning Hub")}
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
                  authors?: string[];
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
