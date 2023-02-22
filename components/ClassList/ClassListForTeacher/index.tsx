import React from "react";
import Card from "./Card";

const ClassListForTeacher = ({ classroom }: any) => {
  return (
    <>
      <div className="py-3 border-b">
        <h1 className="text-xl font-semibold">Created Class List</h1>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-10">
        {classroom?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default ClassListForTeacher;
