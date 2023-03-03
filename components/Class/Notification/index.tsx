/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";

import { AiFillNotification } from "react-icons/ai";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import { dateParsing } from "../../../lib/Tools";
import Link from "next/link";

const Editor = dynamic(() => import("../../Editor"), { ssr: false });

const index = ({ notification, isOwnerClass }: any) => {
  const router = useRouter();
  const { classId } = router.query;
  const [newNotification, setNewNotification] = useState("");
  const [message, setMessage] = useState(notification);

  useEffect(() => {
    if (notification) {
      setMessage(notification);
    }
  }, [notification]);

  const notificationUpdateHandler = async () => {
    if (
      newNotification.trim() === "" ||
      newNotification.trim() === "<p><br></p>"
    ) {
      return toast.error("Notication can not be empty!");
    }

    const variables = {
      notification: newNotification,
    };

    try {
      await axios({
        method: "POST",
        url: `/api/classroom/notification/${classId}`,
        data: variables,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Notification Updated!");
    } catch (error) {
      return toast.error("Something is wrong!");
    }
  };

  return (
    <div className="border rounded-b-sm shadow-sm">
      <div className="px-3 py-3 text-white bg-gray-700">
        <h1 className="text-xl font-semibold">Notification</h1>
      </div>
      {message ? (
        <ul className="flex flex-col p-4 space-y-3">
          {notification.map((notice: any) => {
            return (
              <li
                key={notice.id}
                className="flex items-center justify-between p-2 text-white bg-gray-800"
              >
                <p>{dateParsing(notice.createdAt)}</p>
                <Link
                  href={`/notice/${notice.id}`}
                  className="px-4 py-1 bg-red-600 rounded-md"
                >
                  See notice
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex items-center justify-center min-h-[230px] flex-col space-y-2">
          <AiFillNotification size={35} />
          <p>Empty Notificaion</p>
        </div>
      )}

      {isOwnerClass && (
        <div className="p-4">
          <Editor onChange={setNewNotification} />
          <button
            className="w-full py-1 mt-5 text-white bg-red-600 rounded-md"
            onClick={notificationUpdateHandler}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default index;
