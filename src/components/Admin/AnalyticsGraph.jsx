import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  ReferenceLine,
  ReferenceDot
} from "recharts";

const COLORS = ["#ff4d4f", "#faad14", "#1890ff", "#52c41a"];

const formatAnomalyType = (type = "other") =>
  String(type)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const AnalyticsGraph = ({ data }) => {
  const anomalyData = (data.anomalyTimeline || []).map(item => ({
    date: item.date,
    anomalies: item.count
  }));

  const distributionData = (data.anomalyDistribution || []).map(item => ({
    name: formatAnomalyType(item.anomaly_type),
    value: item.value
  }));

  // ✅ FIX: extract threshold safely
  const threshold =
    data?.alertThreshold?.alertThreshold ?? 0;

  return (
    <div className="bg-white rounded-md shadow-lg p-2 mt-4">

      {/* LINE CHART */}
      <div className="grid grid-cols-1 p-4 my-4 min-h-96">

        <div className="flex md:flex-row flex-col justify-between mx-4 p-4">
          <h2 className="text-2xl text-primary font-bold">
            Anomalies Detected Over Time
          </h2>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={anomalyData}>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            {/* ✅ DYNAMIC THRESHOLD LINE */}
            <ReferenceLine
              y={threshold}
              stroke="red"
              strokeDasharray="5 5"
              label={{
                value: `Alert Threshold (${threshold})`,
                position: "top",
                fill: "red"
              }}
            />

            {/* Optional: highlight points above threshold */}
            {anomalyData.map((entry, index) =>
              entry.anomalies > threshold ? (
                <ReferenceDot
                  key={index}
                  x={entry.date}
                  y={entry.anomalies}
                  r={5}
                  fill="red"
                  stroke="red"
                />
              ) : null
            )}

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

      {/* PIE CHART */}
      <div className="grid p-2 grid-cols-1 md:grid-cols-1 gap-4">

        <div className="min-h-96 min-w-full h-full my-2 bg-background py-4 rounded-lg p-4 mb-10">

          <h3 className="text-sm font-semibold mb-2">
            Anomaly Distribution
          </h3>

          <ResponsiveContainer width="100%" height="90%">
            <PieChart>

              <Pie
                data={distributionData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {distributionData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
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