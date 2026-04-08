import { FiX } from "react-icons/fi";

const Ribbon = ({ status, onClose }) => {
  if (!status || status === "approved") return null;

  return (
    <div className="bg-red-500 text-white flex justify-between items-center px-6 py-2 text-sm">
      <span>
        {status === "pending" && "Auditor request under review"}
        {status === "rejected" && "Auditor request rejected"}
      </span>
      <FiX className="cursor-pointer" onClick={onClose} />
    </div>
  );
};

export default Ribbon;