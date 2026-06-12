import React from "react";

import { Card, Container, Grid, Stack, Typography } from "@mui/material";

const imageUrl =
  "https://cdn.centaurinstitute.org/media/8db68051-0b75-4bde-8924-b0781620a646.png";

const columns = [
  {
    title: "Luminaries",
    items: Array.from({ length: 3 }, (_, index) => ({
      image: imageUrl,
      alt: `Luminaries ${index + 1}`,
    })),
  },
  {
    title: "Intro to Neuro-Symbolic",
    items: Array.from({ length: 3 }, (_, index) => ({
      image: imageUrl,
      alt: `Intro to Neuro-Symbolic ${index + 1}`,
    })),
  },
  {
    title: "Non-Technical",
    items: Array.from({ length: 3 }, (_, index) => ({
      image: imageUrl,
      alt: `Non-Technical ${index + 1}`,
    })),
  },
  {
    title: "Recent Research",
    items: Array.from({ length: 3 }, (_, index) => ({
      image: imageUrl,
      alt: `Recent Research ${index + 1}`,
    })),
  },
  {
    title: "Foundational Research",
    items: Array.from({ length: 3 }, (_, index) => ({
      image: imageUrl,
      alt: `Foundational Research ${index + 1}`,
    })),
  },
];

const cardImageStyles = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
  borderRadius: 3,
};

const HomeLayout = () => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
      <Grid
        container
        columns={{ xs: 1, sm: 2, md: 3, lg: 5 }}
        spacing={{ xs: 2, sm: 3, md: 4 }}
      >
        {columns.map((column) => (
          <Grid key={column.title} size={1}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              <Typography
                variant="subtitle2"
                align="center"
                sx={{
                  minHeight: { lg: 40 },
                  whiteSpace: "pre-line",
                }}
              >
                {column.title}
              </Typography>

              {column.items.map((item) => (
                <Card
                  key={item.alt}
                  sx={{
                    borderRadius: 3,
                    height: { xs: 220, sm: 240, md: 250 },
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
                  <img
                    src={item.image}
                    alt={item.alt}
                    style={cardImageStyles}
                  />
                </Card>
              ))}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomeLayout;
