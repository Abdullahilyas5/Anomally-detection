import React, { useState, useEffect } from "react";

// Sample logs, replace with API data
const logsData = [
  {
    id: 1,
    timestamp: "2026-03-10 10:00",
    level: "INFO",
    role: "Admin",
    message: "Admin updated anomaly threshold"
  },
  {
    id: 2,
    timestamp: "2026-03-10 11:30",
    level: "WARNING",
    role: "Auditor",
    message: "Auditor viewed anomaly report"
  },
  {
    id: 3,
    timestamp: "2026-03-10 12:10",
    level: "CRITICAL",
    role: "System",
    message: "Anomaly score exceeded alert threshold"
  },
  {
    id: 4,
    timestamp: "2026-03-10 12:50",
    level: "INFO",
    role: "Admin",
    message: "Admin retrained detection model"
  },
  {
    id: 5,
    timestamp: "2026-03-10 13:10",
    level: "WARNING",
    role: "Auditor",
    message: "Auditor checked pending actions"
  },
  {
    id: 6,
    timestamp: "2026-03-10 14:00",
    level: "CRITICAL",
    role: "System",
    message: "Threshold exceeded for multiple anomalies"
  }
];

const AdminLogs = () => {

  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const logsPerPage = 5;

  useEffect(() => {
    // Replace with API call in production
    setLogs(logsData);
  }, []);

  const handleReset = () => {
    setSearch("");
    setLevelFilter("");
    setRoleFilter("");
    setFromDate("");
    setToDate("");
    setCurrentPage(1);
  };

  const filteredLogs = logs.filter((log) => {
    const logDate = new Date(log.timestamp.split(" ")[0]);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    return (
      log.message.toLowerCase().includes(search.toLowerCase()) &&
      (levelFilter ? log.level === levelFilter : true) &&
      (roleFilter ? log.role === roleFilter : true) &&
      (!from || logDate >= from) &&
      (!to || logDate <= to)
    );
  });

  const indexOfLast = currentPage * logsPerPage;
  const indexOfFirst = indexOfLast - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const levelColor = (level) => {
    switch (level) {
      case "INFO": return "bg-blue-100 text-blue-700";
      case "WARNING": return "bg-yellow-100 text-yellow-700";
      case "CRITICAL": return "bg-red-100 text-red-700";
      default: return "bg-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">

      {/* Header */}
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">System Logs</h2>
        <input
          type="text"
          placeholder="Search logs..."
          className="border rounded px-3 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="p-4 flex gap-4 flex-wrap items-center">

        <select
          className="border rounded px-3 py-2"
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
        >
          <option value="">All Levels</option>
          <option>INFO</option>
          <option>WARNING</option>
          <option>CRITICAL</option>
        </select>

        <select
          className="border rounded px-3 py-2"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option>Admin</option>
          <option>Auditor</option>
          <option>System</option>
        </select>

        <input
          type="date"
          className="border rounded px-3 py-2"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          className="border rounded px-3 py-2"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          Reset Filters
        </button>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-y">
            <tr>
              <th className="p-3 text-left text-sm font-semibold">Timestamp</th>
              <th className="p-3 text-left text-sm font-semibold">Level</th>
              <th className="p-3 text-left text-sm font-semibold">Role</th>
              <th className="p-3 text-left text-sm font-semibold">Message</th>
            </tr>
          </thead>

          <tbody>
            {currentLogs.map((log) => (
              <tr key={log.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{log.timestamp}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${levelColor(log.level)}`}>
                    {log.level}
                  </span>
                </td>
                <td className="p-3">{log.role}</td>
                <td className="p-3">{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 flex justify-between items-center">
        <button
          className="px-3 py-1 border rounded"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="px-3 py-1 border rounded"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default AdminLogs;