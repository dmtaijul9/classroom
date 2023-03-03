import React from "react";
import Card from "./Card";

const ClassListForTeacher = ({ classroom }: any) => {
  return (
    <>
      <div className="py-3 border-b">
        <h1 className="text-xl font-semibold">Created Class List</h1>
      </div>
      <div className="allClassRoomGrid">
        {classroom?.map((item: any) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default ClassListForTeacher;
