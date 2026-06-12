import apiClient from "./api-client";

export const createFlag = async (payload) => {
  const response = await apiClient.post("/flags", payload);
  return response.data;
};

export const getFlagsByProcurement = async (procurementId) => {
  const response = await apiClient.get(`/flags/${procurementId}`);
  return response.data;
};
