import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { register } from "../../apis/auth";
import { useDispatch } from "react-redux";
import { setStatus, setEmail, setauth } from "../../redux/features/auth/authSlice";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const Signup = () => {
  const [user , setUser] = useState({
    name : "",
    email : "",
    password : "",
    role : ""
  })
  const dispatch = useDispatch();
  

  const navigate = useNavigate(); 

  const handleSignup = async () => {
    try {
      const response = await register(user);
      if (response && response.success) {
        dispatch(setEmail(user.email));
        dispatch(setauth({ isAuthenticated: false, user: response.user, role: user.role, isverified: false }));        
        if (response.setStatus === "pending") {
          dispatch(setStatus("pending"));
          toast.success("Verification OTP code sent to your email!");
          navigate("/verify/email");
        } else {
          dispatch(setStatus("pending"));
          navigate("/verify/email");
        }
      } else {
        dispatch(setStatus("error"));
        toast.error("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      dispatch(setStatus("error"));
      toast.error("Error during signup.");
    }
  };

  return (
    <section className="px-6 md:px-12 py-20 bg-DashboardBack min-h-screen flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      className="relative max-w-md w-full mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">

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
          onChange={(e) => setUser({...user, name: e.target.value})}
        />
        <input 
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Email"
          type="email"
          onChange={(e) => setUser({...user, email: e.target.value})}
        />
        <input 
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          type="password" 
          placeholder="Password"
          onChange={(e) => setUser({...user, password: e.target.value})}
        />

        <select
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white cursor-pointer"
          value={user.role}
          onChange={(e) => setUser({...user, role: e.target.value})}
        >
          <option value="" disabled>Select Role</option>
          <option value="admin">Admin</option>
          <option value="auditor">Auditor</option>
          <option value="citizen">Citizen</option>
        </select>

        <button
          type="submit"
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
      </form>
    </section>
  );
};

export default Signup;