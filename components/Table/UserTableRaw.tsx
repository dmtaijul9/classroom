import React from "react";

const UserTableRaw = ({ user, onSelectHandler, deleteUserHandler }: any) => {
  return (
    <tr
      className="flex-no-wrap table-row mb-0 bg-white hover:bg-gray-100"
      onClick={() => {
        onSelectHandler(user);
      }}
    >
      <td className="table-cell w-auto p-3 text-gray-800 border border-b ">
        {user.name}
      </td>
      <td className="table-cell w-auto p-3 text-gray-800 border border-b ">
        {user.email}
      </td>
      <td className="table-cell w-auto p-3 text-gray-800 border border-b ">
        {user.role}
      </td>
      <td className="table-cell w-auto p-3 text-center text-gray-800 border border-b ">
        <button
          className="px-2 text-white bg-red-600 rounded-md"
          onClick={() => {
            deleteUserHandler(user.id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserTableRaw;
