import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaChartLine, FaCog, FaQuestionCircle } from 'react-icons/fa';

const Docs = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: <FaBook /> },
    { id: 'analysis', label: 'How Analysis Works', icon: <FaChartLine /> },
    { id: 'faq', label: 'FAQ', icon: <FaQuestionCircle /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Anomaly Detection Software Overview
            </h2>

            <p className="text-textSecondary mb-4">
              This software is designed to analyze procurement reports and automatically detect unusual patterns, inconsistencies, and potential anomalies.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-softBlue p-4 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Purpose</h3>
                <p className="text-sm text-textSecondary">
                  Helps organizations identify suspicious or abnormal patterns in procurement data.
                </p>
              </div>

              <div className="bg-softBlue p-4 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Use Case</h3>
                <p className="text-sm text-textSecondary">
                  Used for reviewing reports, detecting irregular activities, and improving transparency.
                </p>
              </div>
            </div>
          </div>
        );

      case 'analysis':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
              How Analysis Works
            </h2>

            <div className="space-y-4">
              <div className="border border-borderSlate rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">
                  Data Input
                </h3>
                <p className="text-textSecondary">
                  The system takes procurement reports as input (CSV or structured data).
                </p>
              </div>

              <div className="border border-borderSlate rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">
                  Processing
                </h3>
                <p className="text-textSecondary">
                  The software scans patterns, compares values, and identifies irregular behaviors or mismatches.
                </p>
              </div>

              <div className="border border-borderSlate rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">
                  Output
                </h3>
                <p className="text-textSecondary">
                  It generates a report highlighting suspicious entries for further review.
                </p>
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <div className="border border-borderSlate rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">
                  What does this software do?
                </h3>
                <p className="text-textSecondary">
                  It analyzes procurement reports and highlights unusual or suspicious patterns.
                </p>
              </div>

              <div className="border border-borderSlate rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">
                  What kind of files can I upload?
                </h3>
                <p className="text-textSecondary">
                  Typically structured report files such as CSV or system-generated datasets.
                </p>
              </div>

              <div className="border border-borderSlate rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">
                  Is manual review still needed?
                </h3>
                <p className="text-textSecondary">
                  Yes, the system assists analysis but final decisions should be made by auditors or reviewers.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-background min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <FaBook className="text-3xl text-primary" />
          <h1 className="text-3xl font-heading font-bold text-primary">
            Documentation
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-card rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-primary mb-4">
                Contents
              </h2>

              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-primary text-card shadow-md'
                        : 'text-textSecondary hover:text-primary hover:bg-softBlue'
                    }`}
                  >
                    {section.icon}
                    <span className="text-left">{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-3/4">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-lg shadow-md p-6"
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Docs;