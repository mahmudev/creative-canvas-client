import React from "react";
import { Link, useRouteError } from "react-router-dom";
import Lottie from "lottie-react";
import errorpage from "../../src/assets/errorpage.json";
import useTitle from "../../src/hooks/useTitle";

const ErrorPage = () => {
  useTitle("Error-page");
  const { error } = useRouteError();
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <Lottie className="h-1/2" animationData={errorpage} loop={true} />
        <p className="text-2xl font-semibold md:text-3xl text-red-800 mb-6">
          {error?.message}
        </p>
        <Link to="/" className="btn btn-primary">
          Back to homepage
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
