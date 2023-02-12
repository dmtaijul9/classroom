import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import Layout from "../../components/UI/Layout";

const fetchNote = (noteId) => {
  return axios.get(`/api/notes/${noteId}`);
};

const deleteNote = (noteId) => {
  return axios.delete(`/api/notes/${noteId}`);
};

const SingleNotePage = () => {
  const router = useRouter();
  const { noteId } = router.query;
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, []);

  const { data, isLoading, isError, error } = useQuery(
    ["Note", noteId],
    () => fetchNote(noteId),
    {
      enabled: !!noteId,
    }
  );

  const deletNoteMutation = useMutation(deleteNote);

  const deleteHandler = () => {
    deletNoteMutation.mutate(noteId, {
      onSuccess() {
        toast.success("Deleted Succuessfully");
        router.push("/notes");
      },
      onError(error, variables, context) {
        console.log(error);

        toast.error("Something Went wring");
      },
    });
  };

  const note = data?.data?.note;
  console.log(note);

  if (isLoading) {
    return (
      <Layout>
        <section>
          <div>
            <h1> Loading... </h1>
          </div>
        </section>
      </Layout>
    );
  }

  const jsonToString = (json) => {
    return JSON.parse(json);
  };

  return (
    <Layout>
      <section className="max-w-5xl mx-auto">
        <div className="px-4 py-3 text-white bg-gray-700 rounded-md">
          <h1>
            <span className="font-semibold ">Subject : </span> {note?.subject}{" "}
          </h1>
        </div>
        <div className="mt-5 border min-h-[500px] p-5 rounded-md shadow-md">
          <div
            dangerouslySetInnerHTML={{ __html: jsonToString(note?.noteText) }}
            className="w-full overflow-x-auto"
          ></div>
        </div>
        <div className="mt-5 text-right">
          <button
            className="py-1.5 px-5 bg-red-500 text-white rounded-sm"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default SingleNotePage;
