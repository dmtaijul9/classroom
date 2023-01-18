import { useSession } from "next-auth/react";
import React from "react";
import Layout from "../../../components/UI/Layout";
import prisma from "../../../lib/prisma";

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
      notification: true,
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
  console.log(classroom);
  const { data: session, status } = useSession();
  const { teacher, students, name, subject } = classroom;

  const isOwnerClass = session?.user.id === teacher.id;
  console.log(isOwnerClass);
  const totalStudents = students.length;
  console.log(totalStudents);

  return (
    <Layout>
      <section className="max-w-5xl mx-auto">
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
            {isOwnerClass ? (
              <button className="px-5 py-1 bg-red-600 rounded-sm">
                Create Online Class
              </button>
            ) : (
              <button className="px-5 py-1 bg-red-600 rounded-sm">
                Join Online Class
              </button>
            )}
          </div>
        </div>
        <div className="mt-5">
          <div className="py-3 border-b">
            <h1 className="font-medium uppercase">All Asignments</h1>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SingleClassPage;
