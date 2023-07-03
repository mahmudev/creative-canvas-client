import React from "react";
import useGetInstructor from "../hooks/useGetInstructor";
import InstructorCard from "../componets/InstructorCard/instructorCard";
import SectionTitle from "../componets/Title/SectionTirle";
import useTitle from "../hooks/useTitle";

const Instructors = () => {
  useTitle("Instructors");
  const [instructor] = useGetInstructor();

  return (
    <div className=" min-h-screen container my-20 mx-auto">
      <SectionTitle heading="All Instructors"></SectionTitle>
      <div className="mx-auto grid   grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {instructor.slice(0, 6).map((i) => (
          <InstructorCard key={i._id} i={i}></InstructorCard>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
