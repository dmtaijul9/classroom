/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import Layout from "../../components/UI/Layout";
import { useForm } from "../../lib/useForm";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

const sendEmail = (email) => {
  return axios.post("/api/forgot", email, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const ForgotPassword = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { inputs, handleChange } = useForm({
    email: "",
  });

  const { mutate, isLoading } = useMutation(sendEmail);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(inputs.email);
    const { email } = inputs;
    if (email.trim() === "") {
      return toast.error("Email is Emptry");
    }

    mutate(email, {
      onSuccess: (data) => {
        toast.success("Email has been sent to Console!");
        console.log(data.data.resetLink);
      },
      onError: () => {
        toast.error("Something went wrong !");
      },
    });
  };
  return (
    <Layout>
      <div className="flex flex-col min-h-[80vh] bg-grey-lighter">
        <div className="container flex flex-col items-center justify-center flex-1 max-w-lg px-2 mx-auto">
          <form
            className="w-full px-6 py-8 text-black bg-gray-200 rounded shadow-md"
            onSubmit={handleSubmit}
          >
            <h1 className="mb-8 text-3xl text-center">Forgot Password</h1>
            <input
              type="email"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="email"
              required
              value={inputs.email}
              onChange={handleChange}
              placeholder="Email"
            />

            <button
              type="submit"
              className="w-full py-3 my-1 text-center text-white bg-purple-600 rounded bg-green hover:bg-green-dark focus:outline-none"
            >
              {isLoading ? "Sending" : "Send Email"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
