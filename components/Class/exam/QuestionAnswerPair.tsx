import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAnswer } from "../../../redux/resolvers/answerSlice";

const QuestionAnswerPair = ({ question }: any) => {
  const [isSubmited, setIsSubmited] = useState(false);
  const [textAnswer, setTextAnswer] = useState("");
  const [radioAnswer, setRadioAnswer] = useState("");
  const dispatch = useDispatch();

  const saveToLocalState = () => {
    const variable = {
      question: question?.question,
      answer: textAnswer || radioAnswer,
    };
    console.log(variable);
    dispatch(addAnswer(variable));
    if (variable.answer) {
      setIsSubmited(true);
    }
  };
  return (
    <div>
      <div>
        <h1>
          <span className="font-bold">Q: </span>
          {question.question}
        </h1>
      </div>
      {isSubmited ? (
        <div className="mt-2">
          <h1>
            {" "}
            <span className="font-bold">Ans:</span> {textAnswer || radioAnswer}{" "}
          </h1>
        </div>
      ) : question.answerType === "textArea" ? (
        <div>
          <textarea
            className="w-full mt-5 border"
            rows={5}
            value={textAnswer}
            onChange={(e) => {
              setTextAnswer(e.target.value);
            }}
          />
        </div>
      ) : (
        <div
          className="grid grid-cols-2 gap-3 mt-4"
          onChange={(e) => {
            setRadioAnswer(e.target.value);
          }}
        >
          <label>
            {" "}
            <input
              type="radio"
              value={question.a}
              name={question.question}
            />{" "}
            {question.a}
          </label>
          <label>
            {" "}
            <input
              type="radio"
              value={question.b}
              name={question.question}
            />{" "}
            {question.b}
          </label>
          <label>
            {" "}
            <input
              type="radio"
              value={question.c}
              name={question.question}
            />{" "}
            {question.c}
          </label>
          <label>
            {" "}
            <input
              type="radio"
              value={question.d}
              name={question.question}
            />{" "}
            {question.d}
          </label>
        </div>
      )}

      {!isSubmited && (
        <div className="mt-5">
          <button
            className="px-5 py-1 text-white bg-red-600 rounded-sm"
            onClick={saveToLocalState}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionAnswerPair;
