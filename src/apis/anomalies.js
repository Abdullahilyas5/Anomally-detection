import apiClient from "./api-client";
import { createFlag } from "./flags";

export const getAllAnomalies = async (params = {}) => {
  const response = await apiClient.get("/anomalies", { params });
  return response.data;
};

export const createAnomaly = async (payload) => {
  const response = await apiClient.post("/anomalies", payload);
  return response.data;
};

export const evaluateAnomaly = async (procurementId) => {
  const response = await apiClient.post(`/anomalies/evaluate/${procurementId}`);
  return response.data;
};

export const getType = async () => {
  const response = await apiClient.get(`/anomalies/type`);
  return response.data;
};

export const markProcurementAsAnomaly = async ({
  procurementId,
  description,
  severity = "medium",
  flagType = "suspicious",
}) => {
  const flag = await createFlag({
    procurement_id: procurementId,
    flag_type: flagType,
    description: description || "Marked as anomaly by auditor",
  });

  const severityMap = {
    Low: "low",
    Medium: "medium",
    High: "high",
    Critical: "critical",
  };

  const anomaly = await createAnomaly({
    procurement_id: procurementId,
    title: `Anomaly - Procurement #${procurementId}`,
    description: description || "Marked as anomaly by auditor",
    anomaly_type: "other",
    severity: severityMap[severity] || severity,
    evidence: flag?.id ? [flag.id] : [],
  });

  return { flag, anomaly };
};
