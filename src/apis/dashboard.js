import apiClient from "./api-client";

/* =========================
   ADMIN DASHBOARD
========================= */
export const getAdminDashboard = async () => {
  try {
    const res = await apiClient.get("/users/admin/dashboard");
    return res.data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

/* =========================
   AUDITOR DASHBOARD
========================= */
export const getAuditorDashboard = async () => {
  try {
    const res = await apiClient.get("/users/auditor/dashboard");
    return res.data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

/* =========================
   CITIZEN DASHBOARD
========================= */
export const getCitizenDashboard = async () => {
  try {
    const res = await apiClient.get("/users/citizen/dashboard");
    return res.data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

/* =========================
   ADMIN USER ACTIONS
========================= */
export const approveUser = async (userId, role) => {
  try {
    const res = await apiClient.post("/users/admin/approve", {
      userId,
      role,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const declineUser = async (userId) => {
  try {
    const res = await apiClient.post("/users/admin/decline", {
      userId,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const blockUser = async (userId) => {
  try {
    const res = await apiClient.post("/users/admin/block", {
      userId,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};