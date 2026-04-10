import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaFilePdf, FaFileCsv, FaBrain } from 'react-icons/fa';

const TrainModel = () => {
  const [activeTab, setActiveTab] = useState('manual');
  const [formData, setFormData] = useState({
    fy: '',
    region: '',
    country: '',
    practice: '',
    category: '',
    method: '',
    amount: '',
    supplier: '',
    review: '',
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [csvFile, setCsvFile] = useState(null);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Training data submitted:', formData);
    alert("Model training initiated with provided data!");
  };

  const handleFileUpload = (type) => {
    if (type === 'pdf' && pdfFile) {
      console.log('PDF uploaded for training:', pdfFile);
      alert("PDF data processed for training!");
    } else if (type === 'csv' && csvFile) {
      console.log('CSV uploaded for training:', csvFile);
      alert("CSV data processed for training!");
    }
  };

  const tabs = [
    { id: 'manual', label: 'Manual Entry', icon: <FaFileAlt /> },
    { id: 'csv', label: 'Upload CSV', icon: <FaFileCsv /> },
    { id: 'pdf', label: 'Upload PDF', icon: <FaFilePdf /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-background min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <FaBrain className="text-3xl text-primary" />
          <h1 className="text-3xl font-heading font-bold text-primary">Train Model</h1>
        </div>
        <p className="text-textSecondary mb-6">
          Configure and initiate the training process for the anomaly detection model using procurement data.
        </p>

        {/* Tabs */}
        <div className="flex space-x-1 bg-card rounded-lg p-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary text-card shadow-md'
                  : 'text-textSecondary hover:text-primary hover:bg-softBlue'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-lg shadow-md p-6"
        >
          {activeTab === 'manual' && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-textMain font-medium mb-2">FY (Fiscal Year)</label>
                  <input
                    type="text"
                    name="fy"
                    value={formData.fy}
                    onChange={handleFormChange}
                    placeholder="e.g., 2024"
                    className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-textMain font-medium mb-2">Region</label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleFormChange}
                    placeholder="e.g., North America"
                    className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-textMain font-medium mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleFormChange}
                    placeholder="e.g., United States"
                    className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-textMain font-medium mb-2">Practice</label>
                  <input
                    type="text"
                    name="practice"
                    value={formData.practice}
                    onChange={handleFormChange}
                    placeholder="e.g., IT Services"
                    className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-textMain font-medium mb-2">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    placeholder="e.g., Software"
                    className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-textMain font-medium mb-2">Method</label>
                  <input
                    type="text"
                    name="method"
                    value={formData.method}
                    onChange={handleFormChange}
                    placeholder="e.g., RFP"
                    className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-textMain font-medium mb-2">Amount ($)</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleFormChange}
                    placeholder="e.g., 50000"
                    className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-textMain font-medium mb-2">Supplier</label>
                  <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleFormChange}
                    placeholder="e.g., ABC Corp"
                    className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-textMain font-medium mb-2">Review</label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleFormChange}
                  rows="4"
                  placeholder="Enter review details..."
                  className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-card py-3 px-4 rounded-md hover:bg-buttonHover transition-colors duration-200 font-medium"
              >
                Start Training
              </button>
            </form>
          )}

          {activeTab === 'csv' && (
            <div className="space-y-4">
              <div>
                <label className="block text-textMain font-medium mb-2">Upload CSV File for Training</label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setCsvFile(e.target.files[0])}
                  className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-sm text-textSecondary mt-1">
                  CSV should contain columns: FY, Region, Country, Practice, Category, Method, Amount, Supplier, Review
                </p>
              </div>
              <button
                onClick={() => handleFileUpload('csv')}
                disabled={!csvFile}
                className="w-full bg-primary text-card py-3 px-4 rounded-md hover:bg-buttonHover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Process CSV and Start Training
              </button>
            </div>
          )}

          {activeTab === 'pdf' && (
            <div className="space-y-4">
              <div>
                <label className="block text-textMain font-medium mb-2">Upload PDF File for Training</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                  className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-sm text-textSecondary mt-1">
                  PDF should contain procurement data in a structured format
                </p>
              </div>
              <button
                onClick={() => handleFileUpload('pdf')}
                disabled={!pdfFile}
                className="w-full bg-primary text-card py-3 px-4 rounded-md hover:bg-buttonHover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Process PDF and Start Training
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TrainModel;