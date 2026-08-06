/* eslint-disable no-unused-vars */
const templateConfig = {
  theme: {
    variants: () => ({
      MuiCard: {
        variants: [
          {
            props: { variant: "profile-card" },
            style: {
              mb: 3,
              height: 290,
            },
          },
        ],
      },
    }),
    mode: "dark",
    colorPresets: "cyan",
  },
  login: {
    variant: "special",
    image:
      "https://cdn.centaurinstitute.org/media/42f4004f-72b8-48cb-b41a-06335ee93cce.svg",
    icon: "https://cdn.centaurinstitute.org/media/42f4004f-72b8-48cb-b41a-06335ee93cce.svg",
    largeIcon:
      "https://cdn.centaurinstitute.org/media/42f4004f-72b8-48cb-b41a-06335ee93cce.svg",
  },
};

export default templateConfig;
