import React from "react";

import { Box, Typography } from "@mui/material";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/1EYFzJ47kolYXxxRuAtMsjuIeQIIAbsv0HKCACTXW_AI/viewform?embedded=true";

const RequestCertificate = () => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#012b54",
          fontWeight: "700",
          fontFamily: "var(--display-font)",
          lineHeight: 1.15,
          textAlign: "center",
          mt: 1,
        }}
      >
        Request Your Certificate
      </Typography>
      <Box
        component="iframe"
        title="Certificate request form"
        src={GOOGLE_FORM_URL}
        sx={{
          flex: 1,
          border: 0,
          display: "block",
          width: "100%",
        }}
      />
    </Box>
  );
};

export default RequestCertificate;
