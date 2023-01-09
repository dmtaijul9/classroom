import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import Layout from "../../components/UI/Layout";
import { useForm } from "../../lib/useForm";

const SignUpPage = () => {
  const { inputs, handleChange, clearForm } = useForm({
    name: "",
    email: "",
    role: "",
    password: "",
    confirm_password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, role, password, confirm_password } = inputs;
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      role.trim() === "" ||
      password.trim() === "" ||
      confirm_password.trim() === ""
    ) {
      return toast.error("Some fields are empty!");
    }

    if (password !== confirm_password) {
      return toast.error("Password does not match!");
    }
    try {
      const variables = {
        name,
        email,
        role,
        password,
      };
      const res = await axios({
        url: "/api/signup",
        method: "POST",
        data: variables,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(res.data.message);
      console.log(res);
      clearForm();
    } catch (error) {
      console.log(error);
      toast.error("Server Error!");
    }
  };
  return (
    <Layout>
      <div className="flex flex-col min-h-[80vh] bg-grey-lighter">
        <div className="container flex flex-col items-center justify-center flex-1 max-w-lg px-2 mx-auto">
          <form
            className="w-full px-6 py-8 text-black bg-gray-200 rounded shadow-md"
            onSubmit={handleSubmit}
          >
            <h1 className="mb-8 text-3xl text-center">Create an account</h1>
            <input
              type="text"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              placeholder="Full Name"
            />

            <input
              type="text"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <select
              name="role"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              value={inputs.role}
              onChange={handleChange}
            >
              <option value="">Select a type</option>

              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>

            <input
              type="password"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <input
              type="password"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="confirm_password"
              value={inputs.confirm_password}
              onChange={handleChange}
              placeholder="Confirm Password"
            />

            <button
              type="submit"
              className="w-full py-3 my-1 text-center text-white bg-purple-600 rounded bg-green hover:bg-green-dark focus:outline-none"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpPage;
