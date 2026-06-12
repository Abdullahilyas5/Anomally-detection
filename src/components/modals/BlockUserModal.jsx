import { FaBan, FaExclamationTriangle } from "react-icons/fa";

const BlockUserModal = ({ user, close, confirmBlock }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-red-50 p-5 border-b">
          <div className="flex items-center gap-3">
            <FaExclamationTriangle className="text-red-600 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-800">
                Block User
              </h2>
              <p className="text-xs text-gray-500">
                User will be set to inactive
              </p>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="p-6">
          <p className="text-gray-700">
            Block <b>{user?.name}</b>?
          </p>

          <p className="text-sm text-gray-500 mt-2">
            They will lose access until reactivated.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 p-5 bg-gray-50 border-t">

          <button
            onClick={close}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={() => confirmBlock(user.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2"
          >
            <FaBan />
            Block
          </button>

        </div>

      </div>
    </div>
  );
};

export default BlockUserModal;