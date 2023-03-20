import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const createAttendence = (topic: any) => {
  return axios.post("/api/classroom/attendance/" + topic.classId, topic, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const Attendance = ({ attendance, classId, isOwnerClass }: any) => {
  const [classTopic, setClassTopic] = useState("");
  const router = useRouter();

  const { mutate } = useMutation(createAttendence);

  const createAttendanceHandler = () => {
    if (classTopic.trim() === "") {
      return console.log("something is wrong");
    }
    const variables = {
      text: classTopic,
      classId,
    };

    mutate(variables, {
      onSuccess: (data) => {
        toast.success("Success");
        window.location.reload();
      },
      onError: (err) => {
        toast.error("Something went wrong!");
      },
    });
  };

  const createLink = (item: any) => {
    return `http://localhost:3000/attendance/${item.id}`;
  };

  return (
    <div className="mt-6 border rounded-b-sm shadow-sm">
      <div className="flex items-center justify-between px-3 py-3 text-white bg-gray-700">
        <h1 className="text-xl font-semibold">Attendance</h1>
      </div>

      <div className="flex flex-col justify-between">
        <div className="min-h-[100px] p-4">
          {attendance?.map((item: any) => {
            return (
              <div
                onClick={() => {
                  if (isOwnerClass) {
                    router.push(`/my-classes/attendance/${item.id}`);
                  }
                }}
                key={item.id}
                className="flex items-center justify-between p-2 mt-3 text-white bg-gray-700 rounded-sm"
              >
                <h1> {item.topicName} </h1>
                <button
                  className="z-10 px-3 py-1 bg-red-600 rounded-md"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigator.clipboard.writeText(createLink(item));
                    toast.success("Copied successfylly!");
                  }}
                >
                  Copy Link
                </button>
              </div>
            );
          })}
        </div>
        {isOwnerClass && (
          <div className=" min-h-[230px] p-4 space-y-2 overflow-y-auto">
            <label htmlFor="classTopic">
              Topic:
              <input
                type="text"
                value={classTopic}
                className="w-full py-2 border "
                placeholder="Type Class Topic"
                onChange={(e: any) => setClassTopic(e.target.value)}
              />
            </label>
            <button
              className="px-5 py-2 text-center text-white bg-red-600 rounded-md"
              onClick={createAttendanceHandler}
            >
              Create Attendance
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
