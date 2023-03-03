/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import Layout from "../../components/UI/Layout";
import { useForm } from "../../lib/useForm";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import MetaHead from "../../components/Head";

const JoinClassPage = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm({
    joinCode: "",
  });
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { joinCode } = inputs;
    if (joinCode.trim() === "") {
      toast.error("Field cannot be empty!");
    }
    if (session?.user?.role === "ADMIN") {
      return toast.error("You can not join Any classes!");
    }
    try {
      const variables = {
        joinCode,
        //@ts-ignore
        userId: session?.user.id,
      };

      const res = await axios({
        method: "POST",
        url: "/api/joinclass",
        data: variables,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(res.data.message);
      router.push(`/my-classes/${res.data.classroom.id}`);
      resetForm();
    } catch (error) {
      //@ts-ignore
      toast.error(error?.response.data.message);
      resetForm();
    }
  };
  return (
    <>
      <MetaHead title="Elma-Join Class" />
      <Layout>
        <div className="flex flex-col min-h-[80vh] bg-grey-lighter">
          <div className="container flex flex-col items-center justify-center flex-1 max-w-lg px-2 mx-auto">
            <form
              className="w-full px-6 py-8 text-black bg-gray-200 rounded shadow-md"
              onSubmit={handleSubmit}
            >
              <h1 className="mb-8 text-3xl text-center">Join a classroom</h1>
              <input
                type="text"
                className="block w-full p-3 mb-4 border rounded border-grey-light"
                name="joinCode"
                required
                value={inputs.joinCode}
                onChange={handleChange}
                placeholder="Join Code"
              />

              <button
                type="submit"
                className="w-full py-3 my-1 text-center text-white bg-purple-600 rounded bg-green hover:bg-green-dark focus:outline-none"
              >
                Join Class
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default JoinClassPage;
