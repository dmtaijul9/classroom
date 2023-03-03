import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Layout from "../components/UI/Layout";
import Link from "next/link";
import ContactForm from "../components/ContactForm";
import MetaHead from "../components/Head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <MetaHead title="Home-Elma" />
      <Layout>
        <section className="py-20">
          <div className="z-20 px-6 py-12 text-center text-gray-800 lg:my-12 md:px-12 lg:text-left">
            <div className="container mx-auto xl:px-32">
              <div className="flex items-center justify-between gap-12 lg:grid-cols-2">
                <div className="mt-12 lg:mt-0">
                  <h1 className="mb-12 text-2xl font-bold tracking-wide md:text-3xl xl:text-5xl">
                    E-Learning <br />
                    Management <br /> Approach (
                    <span className="text-blue-600">ELMA</span>)
                  </h1>
                  <Link
                    className="inline-block py-3 mr-2 text-lg font-bold leading-snug text-white uppercase transition duration-150 ease-in-out bg-green-600 rounded shadow-md px-7 hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg"
                    href="/login"
                  >
                    Get started
                  </Link>
                </div>
                <div className="mb-12 lg:mb-0">
                  <Image
                    src="/img/teacher-class.jpg"
                    className="w-full rounded-lg "
                    alt=""
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-200 pt-7 pb-7 md:pt-20 md:pb-24">
          <div className="container box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row ">
            {/*         <!-- Image --> */}
            <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
              <Image
                src="/img/readme-img1.png"
                alt="image"
                className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 "
                width={500}
                height={500}
              />
            </div>

            {/*    <!-- Content --> */}
            <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
              <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                Online Meeting
              </h2>
              <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
                Build an atmosphere that creates productivity in your
                organization and your company culture.
              </p>
              <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-green-600 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>{" "}
                  Maximize productivity and growth
                </li>
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-green-600 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>{" "}
                  Speed past your competition
                </li>
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-green-600 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>{" "}
                  Learn the top techniques
                </li>
              </ul>
            </div>
            {/*       <!-- End  Content --> */}
          </div>
          <div
            className="container box-border flex flex-col items-center content-center px-8 mx-auto mt-12 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row"
            style={{ marginTop: "150px" }}
          >
            {/* 
        <!-- Content --> */}
            <div className="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
              <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                Take Notes
              </h2>
              <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-10 lg:text-lg">
                Save time and money with our revolutionary services. We are the
                leaders in the industry.
              </p>
              <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-green-600 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>{" "}
                  Automated task management workflow
                </li>
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-green-600 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>{" "}
                  Detailed analytics for your data
                </li>
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-green-600 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>{" "}
                  Some awesome integrations
                </li>
              </ul>
            </div>
            {/*         <!-- End  Content -->

        <!-- Image --> */}
            <div className="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
              <Image
                src="/img/flat-notes.jpg"
                alt="image"
                className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 "
                width={500}
                height={500}
              />
            </div>
          </div>
        </section>
        <ContactForm />
      </Layout>
    </>
  );
}
