import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaBrain, FaChartLine, FaCog, FaQuestionCircle } from 'react-icons/fa';

const Docs = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: <FaBook /> },
    { id: 'training', label: 'Training Parameters', icon: <FaBrain /> },
    { id: 'detection', label: 'Detection Parameters', icon: <FaChartLine /> },
    { id: 'configuration', label: 'Model Configuration', icon: <FaCog /> },
    { id: 'faq', label: 'FAQ', icon: <FaQuestionCircle /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Model Documentation Overview</h2>
            <p className="text-textSecondary mb-4">
              This documentation provides comprehensive guidance on configuring and using the anomaly detection model for procurement data analysis.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-softBlue p-4 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">What is Anomaly Detection?</h3>
                <p className="text-sm text-textSecondary">
                  Anomaly detection identifies unusual patterns in procurement data that may indicate fraudulent activities, errors, or irregularities.
                </p>
              </div>
              <div className="bg-softBlue p-4 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">How It Works</h3>
                <p className="text-sm text-textSecondary">
                  The model learns normal procurement patterns and flags transactions that deviate significantly from these patterns.
                </p>
              </div>
            </div>
          </div>
        );
      case 'training':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Training Parameters</h2>
            <div className="space-y-4">
              <div className="border border-borderSlate rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">Epochs</h3>
                <p className="text-textSecondary mb-2">
                  <strong>Definition:</strong> Number of complete passes through the training dataset.
                </p>
                <p className="text-textSecondary mb-2">
                  <strong>Recommended Range:</strong> 50-500 epochs
                </p>
                <p className="text-textSecondary">
                  <strong>Impact:</strong> More epochs can improve accuracy but may lead to overfitting. Use early stopping to prevent this.
                </p>
              </div>
              <div className="border border-borderSlate rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">Learning Rate</h3>
                <p className="text-textSecondary mb-2">
                  <strong>Definition:</strong> Step size for updating model weights during training.
                </p>
                <p className="text-textSecondary mb-2">
                  <strong>Recommended Range:</strong> 0.0001 - 0.01
                </p>
                <p className="text-textSecondary">
                  <strong>Impact:</strong> Too high may cause instability, too low may slow convergence.
                </p>
              </div>
              <div className="border border-borderSlate rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">Batch Size</h3>
                <p className="text-textSecondary mb-2">
                  <strong>Definition:</strong> Number of samples processed before updating model weights.
                </p>
                <p className="text-textSecondary mb-2">
                  <strong>Recommended Range:</strong> 16-128
                </p>
                <p className="text-textSecondary">
                  <strong>Impact:</strong> Larger batches provide stable gradients but require more memory.
                </p>
              </div>
              <div className="border border-borderSlate rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">Validation Split</h3>
                <p className="text-textSecondary mb-2">
                  <strong>Definition:</strong> Fraction of training data used for validation.
                </p>
                <p className="text-textSecondary mb-2">
                  <strong>Recommended Range:</strong> 0.1 - 0.3
                </p>
                <p className="text-textSecondary">
                  <strong>Impact:</strong> Helps monitor overfitting and determine when to stop training.
                </p>
              </div>
            </div>
          </div>
        );
      case 'detection':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Detection Parameters</h2>
            <div className="space-y-4">
              <div className="border border-borderSlate rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">Anomaly Threshold</h3>
                <p className="text-textSecondary mb-2">
                  <strong>Definition:</strong> Threshold value for classifying transactions as anomalies.
                </p>
                <p className="text-textSecondary mb-2">
                  <strong>Recommended Range:</strong> 0.3 - 0.8
                </p>
                <p className="text-textSecondary mb-2">
                  <strong>How it works:</strong> Transactions with reconstruction error above this threshold are flagged as anomalies.
                </p>
                <div className="bg-softBlue p-3 rounded mt-3">
                  <p className="text-sm text-textSecondary">
                    <strong>Tip:</strong> Lower thresholds catch more anomalies but increase false positives. Higher thresholds are more conservative.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'configuration':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Model Configuration</h2>
            <div className="space-y-4">
              <div className="border border-borderSlate rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">Early Stopping</h3>
                <p className="text-textSecondary mb-2">
                  <strong>Purpose:</strong> Prevents overfitting by stopping training when validation loss stops improving.
                </p>
                <p className="text-textSecondary mb-2">
                  <strong>Parameters:</strong>
                </p>
                <ul className="list-disc list-inside text-textSecondary ml-4 mb-2">
                  <li><strong>Patience:</strong> Number of epochs to wait before stopping (recommended: 10-20)</li>
                  <li><strong>Min Delta:</strong> Minimum improvement required (recommended: 0.001-0.01)</li>
                </ul>
              </div>
              <div className="border border-borderSlate rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">Model Types</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-primary">Autoencoder</h4>
                    <p className="text-sm text-textSecondary">Neural network that learns to reconstruct input data. Best for complex patterns.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary">Isolation Forest</h4>
                    <p className="text-sm text-textSecondary">Tree-based method that isolates anomalies. Good for high-dimensional data.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary">One-Class SVM</h4>
                    <p className="text-sm text-textSecondary">Support Vector Machine for novelty detection. Effective for small datasets.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'faq':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border border-borderSlate rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">How do I choose the right threshold?</h3>
                <p className="text-textSecondary">
                  Start with 0.5 and adjust based on your tolerance for false positives vs. false negatives. Use validation data to find the optimal threshold.
                </p>
              </div>
              <div className="border border-borderSlate rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">What if my model is overfitting?</h3>
                <p className="text-textSecondary">
                  Reduce epochs, increase validation split, enable early stopping, or use regularization techniques.
                </p>
              </div>
              <div className="border border-borderSlate rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">How much training data do I need?</h3>
                <p className="text-textSecondary">
                  At least 1000 normal transactions are recommended. More diverse data leads to better anomaly detection.
                </p>
              </div>
              <div className="border border-borderSlate rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">Can I update the model with new data?</h3>
                <p className="text-textSecondary">
                  Yes, you can retrain the model with new data. Consider incremental learning for large datasets.
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
          <h1 className="text-3xl font-heading font-bold text-primary">Documentation</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-card rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-primary mb-4">Contents</h2>
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