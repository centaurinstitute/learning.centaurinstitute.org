import React from "react";
import { getFallbackThumbnail } from "../../utils/fallbackThumbnail";
import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";

const VideoCard = ({
  video,
  videoClick,
}: {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    channelName: string;
    channelAvatar: string;
    views: number;
    uploadDate: string;
    duration: string;
    category: string | null;
    event?: string | null;
    authors?: string[];
  };
  videoClick: (videoId: string) => void;
}) => {
  const fallbackThumbnail = getFallbackThumbnail(video.event);
  const [imageSrc, setImageSrc] = useState(
    video.thumbnail || fallbackThumbnail,
  );

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
        },
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
      onClick={() => videoClick(video.id)}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: "66.6667%",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={imageSrc}
          alt={video.title}
          onError={() => {
            if (imageSrc !== fallbackThumbnail) {
              setImageSrc(fallbackThumbnail);
            }
          }}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "white",
            px: 0.75,
            py: 0.25,
            borderRadius: 1,
            fontSize: "0.75rem",
            fontWeight: "bold",
          }}
        >
          {video.duration}
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="subtitle1"
          component="div"
          fontWeight="600"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.3,
            height: "calc(1.3em * 3)",
            color: "#171619",
            fontFamily: "var(--display-font)",
          }}
        >
          {video.title}
        </Typography>

        <Divider sx={{ my: 1, borderColor: "#585656", opacity: 0.4 }} />

        {video.authors && video.authors.length > 0 && (
          <>
            <Typography
              component="div"
              sx={{
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "var(--title-font)",
                color: "#ce4a25",
                mb: 0.25,
              }}
            >
              Speakers
            </Typography>
            <Typography
              component="div"
              sx={{
                fontSize: "0.95rem",
                color: "#ce4a25",
                fontFamily: "var(--title-font)",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: 1,
                height: "calc(1em * 2)",
              }}
            >
              {video.authors.join(", ")}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoCard;
