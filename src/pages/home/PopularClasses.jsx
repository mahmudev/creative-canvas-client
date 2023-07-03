import React from "react";
import SectionTitle from "../../componets/Title/SectionTirle";
import useClasses from "../../hooks/useClasses";
import ClassCard from "../../componets/classCard/ClassCard";

const PopularClasses = () => {
  const [classes] = useClasses();
  const approvedClasses = classes.filter((c) => c.status === "approved");

  return (
    <div className=" container  mx-auto">
      <SectionTitle heading="Popular Classes"></SectionTitle>
      <div className="mx-auto grid  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {approvedClasses.slice(0, 8).map((c) => (
          <ClassCard key={c._id} c={c}></ClassCard>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
