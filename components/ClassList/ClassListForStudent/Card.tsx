import Link from "next/link";
import React from "react";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";

const Card = ({ item }: any) => {
  const classroom = item.ClassRoom;

  const copyJoinCode = () => {
    navigator.clipboard.writeText(classroom.joinCode);
    toast.success("Class Join Code Copied!");
  };

  return (
    <div className="p-5 border rounded-md shadow-sm">
      <div className="min-h-[120px] border-b">
        <h1 className="mb-2 font-medium">{classroom.name}</h1>
        <p> {classroom.subject}</p>
      </div>

      <div className="flex items-center justify-end mt-5 space-x-4">
        <div>
          <Link
            href={`/my-classes/${classroom.id}`}
            className="px-3 py-1 text-white bg-red-600 rounded-sm "
          >
            Go to classroom
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
