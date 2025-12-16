import FollowUs from "../components/FollowUs";
import React from "react";
import useLive from "../hooks/useLive";

import {
  Box,
  Card,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  CalendarToday,
  Public,
  School,
  TrackChanges,
} from "@mui/icons-material";

const mockLive = {
  id: "live1",
  streamTitle: "Neuro-Symbolic AI Summer School 2025",
  liveStreamUrl:
    "https://www.youtube.com/embed/-uEx0IICBxg?autoplay=1&rel=0&modestbranding=1",
};

const LiveWidget = () => {
  const { getLiveVideos } = useLive();
  const { liveVideos } = getLiveVideos();

  console.log("videos", liveVideos);

  return (
    <>
      <FollowUs />
      <Box
        key={mockLive.id}
        sx={{
          mx: "auto",
          width: "100%",
          px: { xs: 1.5, sm: 2.5, md: 3 },
          py: { xs: 1.5, sm: 2.5, md: 3 },
        }}
      >
        <Card
          sx={{
            borderRadius: { xs: 2, sm: 3 },
            overflow: "hidden",
            mb: { xs: 2, sm: 3 },
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              "@supports not (aspect-ratio: 16 / 9)": {
                height: 0,
                paddingBottom: "60%",
              },
              backgroundColor: "#000",
            }}
          >
            <iframe
              src={mockLive.liveStreamUrl}
              title={mockLive.streamTitle}
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        </Card>
        <Card
          sx={{
            borderRadius: { xs: 2, sm: 3 },
            p: { xs: 2, sm: 3 },
            mb: { xs: 2, sm: 3 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: { xs: 2, sm: 3 },
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "error.main",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { opacity: 1 },
                  "50%": { opacity: 0.5 },
                  "100%": { opacity: 1 },
                },
              }}
            />
            <Typography variant="h6" fontWeight={700} color="error.main">
              LIVE
            </Typography>
          </Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              mb: { xs: 2, sm: 3 },
              lineHeight: 1.15,
              textAlign: "center",
              fontSize: { xs: "1.55rem", sm: "2rem", md: "2.125rem" },
              background:
                "linear-gradient(45deg, #1e3c72 0%, #2a5298 25%, #4facfe 50%, #00d4ff 75%, #667eea 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {mockLive.streamTitle}
          </Typography>

          <Divider sx={{ mb: { xs: 2.5, sm: 4 }, opacity: 0.3 }} />

          <Stack spacing={{ xs: 2, sm: 3 }}>
            <Paper
              elevation={0}
              sx={{ p: { xs: 1.5, sm: 2 }, bgcolor: "background.paper" }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ mb: 1.5, color: "text.primary" }}
              >
                🤔 Are you looking for something different?
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.8, color: "text.secondary" }}
              >
                Tired of the same old AI ideas and looking for something new? Or
                wondering if there are any deep alternatives to models that
                hallucinate, elude human debuggability, and have only limited
                ability to reason, plan, or do math?
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{ p: { xs: 1.5, sm: 2 }, bgcolor: "background.paper" }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}
              >
                <School sx={{ color: "text.primary", fontSize: 24 }} />
                <Typography variant="h6" fontWeight={600} color="text.primary">
                  Join the 4th Neuro-Symbolic AI Summer School
                </Typography>
              </Box>

              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                📢 Please join us for the 4th Neuro-Symbolic AI Summer School
                (NSSS), a <strong>free, fully-remote meeting</strong> to be held
                Aug 14-15, 2025 - where you can learn how to be part of this
                exciting area at the most forward-looking cutting edge of AI.
              </Typography>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <CalendarToday sx={{ color: "text.secondary", fontSize: 18 }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={600}
                >
                  August 14-15, 2025
                </Typography>
              </Box>

              <Typography
                variant="subtitle1"
                fontWeight={700}
                sx={{ mt: 1.5, color: "primary.dark" }}
              >
                Theme: &quot;AI for Precise Computation: Mathematics, Reasoning,
                and Planning&quot;
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{ p: { xs: 1.5, sm: 2 }, bgcolor: "background.paper" }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}
              >
                <Public sx={{ color: "text.primary", fontSize: 24 }} />
                <Typography variant="h6" fontWeight={600} color="text.primary">
                  About NSSS &apos;25
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                🌐 NSSS &apos;25 is the latest in a series of research and
                educational events that aim to accelerate progress in the
                fast-emerging area of neuro-symbolic AI by teaching graduate
                students, data scientists, and researchers principles from the
                side of AI they may be less familiar with, as well as presenting
                a curation of emerging research ideas at the intersection.
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{ p: { xs: 1.5, sm: 2 }, bgcolor: "background.paper" }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}
              >
                <TrackChanges sx={{ color: "text.primary", fontSize: 24 }} />
                <Typography variant="h6" fontWeight={600} color="text.primary">
                  Focus Areas
                </Typography>
              </Box>

              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                🎯 The focus of the event is on techniques, in particular those
                which augment neural network/ML ideas with symbolic AI ideas, to
                address at least three main open problems of AI:
              </Typography>

              <Box sx={{ pl: { xs: 0.5, sm: 2 } }}>
                {[
                  "1) Human interpretability/controllability",
                  "2) Learning with less data/computation (e.g. via knowledge)",
                  "3) Out-of-distribution generalization (e.g. via reasoning)",
                ].map((t) => (
                  <Typography
                    key={t}
                    variant="body1"
                    sx={{
                      mb: 1,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        mt: "0.55rem",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "primary.main",
                        flex: "0 0 auto",
                      }}
                    />
                    <span>
                      <strong>{t.split(") ")[0]})</strong> {t.split(") ")[1]}
                    </span>
                  </Typography>
                ))}
              </Box>
            </Paper>
          </Stack>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mt: { xs: 2, sm: 3 },
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            {["ai", "live", "realtime", "neurosymbolic", "summer-school"].map(
              (tag) => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  size="small"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "primary.dark" },
                  }}
                />
              )
            )}
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default LiveWidget;
