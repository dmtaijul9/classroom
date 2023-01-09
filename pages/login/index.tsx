import Image from "next/image";
import React from "react";
import Layout from "../../components/UI/Layout";
import { useForm } from "../../lib/useForm";
import { useSession, signIn, signOut } from "next-auth/react";

const index = () => {
  const { data: session, status } = useSession();
  const { inputs, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    const data = await signIn("credentials", {
      redirect: false,
      email: inputs.email,
      password: inputs.password,
    });
    console.log(data);
  };
  return (
    <Layout>
      <section className="container h-full m-auto">
        <div className="h-full px-6 text-gray-800">
          <div className="flex flex-wrap items-center justify-center h-full xl:justify-center lg:justify-between g-6">
            <div className="mb-12 grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 md:mb-0">
              <Image
                src="/img/draw2.webp"
                className="w-full"
                alt="Sample image"
                width={500}
                height={500}
              />
            </div>
            <div className="mb-12 xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 md:mb-0">
              <form onSubmit={handleSubmit}>
                {/* <!-- Email input --> */}
                <div className="mb-6">
                  <input
                    type="text"
                    className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    name="email"
                    placeholder="Email address"
                    value={inputs.email}
                    onChange={handleChange}
                  />
                </div>

                {/*           <!-- Password input --> */}
                <div className="mb-6">
                  <input
                    type="password"
                    className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    name="password"
                    placeholder="Password"
                    value={inputs.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="float-left w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-sm appearance-none cursor-pointer form-check-input checked:bg-blue-600 checked:border-blue-600 focus:outline-none"
                      id="exampleCheck2"
                    />
                    <label
                      className="inline-block text-gray-800 form-check-label"
                      htmlFor="exampleCheck2"
                    >
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-gray-800">
                    Forgot password?
                  </a>
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block py-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                  >
                    Login
                  </button>
                  <p className="pt-1 mt-2 mb-0 text-sm font-semibold">
                    Don't have an account?
                    <a
                      href="#!"
                      className="text-red-600 transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700"
                    >
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default index;
