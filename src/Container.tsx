import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

function Container() {
  return (
    <>
      <Helmet defaultTitle="Centaur Learning" />
      <Outlet />
    </>
  );
}

export default Container;
