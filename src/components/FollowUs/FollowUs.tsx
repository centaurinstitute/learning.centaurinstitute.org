import { Iconify } from "@canmingir/link/minimal/components";
import React from "react";
import { SOCIAL_LINKS } from "../../config/social";

import {
  Box,
  Fade,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const FollowUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDiscordClick = () => {
    window.open(SOCIAL_LINKS.DISCORD, "_blank");
  };

  const handleGitHubClick = () => {
    window.open(SOCIAL_LINKS.GITHUB, "_blank");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: isMobile ? "auto" : "50%",
        bottom: isMobile ? 20 : "auto",
        right: isMobile ? 10 : 20,
        transform: isMobile ? "none" : "translateY(-50%)",
        zIndex: 1000,
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        gap: 1,
        left: isMobile ? 10 : "auto",
        justifyContent: isMobile ? "center" : "flex-start",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          borderRadius: isMobile ? 2 : 3,
          background: "rgba(40, 38, 38, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          p: isMobile ? 1.5 : 2,
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          alignItems: "center",
          gap: isMobile ? 1.5 : 1,
          minHeight: isMobile ? "auto" : 150,
          width: isSmallMobile ? "120px" : "auto",
          maxWidth: isMobile ? "320px" : "none",
          mx: isMobile ? "auto" : 0,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            fontSize: isSmallMobile ? "0.75rem" : "0.875rem",
            whiteSpace: "nowrap",
            mb: isMobile ? 0 : 1,
            mr: isMobile ? 1 : 0,
            display: isSmallMobile ? "none" : "block",
          }}
        >
          Follow Us
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            gap: isMobile ? 1.5 : 1,
            alignItems: "center",
          }}
        >
          <Tooltip
            title="Join our Discord community"
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            placement={isMobile ? "top" : "left"}
          >
            <IconButton
              onClick={handleDiscordClick}
              sx={{
                background: "linear-gradient(135deg, #24292E 0%, #333 100%)",
                color: "white",
                width: isMobile ? 44 : 48,
                height: isMobile ? 44 : 48,
                minWidth: 44,
                minHeight: 44,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1B1F23 0%, #24292E 100%)",
                  transform: isMobile ? "scale(1.05)" : "translateX(-2px)",
                  boxShadow: "0 8px 25px rgba(36, 41, 46, 0.4)",
                },
                "&:active": {
                  transform: isMobile ? "scale(0.95)" : "translateX(0px)",
                },
                // Better touch target for mobile
                "@media (hover: none)": {
                  "&:hover": {
                    transform: "none",
                    background:
                      "linear-gradient(135deg, #24292E 0%, #333 100%)",
                  },
                },
              }}
            >
              <Iconify
                icon={"skill-icons:discord"}
                sx={{
                  width: isMobile ? 20 : 24,
                  height: isMobile ? 20 : 24,
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Check out our GitHub"
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            placement={isMobile ? "top" : "left"}
          >
            <IconButton
              onClick={handleGitHubClick}
              sx={{
                background: "linear-gradient(135deg, #24292E 0%, #333 100%)",
                color: "white",
                width: isMobile ? 44 : 48,
                height: isMobile ? 44 : 48,
                minWidth: 44,
                minHeight: 44,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1B1F23 0%, #24292E 100%)",
                  transform: isMobile ? "scale(1.05)" : "translateX(-2px)",
                  boxShadow: "0 8px 25px rgba(36, 41, 46, 0.4)",
                },
                "&:active": {
                  transform: isMobile ? "scale(0.95)" : "translateX(0px)",
                },
                // Better touch target for mobile
                "@media (hover: none)": {
                  "&:hover": {
                    transform: "none",
                    background:
                      "linear-gradient(135deg, #24292E 0%, #333 100%)",
                  },
                },
              }}
            >
              <Iconify
                icon={"mdi:github"}
                sx={{
                  width: isMobile ? 20 : 24,
                  height: isMobile ? 20 : 24,
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
    </Box>
  );
};

export default FollowUs;
