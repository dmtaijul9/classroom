import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import PassChangeForm from "../../components/form/PassChangeForm";
import Layout from "../../components/UI/Layout";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  return (
    <Layout>
      <div className="max-w-2xl mx-4 mt-16 text-gray-900 bg-white rounded-lg shadow-xl sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto">
        <div className="flex flex-col items-center justify-center h-32 overflow-hidden text-white bg-gray-600 rounded-t-lg">
          <h2>
            <span className="font-semibold">Name:</span> {session?.user?.name}
          </h2>
          {/*   @ts-ignore */}
          <p>
            <span className="font-semibold">Role: </span>
            {session?.user.role}
          </p>
        </div>

        <div className="mt-2 text-center">
          <div className="flex flex-col items-center justify-center order-1 pb-10 my-16 lg:my-0 lg:order-2">
            <PassChangeForm selectedRowData={session?.user} isProfile />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
