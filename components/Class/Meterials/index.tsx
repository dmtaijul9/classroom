/* eslint-disable react-hooks/rules-of-hooks */
import { useSession } from "next-auth/react";
import React from "react";
import { AiFillFileImage } from "react-icons/ai";
import { useForm } from "../../../lib/useForm";

const index = () => {
  const { data: session, status } = useSession();
  const userType = session?.user?.role;
  const { inputs, handleChange } = useForm({
    fileName: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };
  return (
    <div className="mt-6 border rounded-b-sm shadow-sm">
      <div className="px-3 py-3 text-white bg-gray-700">
        <h1 className="font-semibold">Meterials</h1>
      </div>
      <div className="flex items-center justify-center min-h-[230px] flex-col space-y-2">
        <AiFillFileImage size={35} />
        <p>Empty Meterials</p>
      </div>
      {userType && (
        <form
          className="flex flex-col w-full p-4 space-y-4 border-t"
          onSubmit={handleSubmit}
        >
          <label htmlFor="fileName">
            <input
              type="text"
              name="fileName"
              placeholder="File Name"
              className="w-full px-3 py-1 border rounded-sm"
              value={inputs.fileName}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="meterials">
            <input type="file" name="meterial" onChange={handleChange} />
          </label>
          <button
            className="py-1 text-white bg-red-600 rounded-md"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default index;
