import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useForm } from "../../lib/useForm";
import { resetPassword } from "../../pages/reset/[resetToken]";

const PassChangeForm = ({ selectedRowData, isProfile }: any) => {
  const { inputs, handleChange } = useForm({
    password: "",
    confirmPassword: "",
  });
  const { mutate, isLoading } = useMutation(resetPassword);
  const changePassword = (e) => {
    e.preventDefault();

    const { password, confirmPassword } = inputs;
    if (!password.trim() || !confirmPassword.trim()) {
      return toast.error("Empty Field!");
    }
    if (password !== confirmPassword) {
      return toast.error("Password does not match!");
    }
    const variables = {
      userId: selectedRowData.id,
      newPassword: password,
    };
    mutate(variables, {
      onSuccess(data, variables, context) {
        toast.success("Changed Successfully");
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    });
  };
  return (
    <>
      {!isProfile && (
        <div className="flex items-center justify-center space-x-3">
          <div className="flex text-white items-center justify-center w-[40px] h-[40px] rounded-full bg-gray-400">
            <BiUserCircle size={30} />
          </div>
          <p className="text-[20px]">{selectedRowData?.name}</p>
        </div>
      )}
      <form
        className="flex flex-col min-w-[300px] mt-4 "
        onSubmit={changePassword}
      >
        <label htmlFor="password">
          Password :
          <input
            type="password"
            name="password"
            className="w-full py-1 border rounded-sm"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="Confirm Password " className="mt-3">
          Confirm Password :
          <input
            type="password"
            name="confirmPassword"
            className="w-full py-1 border rounded-sm"
            value={inputs.confirmPassword}
            onChange={handleChange}
          />
        </label>
        <button
          className="w-full py-1 mt-3 text-white bg-blue-600 rounded-md"
          type="submit"
        >
          {isLoading ? "Changing" : "Change Password"}
        </button>
      </form>
    </>
  );
};

export default PassChangeForm;
