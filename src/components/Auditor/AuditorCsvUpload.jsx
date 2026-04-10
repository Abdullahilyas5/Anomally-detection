import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileCsv, FaUpload, FaCheckCircle } from 'react-icons/fa';

const AuditorCsvUpload = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      setUploadStatus(null);
    } else {
      alert('Please select a valid CSV file.');
      e.target.value = '';
    }
  };

  const handleUpload = async () => {
    if (!csvFile) return;

    setIsUploading(true);
    setUploadStatus(null);

    // Simulate upload process
    setTimeout(() => {
      console.log('CSV uploaded for auditor:', csvFile);
      setUploadStatus('success');
      setIsUploading(false);
      alert("CSV data uploaded successfully for anomaly analysis!");
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-background min-h-screen"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <FaFileCsv className="text-3xl text-primary" />
          <h1 className="text-3xl font-heading font-bold text-primary">CSV Procurement Upload</h1>
        </div>
        <p className="text-textSecondary mb-6">
          Upload procurement data in CSV format for automated anomaly detection analysis.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card rounded-lg shadow-md p-6"
        >
          <div className="space-y-6">
            {/* File Upload Section */}
            <div>
              <label className="block text-textMain font-medium mb-2">Select CSV File</label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-card hover:file:bg-buttonHover"
              />
              <p className="text-sm text-textSecondary mt-1">
                CSV file should contain columns: FY, Region, Country, Practice, Category, Method, Amount, Supplier, Review
              </p>
            </div>

            {/* File Info */}
            {csvFile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-softBlue p-4 rounded-lg"
              >
                <h3 className="font-semibold text-primary mb-2">File Selected</h3>
                <div className="text-sm text-textSecondary">
                  <p><strong>Name:</strong> {csvFile.name}</p>
                  <p><strong>Size:</strong> {(csvFile.size / 1024).toFixed(2)} KB</p>
                  <p><strong>Type:</strong> {csvFile.type}</p>
                </div>
              </motion.div>
            )}

            {/* CSV Format Guide */}
            <div className="bg-background border border-borderSlate rounded-lg p-4">
              <h3 className="font-semibold text-primary mb-3">Expected CSV Format</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-borderSlate">
                      <th className="text-left py-2 px-3 text-primary font-semibold">Column</th>
                      <th className="text-left py-2 px-3 text-primary font-semibold">Type</th>
                      <th className="text-left py-2 px-3 text-primary font-semibold">Example</th>
                      <th className="text-left py-2 px-3 text-primary font-semibold">Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-borderSlate/50">
                      <td className="py-2 px-3">FY</td>
                      <td className="py-2 px-3">Text</td>
                      <td className="py-2 px-3">2024</td>
                      <td className="py-2 px-3">Yes</td>
                    </tr>
                    <tr className="border-b border-borderSlate/50">
                      <td className="py-2 px-3">Region</td>
                      <td className="py-2 px-3">Text</td>
                      <td className="py-2 px-3">North America</td>
                      <td className="py-2 px-3">Yes</td>
                    </tr>
                    <tr className="border-b border-borderSlate/50">
                      <td className="py-2 px-3">Country</td>
                      <td className="py-2 px-3">Text</td>
                      <td className="py-2 px-3">United States</td>
                      <td className="py-2 px-3">Yes</td>
                    </tr>
                    <tr className="border-b border-borderSlate/50">
                      <td className="py-2 px-3">Practice</td>
                      <td className="py-2 px-3">Text</td>
                      <td className="py-2 px-3">IT Services</td>
                      <td className="py-2 px-3">Yes</td>
                    </tr>
                    <tr className="border-b border-borderSlate/50">
                      <td className="py-2 px-3">Category</td>
                      <td className="py-2 px-3">Text</td>
                      <td className="py-2 px-3">Software</td>
                      <td className="py-2 px-3">Yes</td>
                    </tr>
                    <tr className="border-b border-borderSlate/50">
                      <td className="py-2 px-3">Method</td>
                      <td className="py-2 px-3">Text</td>
                      <td className="py-2 px-3">RFP</td>
                      <td className="py-2 px-3">Yes</td>
                    </tr>
                    <tr className="border-b border-borderSlate/50">
                      <td className="py-2 px-3">Amount</td>
                      <td className="py-2 px-3">Number</td>
                      <td className="py-2 px-3">50000</td>
                      <td className="py-2 px-3">Yes</td>
                    </tr>
                    <tr className="border-b border-borderSlate/50">
                      <td className="py-2 px-3">Supplier</td>
                      <td className="py-2 px-3">Text</td>
                      <td className="py-2 px-3">ABC Corp</td>
                      <td className="py-2 px-3">Yes</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Review</td>
                      <td className="py-2 px-3">Text</td>
                      <td className="py-2 px-3">Review details...</td>
                      <td className="py-2 px-3">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={!csvFile || isUploading}
              className="w-full bg-primary text-card py-3 px-4 rounded-md hover:bg-buttonHover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-card"></div>
                  Processing CSV...
                </>
              ) : (
                <>
                  <FaUpload />
                  Upload CSV Data
                </>
              )}
            </button>

            {/* Upload Status */}
            {uploadStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3"
              >
                <FaCheckCircle className="text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-800">Upload Successful</h3>
                  <p className="text-sm text-green-700">CSV data has been processed and is ready for anomaly analysis.</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AuditorCsvUpload;