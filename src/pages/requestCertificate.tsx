import { Box } from "@mui/material";
import React from "react";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfulUFYgxL8M7kH-F22yGJet3EEXycW-uSs1OWGFYyb9DEKVw/viewform?embedded=true";

const RequestCertificate = () => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Box
        component="iframe"
        title="Certificate request form"
        src={GOOGLE_FORM_URL}
        sx={{
          flex: 1,
          border: 0,
          display: "block",
        }}
      />
    </Box>
  );
};

export default RequestCertificate;
