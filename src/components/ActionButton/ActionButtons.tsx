import React from "react";

import { Box, Chip } from "@mui/material";

const tags = [
  "why",
  "neural",
  "networks",
  "can",
  "discover",
  "symbolic",
  "structures",
];

const ActionButtons = () => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, ml: 2 }}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={`#${tag}`}
          size="small"
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            fontWeight: 500,
            "&:hover": { backgroundColor: "primary.dark" },
            cursor: "default",
          }}
        />
      ))}
    </Box>
  );
};

export default ActionButtons;
