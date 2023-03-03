import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import ClassListForStudent from "../../components/ClassList/ClassListForStudent";
import ClassListForTeacher from "../../components/ClassList/ClassListForTeacher";
import MetaHead from "../../components/Head";
import Layout from "../../components/UI/Layout";

const getClassroomList = (userId) => {
  return axios.get("/api/classroomlist", {
    params: {
      userId,
    },
  });
};

const MyClassListPage = ({ classroom }: any) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const userId = session?.user?.id;

  const isTeacher = session?.user?.role === "TEACHER";
  const isStudent = session?.user?.role === "STUDENT";

  useEffect(() => {
    if (status === "authenticated") {
      if (!isTeacher && !isStudent) {
        router.push("/");
      }
    }
    if (status === "unauthenticated") {
      router.push("/");
    }
  });

  const { data, isLoading, isError } = useQuery(
    ["ClassList", userId],
    () => getClassroomList(userId),
    {
      enabled: !!userId,
    }
  );

  if (isLoading) {
    return (
      <Layout>
        <section className="container mx-auto">
          <h1>Loading...</h1>
        </section>
      </Layout>
    );
  }

  return (
    <>
      <MetaHead title="Elma-All classess" />
      <Layout>
        <section className="container mx-auto">
          {isTeacher ? (
            <>
              <ClassListForTeacher classroom={data?.data?.createdClass} />
              <div className="mt-10">
                <ClassListForStudent classroom={data?.data?.classroom} />
              </div>
            </>
          ) : (
            <ClassListForStudent classroom={data?.data?.classroom} />
          )}
        </section>
      </Layout>
    </>
  );
};

export default MyClassListPage;
