import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/input';
import Button from '../../components/button';
import { forgotPassword, resetpassword } from '../../apis/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft } from 'react-icons/fa';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); // 1: request_otp, 2: verify_otp_and_reset
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const otpInputs = useRef([]);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Email is required.');
      return;
    }
    setLoading(true);
    try {
      const response = await forgotPassword({ email: email.trim() });
      if (response && response.success) {
        toast.success('Password reset OTP sent to your email.');
        setStep(2);
      } else {
        toast.error(response?.message || 'Email does not exist.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 4) {
      toast.error('Please enter a 4-digit OTP.');
      return;
    }
    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const response = await resetpassword({
        email: email.trim(),
        otp: otpCode,
        newPassword: newPassword.trim(),
      });
      if (response && response.success) {
        toast.success('Password reset successfully! Redirecting...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(response?.message || 'Invalid or expired OTP.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  return (
    <div className='flex w-full h-full min-h-screen p-6 justify-center items-center bg-DashboardBack'>
      <div className='w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100 relative'>
        <button
          onClick={() => (step === 2 ? setStep(1) : navigate('/login'))}
          className='absolute top-4 left-4 text-gray-500 hover:text-primary transition-transform duration-200 hover:-translate-x-1 flex items-center gap-1 text-sm'
        >
          <FaArrowLeft /> Back
        </button>

        <h2 className='text-2xl font-bold text-primary mb-6 text-center mt-4'>
          {step === 1 ? 'Forgot Password' : 'Reset Password'}
        </h2>

        {step === 1 ? (
          <form onSubmit={handleRequestOtp} className='flex flex-col gap-4'>
            <p className='text-sm text-gray-600 text-center mb-2'>
              Enter your email address to receive a 4-digit password recovery code.
            </p>
            <div className='flex flex-col gap-1'>
              <label htmlFor='email' className='text-sm font-semibold text-primary'>
                Email Address
              </label>
              <input
                id='email'
                type='email'
                placeholder='Enter your email'
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 transition font-semibold mt-2'
            >
              {loading ? 'Sending Code...' : 'Send Recovery OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className='flex flex-col gap-4'>
            <p className='text-sm text-gray-600 text-center mb-2'>
              Enter the 4-digit code sent to <strong>{email}</strong> and set your new password.
            </p>

            <div className='flex flex-col gap-2'>
              <label className='text-sm font-semibold text-primary text-center'>
                Enter 4-Digit OTP
              </label>
              <div className='flex justify-center gap-3 my-2'>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputs.current[index] = el)}
                    type='text'
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    className='w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition'
                  />
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor='newPassword' className='text-sm font-semibold text-primary'>
                New Password
              </label>
              <input
                id='newPassword'
                type='password'
                placeholder='New password'
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor='confirmPassword' className='text-sm font-semibold text-primary'>
                Confirm New Password
              </label>
              <input
                id='confirmPassword'
                type='password'
                placeholder='Confirm new password'
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 transition font-semibold mt-2'
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
      <ToastContainer position='top-right' autoClose={4000} />
    </div>
  );
};

export default ForgotPasswordPage;