import React from "react";
import useClasses from "../hooks/useClasses";
import ClassCard from "../componets/classCard/ClassCard";
import SectionTitle from "../componets/Title/SectionTirle";
import useTitle from "../hooks/useTitle";

const Classes = () => {
  useTitle("Classes");
  const [classes] = useClasses();
  const approvedClasses = classes.filter((c) => c.status === "approved");

  return (
    <div className=" container my-20 mx-auto">
      <SectionTitle heading="All classes"></SectionTitle>
      <div className="mx-auto grid   grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {approvedClasses.map((c) => (
          <ClassCard key={c._id} c={c}></ClassCard>
        ))}
      </div>
    </div>
  );
};

export default Classes;
