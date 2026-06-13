import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFileCsv,
  FaUpload,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { createCsvProcurement } from "../../apis/modelapi";

const AuditorCsvUpload = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    setError("");
    setSuccess(false);
    setResult(null);

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a valid CSV file.");
      return;
    }

    setCsvFile(file);
  };

  const handleDetectAnomalies = async () => {
    if (!csvFile) {
      setError("Please select a CSV file first.");
      return;
    }

    try {
      setIsUploading(true);
      setError("");
      setSuccess(false);

      const formData = new FormData();
      formData.append("file", csvFile);

      const response = await createCsvProcurement(formData);

      console.log("CSV RESPONSE:", response);

      // IMPORTANT FIX
      const apiData = response?.data;

      setResult({
        saved: apiData?.saved || [],
        predictions: apiData?.predictions || [],
      });

      setSuccess(true);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Failed to process CSV file."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const predictions = result?.predictions || [];
  const saved = result?.saved || [];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center">
            <FaFileCsv />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Auditor CSV Upload
            </h2>
            <p className="text-sm text-gray-500">
              Upload procurement records and detect anomalies.
            </p>
          </div>
        </div>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-gray-50">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="w-full"
          />

          {csvFile && (
            <div className="mt-3 text-sm text-gray-600">
              Selected File:
              <span className="font-semibold ml-2 text-gray-900">
                {csvFile.name}
              </span>
            </div>
          )}
        </div>

        {/* Success */}
        {success && (
          <div className="mt-4 flex items-center gap-2 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700">
            <FaCheckCircle />
            CSV processed successfully.
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
            <FaExclamationTriangle />
            {error}
          </div>
        )}

        {/* Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleDetectAnomalies}
          disabled={isUploading}
          className="mt-6 w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-gray-900 transition"
        >
          {isUploading ? "Processing..." : "Detect Anomalies"}
        </motion.button>

        {/* Debug */}
        {result && (
          <div className="mt-4 text-xs text-gray-400">
            Predictions Found: {predictions.length}
          </div>
        )}
      </div>

      {/* Predictions */}
      {predictions.length > 0 && (
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-5">
            Risk Predictions
          </h3>

          <div className="grid gap-4">
            {predictions.map((prediction, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold">
                    {prediction.bidder_id}
                  </h4>

                  <p className="text-sm text-gray-500">
                    Risk Score: {prediction.risk_score}
                  </p>

                  <p className="text-sm text-gray-500">
                    Flags:{" "}
                    {Object.entries(prediction.flags || {})
                      .filter(([_, value]) => value)
                      .map(([key]) => key)
                      .join(", ") || "None"}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    prediction.risk_level === "High"
                      ? "bg-red-100 text-red-700"
                      : prediction.risk_level === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {prediction.risk_level}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Saved Records */}
      {saved.length > 0 && (
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-5">
            Saved Records
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Bidder</th>
                  <th className="text-left p-3">Country</th>
                  <th className="text-left p-3">Price</th>
                  <th className="text-left p-3">Risk Level</th>
                </tr>
              </thead>

              <tbody>
                {saved.map((record) => (
                  <tr key={record.id} className="border-b">
                    <td className="p-3">{record.bidder_id}</td>
                    <td className="p-3">{record.country}</td>
                    <td className="p-3">
                      {record.bid_price?.toLocaleString()}
                    </td>
                    <td className="p-3">
                      {record.risk_level}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditorCsvUpload;