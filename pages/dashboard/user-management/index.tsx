import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import { BiSearch, BiUserCircle } from "react-icons/bi";

import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { useSession } from "next-auth/react";
import Layout from "../../../components/UI/Layout";
import { useQuery } from "react-query";
import UserTableRaw from "../../../components/Table/UserTableRaw";
import PassChangeForm from "../../../components/form/PassChangeForm";

const fetchUsers = () => {
  return axios.get("/api/users");
};

const UserManagementPage = () => {
  const [selectedRowData, setSelecetedRowData] = useState(null);
  const [current, setCurrent] = useState(1);
  const router = useRouter();

  const { data: session, status } = useSession();
  const [search, setSearch] = useState("");

  const isAdmin = session?.user?.role === "ADMIN";

  useEffect(() => {
    if (status === "authenticated") {
      if (!isAdmin) {
        router.push("/");
      }
    }
  });

  // Pagination is not implemented yet

  const paginate = (page: number, pageSize: number) => {
    return setCurrent(page);
  };

  const onSelectHandler = (user) => {
    setSelecetedRowData(user);
  };
  const { data, isLoading } = useQuery("Users", fetchUsers);

  if (isLoading) {
    return (
      <Layout>
        <div className="container m-auto">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container flex flex-col items-center justify-between m-auto lg:space-x-10 md:flex-raw lg:flex-row">
        <div className="order-2 w-full py-10 lg:w-2/3 lg:order-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <p className="uppercase">Users List</p>
            </div>
          </div>
          <div className="flex flex-col mt-5 ">
            <table className="w-full overflow-auto border-collapse ">
              <thead>
                <tr>
                  <th className="p-3 font-bold text-white uppercase bg-blue-600 border border-gray-300 lg:table-cell">
                    Name
                  </th>
                  <th className="p-3 font-bold text-white uppercase bg-blue-600 border border-gray-300 lg:table-cell">
                    Email
                  </th>
                  <th className="p-3 font-bold text-white uppercase bg-blue-600 border border-gray-300 lg:table-cell">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.users.map((user: any) => {
                  return (
                    <UserTableRaw
                      key={user.id}
                      user={user}
                      onSelectHandler={onSelectHandler}
                    />
                  );
                })}
              </tbody>
            </table>
            {/*  <div className="flex self-end mt-6 justify-between w-[150px]">
              <button
                className="flex items-center justify-center w-10 h-10 transition-colors ease-linear bg-white border hover:bg-slate-200"
                onClick={() => {
                  if (current <= 0) {
                    return;
                  }
                  setCurrent(current - 1);
                }}
              >
                {" "}
                <FaChevronLeft />{" "}
              </button>
              <div className="flex items-center justify-center w-10 h-10 bg-white border">
                {current}
              </div>
              <button
                className="flex items-center justify-center w-10 h-10 transition-colors ease-linear bg-white border hover:bg-slate-200"
                onClick={() => {
                  if (current <= 0) {
                    return;
                  }
                  setCurrent(current - 1);
                }}
              >
                {" "}
                <FaChevronRight />{" "}
              </button>
            </div> */}
          </div>
        </div>
        <div className="flex flex-col items-center order-1 w-1/3 my-16 lg:my-0 lg:order-2">
          {selectedRowData ? (
            <PassChangeForm selectedRowData={selectedRowData} />
          ) : null}
        </div>
      </section>
    </Layout>
  );
};

export default UserManagementPage;
