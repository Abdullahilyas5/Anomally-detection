import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
  PieChart,
  BarChart,
  Bar,
  Cell,
  Legend,
  ReferenceLine
} from "recharts";

import {
  ScatterChart, Scatter,
} from "recharts";

const COLORS = ["#ff4d4f", "#faad14", "#1890ff", "#52c41a"];

const AnalyticsGraph = () => {

  const [dates, setDates] = useState({
    from: "",
    to: ""
  });

  const anomalyData = [
    { date: "2026-03-01", anomalies: 3 },
    { date: "2026-03-02", anomalies: 8 },
    { date: "2026-03-03", anomalies: 2 },
    { date: "2026-03-04", anomalies: 12 },
    { date: "2026-03-05", anomalies: 6 },
  ];

  const heatmapData = [
    { month: "Jan", "2022": 5, "2023": 12, "2024": 8, "2025": 15, "2026": 10 },
    { month: "Feb", "2022": 8, "2023": 10, "2024": 5, "2025": 12, "2026": 7 },
    { month: "Mar", "2022": 12, "2023": 7, "2024": 9, "2025": 14, "2026": 11 },
    { month: "Apr", "2022": 6, "2023": 8, "2024": 10, "2025": 6, "2026": 9 },
    { month: "May", "2022": 11, "2023": 15, "2024": 12, "2025": 10, "2026": 8 },
    { month: "Jun", "2022": 9, "2023": 11, "2024": 7, "2025": 13, "2026": 14 },
    { month: "Jul", "2022": 5, "2023": 6, "2024": 8, "2025": 9, "2026": 7 },
    { month: "Aug", "2022": 7, "2023": 10, "2024": 5, "2025": 8, "2026": 6 },
    { month: "Sep", "2022": 10, "2023": 12, "2024": 9, "2025": 11, "2026": 10 },
    { month: "Oct", "2022": 8, "2023": 7, "2024": 12, "2025": 15, "2026": 13 },
    { month: "Nov", "2022": 6, "2023": 5, "2024": 8, "2025": 9, "2026": 7 },
    { month: "Dec", "2022": 12, "2023": 14, "2024": 10, "2025": 12, "2026": 15 }
  ];

  const heatmapPoints = [];

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  heatmapData.forEach((row, monthIndex) => { // monthIndex 0..11
    Object.keys(row).forEach((key) => {
      if (key !== "month") {
        heatmapPoints.push({
          year: parseInt(key),
          month: monthIndex + 1, // ScatterChart y-axis 1..12
          value: row[key]
        });
      }
    });
  });

  const distributionData = [
    { name: "Fraud Risk", value: 12 },
    { name: "Over Budget", value: 8 },
    { name: "Duplicate Tender", value: 5 },
    { name: "Suspicious Vendor", value: 9 }
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;

    setDates((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const filteredData = anomalyData.filter((item) => {

    if (!dates.from || !dates.to) return true;

    return item.date >= dates.from && item.date <= dates.to;

  });

  return (
    <div className="bg-white rounded-md shadow-lg p-2 mt-4 ">
      <div className=" grid grid-cols-1 p-4 my-4 min-h-96">

        <div className="flex md:flex-row flex-col justify-between mx-4 p-4">

          <h2 className="text-2xl text-primary font-bold">
            Anomalies Detected Over Time
          </h2>

          <div className="flex md:flex-row flex-col gap-4">

            <div className="flex gap-4 items-center">
              <label htmlFor="from">From</label>
              <input
                type="date"
                id="from"
                value={dates.from}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
            </div>

            <div className="flex gap-4 items-center">
              <label htmlFor="to">To</label>
              <input
                type="date"
                id="to"
                value={dates.to}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
            </div>

          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" tickFormatter={(date) =>
              new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric"
              })
            }
            />

            <YAxis dataKey="anomalies" />

            <Tooltip labelFormatter={(label) => `Date: ${label}`} />

            <ReferenceLine
              y={10}
              stroke="red"
              strokeDasharray="5 5"
              label="Alert Threshold"
            />

            <Line
              type="monotone"
              dataKey="anomalies"
              stroke="#ff4d4f"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

      <div className="grid p-2 grid-cols-1 md:grid-cols-2 gap-4">


        {/* Anomaly Distribution Pie Chart */}
        <div className="min-h-96 h-full my-2 bg-softaccent rounded-lg text-wrap p-4 mb-10">
          <h3 className="text-sm font-semibold mb-2">
            Anomaly Distribution
          </h3>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distributionData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {distributionData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsGraph;