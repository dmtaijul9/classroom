import { useRouter } from "next/router";
import React, { useRef } from "react";
import Layout from "../../../../components/UI/Layout";
import { useForm } from "../../../../lib/useForm";
import { useSelector, useDispatch } from "react-redux";
import {
  examNameAdded,
  quizAdded,
} from "../../../../redux/resolvers/quizeSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { useMutation } from "react-query";

const saveQuestionAxios = (exam: any) => {
  return axios.post("/api/create-quiz", exam, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const CreateQuizPage = () => {
  const router = useRouter();
  const { classId } = router.query;

  const quizName = useRef<any>();
  const dispatch = useDispatch();
  const quiz = useSelector((state: any) => state.quiz);
  console.log(quiz);

  const saveQuestionAxios = (exam: any) => {
    return axios.post(`/api/classroom/single/${classId}/create-quiz`, exam, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const { mutate } = useMutation(saveQuestionAxios);

  const { handleChange, inputs, clearForm } = useForm({
    question: "",
    a: "",
    answerType: "objective",
    b: "",
    c: "",
    d: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(examNameAdded(quizName.current.value));
  };

  const addQuestion = (e: any) => {
    e.preventDefault();
    const { question, answerType, a, b, c, d } = inputs;
    if (!question || !answerType) {
      return toast.error("Input Type is incorrent!");
    }

    const variables: {
      classId: string;
      question: string;
      answerType: string;
      a?: string;
      b?: string;
      c?: string;
      d?: string;
    } = {};

    variables.question = question;
    variables.answerType = answerType;

    if (variables.answerType === "objective") {
      if (!a || !b || !c || !d) {
        return toast.error("Input Type is incorrent!");
      }
      (variables.a = a),
        (variables.b = b),
        (variables.c = c),
        (variables.d = d);
    }

    dispatch(quizAdded(variables));
    clearForm();
  };

  const saveQuestion = () => {
    mutate(quiz, {
      onSuccess: (value) => {
        console.log(value);
        clearForm();
        router.push("/my-classes");
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  if (!quiz.examName) {
    return (
      <Layout>
        <div className="flex flex-col min-h-[80vh] bg-grey-lighter">
          <div className="container flex flex-col items-center justify-center flex-1 max-w-lg px-2 mx-auto">
            <form
              className="w-full px-6 py-8 text-black bg-gray-200 rounded shadow-md"
              onSubmit={handleSubmit}
            >
              <h1 className="mb-8 text-3xl text-center">Set a Quiz name</h1>

              <input
                type="text"
                className="block w-full p-3 mb-4 border rounded border-grey-light"
                name="quizName"
                required
                ref={quizName}
                placeholder="Quiz Name"
              />

              <button
                type="submit"
                className="w-full py-3 my-1 text-center text-white bg-purple-600 rounded bg-green hover:bg-green-dark focus:outline-none"
              >
                Set
              </button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex container m-auto my-5 flex-col justify-between items-center min-h-[80vh] bg-grey-lighter border">
        <div className="w-full p-10">
          <div className="flex justify-between w-full px-4 py-5 text-center text-white bg-gray-900 rounded-sm">
            <h1>
              <span className="font-bold">Exam Name:</span> {quiz.examName}
            </h1>
            <button className="px-4 py-1 bg-red-500" onClick={saveQuestion}>
              Save
            </button>
          </div>
          <div className="flex flex-col mt-5 space-y-7">
            {quiz.questions.map((quiz: any) => {
              return (
                <div key={quiz.question}>
                  <div>
                    <h1>
                      <span className="font-bold">Q: </span>
                      {quiz.question}
                    </h1>
                  </div>
                  {quiz.answerType === "textArea" ? (
                    <div>
                      <textarea className="w-full mt-5 border" rows={5} />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div>a: {quiz.a}</div>
                      <div>b: {quiz.b}</div>
                      <div>c: {quiz.c}</div>
                      <div>d: {quiz.d}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full p-10">
          <div className="w-full py-5 rounded-sm">
            <form onSubmit={addQuestion}>
              <label htmlFor="question" className="flex items-center">
                Q:{" "}
                <input
                  type="text"
                  name="question"
                  value={inputs.question}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border"
                  placeholder="Type Your Question"
                />
              </label>
              <label
                htmlFor="question"
                onChange={handleChange}
                defaultValue={inputs.answerType}
                className="flex items-center mt-3"
              >
                Answer Type:{" "}
                <select
                  name="answerType"
                  defaultValue="objective"
                  className="w-full px-2 py-1 border"
                >
                  <option value="objective">Multiple Choice Question.</option>
                  <option value="textArea">Text</option>
                </select>
              </label>

              {inputs.answerType === "objective" && (
                <div className="grid grid-cols-2 gap-5 mt-2">
                  <label htmlFor="a" className="flex items-center mt-2">
                    A:{" "}
                    <input
                      type="text"
                      name="a"
                      value={inputs.a}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border"
                      placeholder="Type Your Question"
                    />
                  </label>
                  <label htmlFor="b" className="flex items-center mt-2">
                    B:{" "}
                    <input
                      type="text"
                      name="b"
                      value={inputs.b}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border"
                      placeholder="Type Your Question"
                    />
                  </label>
                  <label htmlFor="c" className="flex items-center mt-2">
                    C:{" "}
                    <input
                      type="text"
                      name="c"
                      value={inputs.c}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border"
                      placeholder="Type Your Question"
                    />
                  </label>
                  <label htmlFor="d" className="flex items-center mt-2">
                    D:{" "}
                    <input
                      type="text"
                      name="d"
                      value={inputs.d}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border"
                      placeholder="Type Your Question"
                    />
                  </label>
                </div>
              )}
              <button
                type="submit"
                className="px-5 py-1 mt-5 text-white bg-red-600 rounded-md"
              >
                Add Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateQuizPage;
