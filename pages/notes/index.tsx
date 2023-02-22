/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import CreateNote from "../../components/Notes/CreateNote";
import Layout from "../../components/UI/Layout";

const fetchNotes = (pageAndId: any) => {
  return axios.get("/api/notes", {
    params: pageAndId,
    headers: {
      ContentType: "application/json",
    },
  });
};

const index = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const { data: session, status } = useSession();

  const studentId = session?.user?.id;
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading, isError, data, error, isFetching, refetch } = useQuery(
    ["notes", studentId],
    () => fetchNotes({ page, studentId }),
    {
      keepPreviousData: true,
      enabled: !!studentId,
      cacheTime: 20000,
    }
  );

  const notes = data?.data.notes;

  return (
    <Layout>
      <section className="flex mx-auto space-x-5 max-w-7xl">
        <div className="w-3/5">
          <div className="py-3 text-xl font-semibold tracking-wide uppercase border-b">
            <h1>All Notes</h1>
          </div>
          <div className="flex flex-col mt-5 space-y-3">
            {isLoading && <div>Loading..</div>}
            {notes?.map((note: any) => {
              return (
                <Link
                  href={`/notes/${note.id}`}
                  key={note.id}
                  className="px-3 py-3 text-white bg-gray-800 rounded-md "
                >
                  {note.subject}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="w-2/5">
          <CreateNote refetch={refetch} />
        </div>
      </section>
    </Layout>
  );
};

export default index;
