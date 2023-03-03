import axios from "axios";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { useSession } from "next-auth/react";
import Layout from "../../../components/UI/Layout";
import { useMutation, useQuery } from "react-query";
import UserTableRaw from "../../../components/Table/UserTableRaw";
import PassChangeForm from "../../../components/form/PassChangeForm";
import { toast } from "react-toastify";
import MetaHead from "../../../components/Head";

const fetchUsers = () => {
  return axios.get("/api/users");
};

const deleteUser = ({ userId }) => {
  return axios.post("/api/users", userId, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const UserManagementPage = () => {
  const [selectedRowData, setSelecetedRowData] = useState(null);

  const router = useRouter();

  const { data: session, status } = useSession();

  const isAdmin = session?.user?.role === "ADMIN";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      if (session?.user?.role !== "ADMIN") {
        router.push("/");
      }
    }
  });

  const { data, isLoading, refetch } = useQuery("Users", fetchUsers);
  const { mutate } = useMutation(deleteUser);

  const deleteUserHandler = (id) => {
    mutate(
      { userId: id },
      {
        onSuccess: async (data) => {
          toast.success("Successfully deleted");
          refetch();
        },
        onError: async (err) => {
          toast.error("Something went wrong");
        },
      }
    );
  };

  const onSelectHandler = (user) => {
    setSelecetedRowData(user);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container m-auto">Loading...</div>
      </Layout>
    );
  }

  return (
    <>
      <MetaHead title="Elma-user management" />
      <Layout>
        <section className="container flex flex-col items-center justify-between m-auto lg:space-x-10 md:flex-raw lg:flex-row">
          <div className="order-2 w-full py-10 lg:w-2/3 lg:order-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <p className="text-xl uppercase">Users List</p>
              </div>
            </div>
            <div className="flex flex-col mt-5 ">
              <table className="w-full overflow-auto border-collapse ">
                <thead>
                  <tr>
                    <th className="p-3 text-xl font-bold text-white uppercase bg-green-600 border border-gray-300 lg:table-cell">
                      Name
                    </th>
                    <th className="p-3 text-xl font-bold text-white uppercase bg-green-600 border border-gray-300 lg:table-cell">
                      Email
                    </th>
                    <th className="p-3 text-xl font-bold text-white uppercase bg-green-600 border border-gray-300 lg:table-cell">
                      Role
                    </th>
                    <th className="p-3 text-xl font-bold text-white uppercase bg-green-600 border border-gray-300 lg:table-cell">
                      Action
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
                        deleteUserHandler={deleteUserHandler}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col items-center order-1 w-1/3 my-16 lg:my-0 lg:order-2">
            {selectedRowData ? (
              <PassChangeForm selectedRowData={selectedRowData} />
            ) : null}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default UserManagementPage;
