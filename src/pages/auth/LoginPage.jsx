import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button";
import Input from "../../components/input";
import { FaRegEye, FaRegEyeSlash, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/login", { email, password });
      console.log("Login successful:", response.data);
      toast.success("Login successful!");
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password.");
      setLoading(false);
    }
  };

  return (
    <section className="px-6 md:px-12 py-20 bg-DashboardBack min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200 relative">

        {/* Back Arrow */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-textMain py-6 px-6 hover:text-primary transition-transform duration-300 hover:-translate-x-1 flex items-center gap-1"
        >
          <FaArrowLeftLong className="text-2xl " />
        </button>

        <h2 className="text-2xl text-primary font-bold mb-6 text-center">
          Login
        </h2>

        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="email" className="text-sm font-semibold text-primary">
            Email
          </label>
          <Input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            cls="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-1 relative mb-4">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-sm font-semibold text-primary">
              Password
            </label>
            <Link
              to="/forgotpassword"
              className="text-blue-500 hover:text-blue-600 text-xs"
            >
              Forgot Password?
            </Link>
          </div>

          <Input
            ref={passwordRef}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            cls="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="button"
            className="absolute right-3 top-10 text-gray-400 hover:text-gray-600"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <input type="checkbox" id="remember" className="accent-primary" />
          <label htmlFor="remember" className="text-sm text-gray-700">
            Remember Me
          </label>
        </div>

        <Button
          text={loading ? "Logging in..." : "Login"}
          className="bg-buttonBg text-white w-full hover:bg-buttonHover rounded-lg"
        />

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
            Sign Up
          </Link>
        </p>

        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </section>
  );
};

export default LoginPage;