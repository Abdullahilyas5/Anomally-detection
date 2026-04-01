import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CSVViewer = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const file = location.state?.file;

  useEffect(() => {
    if (!file || !(file instanceof Blob)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text
        .split("\n")
        .filter(row => row.trim() !== "")
        .map(row => row.split(","));
      setData(rows);
    };
    reader.readAsText(file);
  }, [file]);

  if (!file || !(file instanceof Blob)) {
    return <p className="p-6">Invalid or missing file</p>;
  }

  return (
    <div className="flex-1 p-6 h-screen overflow-hidden flex flex-col">
      <h2 className="text-lg font-semibold mb-4">CSV Preview</h2>

      {/* Scrollable table container */}
      <div className="flex-1 overflow-auto border rounded">
        <table className="min-w-max w-full border-collapse">
          <thead className="bg-gray-100 sticky top-0">
            {data.length > 0 && (
              <tr>
                {data[0].map((cell, i) => (
                  <th
                    key={i}
                    className="px-3 py-2 border text-left font-semibold whitespace-nowrap"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            )}
          </thead>

          <tbody>
            {data.slice(1).map((row, i) => (
              <tr key={i} className="border-b">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="px-3 py-2 border whitespace-nowrap"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CSVViewer;