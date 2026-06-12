import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getAllAnomalies } from "../../apis/anomalies";

const Anomalies = () => {
  const [search, setSearch] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnomalies = async () => {
      try {
        setLoading(true);
        const res = await getAllAnomalies();
        setAnomalies(res?.data || res || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load anomalies");
      } finally {
        setLoading(false);
      }
    };
    fetchAnomalies();
  }, []);

  const filtered = anomalies.filter((a) => {
    const procurement = a.procurement || {};
    const country = (procurement.country || "").toLowerCase();
    const title = (a.title || "").toLowerCase();
    const matchSearch =
      country.includes(search.toLowerCase()) ||
      title.includes(search.toLowerCase()) ||
      String(a.id).includes(search);
    const matchSeverity = filterSeverity ? a.severity === filterSeverity : true;
    const matchStatus = filterStatus ? a.status === filterStatus : true;
    return matchSearch && matchSeverity && matchStatus;
  });

  const severityBadge = (severity) => {
    const colors = {
      critical: "bg-red-100 text-red-700",
      high: "bg-orange-100 text-orange-700",
      medium: "bg-yellow-100 text-yellow-700",
      low: "bg-green-100 text-green-700",
    };
    return colors[severity] || "bg-gray-100 text-gray-700";
  };

  const statusBadge = (status) => {
    const colors = {
      open: "bg-red-100 text-red-600",
      investigating: "bg-yellow-100 text-yellow-700",
      resolved: "bg-green-100 text-green-600",
      closed: "bg-gray-100 text-gray-600",
    };
    return colors[status] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Anomalies</h2>
        <p className="text-gray-500 text-sm mt-1">
          Review anomalies flagged by auditors across all procurements
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by country, title, or ID..."
          className="border rounded-lg px-4 py-2 w-full md:w-64 focus:ring-2 focus:ring-primary outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-2 w-full md:w-40"
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
        >
          <option value="">All Severity</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          className="border rounded-lg px-4 py-2 w-full md:w-40"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="investigating">Investigating</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading anomalies...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No anomalies found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Procurement</th>
                <th className="p-3 text-left">Country</th>
                <th className="p-3 text-left">Severity</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Auditor</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">#{item.id}</td>
                  <td className="p-3 max-w-xs truncate">{item.title}</td>
                  <td className="p-3">#{item.procurement_id}</td>
                  <td className="p-3">{item.procurement?.country || "—"}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs capitalize ${severityBadge(item.severity)}`}>
                      {item.severity}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs capitalize ${statusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3">{item.auditor?.name || "—"}</td>
                  <td className="p-3">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        navigate("/admin/report", {
                          state: { anomalyId: item.id, procurementId: item.procurement_id },
                        })
                      }
                      className="text-primary hover:underline"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Anomalies;
