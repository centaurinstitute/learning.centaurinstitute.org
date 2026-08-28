import ActionButtons from "./src/components/ActionButton/ActionButtons.lazy";
import VideoSearch from "./src/components/Search/VideoSearch.lazy";

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
          compactTitle: "Summer '25",
          icon: "tabler:sun-filled",
          path: "/learning/2025",
        },
        {
          title: "Summer School 2024",
          compactTitle: "Summer '24",
          icon: "tabler:sun-filled",
          path: "/learning/2024",
        },
        {
          title: "Summer School 2023",
          compactTitle: "Summer '23",
          icon: "tabler:sun-filled",
          path: "/learning/2023",
        },
        {
          title: "Summer School 2022",
          compactTitle: "Summer '22",
          icon: "tabler:sun-filled",
          path: "/learning/2022",
        },
        {
          title: "Winter Workshop 2024",
          compactTitle: "Winter '24",
          icon: "tabler:brand-snowflake",
          path: "/learning/ww2024",
        },
        {
          title: "Winter Workshop 2023",
          compactTitle: "Winter '23",
          icon: "tabler:brand-snowflake",
          path: "/learning/ww2023",
        },
        {
          title: "Winter Workshop 2022",
          compactTitle: "Winter '22",
          icon: "tabler:brand-snowflake",
          path: "/learning/ww2022",
        },
        {
          title: "Request Certificate",
          compactTitle: "Certificate",
          icon: "tabler:certificate",
          path: "/request-certificate",
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
