import { Link } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

type SpeakerLinksProps = {
  authors: string[];
};

const SpeakerLinks = ({ authors }: SpeakerLinksProps) => (
  <>
    {authors.map((author, index) => (
      <React.Fragment key={author}>
        {index > 0 && ", "}
        <Link
          component={RouterLink}
          to={"/learning?speaker=" + encodeURIComponent(author)}
          color="inherit"
          underline="hover"
          onClick={(event) => {
            event.stopPropagation();
          }}
          sx={{ font: "inherit" }}
        >
          {author}
        </Link>
      </React.Fragment>
    ))}
  </>
);

export default SpeakerLinks;
