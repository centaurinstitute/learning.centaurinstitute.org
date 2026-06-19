import { getFallbackThumbnail } from "../../utils/fallbackThumbnail";
import useVideos from "../../hooks/useVideos";

import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Video = {
  id: string;
  title: string;
  thumbnail: string;
  event?: string | null;
};

const columnTitles = [
  "Luminaries",
  "Intro to Neuro-Symbolic",
  "Non-Technical",
  "Recent Research",
  "Foundational Research",
];

const ITEMS_PER_COLUMN = 3;

const shuffle = <T,>(items: T[]): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const cardImageStyles = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
  borderRadius: 3,
};

const VideoThumbnail = ({ video }: { video: Video }) => {
  const fallback = getFallbackThumbnail(video.event);
  const [src, setSrc] = useState(video.thumbnail || fallback);

  return (
    <img
      src={src}
      alt={video.title}
      style={cardImageStyles}
      onError={() => {
        if (src !== fallback) {
          setSrc(fallback);
        }
      }}
    />
  );
};

const HomeLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getVideos } = useVideos();
  const { videos } = getVideos();

  const columns = useMemo(() => {
    const shuffled = shuffle((videos as Video[]) || []);
    return columnTitles.map((title, index) => ({
      title,
      items: shuffled.slice(
        index * ITEMS_PER_COLUMN,
        (index + 1) * ITEMS_PER_COLUMN,
      ),
    }));
  }, [videos]);

  const handleVideoClick = (videoId: string) => {
    navigate(`/learning/video/${videoId}`, {
      state: { from: `${location.pathname}${location.search}` },
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
      <Grid
        container
        columns={{ xs: 1, sm: 2, md: 3, lg: 5 }}
        spacing={{ xs: 2, sm: 3, md: 4 }}
      >
        {columns.map((column) => (
          <Grid key={column.title} size={1}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              <Typography
                variant="subtitle2"
                align="center"
                sx={{
                  minHeight: { lg: 40 },
                  whiteSpace: "pre-line",
                }}
              >
                {column.title}
              </Typography>

              {column.items.map((video) => (
                <Card
                  key={video.id}
                  onClick={() => handleVideoClick(video.id)}
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                    },
                    overflow: "hidden",
                    p: 2,
                  }}
                >
                  <Box sx={{ height: { xs: 220, sm: 240, md: 250 } }}>
                    <VideoThumbnail video={video} />
                  </Box>
                  <Typography
                    variant="body2"
                    fontWeight="600"
                    sx={{
                      mt: 1.5,
                      lineHeight: 1.4,
                      height: "2.8em",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {video.title}
                  </Typography>
                </Card>
              ))}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomeLayout;
