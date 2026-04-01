import React from "react";
import { FaBan, FaExclamationTriangle } from "react-icons/fa";

const BlockUserModal = ({ user, close, confirmBlock }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[420px] rounded-xl shadow-xl p-6">

        {/* Header */}
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <FaExclamationTriangle size={22} />
          <h2 className="text-xl font-semibold">Block User</h2>
        </div>

        {/* Message */}
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          Are you sure you want to block <b>{user?.name}</b>?  
          This user will no longer be able to log in or access the platform.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">

          {/* Danger Action */}
          <button
            onClick={() => confirmBlock(user.id)}
            className="w-full bg-red-600 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-700 transition"
          >
            {/* <FaBan /> */}
            Yes, Block User
          </button>

          {/* Cancel */}
          <button
            onClick={close}
            className="w-full border py-2 rounded-md hover:bg-gray-100"
          >
            No, Cancel
          </button>

        </div>

      </div>

    </div>
  );
};

export default BlockUserModal;