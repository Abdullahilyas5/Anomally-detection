import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCog, FaBrain, FaChartLine, FaDatabase } from 'react-icons/fa';

const ModelConfiguration = () => {
  const [config, setConfig] = useState({
    epochs: 100,
    threshold: 0.5,
    learningRate: 0.001,
    batchSize: 32,
    validationSplit: 0.2,
    earlyStopping: true,
    patience: 10,
    minDelta: 0.001,
    modelType: 'autoencoder',
    optimizer: 'adam',
    lossFunction: 'mse',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Model configuration saved:', config);
    alert('Model configuration saved successfully!');
  };

  const resetToDefaults = () => {
    setConfig({
      epochs: 100,
      threshold: 0.5,
      learningRate: 0.001,
      batchSize: 32,
      validationSplit: 0.2,
      earlyStopping: true,
      patience: 10,
      minDelta: 0.001,
      modelType: 'autoencoder',
      optimizer: 'adam',
      lossFunction: 'mse',
    });
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
          <FaCog className="text-3xl text-primary" />
          <h1 className="text-3xl font-heading font-bold text-primary">Model Configuration</h1>
        </div>
        <p className="text-textSecondary mb-8">
          Configure the parameters for the anomaly detection model training and inference.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Training Parameters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-lg shadow-md p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <FaBrain className="text-primary" />
              <h2 className="text-xl font-semibold text-primary">Training Parameters</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-textMain font-medium mb-2">Epochs</label>
                <input
                  type="number"
                  name="epochs"
                  value={config.epochs}
                  onChange={handleChange}
                  min="1"
                  max="1000"
                  className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-textSecondary mt-1">Number of training iterations</p>
              </div>
              <div>
                <label className="block text-textMain font-medium mb-2">Learning Rate</label>
                <input
                  type="number"
                  name="learningRate"
                  value={config.learningRate}
                  onChange={handleChange}
                  step="0.0001"
                  min="0.0001"
                  max="1"
                  className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-textSecondary mt-1">Step size for optimization</p>
              </div>
              <div>
                <label className="block text-textMain font-medium mb-2">Batch Size</label>
                <input
                  type="number"
                  name="batchSize"
                  value={config.batchSize}
                  onChange={handleChange}
                  min="1"
                  max="512"
                  className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-textSecondary mt-1">Samples per training step</p>
              </div>
              <div>
                <label className="block text-textMain font-medium mb-2">Validation Split</label>
                <input
                  type="number"
                  name="validationSplit"
                  value={config.validationSplit}
                  onChange={handleChange}
                  step="0.01"
                  min="0.1"
                  max="0.5"
                  className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-textSecondary mt-1">Fraction of data for validation</p>
              </div>
            </div>
          </motion.div>

          {/* Detection Parameters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-lg shadow-md p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <FaChartLine className="text-primary" />
              <h2 className="text-xl font-semibold text-primary">Detection Parameters</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-textMain font-medium mb-2">Anomaly Threshold</label>
                <input
                  type="number"
                  name="threshold"
                  value={config.threshold}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  max="1"
                  className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-textSecondary mt-1">Threshold for anomaly detection (0-1)</p>
              </div>
            </div>
          </motion.div>

          {/* Early Stopping */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-lg shadow-md p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <FaDatabase className="text-primary" />
              <h2 className="text-xl font-semibold text-primary">Early Stopping</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="earlyStopping"
                  checked={config.earlyStopping}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-textMain font-medium">Enable Early Stopping</label>
              </div>
              {config.earlyStopping && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                  <div>
                    <label className="block text-textMain font-medium mb-2">Patience</label>
                    <input
                      type="number"
                      name="patience"
                      value={config.patience}
                      onChange={handleChange}
                      min="1"
                      max="100"
                      className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-textSecondary mt-1">Epochs to wait before stopping</p>
                  </div>
                  <div>
                    <label className="block text-textMain font-medium mb-2">Min Delta</label>
                    <input
                      type="number"
                      name="minDelta"
                      value={config.minDelta}
                      onChange={handleChange}
                      step="0.0001"
                      min="0"
                      className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-textSecondary mt-1">Minimum change to qualify as improvement</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Model Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold text-primary mb-4">Model Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-textMain font-medium mb-2">Model Type</label>
                <select
                  name="modelType"
                  value={config.modelType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="autoencoder">Autoencoder</option>
                  <option value="isolation_forest">Isolation Forest</option>
                  <option value="one_class_svm">One-Class SVM</option>
                </select>
              </div>
              <div>
                <label className="block text-textMain font-medium mb-2">Optimizer</label>
                <select
                  name="optimizer"
                  value={config.optimizer}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="adam">Adam</option>
                  <option value="sgd">SGD</option>
                  <option value="rmsprop">RMSprop</option>
                </select>
              </div>
              <div>
                <label className="block text-textMain font-medium mb-2">Loss Function</label>
                <select
                  name="lossFunction"
                  value={config.lossFunction}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-borderSlate rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="mse">Mean Squared Error</option>
                  <option value="mae">Mean Absolute Error</option>
                  <option value="huber">Huber Loss</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex gap-4"
          >
            <button
              type="submit"
              className="bg-primary text-card py-3 px-6 rounded-md hover:bg-buttonHover transition-colors duration-200 font-medium"
            >
              Save Configuration
            </button>
            <button
              type="button"
              onClick={resetToDefaults}
              className="bg-textSecondary text-card py-3 px-6 rounded-md hover:bg-textMain transition-colors duration-200 font-medium"
            >
              Reset to Defaults
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default ModelConfiguration;