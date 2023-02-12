import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/UI/Layout";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";

const updateResult = (value: any) => {
  return axios.put(`/api/exam/result/${value.answerId}`, value, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const fetchQuestion = (answerId: any) => {
  return axios.get(`/api/exam/result/${answerId}`);
};

const AnswerResult = () => {
  const router = useRouter();
  const { answerId } = router.query;
  const [result, setResult] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, []);

  const { data, isLoading, error, refetch } = useQuery(
    ["answerPaper", answerId],
    () => {
      return fetchQuestion(answerId);
    },
    {
      enabled: !!answerId,
    }
  );

  const answerPaper = data?.data?.answerPaper;

  const isTeacher = session?.user?.id === answerPaper?.Quiz?.ClassRoom?.userId;

  const { mutate } = useMutation(updateResult);

  const saveResult = () => {
    const variables = {
      answerId,
      result,
    };
    mutate(variables, {
      onSuccess: (data) => {
        console.log(data);
        setResult("");
        refetch();
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <Layout>
      <section className="container mx-auto">
        <div className="flex justify-between px-3 py-3 text-white bg-gray-800 rounded-md">
          <h1>Name: {answerPaper?.student?.name}</h1>
          {isTeacher && (
            <div>
              <input
                type="text"
                placeholder="Set Result"
                className="px-4 text-gray-900"
                value={result}
                onChange={(e) => {
                  console.log(e.target.value);

                  setResult(e.target.value);
                }}
              />
              <button
                className="px-5 ml-3 bg-red-600 rounded"
                onClick={saveResult}
              >
                Set Result
              </button>
            </div>
          )}
          <h1>
            Result: {answerPaper?.result ? answerPaper?.result : "Under review"}
          </h1>
        </div>
        <div>
          {answerPaper?.quiestionAnswer?.map((pair: any) => {
            return (
              <div key={pair.id} className="px-3 mt-5">
                <h1>
                  {" "}
                  <span>Question: </span> {pair.question}{" "}
                </h1>
                <h1>
                  {" "}
                  <span>Answer: </span> {pair.answer}{" "}
                </h1>
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link href="/" className="px-5 py-1 text-white bg-red-600 rounded-md">
            Go Back to Class List{" "}
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default AnswerResult;
