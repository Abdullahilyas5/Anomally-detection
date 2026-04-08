import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const Signup = ({ setStatus }) => {
  const [role, setRole] = useState("");
  const navigate = useNavigate(); // added navigate

  const handleSignup = () => {
    if (role === "auditor") {
      setStatus("pending");
    }
    // Add additional signup logic here
    console.log("Sign Up clicked with role:", role);
  };

  return (
    <section className="px-6 md:px-12 py-20 bg-DashboardBack min-h-screen flex items-center justify-center">
      <div className="relative max-w-md w-full mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">

        {/* Back Arrow */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-gray-600 py-6 px-6 hover:text-primary transition-transform duration-300 hover:-translate-x-1 flex items-center gap-2"
        >
            <FaArrowLeftLong  className="text-2xl cursor-pointer"/>
        </button>

        <h3 className="text-2xl text-primary font-bold mb-6 text-center">
          Create Account
        </h3>

        <input 
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Name"
        />
        <input 
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Email"
          type="email"
        />
        <input 
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          type="password" 
          placeholder="Password"
        />

        <select
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white cursor-pointer"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="" disabled>Select Role</option>
          <option value="admin">Admin</option>
          <option value="auditor">Auditor</option>
          <option value="citizen">Citizen</option>
        </select>

        <button
          onClick={handleSignup}
          className="w-full bg-buttonBg text-white py-3 rounded-lg hover:bg-buttonHover transition"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;