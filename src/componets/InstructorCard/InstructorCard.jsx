import React from "react";

const InstructorCard = ({ i }) => {
  return (
    <div className="bg-white font-semibold text-center rounded-xl border shadow-lg p-10 ">
      <img
        className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
        src={i?.image}
        alt="Profile"
      />
      <h1 className="text-lg text-gray-700 sm:text-xl md:text-2xl">
        {i?.name}
      </h1>
      <h3 className="text-sm text-gray-600 sm:text-base md:text-lg">
        {i?.email}
      </h3>
      <h1 className="text-base text-gray-700 sm:text-lg md:text-xl">
        Number of Classes: {i?.totalClasses}
      </h1>
    </div>
  );
};

export default InstructorCard;
