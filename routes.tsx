import Container from "./src/Container";
import { DashboardLayout } from "@canmingir/link/layouts";
import Index from "./src/pages/Index";
import Live from "./src/pages/live";
import React from "react";
import VideoDetail from "./src/components/VideoDetail/VideoDetail";

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
            path: "/learning/video/:videoId",
            element: <VideoDetail />,
          },
          {
            path: "/",
            element: <Live />,
          },
        ],
      },
    ],
  },
];

export default routes;
