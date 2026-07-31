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
  // Build URL according to backend endpoints:
  // - GET /reports/summary?format=pdf
  // - GET /reports/incident?format=pdf
  // - GET /reports/incident/{id}?format=pdf
  const baseUrl = apiClient.defaults.baseURL || "http://localhost:9000/api";

  // Determine path
  let urlPath = '';
  if (type === 'summary') {
    urlPath = '/reports/summary';
  } else if (type === 'incident') {
    // If a single anomalyId is provided, use the single-incident route
    if (params && params.anomalyId) {
      urlPath = `/reports/incident/${encodeURIComponent(params.anomalyId)}`;
    } else {
      urlPath = '/reports/incident';
    }
  } else {
    // Fallback to generic route (keeps existing behaviour for other report types)
    urlPath = `/reports/${type}`;
  }

  // Only include format=pdf for download URLs. Do NOT append tokens or extraneous query params.
  const qp = new URLSearchParams();
  qp.set('format', 'pdf');

  return `${baseUrl}${urlPath}?${qp.toString()}`;
};

const getPublicReports = async () => {
  const response = await apiClient.get('/reports/public');
  return response.data;
};

const getPublicReportDownloadUrl = (id) => {
  const baseUrl = apiClient.defaults.baseURL || "http://localhost:9000/api";
  const token = localStorage.getItem("accessToken");
  return `${baseUrl}/reports/public/download/${id}?token=${token}`;
};

export {
  getSummaryReport,
  getIncidentReport,
  getIncidentReportById,
  sendReportEmail,
  getReportPdfUrl,
  getPublicReports,
  getPublicReportDownloadUrl,
};
