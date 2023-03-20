import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Layout from "../../components/UI/Layout";

const attendClassQuery = ({ attendanceId, studentId }) => {
  return axios.get(
    `/api/classroom/attendance/class/${attendanceId}/${studentId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const AttendanceRecieving = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: session, status } = useSession();
  const studentId = session?.user?.id;

  const { data, isLoading } = useQuery(
    ["attendance", studentId],
    () => {
      return attendClassQuery({ attendanceId: id, studentId });
    },
    {
      enabled: !!studentId,
    }
  );

  console.log(data);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, []);
  return (
    <Layout>
      <section className="container m-auto text-center">
        {data?.data.message}
      </section>
    </Layout>
  );
};

export default AttendanceRecieving;
