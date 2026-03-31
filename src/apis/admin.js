import axios from "axios";
import apiClient from "./api-client";

const fetchUsers = async () => {
    try {
        const response = await apiClient.get('/admin/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }   
}

const updateUserRole = async (userId, newRole) => {
    try {
        const response = await apiClient.put(`/admin/users/${userId}/role`, { role: newRole });
        return response.data;
    } catch (error) {
        console.error('Error updating user role:', error);
        return null;
    }
}

const blockUser = async (userId) => {
    try {
        const response = await apiClient.put(`/admin/users/${userId}/block`);
        return response.data;
    } catch (error) {
        console.error('Error blocking user:', error);
        return null;
    }
}   

export { fetchUsers, updateUserRole, blockUser }