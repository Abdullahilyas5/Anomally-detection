import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { verifyEmail, resendOTP } from "../../apis/auth";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setisverified } from "../../redux/features/auth/authSlice";

const VerifyEmail = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputs = useRef([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isverified = useSelector((state) => state.auth.isverified);
    const email = useSelector((state) => state.auth.email);
    const user = useSelector((state) => state.auth.user);

    console.log("User in VerifyEmail:", user, "Email:", email);

    // if(!email){
    //     toast.error("No email found. Please check signup again.");
    //     return null;
    // }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const otpValue = otp.join("");
            if (otpValue.length !== 4) {
                toast.error("Please enter a 4-digit OTP.");
                return;
            }
            if (!email) {
                toast.error("Email not found. Please register again.");
                return;
            }
            
            const response = await verifyEmail({ otp: otpValue, email });

            if (response && response.success) {
                toast.success("Email verified successfully!");
                dispatch(setisverified(true));
                navigate("/login");
            } else {
                toast.error(response?.message || "Failed to verify email. Please try again.");
                dispatch(setisverified(false));
            }  
        } catch (error) {
            console.error("Error verifying email:", error);
            toast.error("Error verifying email.");
        }
    };

    const handleResend = async () => {
        if (!email) {
            toast.error("Email not found.");
            return;
        }
        try {
            const response = await resendOTP({ email });
            if (response && response.success) {
                toast.success("Verification code resent successfully!");
            } else {
                toast.error(response?.message || "Failed to resend code.");
            }
        } catch (error) {
            console.error("Error resending OTP:", error);
            toast.error("Error resending verification code.");
        }
    };

    const handleChange = (value, index) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();

        const pastedData = e.clipboardData
            .getData("text")
            .slice(0, 4)
            .split("");

        console.log(pastedData);

        const newOtp = [...otp];

        pastedData.forEach((char, index) => {
            if (index < 4) {
                newOtp[index] = char;
            }
        });

        setOtp(newOtp);
    };

    return (
        <div className="px-6 md:px-12 py-20 bg-DashboardBack min-h-screen flex items-center justify-center">
            <form className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-200" onSubmit={handleSubmit}>
                <h1 className="text-3xl font-bold text-center">
                    Verify Your Email
                </h1>

                <div className="mt-10">
                    <div
                        className="flex justify-center gap-3"
                        onPaste={handlePaste}
                    >
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputs.current[index] = el)}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) =>
                                    handleChange(e.target.value, index)
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(e, index)
                                }
                                className="w-14 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
                            />
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-8 w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 transition"
                >
                    Verify Email
                </button>

                <button
                    type="button"
                    onClick={handleResend}
                    className="mt-4 w-full text-primary font-medium hover:underline"
                >
                    Resend Verification Email
                </button>
            </form>
        </div>
    );
};

export default VerifyEmail;