import apiClient from "./api-client";

// ================= CREATE SINGLE =================
export const createProcurement = async (data) => {
  try {
    const response = await apiClient.post(`/procurement/predict`, data);
    return response.data;
  } catch (error) {
    console.error("Create Procurement API error:", error);
    throw error;
  }
};

// ================= CREATE CSV =================
export const createCsvProcurement = async (formData) => {
  try {
    const response = await apiClient.post(
      `/procurement/predict/csv`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return response.data; // IMPORTANT: keep consistent
  } catch (error) {
    console.error("Create CSV Procurement API error:", error);
    throw error;
  }
};

// ================= CREATE PDF =================
export const createPdfProcurement = async (formData) => {
  try {
    const response = await apiClient.post(
      `/procurement/predict/pdf`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Create PDF Procurement API error:", error);
    throw error;
  }
};

// ================= GET ALL =================
export const getAllProcurements = async (page, limit) => {
  try {
    const params = {};
    if (page != null && limit != null) {
      params.page = page;
      params.limit = limit;
    }

    const config = Object.keys(params).length ? { params } : undefined;
    const response = await apiClient.get(`/procurement/all`, config);

    const payload = response.data;
    return payload?.data ?? payload;
  } catch (error) {
    console.error("Fetch procurements error:", error);
    throw error;
  }
};

// ================= GET SINGLE =================
export const getSingleProcurement = async (id) => {
  try {
    const response = await apiClient.get(`/procurement/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching procurement ${id}:`, error);
    return null;
  }
};