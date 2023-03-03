import axios from "axios";
import React from "react";
import { useMutation } from "react-query";
import { useForm } from "../../lib/useForm";

const setMark = ({ id, mark }: any) => {
  return axios.put(`/api/exam/result/mark/${id}`, mark, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const Pair = ({ pair, refetch }: any) => {
  console.log(pair);

  const { mutate, isLoading } = useMutation(setMark);

  const { inputs, handleChange } = useForm({
    mark: "",
  });

  const handleSubmit = () => {
    mutate(
      { mark: inputs.mark, id: pair.id },
      {
        onSuccess: async (data) => {
          refetch();
        },
        onError: async (err) => {
          console.log(err);
        },
      }
    );
  };

  return (
    <div className="flex justify-between px-3 mt-5">
      <div>
        <h1>
          {" "}
          <span>Question: </span> {pair.question}{" "}
        </h1>
        <h1>
          {" "}
          <span>Answer: </span> {pair.answer}{" "}
        </h1>
      </div>
      <div className="flex flex-col space-y-2">
        {pair.mark ? (
          <p>{pair.mark}</p>
        ) : (
          <>
            <input
              type="number"
              className="px-2 border border-blue-600"
              name="mark"
              value={inputs.mark}
              onChange={handleChange}
            />
            <button
              className="px-5 py-1 text-white bg-red-600 rounded-m"
              onClick={handleSubmit}
            >
              Set Mark
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Pair;
