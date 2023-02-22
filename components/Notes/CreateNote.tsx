import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "../../lib/useForm";
import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Editor = dynamic(() => import("../Editor/index"), { ssr: false });

const newNoteCreator = (newNote: any) => {
  return axios.post("/api/notes", newNote, {
    headers: {
      ContentType: "application/json",
    },
  });
};

const CreateNote = ({ refetch }: any) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [editorValue, setEditorValue] = useState("");
  const { inputs, handleChange, clearForm } = useForm({
    subject: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, []);

  const { mutate, isLoading, isSuccess, data, isError, error } =
    useMutation(newNoteCreator);
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const { subject } = inputs;

    if (
      subject.trim() === "" ||
      editorValue.trim() === "" ||
      editorValue.trim() === "<p><br></p>"
    ) {
      return toast.error("Empty field is not allowed!");
    }

    const variables = {
      subject: inputs.subject,
      noteText: editorValue,
      studentId: session?.user?.id,
    };

    mutate(variables, {
      onSuccess: () => {
        refetch();
        toast.success("Success");
        clearForm();
      },
    });
  };

  return (
    <div>
      <div className="py-3 text-xl font-semibold tracking-wide uppercase border-b">
        <h1>Create New Note</h1>
      </div>
      <form className="w-full mt-5" onSubmit={handleSubmit}>
        <label htmlFor="subject">
          <span className="text-xl font-medium">Subject</span>
          <input
            className="w-full py-2 border rounded-md"
            type="text"
            name="subject"
            value={inputs.subject}
            onChange={handleChange}
          />
        </label>
        <div className="py-5">
          <Editor onChange={setEditorValue} />
          <button
            className="w-full py-2 mt-4 text-xl font-semibold text-white bg-green-600 rounded-sm"
            type="submit"
          >
            Create Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
