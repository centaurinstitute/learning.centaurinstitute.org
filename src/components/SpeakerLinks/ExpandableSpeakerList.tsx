import SpeakerLinks from "./SpeakerLinks";
import { Box, Button } from "@mui/material";
import React, { useEffect, useId, useRef, useState } from "react";

const COLLAPSED_LINES = 2;
const LINE_HEIGHT = 1;
const COLLAPSED_HEIGHT = `${COLLAPSED_LINES * LINE_HEIGHT}em`;

type ExpandableSpeakerListProps = {
  authors: string[];
};

const ExpandableSpeakerList = ({
  authors,
}: ExpandableSpeakerListProps) => {
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const measurementRef = useRef<HTMLDivElement>(null);
  const contentId = useId();

  useEffect(() => {
    const element = measurementRef.current;
    if (!element) return;

    const measure = () => {
      const lineHeight = Number.parseFloat(
        window.getComputedStyle(element).lineHeight,
      );

      setOverflows(
        element.getBoundingClientRect().height >
          lineHeight * COLLAPSED_LINES + 0.5,
      );
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => observer.disconnect();
  }, [authors]);

  return (
    <Box
      sx={{
        position: "relative",
        fontSize: "0.95rem",
        color: "#ce4a25",
        fontFamily: "var(--title-font)",
        lineHeight: LINE_HEIGHT,
        overflowWrap: "anywhere",
      }}
    >
      {/* Measure the full text without adding visible or focusable content. */}
      <Box
        ref={measurementRef}
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        {authors.join(", ")}
      </Box>

      <Box
        id={contentId}
        onFocusCapture={() => {
          // Keep keyboard-focused speaker links visible.
          if (overflows) setExpanded(true);
        }}
        sx={{
          minHeight: COLLAPSED_HEIGHT,
          display: expanded ? "block" : "-webkit-box",
          WebkitLineClamp: expanded ? "unset" : COLLAPSED_LINES,
          WebkitBoxOrient: "vertical",
          overflow: expanded ? "visible" : "hidden",
        }}
      >
        <SpeakerLinks authors={authors} />
      </Box>

      {/* Reserve the same control space on cards with short speaker lists. */}
      <Box sx={{ minHeight: 32 }}>
        {overflows && (
          <Button
            type="button"
            size="small"
            aria-expanded={expanded}
            aria-controls={contentId}
            onClick={(event) => {
              event.stopPropagation();
              setExpanded((previous) => !previous);
            }}
            sx={{
              minHeight: 32,
              px: 0,
              color: "inherit",
              fontFamily: "inherit",
              textTransform: "none",
            }}
          >
            {expanded ? "Show fewer speakers" : "Show all speakers"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ExpandableSpeakerList;
