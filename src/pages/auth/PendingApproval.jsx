import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import { FaClock } from "react-icons/fa";

const PendingApproval = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <section className="px-6 md:px-12 py-20 bg-DashboardBack min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center flex flex-col items-center gap-6">
        <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-3xl animate-pulse">
          <FaClock />
        </div>
        
        <h2 className="text-2xl text-primary font-bold">
          Account Pending Approval
        </h2>
        
        <p className="text-gray-600 leading-relaxed text-sm">
          Your account has been created successfully. Please wait until a Super Admin approves your account. You will not be able to access the system until approval.
        </p>

        <Button
          onClick={handleBackToLogin}
          text="Back to Login"
          className="bg-buttonBg text-white w-full rounded-lg hover:bg-buttonHover transition"
        />
      </div>
    </section>
  );
};

export default PendingApproval;
