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
    <div className="classCard">
      <div className="min-h-[120px] border-b text-xl">
        <h1 className="mb-2 font-medium">{item.name}</h1>
        <p> {item.subject}</p>
      </div>

      <div className="flex items-center justify-end mt-5 space-x-4">
        <div>
          <button onClick={copyJoinCode} className="text-lg">
            <FaCopy />
          </button>
        </div>
        <div>
          <Link
            href={`/my-classes/${item.id}`}
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
