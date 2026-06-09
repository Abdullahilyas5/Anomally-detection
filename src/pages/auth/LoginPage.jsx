import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button";
import Input from "../../components/input";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { login as loginApi, resendOTP } from "../../apis/auth";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../../redux/features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const response = await loginApi({ email, password });
      const data = response?.data;

      if (!response?.success) {
        toast.error("Invalid email or password.");
        return;
      }

      const { user, accessToken } = data;

      if (!user.isVerified) {
        toast.error("Please verify your email first.");

        await resendOTP({ email: user.email });

        toast.success("OTP sent to your email!");

        navigate("/verify/email", {
          state: { email: user.email },
        });

        return;
      }

      // SAVE TO REDUX (single source of truth)
      dispatch(loginAction({ user, accessToken }));

      toast.success("Login successful!");

      setTimeout(() => {
        if (user.role === "admin") navigate("/admin/dashboard");
        else if (user.role === "auditor") navigate("/auditor/dashboard");
        else navigate("/citizen/dashboard");
      }, 300);

    } catch (err) {
      console.error(err);
      toast.error("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 md:px-12 py-20 bg-DashboardBack min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200 relative">

        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-textMain hover:text-primary transition"
        >
          <FaArrowLeftLong className="text-2xl" />
        </button>

        <h2 className="text-2xl text-primary font-bold mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-semibold text-primary">
              Email
            </label>
            <Input
              ref={emailRef}
              type="email"
              placeholder="Enter your email"
              cls="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1 relative mb-4">
            <label className="text-sm font-semibold text-primary">
              Password
            </label>

            <Input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              cls="w-full p-3 border border-gray-300 rounded-lg"
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-10 text-gray-500"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>

          <Button
            type="submit"
            text={loading ? "Logging in..." : "Login"}
            className="bg-buttonBg text-white w-full rounded-lg"
          />
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </section>
  );
};

export default LoginPage;