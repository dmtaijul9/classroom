/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { AiFillFileImage } from "react-icons/ai";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useForm } from "../../../lib/useForm";
import isEmpty from "../../../utils/is-empty";

const createMeterial = (formData: any) => {
  return axios.post("/api/classroom/meterials", formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};

const index = ({
  classId,
  meterials,
  isOwnerClass,
}: {
  classId: string;
  meterials: any;
  isOwnerClass: boolean;
}) => {
  const { data: session, status }: any = useSession();
  const { inputs, handleChange, clearForm } = useForm({
    fileName: "",
  });

  const isEmptyField = isEmpty(meterials);

  const { mutate } = useMutation(createMeterial);
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fileName", inputs.fileName);
    formData.append("classId", classId);
    formData.append("meterial", inputs.meterial);

    mutate(formData, {
      onSuccess: (data) => {
        toast.success("Successfully created meterials");

        clearForm();
      },
      onError: (err) => {
        toast.error("Something went wrong!");
      },
    });
  };

  return (
    <div className="mt-6 border rounded-b-sm shadow-sm">
      <div className="flex items-center justify-between px-3 py-3 text-white bg-gray-700">
        <h1 className="text-xl font-semibold">Meterials</h1>
      </div>
      {isEmptyField ? (
        <div className="flex items-center justify-center min-h-[230px] flex-col space-y-2">
          <AiFillFileImage size={35} />
          <p>Empty Meterials</p>
        </div>
      ) : (
        <div className="grid gap-5 p-5 overflow-y-auto md:grid-cols-2">
          {meterials?.map((meterial: any) => {
            return (
              <div
                key={meterial.id}
                className="px-5 py-2 text-white underline bg-gray-900 rounded-md"
              >
                <a href={`http://localhost:3000${meterial.filePath}`} download>
                  <h1>
                    {meterial.fileName} - {meterial.fileType}{" "}
                  </h1>{" "}
                </a>
              </div>
            );
          })}
        </div>
      )}
      {isOwnerClass && (
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
