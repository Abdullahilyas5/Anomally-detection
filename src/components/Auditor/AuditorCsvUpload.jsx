import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFileCsv, FaUpload, FaCheckCircle } from "react-icons/fa";
import { createCsvProcurement } from "../../apis/modelapi";

const AuditorCsvUpload = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setSuccess(false);
    setError("");

    if (!file) return;

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setError("Please upload a valid CSV file");
      return;
    }

    setCsvFile(file);
  };

  const handleDetectAnomalies = async () => {
    if (!csvFile) {
      setError("Please select a CSV file first");
      return;
    }

    try {
      setIsUploading(true);
      setError("");
      setSuccess(false);

      const formData = new FormData();
      formData.append("file", csvFile); // IMPORTANT: backend expects "file"

      const response = await createCsvProcurement(formData);

      console.log("Upload Response:", response);

      setSuccess(true);
      setCsvFile(null);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Failed to process CSV file"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <FaFileCsv /> Auditor CSV Upload
      </h2>

      {/* File Input */}
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4 block w-full border p-2 rounded"
      />

      {/* Selected file */}
      {csvFile && (
        <p className="text-sm text-gray-600 mb-2">
          Selected: <b>{csvFile.name}</b>
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}

      {/* Success */}
      {success && (
        <p className="text-green-600 text-sm mb-2 flex items-center gap-1">
          <FaCheckCircle /> CSV processed successfully
        </p>
      )}

      {/* Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleDetectAnomalies}
        disabled={isUploading}
        className={`w-full flex items-center justify-center gap-2 p-2 rounded text-white ${
          isUploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        <FaUpload />
        {isUploading ? "Processing..." : "Detect Anomalies"}
      </motion.button>
    </div>
  );
};

export default AuditorCsvUpload;