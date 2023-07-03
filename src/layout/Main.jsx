import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../pages/shared/Header";

import Footer from "../pages/shared/Footer";

const Main = () => {
  return (
    <div className="">
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default Main;
