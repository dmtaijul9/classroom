import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import React from "react";
import { useQuery } from "react-query";
import ClassListForStudent from "../../components/ClassList/ClassListForStudent";
import ClassListForTeacher from "../../components/ClassList/ClassListForTeacher";
import Layout from "../../components/UI/Layout";
import prisma from "../../lib/prisma";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      include: {
        ClassJoins: {
          include: {
            ClassRoom: true,
          },
        },
        ClassRoom: true,
      },
    });

    if (user?.role === "TEACHER") {
      return {
        props: {
          classroom: user?.ClassRoom,
        },
      };
    }

    return {
      props: {
        classroom: user?.ClassJoins,
      }, // will be passed to the page component as props
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
  };
}

const MyClassListPage = ({ classroom }: any) => {
  const { data: session, status } = useSession();

  const isTeacher = session?.user?.role === "TEACHER";

  console.log(classroom);

  return (
    <Layout>
      <section className="container mx-auto">
        {isTeacher ? (
          <ClassListForTeacher classroom={classroom} />
        ) : (
          <ClassListForStudent classroom={classroom} />
        )}
      </section>
    </Layout>
  );
};

export default MyClassListPage;
