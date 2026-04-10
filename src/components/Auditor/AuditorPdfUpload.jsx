import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaUpload, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const AuditorPdfUpload = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setUploadStatus(null);
    } else {
      alert('Please select a valid PDF file.');
      e.target.value = '';
    }
  };

  const handleUpload = async () => {
    if (!pdfFile) return;

    setIsUploading(true);
    setUploadStatus(null);

    // Simulate upload process
    setTimeout(() => {
      console.log('PDF uploaded for auditor:', pdfFile);
      setUploadStatus('success');
      setIsUploading(false);
      alert("PDF data uploaded successfully for anomaly analysis!");
    }, 3000);
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
          <FaFilePdf className="text-3xl text-primary" />
          <h1 className="text-3xl font-heading font-bold text-primary">PDF Procurement Upload</h1>
        </div>
        <p className="text-textSecondary mb-6">
          Upload procurement data in PDF format for automated extraction and anomaly detection analysis.
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
              <label className="block text-textMain font-medium mb-2">Select PDF File</label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-card hover:file:bg-buttonHover"
              />
              <p className="text-sm text-textSecondary mt-1">
                PDF should contain procurement data in a structured format (tables, forms, or clearly organized text)
              </p>
            </div>

            {/* File Info */}
            {pdfFile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-softBlue p-4 rounded-lg"
              >
                <h3 className="font-semibold text-primary mb-2">File Selected</h3>
                <div className="text-sm text-textSecondary">
                  <p><strong>Name:</strong> {pdfFile.name}</p>
                  <p><strong>Size:</strong> {(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <p><strong>Type:</strong> {pdfFile.type}</p>
                  <p><strong>Last Modified:</strong> {new Date(pdfFile.lastModified).toLocaleDateString()}</p>
                </div>
              </motion.div>
            )}

            {/* PDF Processing Info */}
            <div className="bg-background border border-borderSlate rounded-lg p-4">
              <h3 className="font-semibold text-primary mb-3">PDF Processing Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaExclamationTriangle className="text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-textMain">Data Extraction</h4>
                    <p className="text-sm text-textSecondary">
                      The system will automatically extract procurement data from tables, forms, and structured text in the PDF.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-textMain">Supported Formats</h4>
                    <p className="text-sm text-textSecondary">
                      Works best with PDFs containing clear tables, structured forms, or well-organized procurement documents.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-textMain">Required Fields</h4>
                    <p className="text-sm text-textSecondary">
                      PDF should include: Fiscal Year, Region, Country, Practice, Category, Method, Amount, Supplier, and Review details.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Processing Steps */}
            <div className="bg-background border border-borderSlate rounded-lg p-4">
              <h3 className="font-semibold text-primary mb-3">Processing Steps</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary text-card rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <span className="text-sm text-textSecondary">Extract text and tables from PDF</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary text-card rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <span className="text-sm text-textSecondary">Parse procurement data fields</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary text-card rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span className="text-sm text-textSecondary">Validate data structure and completeness</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary text-card rounded-full flex items-center justify-center text-xs font-bold">4</div>
                  <span className="text-sm text-textSecondary">Submit for anomaly detection analysis</span>
                </div>
              </div>
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={!pdfFile || isUploading}
              className="w-full bg-primary text-card py-3 px-4 rounded-md hover:bg-buttonHover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-card"></div>
                  Processing PDF...
                </>
              ) : (
                <>
                  <FaUpload />
                  Upload PDF Data
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
                  <p className="text-sm text-green-700">PDF data has been processed and extracted for anomaly analysis.</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AuditorPdfUpload;