import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import MetaHead from "../../../components/Head";
import Layout from "../../../components/UI/Layout";
import { useForm } from "../../../lib/useForm";

export const resetPassword = (passAndToken: any) => {
  return axios.post("/api/reset", passAndToken, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const Reset = () => {
  const router = useRouter();
  const { resetToken } = router.query;
  const { inputs, handleChange } = useForm({
    password: "",
    confirmPassword: "",
  });
  const { mutate, isLoading } = useMutation(resetPassword);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { password, confirmPassword } = inputs;

    if (!password.trim() || !confirmPassword.trim()) {
      return toast.error("Empty Field!");
    }
    if (password !== confirmPassword) {
      return toast.error("Password does not match!");
    }
    const variables = {
      token: resetToken,
      newPassword: password,
    };
    mutate(variables, {
      onSuccess(data, variables, context) {
        toast.success("Successfully You updated!");
      },
      onError: (error) => {
        toast.error("Something is wrong!");
      },
    });
  };

  return (
    <>
      <MetaHead title="Elma-password-reset-form" />
      <Layout>
        <div className="flex flex-col min-h-[80vh] bg-grey-lighter">
          <div className="container flex flex-col items-center justify-center flex-1 max-w-lg px-2 mx-auto">
            <form
              className="w-full px-6 py-8 text-black bg-gray-200 rounded shadow-md"
              onSubmit={handleSubmit}
            >
              <h1 className="mb-8 text-3xl text-center">Reset Password</h1>
              <input
                type="password"
                className="block w-full p-3 mb-4 border rounded border-grey-light"
                name="password"
                required
                value={inputs.password}
                onChange={handleChange}
                placeholder="New Password"
              />
              <input
                type="password"
                className="block w-full p-3 mb-4 border rounded border-grey-light"
                name="confirmPassword"
                required
                value={inputs.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />

              <button
                type="submit"
                className="w-full py-3 my-1 text-center text-white bg-purple-600 rounded bg-green hover:bg-green-dark focus:outline-none"
              >
                {isLoading ? "Reseting" : "Reset"}
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Reset;
