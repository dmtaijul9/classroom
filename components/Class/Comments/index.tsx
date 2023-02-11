/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { FaCommentAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useForm } from "../../../lib/useForm";

const index = ({ comments, refetch }: any) => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const { classId } = router.query;
  console.log(classId);

  const { inputs, handleChange, clearForm } = useForm({
    comment: "",
  });

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const { comment } = inputs;
    if (comment.trim() === "") {
      return toast.error("Comment should not be Empty.!");
    }
    const variables = {
      name: session?.user?.name,
      message: comment,
    };

    try {
      const res = await axios({
        method: "POST",
        url: `/api/classroom/comments/${classId}`,
        data: variables,
        headers: {
          "Content-Type": "application/json",
        },
      });
      refetch();
      clearForm();
    } catch (error) {
      return toast.error("Something is wrong!");
    }
  };

  const hasComments = comments?.length > 0;
  return (
    <div className="border rounded-b-sm shadow-sm ">
      <div className="px-3 py-3 text-white bg-gray-700">
        <h1 className="font-semibold">Comments</h1>
      </div>
      {hasComments ? (
        <div className=" p-4 min-h-[230px] max-h-[600px] flex-col space-y-2 overflow-y-auto">
          <div className="flex flex-col space-y-3 ">
            {comments.map((comment: any) => {
              return (
                <div key={comment?.id} className="pb-3 border-b">
                  <p>
                    <span className="font-medium"> {comment?.name} :</span>{" "}
                    {comment?.message}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[230px] flex-col space-y-2">
          <FaCommentAlt size={35} />
          <p>Empty Comment</p>
        </div>
      )}

      <form
        className="flex flex-col items-end w-full p-2 "
        onSubmit={handleCommentSubmit}
      >
        <div className="w-full ">
          <textarea
            className="w-full p-3 border"
            placeholder="Type Your Comment"
            name="comment"
            value={inputs.comment}
            onChange={handleChange}
          />
        </div>
        <button
          className="w-full py-1 text-white bg-red-600 rounded-md"
          type="submit"
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default index;
