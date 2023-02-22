/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import Layout from "../../../components/UI/Layout";

const getAttendance = ({ attendanceId }) => {
  return axios.get(`/api/classroom/attendance/sheet/${attendanceId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const closeAttendance = ({ attendanceId }) => {
  return axios.post(
    `/api/classroom/attendance/sheet/${attendanceId}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const attendanceId = () => {
  const router = useRouter();
  const { attendanceId } = router.query;

  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, []);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["sheet", attendanceId],
    queryFn: () => getAttendance({ attendanceId }),
    enabled: !!attendanceId,
  });

  const { mutate } = useMutation(closeAttendance);

  const closeButtonHandler = () => {
    mutate(
      { attendanceId },
      {
        async onSuccess(data, variables, context) {
          refetch();
        },
        async onError(error, variables, context) {
          console.log(error);
        },
      }
    );
  };

  if (isLoading) {
    <Layout>
      <section className="container mx-auto">Loading...</section>
    </Layout>;
  }

  return (
    <Layout>
      <section className="container mx-auto">
        <div className="flex items-center justify-between px-5 py-2 text-white bg-gray-900 rounded-sm">
          <h1>Attendance List</h1>
          {data?.data.sheet.isAllow ? (
            <button
              className="px-5 py-1 text-white bg-red-600 rounded-md"
              onClick={closeButtonHandler}
            >
              Close Attendance
            </button>
          ) : (
            "Class Closed"
          )}
        </div>
        <div className="p-5">
          {data?.data.sheet.students?.map((student: any) => {
            return (
              <div key={student.id}>
                <h1>
                  {student.User.name} --- ({student.User.email})
                </h1>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default attendanceId;
