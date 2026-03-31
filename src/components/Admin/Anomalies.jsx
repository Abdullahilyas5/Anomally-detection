import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const anomaliesData = [
  {
    id: 1,
    procurementId: "PP-2031",
    vendor: "Alpha Supplies Ltd",
    anomalyType: "Bid Price Spike",
    riskScore: 87,
    date: "2026-03-01",
    status: "Open",
  },
  {
    id: 2,
    procurementId: "PP-2032",
    vendor: "GreenTech Solutions",
    anomalyType: "Single Bidder",
    riskScore: 72,
    date: "2026-03-04",
    status: "Investigating",
  },
  {
    id: 3,
    procurementId: "PP-2033",
    vendor: "Nova Industries",
    anomalyType: "Contract Splitting",
    riskScore: 91,
    date: "2026-03-05",
    status: "Resolved",
  },
];

const Anomalies = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = anomaliesData.filter((a) =>
    a.vendor.toLowerCase().includes(search.toLowerCase())
  );

  const handleReport = (item) => {
    navigate("/admin/report", { state: item });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">

      {/* Header */}
      <div className="flex justify-between mb-4">

        <input
          type="text"
          placeholder="Search anomalies..."
          className="border rounded px-3 py-2 w-64"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="border rounded px-3 py-2">
          <option value="">All Types</option>
          <option>Bid Price Spike</option>
          <option>Single Bidder</option>
          <option>Contract Splitting</option>
        </select>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Procurement ID</th>
              <th className="p-3 text-left">Vendor</th>
              <th className="p-3 text-left">Anomaly Type</th>
              <th className="p-3 text-left">Risk Score</th>
              <th className="p-3 text-left">Detected Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">

                <td className="p-3">{item.procurementId}</td>
                <td className="p-3">{item.vendor}</td>
                <td className="p-3">{item.anomalyType}</td>

                <td className="p-3">
                  <span className="font-semibold">{item.riskScore}</span>
                </td>

                <td className="p-3">{item.date}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm
                    ${
                      item.status === "Open"
                        ? "bg-red-100 text-red-600"
                        : item.status === "Investigating"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-3">
                  <button
                    className="text-blue-600 hover:underline"
                    type="button"
                    onClick={() => handleReport(item)}
                  >
                    Report
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Anomalies;