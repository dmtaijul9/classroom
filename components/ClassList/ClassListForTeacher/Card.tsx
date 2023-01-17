import Link from "next/link";
import React from "react";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";

const Card = ({ item }: any) => {
  const copyJoinCode = () => {
    navigator.clipboard.writeText(item.joinCode);
    toast.success("Class Join Code Copied!");
  };

  return (
    <div className="p-5 border rounded-md shadow-sm">
      <div className="min-h-[120px] border-b">
        <h1 className="mb-2 font-medium">{item.name}</h1>
        <p> {item.subject}</p>
      </div>

      <div className="flex items-center justify-end mt-5 space-x-4">
        <div>
          <button onClick={copyJoinCode}>
            <FaCopy />
          </button>
        </div>
        <div>
          <Link
            href={`/dashboard/my-class/${item.id}`}
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
