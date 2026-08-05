import { useNavigate } from "react-router-dom";
import useVideos from "../../hooks/useVideos";

import { Box, Chip } from "@mui/material";
import React, { useMemo, useState } from "react";

type Video = { tags?: string[] };

const TOP_TAGS_COUNT = 20;
const COLLAPSED_TAGS_COUNT = 5;

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

  const [expanded, setExpanded] = useState(false);

  const tags = useMemo(() => getTopTags(videos ?? []), [videos]);
  const visibleTags = expanded ? tags : tags.slice(0, COLLAPSED_TAGS_COUNT);
  const hiddenCount = tags.length - visibleTags.length;

  if (isNavCollapsed()) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, ml: 2, mb: -1 }}>
      {visibleTags.map((tag) => (
        <Chip
          onClick={() => {
            navigate(`/learning?tag=${encodeURIComponent(tag)}`);
          }}
          key={tag}
          label={`${tag}`}
          size="small"
          sx={{
            backgroundColor: "#fdd524",
            color: "#323232",
            "&:hover": { backgroundColor: "#fdd524", cursor: "pointer" },
            cursor: "pointer",
            fontWeight: "400",
            fontFamily: "var(--title-font)",
          }}
        />
      ))}
      {(hiddenCount > 0 || expanded) && (
        <Chip
          onClick={() => setExpanded((prev) => !prev)}
          label={expanded ? "Show less" : `+${hiddenCount} more`}
          size="small"
          variant="outlined"
          sx={{
            color: "#323232",
            borderColor: "#fdd524",
            "&:hover": { backgroundColor: "#fdd52433", cursor: "pointer" },
            cursor: "pointer",
            fontWeight: "400",
            fontFamily: "var(--title-font)",
          }}
        />
      )}
    </Box>
  );
};

export default ActionButtons;
