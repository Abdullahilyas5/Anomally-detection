import React, { useState } from "react";

const Configuration = () => {

  const [thresholds, setThresholds] = useState({
    low: 40,
    medium: 70,
    high: 100
  });

  const [rules, setRules] = useState({
    bidSpike: true,
    singleBidder: true,
    contractSplitting: true
  });

  const [modelSettings, setModelSettings] = useState({
    epochs: 50,
    detectionThreshold: 0.8,
    learningRate: 0.001,
    batchSize: 32
  });

  const [alertScore, setAlertScore] = useState(80);

  const handleSave = () => {
    console.log({
      thresholds,
      rules,
      modelSettings,
      alertScore
    });

    alert("Configuration Saved!");
  };

  return (
    <div className="space-y-6 p-4">

      <h2 className="text-2xl font-semibold text-gray-800">
        Detection Configuration
      </h2>

      {/* Risk Thresholds */}
      {/* <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Risk Score Thresholds</h3>

        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            value={thresholds.low}
            onChange={(e) =>
              setThresholds({ ...thresholds, low: e.target.value })
            }
            className="border p-2 rounded"
            placeholder="Low Risk"
          />

          <input
            type="number"
            value={thresholds.medium}
            onChange={(e) =>
              setThresholds({ ...thresholds, medium: e.target.value })
            }
            className="border p-2 rounded"
            placeholder="Medium Risk"
          />

          <input
            type="number"
            value={thresholds.high}
            onChange={(e) =>
              setThresholds({ ...thresholds, high: e.target.value })
            }
            className="border p-2 rounded"
            placeholder="High Risk"
          />
        </div>
      </div> */}


      {/* <div className="bg-white rounded-lg shadow-sm p-6">

        <h3 className="text-lg font-semibold mb-4">
          Model Training Settings
        </h3>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm">Epochs</label>
            <input
              type="number"
              value={modelSettings.epochs}
              onChange={(e) =>
                setModelSettings({
                  ...modelSettings,
                  epochs: e.target.value
                })
              }
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="text-sm">Detection Threshold</label>
            <input
              type="number"
              step="0.01"
              value={modelSettings.detectionThreshold}
              onChange={(e) =>
                setModelSettings({
                  ...modelSettings,
                  detectionThreshold: e.target.value
                })
              }
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="text-sm">Learning Rate</label>
            <input
              type="number"
              step="0.0001"
              value={modelSettings.learningRate}
              onChange={(e) =>
                setModelSettings({
                  ...modelSettings,
                  learningRate: e.target.value
                })
              }
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="text-sm">Batch Size</label>
            <input
              type="number"
              value={modelSettings.batchSize}
              onChange={(e) =>
                setModelSettings({
                  ...modelSettings,
                  batchSize: e.target.value
                })
              }
              className="border p-2 rounded w-full"
            />
          </div>

        </div>
      </div> */}

      <div className="bg-white rounded-lg shadow-sm p-6">

        <h3 className="text-lg font-semibold mb-4">Alert Threshold</h3>

        <input
          type="number"
          value={alertScore}
          onChange={(e) => setAlertScore(e.target.value)}
          className="border p-2 rounded w-32"
        />

      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Save Configuration
        </button>
      </div>

    </div>
  );
};

export default Configuration;