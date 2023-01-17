import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import Layout from "../../../components/UI/Layout";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  return (
    <Layout>
      <div className="max-w-2xl mx-4 mt-16 text-gray-900 bg-white rounded-lg shadow-xl sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto">
        <div className="h-32 overflow-hidden bg-gray-600 rounded-t-lg"></div>
        <div className="relative w-32 h-32 mx-auto -mt-16 overflow-hidden border-4 border-white rounded-full">
          <Image
            className="object-cover object-center h-32"
            src={
              session?.user?.image
                ? session.user.image
                : "/img/user_placeholder.png"
            }
            alt="Woman looking front"
            width={400}
            height={400}
          />
        </div>
        <div className="mt-2 text-center">
          <h2 className="font-semibold">{session?.user?.name}</h2>
          {/*   @ts-ignore */}
          <p className="text-gray-500">{session?.user.role}</p>
        </div>
        {/* <ul className="flex items-center justify-around py-4 mt-2 text-gray-700">
          <li className="flex flex-col items-center justify-around">
            <svg
              className="w-4 text-blue-900 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <div>2k</div>
          </li>
          <li className="flex flex-col items-center justify-between">
            <svg
              className="w-4 text-blue-900 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
            </svg>
            <div>10k</div>
          </li>
          <li className="flex flex-col items-center justify-around">
            <svg
              className="w-4 text-blue-900 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
            </svg>
            <div>15</div>
          </li>
        </ul> */}
        <div className="p-4 mx-8 mt-2 border-t">
          <button className="block w-1/2 px-6 py-2 mx-auto font-semibold text-white bg-gray-900 rounded-full hover:shadow-lg">
            Edit
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
