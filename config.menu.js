const menuConfig = {
  topMenu: [],
  sideMenu: [
    {
      subheader: "Centaur Learning",
      items: [
        {
          title: "Live",
          icon: "fluent:live-20-filled",
          path: "/",
        },
        {
          title: "Summer School 2025",
          icon: "ic:outline-dashboard",
          path: "/learning",
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

  fullScreenLayout: "left",
};

export default menuConfig;
