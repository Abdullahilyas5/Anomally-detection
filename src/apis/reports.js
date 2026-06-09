import apiClient from "./api-client";

const getSummaryReport = async (params = {}) => {
  const response = await apiClient.get('/reports/summary', { params });
  return response.data;
};

const getExecutiveReport = async (params = {}) => {
  const response = await apiClient.get('/reports/executive', { params });
  return response.data;
};

const getComplianceReport = async (params = {}) => {
  const response = await apiClient.get('/reports/compliance', { params });
  return response.data;
};

const getIncidentReport = async (params = {}) => {
  const response = await apiClient.get('/reports/incident', { params });
  return response.data;
};

const getIncidentReportById = async (id, params = {}) => {
  const response = await apiClient.get(`/reports/incident/${id}`, { params });
  return response.data;
};

const sendReportEmail = async (payload) => {
  const response = await apiClient.post('/reports/send', payload);
  return response.data;
};

// Generates correct URL for direct browser downloading of PDFs
const getReportPdfUrl = (type, params = {}) => {
  const baseUrl = apiClient.defaults.baseURL || "http://localhost:9000/api";
  const queryParams = new URLSearchParams({ ...params, format: 'pdf' }).toString();
  return `${baseUrl}/reports/${type}?${queryParams}`;
};

export {
  getSummaryReport,
  getExecutiveReport,
  getComplianceReport,
  getIncidentReport,
  getIncidentReportById,
  sendReportEmail,
  getReportPdfUrl,
};
