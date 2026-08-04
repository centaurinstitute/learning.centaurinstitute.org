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
      "https://cdn.centaurinstitute.org/media/6f804800-192b-4f0b-8a1f-fc062a7f23f3.png",
    icon: "https://cdn.centaurinstitute.org/media/6f804800-192b-4f0b-8a1f-fc062a7f23f3.png",
    largeIcon:
      "https://cdn.centaurinstitute.org/media/6f804800-192b-4f0b-8a1f-fc062a7f23f3.png",
  },
};

export default templateConfig;
