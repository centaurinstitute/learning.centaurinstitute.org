import { getFallbackThumbnail } from "../../utils/fallbackThumbnail";
import useVideos from "../../hooks/useVideos";

import { Box, Card, Grid, Stack, Typography } from "@mui/material";
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
  "Intro to Neuro-Symbolic & General Audience",
  "Tools & Tutorials",
  "Foundational Research",
];

const LUMINARY_VIDEO_IDS = new Set([
  "27219e98-6f47-4c9c-8f9f-1bc226310e60",
  "0f1ae4be-1253-4057-9891-82dbaef3b833",
  "7e723859-0244-4fbd-93a9-74eafb540bbe",
  "b55af06f-9a81-48c9-af54-d0f3f14d4295",
  "9c7afc4f-7e70-4e28-9ade-facd95e883e3",
  "c8609074-8976-469f-86b1-fbf9ea65c4ae",
  "106870fa-f351-4f1e-902c-5576ceddd590",
  "a9fac4b7-7f0d-4687-9b4a-808a4c06e5e0",
  "d7334953-c6e7-4aff-a5ee-762f169aac2b",
  "bd2cb27c-ae22-4145-aad8-d8a0394e688f",
  "f85aa3a2-d731-45a1-8b9f-7372741d6653",
  "21242fce-92ad-4af4-ad9e-a740e73c1f10",
  "c589b449-5b79-46da-a581-5e8563d7b71c",
  "fc9f0f21-6227-47ba-a58a-4df1096c93f0",
  "6542b9ef-4881-4cfb-aaf6-5fd19571a6c9",
  "7642f72a-64d3-4857-9f8c-d03747bfa4c7",
  "dfe2fa23-d83a-4d0e-aa76-f665e84e9439",
  "26faff14-7f40-40e7-a5b7-f53f935670fc",
  "1669d96c-98c6-4353-8efb-fdc6635ea4eb",
  "4508b754-5f53-4ea2-b48e-7734322b2469",
  "ff9231d9-1ff8-4acc-bf3e-934675c9c377",
  "6ec106dc-1689-476a-b201-15e082863fe4",
]);

const INTRO_VIDEO_IDS = new Set([
  "51f7d6d8-a5b0-4695-a997-61b047babdb7",
  "049e0179-4399-47c8-882a-6c38dfe195f1",
  "6807dc9a-ea5d-4dbb-ab7a-bb619ce4b03d",
  "d0cbe3cf-e54a-44f9-81e8-fa673fe94862",
  "20b2271b-8605-4cfc-91bf-c1267199cdf6",
  "b55af06f-9a81-48c9-af54-d0f3f14d4295",
  "4734f3fc-063b-41ff-8e42-559d4f0e4b30",
  "7642f72a-64d3-4857-9f8c-d03747bfa4c7",
  "1669d96c-98c6-4353-8efb-fdc6635ea4eb",
  "6542b9ef-4881-4cfb-aaf6-5fd19571a6c9",
  "55fe4853-fc15-4192-b2d9-6fbe4dccaf51",
  "6ec106dc-1689-476a-b201-15e082863fe4",
  "3ac49c24-4621-4c93-85e4-e531fe253701",
  "106870fa-f351-4f1e-902c-5576ceddd590",
]);

const TOOLS_VIDEO_IDS = new Set([
  "09a3c49d-5546-4fc0-b110-9950f18a5447",
  "7642f72a-64d3-4857-9f8c-d03747bfa4c7",
  "919ce72b-32d1-497d-8c95-7f9535cbd38d",
  "0147edc6-ce94-48cb-912c-988933e1f0a3",
  "c90a371f-bca1-4bac-8b56-04ecd54ff85a",
  "dfe2fa23-d83a-4d0e-aa76-f665e84e9439",
  "975b052f-fefc-4d51-be54-f13e11902c93",
  "00664b7c-2fc6-4422-a3a0-63f4d5d05902",
  "07652c70-844c-4fa2-a938-646eeaf87ada",
  "455e3776-5ecb-4bac-9aba-b35c59adc7df",
  "afdd8080-08fd-4036-92af-b51401f2a985",
]);

const FOUNDATIONAL_VIDEO_IDS = new Set([
  "e0fa5f54-8fa9-4bfb-b52b-0ce4790ec9a7",
  "1d22a400-d82c-4a1b-9fa6-baaf1995686d",
  "bddb0d3f-b848-4ebc-965b-4b91f6154cd9",
  "9b88fb90-9699-46e7-9fa8-ba80cd07f12c",
  "56d70c3d-d411-486e-9f2a-778d70a476b8",
  "e46dd07f-2e9b-4842-9b86-e512f1db7732",
  "69d0f13f-1f61-4d1d-a65d-af1ba7231a60",
]);

const ITEMS_PER_COLUMN = 22;

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
    const allVideos = (videos as Video[]) || [];

    const idsByTitle: Record<string, Set<string>> = {
      Luminaries: LUMINARY_VIDEO_IDS,
      "Intro to Neuro-Symbolic & General Audience": INTRO_VIDEO_IDS,
      "Tools & Tutorials": TOOLS_VIDEO_IDS,
      "Foundational Research": FOUNDATIONAL_VIDEO_IDS,
    };

    return columnTitles.map((title) => {
      const idSet = idsByTitle[title];
      return {
        title,
        items: shuffle(allVideos.filter((video) => idSet?.has(video.id))).slice(
          0,
          ITEMS_PER_COLUMN,
        ),
      };
    });
  }, [videos]);

  const handleVideoClick = (videoId: string) => {
    navigate(`/learning/video/${videoId}`, {
      state: { from: `${location.pathname}${location.search}` },
    });
  };

  return (
    <Grid
      container
      sx={{ p: 2 }}
      columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      spacing={{ xs: 2, sm: 3, md: 3 }}
    >
      {columns.map((column) => (
        <Grid key={column.title} size={1}>
          <Stack spacing={{ xs: 1, md: 2 }}>
            <Typography
              variant="subtitle2"
              align="center"
              sx={{
                minHeight: { lg: 40 },
                whiteSpace: "pre-line",
                position: "sticky",
                top: 55,
                zIndex: 1,
                bgcolor: "background.default",
                py: 1,
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
  );
};

export default HomeLayout;
