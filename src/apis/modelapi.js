import axios from "axios";
import apiClient from "./api-client";

export const createProcurement = async (data) => {
  try {
    const response = await apiClient.post(`/procurement/predict`, data);
    return response.data;
  } catch (error) {
    console.error("Create Procurement API error:", error);
    throw error;
  }
};


export const getAllProcurements = async () => {
  try {
    const response = await apiClient.get(`/procurement/all`);
    return response.data;
  } catch (error) {
    console.error("Fetch procurements error:", error);
    throw error;
  }
};