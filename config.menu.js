import React, { Suspense } from "react";

const LazyActionButtons = React.lazy(
  () => import("./src/components/ActionButton/ActionButtons"),
);
const LazyVideoSearch = React.lazy(
  () => import("./src/components/Search/VideoSearch"),
);

const ActionButtons = (props) => (
  <Suspense fallback={null}>
    <LazyActionButtons {...props} />
  </Suspense>
);

const VideoSearch = (props) => (
  <Suspense fallback={null}>
    <LazyVideoSearch {...props} />
  </Suspense>
);

const menuConfig = {
  topMenu: [],
  sideMenu: [
    {
      subheader: "Events",
      items: [
        {
          title: "Home",
          icon: "tabler:home",
          path: "/",
        },
        {
          title: "Summer School 2025",
          icon: "tabler:sun-filled",
          path: "/learning/2025",
        },
        {
          title: "Summer School 2024",
          icon: "tabler:sun-filled",
          path: "/learning/2024",
        },
        {
          title: "Summer School 2023",
          icon: "tabler:sun-filled",
          path: "/learning/2023",
        },
        {
          title: "Summer School 2022",
          icon: "tabler:sun-filled",
          path: "/learning/2022",
        },
        {
          title: "Winter Workshop 2024",
          icon: "tabler:brand-snowflake",
          path: "/learning/ww2024",
        },
        {
          title: "Winter Workshop 2023",
          icon: "tabler:brand-snowflake",
          path: "/learning/ww2023",
        },
        {
          title: "Winter Workshop 2022",
          icon: "tabler:brand-snowflake",
          path: "/learning/ww2022",
        },
      ],
    },
  ],
  options: [
    {
      label: "Home",
      linkTo: "/",
    },
    {
      label: "Profile",
      linkTo: "/",
    },
    {
      label: "Settings",
      linkTo: "/",
    },
  ],

  actionButtons: [ActionButtons],
  topBar: VideoSearch,
  fullScreenLayout: "left",
};

export default menuConfig;
