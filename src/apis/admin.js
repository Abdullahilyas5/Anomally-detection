import apiClient from "./api-client";

/**
 * =========================
 * USERS
 * =========================
 */

// Get all users
export const fetchUsers = async () => {
    try {
        const response = await apiClient.get('/users/get-all-users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

// Update user role
export const updateUserRole = async (userId, newRole) => {
    try {
        const response = await apiClient.put(
            `/users/${userId}/role`,
            { newRole }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating role:', error);
        return null;
    }
};

// Update user status (ACTIVE / BLOCKED / INACTIVE)
export const updateUserStatus = async (userId, status) => {
    try {
        const response = await apiClient.put(
            `/users/${userId}/status`,
            { status }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating status:', error);
        return null;
    }
};

// Block user (wrapper for status API)
export const blockUser = async (userId) => {
    try {
        const response = await apiClient.put(
            `/users/admin/block`,
            { userId }
        );
        return response.data;
    } catch (error) {
        console.error('Error blocking user:', error);
        return null;
    }
};

// Delete user
export const deleteUser = async (userId) => {
    try {
        const response = await apiClient.delete(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        return null;
    }
};

/**
 * =========================
 * DASHBOARD
 * =========================
 */

export const getAdminDashboard = async () => {
    try {
        const response = await apiClient.get('/users/admin/dashboard');
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard:', error);
        return null;
    }
};

export const updateThreshold = async (alertThreshold) => {
  try {
    const response = await apiClient.put('/config/threshold', {
      alertThreshold,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
export const getConfig = async () => {
  try {
    const response = await apiClient.get('/config/');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};