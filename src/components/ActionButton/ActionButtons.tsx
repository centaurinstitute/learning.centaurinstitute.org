import { useNavigate } from "react-router-dom";
import useVideos from "../../hooks/useVideos";

import { Box, Chip } from "@mui/material";
import React, { useMemo } from "react";

type Video = { tags?: string[] };

const TOP_TAGS_COUNT = 8;

const SETTINGS_STORAGE_KEY = "settings";

const isNavCollapsed = (): boolean => {
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    return raw ? JSON.parse(raw).themeLayout === "mini" : false;
  } catch {
    return false;
  }
};

const getTopTags = (videos: Video[]): string[] => {
  const counts = new Map<string, number>();
  videos.forEach((video) => {
    (video.tags ?? []).forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, TOP_TAGS_COUNT)
    .map(([tag]) => tag);
};

const ActionButtons = () => {
  const navigate = useNavigate();
  const { getVideos } = useVideos();
  const { videos } = getVideos();

  const tags = useMemo(() => getTopTags(videos ?? []), [videos]);

  if (isNavCollapsed()) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, ml: 2, mb: -1 }}>
      {tags.map((tag) => (
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
            "&:hover": { backgroundColor: "primary.dark", cursor: "pointer" },
            cursor: "pointer",
          }}
        />
      ))}
    </Box>
  );
};

export default ActionButtons;
