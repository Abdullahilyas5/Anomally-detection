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
        const response = await apiClient.post('/user/login',{
            payload : payload
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

const register = async (payload) => {
    try {
        const response = await apiClient.post('/user/register',{
            payload : payload
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

const logout = async () => {
    try {
        const response = await apiClient.get('/user/logout');
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

const resetpassword = async (payload) => {
    try {
        const response = await apiClient.post('/user/resetpassword', {
            payload: payload
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}




export {fetchUser , login , register , logout , resetpassword}