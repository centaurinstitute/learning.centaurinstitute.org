import { Link as RouterLink } from "react-router-dom";
import { VIDEO_CATEGORIES } from "../../utils/tagCatalog";
import { getTagLabel } from "../../utils/tagLabels";
import useVideos from "../../hooks/useVideos";

import { Box, Chip } from "@mui/material";
import React, { useMemo } from "react";

type Video = { tags?: string[] };

const SETTINGS_STORAGE_KEY = "link.settings";

const isNavCollapsed = (): boolean => {
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    return raw ? JSON.parse(raw).themeLayout === "mini" : false;
  } catch {
    return false;
  }
};

const getRankedTags = (videos: Video[]): string[] => {
  const counts = new Map<string, number>();

  videos.forEach((video) => {
    (video.tags ?? []).forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });

  return [...counts.entries()]
    .sort((first, second) => second[1] - first[1])
    .map(([tag]) => tag);
};

const ActionButtons = () => {
  const { getVideos } = useVideos();
  const { videos } = getVideos();

  const tags = useMemo(() => getRankedTags(videos ?? []), [videos]);

  if (isNavCollapsed()) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        px: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box
        role="region"
        aria-label="Video categories and topic tags"
        tabIndex={0}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          gap: 1,
          maxHeight: {
            xs: "min(22dvh, 180px)",
            lg: "min(36dvh, 360px)",
          },
          overflowY: "auto",
          overflowX: "hidden",
          overscrollBehaviorY: "contain",
          scrollbarGutter: "stable",

          scrollbarWidth: "thin",
          scrollbarColor: "#ce4a25 #e7decb",

          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#e7decb",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ce4a25",
            borderRadius: "8px",
            border: "2px solid #e7decb",
          },

          "&:focus-visible": {
            outline: "2px solid #012b54",
            outlineOffset: 2,
          },
        }}
      >
      {VIDEO_CATEGORIES.map((category) => (
        <Chip
          component={RouterLink}
          to={"/learning?category=" + encodeURIComponent(category)}
          clickable
          key={category}
          label={category}
          size="small"
          sx={{
            backgroundColor: "#ce4a25",
            color: "#e7decb",
            fontWeight: 400,
            fontFamily: "var(--title-font)",
            textDecoration: "none",
            "&:hover": {
              backgroundColor: "#ce4a25",
            },
          }}
        />
      ))}

      {tags.map((tag) => (
        <Chip
          component={RouterLink}
          to={"/learning?tag=" + encodeURIComponent(tag)}
          clickable
          key={tag}
          label={getTagLabel(tag)}
          size="small"
          sx={{
            backgroundColor: "#fdd524",
            color: "#323232",
            fontWeight: 400,
            fontFamily: "var(--title-font)",
            textDecoration: "none",
            "&:hover": {
              backgroundColor: "#fdd524",
            },
          }}
        />
      ))}
      </Box>

      <Chip
        component={RouterLink}
        to="/learning/tags"
        clickable
        label="Browse all tags"
        size="small"
        variant="outlined"
        sx={{
          color: "#012b54",
          borderColor: "#012b54",
          fontWeight: 400,
          fontFamily: "var(--title-font)",
          textDecoration: "none",
          "&:hover": {
            backgroundColor: "rgba(1, 43, 84, 0.08)",
          },
        }}
      />
    </Box>
  );
};

export default ActionButtons;
