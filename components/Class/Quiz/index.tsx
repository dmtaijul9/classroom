import React from "react";
import { MdQuiz } from "react-icons/md";

const index = () => {
  return (
    <div className="mt-6 border rounded-b-sm shadow-sm">
      <div className="px-3 py-3 text-white bg-gray-700">
        <h1 className="font-semibold">Quiz</h1>
      </div>
      <div className="flex items-center justify-center min-h-[230px] flex-col space-y-2">
        <MdQuiz size={35} />
        <p>Empty Quiz</p>
      </div>
    </div>
  );
};

export default index;
