import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaUpload } from 'react-icons/fa';

const AuditorManualUpload = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Manual upload data:', formData);
    alert("Procurement data uploaded successfully!");
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
          <FaFileAlt className="text-3xl text-primary" />
          <h1 className="text-3xl font-heading font-bold text-primary">Manual Procurement Upload</h1>
        </div>
        <p className="text-textSecondary mb-6">
          Manually enter procurement data for anomaly detection analysis.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card rounded-lg shadow-md p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-textMain font-medium mb-2">FY (Fiscal Year)</label>
                <input
                  type="text"
                  name="fy"
                  value={formData.fy}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                onChange={handleChange}
                rows="4"
                placeholder="Enter review details..."
                className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-card py-3 px-4 rounded-md hover:bg-buttonHover transition-colors duration-200 font-medium flex items-center justify-center gap-2"
            >
              <FaUpload />
              Upload Procurement Data
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AuditorManualUpload;