import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import QuestionAnswerPair from "../../components/Class/exam/QuestionAnswerPair";
import MetaHead from "../../components/Head";
import Layout from "../../components/UI/Layout";

const submitAnswer = (answerData: any) => {
  return axios.post(`/api/exam`, answerData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const fetchQuestion = (examId: any) => {
  return axios.get(`/api/exam/${examId}`);
};

const ExamPage = () => {
  const router = useRouter();
  const questionAnswer = useSelector(
    (state: any) => state.questionAsnwer.questionAnswerPair
  );

  const { examId } = router.query;
  const { data: session, status } = useSession();

  const { data, isLoading, error } = useQuery(
    ["exam", examId],
    () => fetchQuestion(examId),
    {
      enabled: !!examId,
    }
  );

  const { mutate } = useMutation(submitAnswer);

  const exam = data?.data.exam;

  const isAppaired = exam?.answer?.find(
    (item) => item.userId === session?.user.id
  );

  const isTeacher = exam?.ClassRoom?.userId === session?.user?.id;

  const finishAnswerControler = () => {
    const variables = {
      userId: session?.user?.id,
      quizId: examId,
      questionAnswer: [...questionAnswer],
    };

    mutate(variables, {
      onSuccess: (data) => {
        toast.success("Success");

        router.push("/exam/result/" + data.data.answer.id);
      },
      onError(error) {
        toast.error("Failed");
      },
    });
  };

  if (!isAppaired && data?.data.message === "Time has been Expired!") {
    return (
      <>
        <Layout>
          <div className="container py-10 mx-auto">
            <div className="w-full p-5 text-xl text-center text-white bg-purple-800 rounded-lg">
              <h1>Time has been Expired!</h1>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      {" "}
      <MetaHead title="elma-exam" />
      <Layout>
        {isLoading ? (
          <div className="container mx-auto">Loading...</div>
        ) : !isTeacher ? (
          <section className="container m-auto">
            <div>
              <div className="flex justify-between w-full px-4 py-5 text-center text-white bg-gray-900 rounded-sm">
                <h1>
                  <span className="font-bold">Exam Name:</span> {exam?.examName}
                </h1>
                <button
                  className="px-4 py-1 bg-red-500"
                  onClick={() => {
                    if (isAppaired) {
                      router.push("/exam/result/" + isAppaired.id);
                    }
                  }}
                >
                  {!isAppaired ? "You can't see Result now" : "See Result"}
                </button>
              </div>
              {isAppaired ? (
                <div className="mt-5 text-center">
                  <h1>You are already appaired in this exam. Thank you</h1>
                </div>
              ) : (
                <div className="flex flex-col mt-5 space-y-7">
                  {exam?.questions?.map((question: any) => {
                    return (
                      <QuestionAnswerPair
                        key={question.id}
                        question={question}
                      />
                    );
                  })}
                </div>
              )}
            </div>
            {!isAppaired && (
              <div className="mt-20 text-center">
                <button
                  className="px-4 py-1 text-white bg-red-500"
                  onClick={finishAnswerControler}
                >
                  Finish Answer
                </button>
              </div>
            )}
          </section>
        ) : (
          <section className="container mx-auto">
            <div className="pb-2 font-bold border-b">List Of Answers</div>
            <div>
              {exam?.answer?.map((answer: any) => {
                return (
                  <div
                    key={answer.id}
                    className="flex justify-between px-3 py-2 mt-4 text-white bg-gray-800"
                  >
                    <h1>
                      <span>Student Name: </span>
                      {answer.student.name}
                    </h1>
                    <Link
                      href={`/exam/result/${answer.id}`}
                      className="px-4 py-1 text-white bg-red-500 rounded"
                    >
                      See Answer
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </Layout>
    </>
  );
};

export default ExamPage;
