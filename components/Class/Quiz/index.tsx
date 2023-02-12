/* eslint-disable react-hooks/rules-of-hooks */
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MdQuiz } from "react-icons/md";
import isEmpty from "../../../utils/is-empty";

const index = ({ quizs, isOwnerClass }: any) => {
  const { data: session, status }: any = useSession();
  const router = useRouter();

  const isQuizEmpty = isEmpty(quizs);

  return (
    <div className="mt-6 border rounded-b-sm shadow-sm">
      <div className="flex items-center justify-between px-3 py-3 text-white bg-gray-700">
        <h1 className="font-semibold">Quiz</h1>
      </div>

      {isQuizEmpty ? (
        <div className="flex items-center justify-center min-h-[230px] flex-col space-y-2">
          <MdQuiz size={35} />
          <p>Empty Quiz</p>
        </div>
      ) : (
        <div className=" min-h-[230px] p-4 space-y-2 overflow-y-auto">
          {quizs?.map((quiz: any) => {
            return (
              <div
                key={quiz.id}
                className="flex flex-row items-center justify-between w-full h-10 px-5 space-x-3 text-white bg-gray-700"
              >
                <div>
                  <h1>Exam name:- {quiz.examName}</h1>
                </div>
                <div>
                  {" "}
                  <Link
                    href={`/exam/${quiz.id}`}
                    className="px-2 py-2 text-white bg-red-600 rounded-md "
                  >
                    {" "}
                    Appair Exam{" "}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {isOwnerClass ? (
        <div className="p-4">
          <Link
            href={`/my-classes/${router.query.classId}/create-quiz`}
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
