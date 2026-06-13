import axios from "axios"
import apiClient from "./api-client"




const fetchUser = async () => {
    try {
        const response = await apiClient.get('/user');
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

const login = async (payload) => {
    try {
        const response = await apiClient.post('/users/login',
            payload,
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

const register = async (payload) => {
    try {
        const response = await apiClient.post('/users/register',
            payload,
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}


const verifyEmail = async (payload) => {
    try {
        const response = await apiClient.post('/otp/verify',
            payload,
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

const logout = async () => {
    try {
        const response = await apiClient.get('/users/logout');
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

const resendOTP = async (payload) => {
    try {
        const response = await apiClient.post('/otp/resend', payload);
        return response.data;
    } catch (error) {
        console.error('Error resending OTP:', error);
        return null;
    }
}

const forgotPassword = async (payload) => {
    try {
        const response = await apiClient.post('/users/forgot-password', payload);
        return response.data;
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        return null;
    }
}

const resetpassword = async (payload) => {
    try {
        const response = await apiClient.post('/users/reset-password', payload);
        return response.data;
    } catch (error) {
        console.error('Error in resetpassword:', error);
        return null;
    }
}

export { fetchUser, login, register, logout, resetpassword, verifyEmail, resendOTP, forgotPassword };