/* eslint-disable react/jsx-no-target-blank */
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import Layout from "../../../components/UI/Layout";
import Notification from "../../../components/Class/Notification";
import Comments from "../../../components/Class/Comments";
import Quiz from "../../../components/Class/Quiz";
import { useRouter } from "next/router";
import Meterials from "../../../components/Class/Meterials";
import axios from "axios";
import { useQuery } from "react-query";
import Attendance from "../../../components/attendance";
import MetaHead from "../../../components/Head";

const getClassroomData = (classId: any) => {
  return axios.get(`/api/classroom/single/${classId}`);
};
//@ts-ignore
const SingleClassPage = () => {
  const router = useRouter();

  const { classId } = router.query;

  const { data: session, status }: any = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  const { data, isLoading, isError, refetch } = useQuery(
    ["singleClass", classId],
    () => getClassroomData(classId),
    {
      enabled: !!classId,
    }
  );

  const classroom = data?.data?.classroom;

  const isOwnerClass = session?.user?.id === classroom?.teacher.id;

  const totalStudents = classroom?.students?.length;

  if (isLoading) {
    <Layout>
      <section className="max-w-6xl py-10 mx-auto">
        <h1>Loading...</h1>
      </section>
    </Layout>;
  }

  return (
    <>
      <MetaHead title="Elma-class" />
      <Layout>
        <section className="max-w-6xl py-10 mx-auto">
          <div className="flex justify-between bg-gray-700 min-h-[100px] text-white py-5 px-5 rounded-md shadow-sm items-end">
            <div>
              <h1 className="text-xl font-medium"> {classroom?.name} </h1>
              <p>
                <span>Total Students :</span> {totalStudents}{" "}
              </p>
            </div>
            <div>
              <h1>
                <span className="font-bold uppercase">Teacher : </span>{" "}
                {classroom?.teacher.name}
              </h1>
            </div>
          </div>
          <div className="flex justify-between mt-5 bg-gray-700 min-h-[100px] text-white py-5 px-5 rounded-md shadow-sm items-end">
            <div>
              <h1> {classroom?.subject} </h1>
            </div>
            <div>
              <a
                className="px-5 py-2 text-2xl bg-red-600 rounded-sm "
                target="_blank"
                href={`/meet/${classroom?.name}?name=${session?.user?.name}&email=${session?.user?.email}`}
              >
                {isOwnerClass ? "Create Online Class" : "Join Online Class"}
              </a>
            </div>
          </div>
          <div className="mt-5">
            <div className="py-3 border-b">
              <h1 className="text-xl font-medium uppercase">All Classwork</h1>
            </div>
            <div className="flex flex-col mt-10 space-y-5 md:space-x-5 md:space-y-0 md:flex-row">
              <div className="w-full md:w-2/3">
                <Notification
                  notification={classroom?.notification}
                  isOwnerClass={isOwnerClass}
                />
                <Meterials
                  classId={classroom?.id}
                  meterials={classroom?.meterials}
                  isOwnerClass={isOwnerClass}
                />
                <Quiz quizs={classroom?.Quizs} isOwnerClass={isOwnerClass} />
                {isOwnerClass && (
                  <Attendance
                    attendance={classroom?.attendance}
                    classId={classroom?.id}
                  />
                )}
              </div>
              <div className="w-full md:w-1/3">
                <Comments comments={classroom?.comments} refetch={refetch} />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default SingleClassPage;
