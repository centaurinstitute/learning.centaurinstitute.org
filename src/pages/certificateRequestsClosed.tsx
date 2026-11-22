import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const CertificateRequestsClosed = () => (
  <Box
    sx={{
      maxWidth: 640,
      mx: "auto",
      px: 2,
      py: 6,
      textAlign: "center",
    }}
  >
    <Typography
      component="h1"
      variant="h4"
      sx={{
        color: "#012b54",
        fontWeight: 700,
        fontFamily: "var(--display-font)",
        mb: 2,
      }}
    >
      Certificate requests are closed
    </Typography>

    <Typography sx={{ color: "#171619", mb: 3 }}>
      We are no longer accepting certificate requests.
    </Typography>

    <Button
      component={RouterLink}
      to="/learning"
      variant="outlined"
      sx={{
        color: "#ce4a25",
        borderColor: "#ce4a25",
        fontFamily: "var(--title-font)",
        textTransform: "none",
      }}
    >
      Back to Learning Hub
    </Button>
  </Box>
);

export default CertificateRequestsClosed;
