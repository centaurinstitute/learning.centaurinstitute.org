import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Chip } from "@mui/material";

const TAGS = [
  "neuro-symbolic",
  "reasoning",
  "logical_reasoning",
  "rl",
  "nlp",
  "llms",
];

const ActionButtons = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, ml: 2 }}>
      {TAGS.map((tag) => (
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
