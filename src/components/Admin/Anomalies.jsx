import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Anomalies = () => {
  const [search, setSearch] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const navigate = useNavigate();


  const anomaliesData = [
  {
    id: 1,
    fiscalYear: "2026",
    region: "South Asia",
    country: "Pakistan",
    countryCode: "PK",
    practice: "Governance",
    category: "Goods",
    method: "Open Tender",
    amount: 120000,
    supplierCountry: "China",
    reviewType: "Post Review",
  },
  {
    id: 2,
    fiscalYear: "2025",
    region: "Africa",
    country: "Nigeria",
    countryCode: "NG",
    practice: "Infrastructure",
    category: "Works",
    method: "Direct Selection",
    amount: 98000,
    supplierCountry: "UK",
    reviewType: "Prior Review",
  },
];

  const filtered = anomaliesData.filter((a) =>
    a.country.toLowerCase().includes(search.toLowerCase()) &&
    (filterRegion ? a.region === filterRegion : true)
  );

  const handleReport = (item) => {
    navigate("/admin/report", { state: item });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">

        <input
          type="text"
          placeholder="Search by country..."
          className="border rounded-lg px-4 py-2 w-full md:w-64 focus:ring-2 focus:ring-primary outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-2 w-full md:w-48"
          onChange={(e) => setFilterRegion(e.target.value)}
        >
          <option value="">All Regions</option>
          <option>South Asia</option>
          <option>Africa</option>
        </select>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">FY</th>
              <th className="p-3 text-left">Region</th>
              <th className="p-3 text-left">Country</th>
              <th className="p-3 text-left">Practice</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Method</th>
              <th className="p-3 text-left">Amount ($)</th>
              <th className="p-3 text-left">Supplier</th>
              <th className="p-3 text-left">Review</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">

                <td className="p-3">{item.fiscalYear}</td>
                <td className="p-3">{item.region}</td>
                <td className="p-3 font-medium">{item.country}</td>
                <td className="p-3">{item.practice}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.method}</td>

                <td className="p-3 font-semibold text-primary">
                  ${item.amount.toLocaleString()}
                </td>

                <td className="p-3">{item.supplierCountry}</td>

                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs
                    ${item.reviewType === "Prior Review"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"}
                  `}>
                    {item.reviewType}
                  </span>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => handleReport(item)}
                    className="text-primary hover:underline"
                  >
                    View
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
