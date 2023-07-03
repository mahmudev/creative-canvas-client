import React from "react";
import Carousel from "./Carousel/Carousel";
import PopularClasses from "./PopularClasses";
import PopularInstructor from "./PopularInstructor";
import Blogs from "./Blogs/Blogs";
import { Fade } from "react-awesome-reveal";
import useTitle from "../../hooks/useTitle";

const Home = () => {
  useTitle("Home");
  return (
    <div className=" min-h-screen">
      <Carousel></Carousel>
      <Fade cascade damping={1e-1}>
        <PopularClasses></PopularClasses>
      </Fade>
      <Fade cascade damping={1e-1}>
        <PopularInstructor></PopularInstructor>
      </Fade>
      <Fade cascade damping={1e-1}>
        <Blogs></Blogs>
      </Fade>
    </div>
  );
};

export default Home;
