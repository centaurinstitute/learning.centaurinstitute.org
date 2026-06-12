import Container from "./src/Container";
import { DashboardLayout } from "@canmingir/link/layouts";
import Home from "./src/pages/home";
import Index from "./src/pages/Index";
import React from "react";
import SS2022 from "./src/pages/ss2022";
import SS2023 from "./src/pages/ss2023";
import SS2024 from "./src/pages/ss2024";
import SS2025 from "./src/pages/ss2025";
import VideoDetail from "./src/components/VideoDetail/VideoDetail";
import WW2022 from "./src/pages/ww2022";
import WW2023 from "./src/pages/ww2023";
import WW2024 from "./src/pages/ww2024";

const routes = [
  {
    container: <Container />,
    childs: [
      {
        layout: <DashboardLayout />,
        pages: [
          {
            path: "/learning",
            element: <Index />,
          },
          {
            path: "/learning/2025",
            element: <SS2025 />,
          },
          {
            path: "/learning/2024",
            element: <SS2024 />,
          },
          {
            path: "/learning/2023",
            element: <SS2023 />,
          },
          {
            path: "/learning/2022",
            element: <SS2022 />,
          },
          {
            path: "/learning/ww2024",
            element: <WW2024 />,
          },
          {
            path: "/learning/ww2023",
            element: <WW2023 />,
          },
          {
            path: "/learning/ww2022",
            element: <WW2022 />,
          },
          {
            path: "/learning/video/:videoId",
            element: <VideoDetail />,
          },
          {
            path: "/",
            element: <Home />,
          },
        ],
      },
    ],
  },
];

export default routes;
