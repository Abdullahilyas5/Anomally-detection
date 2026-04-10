import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaFilePdf, FaFileCsv } from 'react-icons/fa';

const AddProcurement = () => {
  const [activeTab, setActiveTab] = useState('form');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    department: '',
    deadline: '',
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [csvFile, setCsvFile] = useState(null);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleFileUpload = (type) => {
    // Handle file upload
    if (type === 'pdf' && pdfFile) {
      console.log('PDF uploaded:', pdfFile);
    } else if (type === 'csv' && csvFile) {
      console.log('CSV uploaded:', csvFile);
    }
  };

  const tabs = [
    { id: 'form', label: 'Manual Form', icon: <FaFileAlt /> },
    { id: 'pdf', label: 'Upload PDF', icon: <FaFilePdf /> },
    { id: 'csv', label: 'Upload CSV', icon: <FaFileCsv /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-background min-h-screen"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-heading font-bold text-primary mb-6">Add Procurement</h1>

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
          {activeTab === 'form' && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-textMain font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-textMain font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-textMain font-medium mb-2">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-textMain font-medium mb-2">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-textMain font-medium mb-2">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-card py-2 px-4 rounded-md hover:bg-buttonHover transition-colors duration-200"
              >
                Add Procurement
              </button>
            </form>
          )}

          {activeTab === 'pdf' && (
            <div className="space-y-4">
              <div>
                <label className="block text-textMain font-medium mb-2">Upload PDF File</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                  className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                onClick={() => handleFileUpload('pdf')}
                disabled={!pdfFile}
                className="w-full bg-primary text-card py-2 px-4 rounded-md hover:bg-buttonHover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload PDF
              </button>
            </div>
          )}

          {activeTab === 'csv' && (
            <div className="space-y-4">
              <div>
                <label className="block text-textMain font-medium mb-2">Upload CSV File</label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setCsvFile(e.target.files[0])}
                  className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                onClick={() => handleFileUpload('csv')}
                disabled={!csvFile}
                className="w-full bg-primary text-card py-2 px-4 rounded-md hover:bg-buttonHover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload CSV
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AddProcurement;