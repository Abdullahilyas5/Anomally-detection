import { FiX } from "react-icons/fi";
import { useSelector } from "react-redux";

const Ribbon = ({ onClose = () => {} }) => {
  const user = useSelector((state) => state.auth.user);

  const status = user?.status;
  const isVerified = user?.isVerified;

  // ❌ Hide ribbon if user is verified or approved
  if (isVerified || status === "approved") return null;

  const getMessage = () => {
    switch (status) {
      case "pending":
        return "Your request is pending review";
      case "rejected":
        return "Your request has been rejected";
      default:
        return null;
    }
  };

  const message = getMessage();

  if (!message) return null;

  return (
    <div className="bg-red-500 text-white flex justify-between items-center px-6 py-2 text-sm fixed top-0 left-0 w-full z-50">
      <span>{message}</span>

      <FiX className="cursor-pointer" onClick={onClose} />
    </div>
  );
};

export default Ribbon;