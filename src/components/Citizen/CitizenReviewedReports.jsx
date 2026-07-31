import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
  FaFileAlt,
} from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { getPublicReports } from "../../apis/dashboard";
import { getPublicReportDownloadUrl } from "../../apis/reports";

const ITEMS_PER_PAGE = 10;

const CitizenReviewedReports = () => {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const fetchReports = async () => {
    try {
      setLoading(true);

      // IMPORTANT: this already returns final data object
      const data = await getPublicReports();

      if (data) {
        setReports(data.reports || []);
        setStats(data);
      } else {
        toast.error("Failed to load public reports");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load public reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredReports = reports.filter((report) => {
    const matchSearch =
      (report.title || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (report.creator?.name || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchFilter =
      filter === "All" ? true : report.type === filter;

    return matchSearch && matchFilter;
  });

  const totalPages =
    Math.ceil(filteredReports.length / ITEMS_PER_PAGE) || 1;

  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const paginatedReports = filteredReports.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 pb-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Public Audit Reports
        </h1>
        <p className="text-slate-500">
          View public procurement audit summaries and incident reports.
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          Loading public reports...
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-700">Total Public Reports</p>
              <h3 className="text-3xl font-bold text-blue-900">
                {stats?.totalPublicReports ?? 0}
              </h3>
            </div>

            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
              <p className="text-sm text-emerald-700">
                Reviewed Reports
              </p>
              <h3 className="text-3xl font-bold text-emerald-900">
                {stats?.reviewedReports ?? 0}
              </h3>
            </div>

            <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
              <p className="text-sm text-amber-700">
                Summary Reports
              </p>
              <h3 className="text-3xl font-bold text-amber-900">
                {stats?.summaryReports ?? 0}
              </h3>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <p className="text-sm text-purple-700">
                Incident Reports
              </p>
              <h3 className="text-3xl font-bold text-purple-900">
                {stats?.incidentReports ?? 0}
              </h3>
            </div>
          </div>

          {/* Search + Filter */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center border rounded-lg px-4 bg-slate-50">
                <FaSearch className="text-slate-400" />
                <input
                  className="p-2.5 bg-transparent outline-none flex-1 ml-2"
                  placeholder="Search reports..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>

              <select
                className="px-4 py-2.5 border rounded-lg"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="All">All Types</option>
                <option value="summary">Summary</option>
                <option value="incident">Incident</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border overflow-hidden">
            {paginatedReports.length === 0 ? (
              <div className="p-10 text-center text-slate-400">
                <FaFileAlt className="text-4xl mx-auto mb-2" />
                No reports found
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    <th className="p-4">Title</th>
                    <th>Type</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedReports.map((r) => (
                    <tr
                      key={r.id}
                      className="border-t hover:bg-slate-50"
                    >
                      <td className="p-4 font-medium">
                        {r.title === "undefined"
                          ? "Untitled Report"
                          : r.title}
                      </td>

                      <td className="capitalize">{r.type}</td>

                      <td>{r.creator?.name || "System"}</td>

                      <td>
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>

                      <td className="p-2">
                        <a
                          href={getPublicReportDownloadUrl(r.id)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-DarkBlue"
                          aria-label="Download report PDF"
                        >
                          <MdFileDownload /> Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-2 border rounded disabled:opacity-40"
            >
              <FaArrowLeft />
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="p-2 border rounded disabled:opacity-40"
            >
              <FaArrowRight />
            </button>
          </div>
        </>
      )}

<<<<<<< HEAD
=======
      {/* Modal */}
      {selectedReport && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="bg-white p-6 rounded-xl w-[500px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">
              Report Details
            </h2>

            <p>
              <b>Title:</b> {selectedReport.title}
            </p>

            <p>
              <b>Type:</b> {selectedReport.type}
            </p>

            <p>
              <b>Date:</b>{" "}
              {new Date(
                selectedReport.createdAt
              ).toLocaleString()}
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <a
                href={getPublicReportDownloadUrl(selectedReport.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm text-center flex items-center justify-center"
              >
                Download PDF
              </a>
              <button
                onClick={() => setSelectedReport(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold px-4 py-2 rounded-lg text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
>>>>>>> 982b56cfe7aed232c9dec49aa5a247d13994ca32
    </motion.div>
  );
};

export default CitizenReviewedReports;