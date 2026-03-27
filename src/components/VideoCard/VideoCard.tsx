import { PlayArrow } from "@mui/icons-material";
import React from "react";
import { useState } from "react";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { formatDate, formatViews } from "../../utils/format";

const fallbackThumbnail =
  "https://cdn.centaurinstitute.org/media/8db68051-0b75-4bde-8924-b0781620a646.png";

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
  };
  videoClick: (videoId: string) => void;
}) => {
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
          paddingTop: "100%",
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
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.35)",
            opacity: 0,
            transition: "opacity 0.3s ease",
            ".MuiCard-root:hover &": {
              opacity: 1,
            },
          }}
        >
          <PlayArrow sx={{ color: "white", fontSize: 40 }} />
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="subtitle1"
          component="div"
          fontWeight="600"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.3,
            mb: 1,
          }}
        >
          {video.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Avatar
            src={video.channelAvatar}
            sx={{ width: 24, height: 24, mr: 1 }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            {video.channelName}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {formatViews(video.views)} views
          </Typography>
          <Typography variant="caption" color="text.secondary">
            •
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDate(video.uploadDate)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
