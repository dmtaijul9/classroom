import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { MdQuiz } from "react-icons/md";

const index = () => {
  const { data: session, status } = useSession();

  return (
    <div className="mt-6 border rounded-b-sm shadow-sm">
      <div className="flex items-center justify-between px-3 py-3 text-white bg-gray-700">
        <h1 className="font-semibold">Quiz</h1>
        <Link href="/" className="px-3 py-1 bg-red-600 rounded-md ">
          See All
        </Link>
      </div>

      <div className="flex items-center justify-center min-h-[230px] flex-col space-y-2">
        <MdQuiz size={35} />
        <p>Empty Quiz</p>
      </div>
      {session?.user?.role === "TEACHER" ? (
        <div className="p-4">
          <Link
            href="/create-quiz"
            className="px-3 py-1 text-white bg-red-600 rounded-md"
          >
            Create new quize
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default index;
