import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutModal = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-center">
                {/* Icon or heading */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Logout Confirmation</h2>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to logout? You will need to login again to access your account.
                </p>
                {/* Buttons */}
                <div className="flex justify-center gap-4">
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-200"
                    >
                        Yes, Logout
                    </button>
                    <button 
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-5 rounded-lg transition-colors duration-200"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LogoutModal;