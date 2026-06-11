import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileCsv, FaUpload, FaCheckCircle } from 'react-icons/fa';
import { createCsvProcurement } from '../../apis/modelapi';

const AuditorCsvUpload = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [resultData, setResultData] = useState(null);

  // ================= FILE SELECT =================
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    console.log("📁 File selected:", file);

    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      setUploadStatus(null);
      setResultData(null);
    } else {
      alert('Please select a valid CSV file.');
      e.target.value = '';
    }
  };

  // ================= UPLOAD =================
  const handleUpload = async () => {
    console.log("🔥 CLICK EVENT TRIGGERED");

    if (!csvFile) {
      alert("Please select a CSV file first");
      return;
    }

    try {
      setIsUploading(true);
      setUploadStatus(null);

      const formData = new FormData();
      formData.append("file", csvFile);
      formData.append("fileName", csvFile.name);

      console.log("📡 Sending API request...");

      const response = await createCsvProcurement(formData);

      console.log("✅ API RESPONSE:", response);

      setResultData(response?.data);
      setUploadStatus("success");

    } catch (error) {
      console.error("❌ Upload Error:", error);
      setUploadStatus("error");
      alert(error?.response?.data?.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-background min-h-screen"
    >

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <FaFileCsv className="text-3xl text-primary" />
        <h1 className="text-3xl font-bold text-primary">
          CSV Procurement Upload
        </h1>
      </div>

      {/* UPLOAD BOX */}
      <div className="bg-card p-6 rounded-lg shadow-md">

        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mb-4"
        />

        {/* ✅ IMPORTANT FIX: type="button" prevents form submit issues */}
        <button
          type="button"
          onClick={handleUpload}
          disabled={!csvFile || isUploading}
          className="w-full bg-primary text-white py-3 rounded-md flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isUploading ? "Processing..." : (
            <>
              <FaUpload />
              Detect Anomalies
            </>
          )}
        </button>

        {/* STATUS */}
        {uploadStatus === "success" && (
          <div className="mt-4 flex items-center gap-2 text-green-600">
            <FaCheckCircle />
            Upload successful
          </div>
        )}

        {uploadStatus === "error" && (
          <div className="mt-4 text-red-600">
            Upload failed
          </div>
        )}
      </div>

      {/* ================= RESULTS ================= */}
      {resultData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 space-y-6"
        >

          {/* SAVED */}
          <div className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-primary mb-4">
              Saved Procurements
            </h2>

            <div className="space-y-3">
              {resultData.saved?.map((item) => (
                <div key={item.id} className="border p-3 rounded-md">
                  <p><b>ID:</b> {item.id}</p>
                  <p><b>Country:</b> {item.country}</p>
                  <p><b>Bidder:</b> {item.bidder_id}</p>
                  <p><b>Buyer:</b> {item.buyer_id}</p>
                  <p><b>Price:</b> {item.bid_price}</p>
                  <p><b>Status:</b> {item.status}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PREDICTIONS */}
          <div className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-primary mb-4">
              Risk Predictions
            </h2>

            <div className="space-y-4">
              {resultData.predictions?.map((p, index) => (
                <div key={index} className="border p-3 rounded-md">

                  <p><b>Bidder:</b> {p.bidder_id}</p>

                  <p>
                    <b>Risk Score:</b>{" "}
                    <span className="text-red-600 font-bold">
                      {p.risk_score}
                    </span>
                  </p>

                  <p><b>Risk Level:</b> {p.risk_level}</p>

                  <div className="mt-2">
                    <p className="font-semibold">Flags:</p>
                    <ul className="text-sm ml-4 list-disc">
                      <li>High MAD: {p.flags?.high_mad ? "Yes" : "No"}</li>
                      <li>Single Bid: {p.flags?.single_bid ? "Yes" : "No"}</li>
                      <li>Subcontracted: {p.flags?.subcontracted ? "Yes" : "No"}</li>
                    </ul>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </motion.div>
      )}

    </motion.div>
  );
};

export default AuditorCsvUpload;