import { useSession } from "next-auth/react";
import React from "react";
import Layout from "../../components/UI/Layout";
import prisma from "../../lib/prisma";
import Notification from "../../components/Class/Notification";
import Comments from "../../components/Class/Comments";
import Quiz from "../../components/Class/Quiz";
import { useRouter } from "next/router";
import Meterials from "../../components/Class/Meterials";
import axios from "axios";
import { useQuery } from "react-query";

const getClassroomData = (classId) => {
  return axios.get(`/api/classroom/single/${classId}`);
};
//@ts-ignore
const SingleClassPage = () => {
  const router = useRouter();

  const { classId } = router.query;

  const { data: session, status } = useSession();

  const { data, isLoading, isError, refetch } = useQuery(
    ["singleClass", classId],
    () => getClassroomData(classId),
    {
      enabled: !!classId,
    }
  );

  const classroom = data?.data?.classroom;

  const isOwnerClass = session?.user.id === classroom?.teacher.id;

  const totalStudents = classroom?.students?.length;

  if (isLoading) {
    <Layout>
      <section className="max-w-6xl py-10 mx-auto">
        <h1>Loading...</h1>
      </section>
    </Layout>;
  }

  const handleMeet = () => {
    router.push({
      pathname: `/meet/${classroom?.name}`,
      query: {
        name: session?.user?.name,
        email: session?.user?.email,
      },
    });
  };

  console.log(classroom);

  return (
    <Layout>
      <section className="max-w-6xl py-10 mx-auto">
        <div className="flex justify-between bg-gray-700 min-h-[100px] text-white py-5 px-5 rounded-md shadow-sm items-end">
          <div>
            <h1 className="font-medium"> {classroom?.name} </h1>
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
            <button
              className="px-5 py-1 bg-red-600 rounded-sm"
              onClick={handleMeet}
            >
              {isOwnerClass ? "Create Online Class" : "Join Online Class"}
            </button>
          </div>
        </div>
        <div className="mt-5">
          <div className="py-3 border-b">
            <h1 className="font-medium uppercase">All Classwork</h1>
          </div>
          <div className="flex mt-10 space-x-5">
            <div className="w-2/3">
              <Notification
                notification={classroom?.notification}
                isOwnerClass={isOwnerClass}
              />
              <Meterials />
              <Quiz />
            </div>
            <div className="w-1/3">
              <Comments comments={classroom?.comments} refetch={refetch} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SingleClassPage;
