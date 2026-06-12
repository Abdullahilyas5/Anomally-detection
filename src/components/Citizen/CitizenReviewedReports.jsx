import React, { useEffect, useState } from 'react';
import { FaSearch, FaArrowLeft, FaArrowRight, FaDownload, FaEye, FaFileAlt } from "react-icons/fa";
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getPublicReports, getPublicReportDownloadUrl } from '../../apis/reports';

const ITEMS_PER_PAGE = 10;

const CitizenReviewedReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await getPublicReports();
      if (res && res.success) {
        setReports(res.data || []);
      } else {
        toast.error('Failed to parse public reports');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load public reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredReports = reports.filter(report => {
    const matchSearch = report.title.toLowerCase().includes(search.toLowerCase()) ||
                        (report.creator?.name || '').toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" ? true : report.type === filter;
    return matchSearch && matchFilter;
  });

  const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedReports = filteredReports.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDownload = (id) => {
    const url = getPublicReportDownloadUrl(id);
    window.open(url, '_blank');
    toast.success('Downloading report PDF...');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 pb-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Public Audit Reports</h1>
        <p className="text-slate-500">Access and download public procurement audit summaries and incident reports.</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500 flex flex-col items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span>Loading public reports...</span>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow-sm">
              <p className="text-blue-800 text-sm font-medium">Total Public Reports</p>
              <h3 className="text-blue-900 text-3xl font-bold mt-2">
                {reports.length}
              </h3>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200 shadow-sm">
              <p className="text-emerald-800 text-sm font-medium">Summary Reports</p>
              <h3 className="text-emerald-900 text-3xl font-bold mt-2">
                {reports.filter(r => r.type === 'summary').length}
              </h3>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200 shadow-sm">
              <p className="text-amber-800 text-sm font-medium">Incident Reports</p>
              <h3 className="text-amber-900 text-3xl font-bold mt-2">
                {reports.filter(r => r.type === 'incident').length}
              </h3>
            </div>
          </motion.div>

          {/* Search and Filter */}
          <motion.div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center border border-slate-200 rounded-lg px-4 bg-slate-50">
                <FaSearch className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search reports by title or auditor..."
                  className="p-2.5 outline-none bg-transparent flex-1 ml-2 text-slate-700 text-sm"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
              </div>
              <select
                className="px-4 py-2.5 border border-slate-200 rounded-lg bg-white font-medium text-slate-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                value={filter}
                onChange={(e) => { setFilter(e.target.value); setPage(1); }}
              >
                <option value="All">All Types</option>
                <option value="summary">Summary Reports</option>
                <option value="incident">Incident Reports</option>
              </select>
            </div>
          </motion.div>

          {/* Reports Table */}
          <motion.div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {paginatedReports.length === 0 ? (
              <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
                <FaFileAlt className="text-4xl text-slate-300" />
                <span>No public reports available matching your criteria.</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Report Title</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Auditor / Author</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Generated Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {paginatedReports.map((report) => (
                      <tr key={report.id} className="hover:bg-slate-50/50 transition">
                        <td className="px-6 py-4 font-semibold text-slate-800">{report.title}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            report.type === 'summary' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {report.type === 'summary' ? 'Summary' : 'Incident Detail'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">{report.creator?.name || 'System Auto-Generated'}</td>
                        <td className="px-6 py-4 text-slate-500">{new Date(report.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedReport(report)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            >
                              <FaEye /> View
                            </button>
                            <button
                              onClick={() => handleDownload(report.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                            >
                              <FaDownload /> Download
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))} 
                disabled={page === 1} 
                className="p-2 border rounded-lg hover:bg-slate-50 disabled:opacity-40 transition"
              >
                <FaArrowLeft className="text-slate-600 text-sm" />
              </button>
              <span className="text-sm text-slate-500 font-medium">Page {page} of {totalPages}</span>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                disabled={page === totalPages} 
                className="p-2 border rounded-lg hover:bg-slate-50 disabled:opacity-40 transition"
              >
                <FaArrowRight className="text-slate-600 text-sm" />
              </button>
            </div>
          )}
        </>
      )}

      {/* View Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" onClick={() => setSelectedReport(null)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-100 animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <div className="bg-blue-600 p-5 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2"><FaFileAlt /> Report Information</h2>
              <button onClick={() => setSelectedReport(null)} className="text-white/80 hover:text-white transition text-2xl font-bold">&times;</button>
            </div>
            <div className="p-6 space-y-4 text-sm text-slate-600">
              <div>
                <span className="text-xs font-semibold uppercase text-slate-400 block">Report Title</span>
                <span className="text-slate-800 font-medium text-base">{selectedReport.title}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase text-slate-400 block">Author</span>
                  <span className="text-slate-800 font-medium">{selectedReport.creator?.name || 'System'}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-slate-400 block">Type</span>
                  <span className="text-slate-800 font-medium capitalize">{selectedReport.type}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase text-slate-400 block">Generated On</span>
                  <span className="text-slate-800 font-medium">{new Date(selectedReport.createdAt).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-slate-400 block">File Name</span>
                  <span className="text-slate-800 font-medium break-all">{selectedReport.fileName}</span>
                </div>
              </div>
              {selectedReport.filters && (
                <div>
                  <span className="text-xs font-semibold uppercase text-slate-400 block mb-1">Applied Parameters</span>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 max-h-32 overflow-y-auto text-xs font-mono text-slate-500">
                    <pre>{JSON.stringify(selectedReport.filters, null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>
            <div className="p-5 border-t bg-slate-50 flex gap-3">
              <button 
                onClick={() => handleDownload(selectedReport.id)} 
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-1.5"
              >
                <FaDownload /> Download PDF
              </button>
              <button 
                onClick={() => setSelectedReport(null)} 
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2.5 rounded-lg text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CitizenReviewedReports;
