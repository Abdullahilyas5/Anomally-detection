import React, { useEffect, useState } from "react";
import Button from "../../components/button"; // your button component
import axios from "axios";

const ReviewAnomalies = () => {
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch anomaly summaries from API
  useEffect(() => {
    axios.get("/api/anomalies-summary") // endpoint returns only file name + short description
      .then(res => {
        // Add a local field for auditor comment
        const dataWithComments = res.data.map(a => ({
          ...a,
          auditorComment: ""
        }));
        setAnomalies(dataWithComments);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Handle auditor comment change
  const handleCommentChange = (id, comment) => {
    setAnomalies(prev =>
      prev.map(a => (a.id === id ? { ...a, auditorComment: comment } : a))
    );
  };

  // Handle save (or report) — send auditor comments to API
  const saveComments = () => {
    axios.post("/api/anomalies-comments", anomalies)
      .then(res => {
        alert("Comments saved successfully!");
      })
      .catch(err => {
        console.error(err);
        alert("Failed to save comments.");
      });
  };

  if (loading) return <p>Loading anomalies...</p>;
  if (anomalies.length === 0) return <p>No anomalies found.</p>;

  return (
    <div className="p-6 h-screen flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Review Anomalies</h2>

      <div className="flex-1 overflow-auto space-y-4">
        {anomalies.map(a => (
          <div
            key={a.id}
            className="border rounded p-4 bg-gray-50 flex flex-col gap-2"
          >
            <p><strong>File:</strong> {a.file_name}</p>
            <p><strong>Anomaly:</strong> {a.short_description}</p>
            <div>
              <label className="block mb-1 font-medium">Auditor Comment:</label>
              <textarea
                className="border rounded w-full p-2"
                rows={2}
                value={a.auditorComment}
                onChange={e => handleCommentChange(a.id, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button
          text="Save Comments"
          cls="bg-blue-500 text-white px-4 py-2"
          func={saveComments}
        />
      </div>
    </div>
  );
};

export default ReviewAnomalies;