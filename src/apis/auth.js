import axios from "axios"



const fetchUser = async () => {
    try {
        const response = await axios.get('/api/user');
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

const login = async (payload) => {
    try {
        const response = await axios.post('/api/user/login',{
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
        const response = await axios.post('/api/user/register',{
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
        const response = await axios.get('/api/user/logout');
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

const resetpassword = async (payload) => {
    try {
        const response = await axios.post('/api/user/resetpassword', {
            payload: payload
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}




export {fetchUser , login , register , logout , resetpassword}