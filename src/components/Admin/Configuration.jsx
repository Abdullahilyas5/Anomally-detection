import React, { useEffect, useState } from "react";
import { getConfig, updateThreshold } from "../../apis/admin";


const Configuration = () => {
  const [alertScore, setAlertScore] = useState(0.8);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // 🔥 LOAD CONFIG ON PAGE LOAD
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);

        const res = await getConfig();

        if (res?.data?.alertThreshold !== undefined) {
          setAlertScore(res.data.alertThreshold);
        }

      } catch (err) {
        console.error("Failed to load config:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  // 🔥 SAVE TO BACKEND
  const handleSave = async () => {
    try {
      setSaving(true);

      const res = await updateThreshold(Number(alertScore));

      console.log("Updated config:", res);

      alert("Configuration Saved!");

    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save configuration");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-4">

      <h2 className="text-2xl font-semibold text-gray-800">
        Detection Configuration
      </h2>

      {/* LOADING STATE */}
      {loading && (
        <p className="text-gray-500">Loading configuration...</p>
      )}

      {/* ALERT THRESHOLD */}
      <div className="bg-white rounded-lg shadow-sm p-6">

        <h3 className="text-lg font-semibold mb-4">
          Alert Threshold
        </h3>

        <input
          type="number"
          step="0.01"
          value={alertScore}
          onChange={(e) => setAlertScore(e.target.value)}
          className="border p-2 rounded w-32"
        />

      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-2 rounded text-white ${
            saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {saving ? "Saving..." : "Save Configuration"}
        </button>
      </div>

    </div>
  );
};

export default Configuration;