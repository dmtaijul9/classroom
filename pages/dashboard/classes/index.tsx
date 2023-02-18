/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import Layout from "../../../components/UI/Layout";

const getAllClasses = () => {
  return axios("/api/allclasses");
};

const index = () => {
  const { data, isLoading } = useQuery("allclasses", getAllClasses);

  if (isLoading) {
    return (
      <Layout>
        <section className="container mx-auto">Loading</section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container mx-auto">
        <div className="py-3 border-b">
          <h1 className="font-semibold ">My Class</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 px-2 mt-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {data?.data.classroom?.map((item: any) => (
            <>
              <div key={item.id} className="p-5 border rounded-md shadow-sm">
                <div className="min-h-[120px] border-b">
                  <h1 className="mb-2 font-medium">{item?.name}</h1>
                  <p> {item?.subject}</p>
                </div>

                <div className="flex items-center justify-end mt-5 space-x-4">
                  <div>
                    <Link
                      href={`/my-classes/${item?.id}`}
                      className="px-3 py-1 text-white bg-red-600 rounded-sm "
                    >
                      Go to classroom
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default index;
