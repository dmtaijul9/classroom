import Link from "next/link";
import React from "react";

const Card = ({ item }: any) => {
  const classroom = item.ClassRoom;

  return (
    <div className="classCard">
      <div className="min-h-[120px] border-b">
        <h1 className="mb-2 font-medium">{classroom?.name}</h1>
        <p> {classroom?.subject}</p>
      </div>

      <div className="flex items-center justify-end mt-5 space-x-4">
        <div>
          <Link
            href={`/my-classes/${classroom?.id}`}
            className="px-4 py-1 text-xl text-white bg-green-600 rounded-lg "
          >
            Go to class
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
