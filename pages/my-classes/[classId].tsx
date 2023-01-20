import { useSession } from "next-auth/react";
import React from "react";
import Layout from "../../components/UI/Layout";
import prisma from "../../lib/prisma";
import { MdQuiz } from "react-icons/md";
import { FaCommentAlt } from "react-icons/fa";
import Notification from "../../components/Class/Notification";
import Comments from "../../components/Class/Comments";
import Quiz from "../../components/Class/Quiz";
import { useRouter } from "next/router";

export const getServerSideProps = async (context) => {
  const { classId } = context.params;

  const classRoom = await prisma.classRoom.findUnique({
    where: {
      id: classId,
    },
    include: {
      students: true,
      teacher: {
        select: {
          email: true,
          id: true,
          name: true,
          role: true,
        },
      },
      comments: true,
    },
  });

  return {
    props: {
      classroom: classRoom,
    },
  };
};

//@ts-ignore
const SingleClassPage = ({ classroom }) => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const { teacher, students, name, subject, notification, comments } =
    classroom;

  const isOwnerClass = session?.user.id === teacher.id;

  const totalStudents = students.length;

  const handleMeet = () => {
    router.push({
      pathname: `/meet/${name}`,
      query: {
        name: session?.user?.name,
        email: session?.user?.email,
      },
    });
  };

  return (
    <Layout>
      <section className="max-w-6xl py-10 mx-auto">
        <div className="flex justify-between bg-gray-700 min-h-[100px] text-white py-5 px-5 rounded-md shadow-sm items-end">
          <div>
            <h1 className="font-medium"> {name} </h1>
            <p>
              <span>Total Students :</span> {totalStudents}{" "}
            </p>
          </div>
          <div>
            <h1>
              <span className="font-bold uppercase">Teacher : </span>{" "}
              {teacher.name}
            </h1>
          </div>
        </div>
        <div className="flex justify-between mt-5 bg-gray-700 min-h-[100px] text-white py-5 px-5 rounded-md shadow-sm items-end">
          <div>
            <h1> {subject} </h1>
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
                notification={notification}
                isOwnerClass={isOwnerClass}
              />
              <Quiz />
            </div>
            <div className="w-1/3">
              <Comments comments={comments} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SingleClassPage;
