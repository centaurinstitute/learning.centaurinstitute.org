import { getCurrentUserIdentity } from "../../utils/currentUserIdentity";
import { getFallbackThumbnail } from "../../utils/fallbackThumbnail";
import http from "@canmingir/link/platform/http";
import { publish } from "@nucleoidai/react-event";
import useVideos from "../../hooks/useVideos";

import { Add, ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

type VideoDetailLocationState = {
  from?: string;
};

const RelatedVideoThumbnail = ({
  thumbnail,
  title,
  event,
}: {
  thumbnail: string;
  title: string;
  event?: string | null;
}) => {
  const fallbackThumbnail = getFallbackThumbnail(event);
  const [imageSrc, setImageSrc] = useState(thumbnail || fallbackThumbnail);

  return (
    <Box
      component="img"
      src={imageSrc}
      alt={title}
      onError={() => {
        if (imageSrc !== fallbackThumbnail) {
          setImageSrc(fallbackThumbnail);
        }
      }}
      sx={{
        width: 50,
        height: 50,
        objectFit: "cover",
        borderRadius: 1,
        mr: 1,
      }}
    />
  );
};

const VideoDetail = () => {
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;
  const eventByRoute: Record<string, string> = {
    "/learning": "SS2025",
    "/learning/2024": "SS2024",
    "/learning/2023": "SS2023",
    "/learning/2022": "SS2022",
    "/learning/ww2024": "WW2024",
    "/learning/ww2023": "WW2023",
    "/learning/ww2022": "WW2022",
  };

  const fromPath = from ? from.split("?")[0] : undefined;
  const event = fromPath ? eventByRoute[fromPath] : undefined;

  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();
  const { getVideo, getRelatedVideos } = useVideos();
  const { video, loading: videoLoading } = getVideo(videoId!);
  const { relatedVideos, loading: relatedLoading } = getRelatedVideos(
    event ? { event } : undefined,
  );

  const [suggestedTag, setSuggestedTag] = useState("");
  const [submittingTags, setSubmittingTags] = useState(false);
  const [suggestDialogOpen, setSuggestDialogOpen] = useState(false);
  const [suggestSubmitted, setSuggestSubmitted] = useState(false);

  const backTarget =
    (location.state as VideoDetailLocationState | null)?.from || "/learning";

  const handleBack = () => {
    navigate(backTarget);
  };

  const handleSuggestTags = async () => {
    const tag = suggestedTag.trim();
    if (!tag || !videoId) {
      return;
    }

    setSubmittingTags(true);
    try {
      const identity = await getCurrentUserIdentity();

      if (!identity.email && !identity.name) {
        publish("GLOBAL_MESSAGE_POSTED", {
          status: true,
          message: "We couldn't verify your identity, please log in again",
          severity: "warning",
        });
        return;
      }

      await http.post(`/videos/${videoId}/tag-suggestions`, {
        tags: [tag],
        name: identity.name,
        email: identity.email,
        identityProvider: identity.identityProvider,
      });

      setSuggestedTag("");
      setSuggestSubmitted(true);
    } catch (error) {
      console.error("Failed to submit tag suggestion:", error);
      publish("GLOBAL_MESSAGE_POSTED", {
        status: true,
        message: "Failed to submit your suggestion, please try again",
        severity: "error",
      });
    } finally {
      setSubmittingTags(false);
    }
  };

  const handleCloseSuggestDialog = () => {
    setSuggestDialogOpen(false);
    setSuggestedTag("");
    setSuggestSubmitted(false);
  };

  useEffect(() => {
    if (!suggestSubmitted) {
      return;
    }

    const timer = setTimeout(() => {
      setSuggestDialogOpen(false);
      setSuggestedTag("");
      setSuggestSubmitted(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [suggestSubmitted]);

  if (videoLoading || relatedLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  if (!video || !videoId) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          variant="outlined"
          sx={{ mb: 2 }}
        >
          Back to Learning Hub
        </Button>
        <Typography variant="h6">Video not found</Typography>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          variant="outlined"
          sx={{ mb: 3, borderRadius: 2 }}
        >
          Back to Learning Hub
        </Button>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Card sx={{ borderRadius: 3, overflow: "hidden", mb: 3 }}>
              <Box
                sx={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                }}
              >
                <iframe
                  src={`${video.videoUrl}${
                    video.videoUrl.includes("?") ? "&" : "?"
                  }autoplay=1&muted=1`}
                  title={video.title}
                  frameBorder="0"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </Card>

            <Card sx={{ borderRadius: 3, p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Box>
                  <Typography variant="h6" fontWeight="600">
                    {video.title}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {video.tags?.map((tag) => (
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
                      "&:hover": { backgroundColor: "primary.dark" },
                    }}
                  />
                ))}
                {video.category && (
                  <Chip
                    label={video.category}
                    size="small"
                    sx={{
                      backgroundColor: "text.secondary",
                      color: "white",
                      fontWeight: 500,
                      "&:hover": {
                        backgroundColor: "text.secondary",
                        cursor: "default",
                      },
                    }}
                  />
                )}
                <Chip
                  icon={<Add sx={{ fontSize: 16 }} />}
                  label="Suggest a tag"
                  size="small"
                  variant="outlined"
                  onClick={() => setSuggestDialogOpen(true)}
                />
              </Box>

              {video.authors && video.authors.length > 0 && (
                <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {video.authors.map((author: string) => (
                    <Chip key={author} label={author} size="small" />
                  ))}
                </Box>
              )}
            </Card>
          </Box>

          <Box sx={{ width: { xs: "100%", lg: 400 } }}>
            <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
              More Videos
            </Typography>
            <Stack spacing={2}>
              {relatedVideos?.map((relatedVideo) => (
                <Card
                  key={relatedVideo.id}
                  sx={{
                    borderRadius: 2,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 2,
                    },
                  }}
                  onClick={() =>
                    navigate(`/learning/video/${relatedVideo.id}`, {
                      state: { from: backTarget },
                    })
                  }
                >
                  <Box sx={{ display: "flex", p: 1 }}>
                    <RelatedVideoThumbnail
                      thumbnail={relatedVideo.thumbnail}
                      title={relatedVideo.title}
                      event={relatedVideo.event}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        fontWeight="600"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {relatedVideo.title}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>

      <Dialog
        open={suggestDialogOpen}
        onClose={handleCloseSuggestDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Suggest a tag</DialogTitle>
        <DialogContent>
          {suggestSubmitted ? (
            <Typography sx={{ py: 1 }}>
              Your request has been sent, it will be added after being
              reviewed.
            </Typography>
          ) : (
            <TextField
              autoFocus
              fullWidth
              disabled={submittingTags}
              variant="outlined"
              size="small"
              placeholder="Enter a tag"
              value={suggestedTag}
              onChange={(event) => setSuggestedTag(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSuggestTags();
                }
              }}
              sx={{ mt: 1 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          {suggestSubmitted ? (
            <Button onClick={handleCloseSuggestDialog}>Close</Button>
          ) : (
            <>
              <Button onClick={handleCloseSuggestDialog} disabled={submittingTags}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSuggestTags}
                disabled={submittingTags || !suggestedTag.trim()}
                startIcon={
                  submittingTags ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : undefined
                }
              >
                {submittingTags ? "Submitting..." : "Suggest"}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VideoDetail;
