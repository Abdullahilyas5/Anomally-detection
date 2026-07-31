import React, { useState, useEffect } from "react";
import apiClient from "../../apis/api-client";

const AdminLogs = () => {

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const logsPerPage = 5;

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.get('/logs', {
          params: {
            limit: 100,
          },
        });

        const payload = response.data?.data;
        const apiLogs = Array.isArray(payload)
          ? payload
          : payload?.logs || payload?.data || [];

        setLogs(apiLogs);
      } catch (err) {
        console.error('Failed to load logs:', err);
        setError(
          err.response?.data?.message ||
          'Unable to fetch logs. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const handleReset = () => {
    setSearch("");
    setLevelFilter("");
    setRoleFilter("");
    setFromDate("");
    setToDate("");
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, levelFilter, roleFilter, fromDate, toDate]);

  const filteredLogs = logs.filter((log) => {
    const timestamp = log.created_at || log.timestamp || log.createdAt || "";
    const logDate = new Date(timestamp.toString().split(" ")[0]);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    const severity = (log.severity || log.level || "").toString();
    const role = (log.user_role || log.role || "").toString();
    const action = (log.action || "").toString();
    const message = (log.message || "").toString();

    const searchTerm = search.toLowerCase();

    return (
      (message.toLowerCase().includes(searchTerm) || action.toLowerCase().includes(searchTerm) || role.toLowerCase().includes(searchTerm)) &&
      (levelFilter ? severity.toLowerCase() === levelFilter.toLowerCase() : true) &&
      (roleFilter ? role.toLowerCase() === roleFilter.toLowerCase() : true) &&
      (!from || logDate >= from) &&
      (!to || logDate <= to)
    );
  });

  const indexOfLast = currentPage * logsPerPage;
  const indexOfFirst = indexOfLast - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / logsPerPage));

  const levelColor = (level) => {
    switch ((level || "").toString().toUpperCase()) {
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
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading logs...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">{error}</div>
        ) : currentLogs.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No logs found for the current filter selection.</div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-50 border-y">
              <tr>
                <th className="p-3 text-left text-sm font-semibold">Timestamp</th>
                <th className="p-3 text-left text-sm font-semibold">Level</th>
                <th className="p-3 text-left text-sm font-semibold">Role</th>
                <th className="p-3 text-left text-sm font-semibold">Action</th>
                <th className="p-3 text-left text-sm font-semibold">Message</th>
              </tr>
            </thead>

            <tbody>
              {currentLogs.map((log) => {
                const timestamp = log.created_at || log.timestamp || log.createdAt || "-";
                const severity = log.severity || log.level || "INFO";
                const role = log.user_role || log.role || "System";
                const action = log.action || "-";

                return (
                  <tr key={log.id || log.entity_id || `${timestamp}-${action}`} className="border-t hover:bg-gray-50">
                    <td className="p-3">{new Date(timestamp).toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${levelColor(severity)}`}>
                        {severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 capitalize">{role}</td>
                    <td className="p-3 truncate max-w-xs">{action}</td>
                    <td className="p-3 truncate max-w-2xl">{log.message || "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {filteredLogs.length > 0 && (
        <div className="p-4 flex justify-between items-center">
          <button
            className="px-3 py-1 border rounded"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            Prev
          </button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="px-3 py-1 border rounded"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
};

export default AdminLogs;