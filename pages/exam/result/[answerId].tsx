import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/UI/Layout";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";
import MetaHead from "../../../components/Head";
import Pair from "../../../components/answer/Pair";
import { toast } from "react-toastify";

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
  }, [status]);

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
        setResult("");
        refetch();
      },
      onError: (err) => {
        toast.error("Somthing went wrong ");
      },
    });
  };

  return (
    <>
      <MetaHead title="Elma-exam result" />
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
              Result:{" "}
              {answerPaper?.result ? answerPaper?.result : "Under review"}
            </h1>
          </div>
          <div className="flex flex-col space-y-10">
            {answerPaper?.quiestionAnswer?.map((pair: any) => {
              return <Pair key={pair.id} pair={pair} refetch={refetch} />;
            })}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/"
              className="px-5 py-1 text-white bg-red-600 rounded-md"
            >
              Go Back to Class List{" "}
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default AnswerResult;
