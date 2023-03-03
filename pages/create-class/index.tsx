/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import Layout from "../../components/UI/Layout";
import { useForm } from "../../lib/useForm";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import MetaHead from "../../components/Head";

const index = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { inputs, handleChange } = useForm({
    name: "",
    subject: "",
  });
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(inputs);
    const { name, subject } = inputs;
    if (name.trim() === "" || subject.trim() === "") {
      toast.error("Field cannot be empty!");
    }
    try {
      const variables = {
        name,
        subject,
        //@ts-ignore
        userId: session?.user?.id,
      };
      const res = await axios({
        method: "POST",
        url: "/api/createclass",
        data: variables,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      toast.success("Classroom created!");
      router.push("/my-classes");
    } catch (error) {
      //@ts-ignore
      console.log(error);

      toast.error(error.message);
    }
  };
  return (
    <>
      <MetaHead title="elma-create class" />
      <Layout>
        <div className="flex flex-col min-h-[80vh] bg-grey-lighter">
          <div className="container flex flex-col items-center justify-center flex-1 max-w-lg px-2 mx-auto">
            <form
              className="w-full px-6 py-8 text-black bg-gray-200 rounded shadow-md"
              onSubmit={handleSubmit}
            >
              <h1 className="mb-8 text-3xl text-center">Create a new class</h1>
              <input
                type="text"
                className="block w-full p-3 mb-4 border rounded border-grey-light"
                name="name"
                required
                value={inputs.name}
                onChange={handleChange}
                placeholder="Class Name"
              />
              <input
                type="text"
                className="block w-full p-3 mb-4 border rounded border-grey-light"
                name="subject"
                required
                value={inputs.subject}
                onChange={handleChange}
                placeholder="Class Subject"
              />

              <button
                type="submit"
                className="w-full py-3 my-1 text-xl text-center text-white bg-green-600 rounded bg-green hover:bg-green-dark focus:outline-none"
              >
                Create Class
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default index;
