import React, { useEffect, useState } from 'react'
import { FaSearch, FaArrowLeft, FaArrowRight, FaDownload, FaEye } from "react-icons/fa";
import { MdCheckCircle, MdError, MdWarning } from "react-icons/md";
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getComplianceReport, getReportPdfUrl } from '../../apis/reports';

const ITEMS_PER_PAGE = 10;

const mapAnomalyStatus = (status) => {
  if (status === 'resolved' || status === 'closed') return 'Approved';
  if (status === 'investigating') return 'Requires Revision';
  return 'Pending Review';
};

const CitizenReviewedReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await getComplianceReport({ days: 90, limit: 50 });
        const anomalies = res?.data?.anomalies || [];

        const mapped = anomalies.map((a) => ({
          id: a.id,
          title: a.title || `Anomaly Report #${a.id}`,
          reviewer: a.auditor?.name || 'Auditor',
          date: a.created_at
            ? new Date(a.created_at).toISOString().split('T')[0]
            : '—',
          status: mapAnomalyStatus(a.status),
          category: a.anomaly_type || 'Compliance',
          remarks: a.description || 'No remarks provided',
          severity: a.severity,
          procurementId: a.procurement_id,
        }));

        setReports(mapped);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load reviewed reports');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case "Approved": return <MdCheckCircle className="text-green-600" />;
      case "Requires Revision": return <MdWarning className="text-orange-600" />;
      case "Pending Review": return <MdWarning className="text-blue-600" />;
      default: return <MdError className="text-red-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Approved": return "bg-cleanBlue text-primary border-cleanBlue";
      case "Requires Revision": return "bg-softaccent text-lightoragne border-softaccent";
      case "Pending Review": return "bg-lightBlue text-secondary border-lightBlue";
      default: return "bg-background text-textSecondary border-borderSlate";
    }
  };

  const filteredReports = reports.filter(report => {
    const matchSearch = report.title.toLowerCase().includes(search.toLowerCase()) ||
                       report.reviewer.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" ? true : report.status === filter;
    return matchSearch && matchFilter;
  });

  const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedReports = filteredReports.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDownload = () => {
    const url = getReportPdfUrl('compliance', { days: 90, limit: 50 });
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 pb-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-textMain mb-2">Reviewed Reports</h1>
        <p className="text-textSecondary">Access compliance and anomaly reports reviewed by auditors</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-textSecondary">Loading reports...</div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-gradient-to-br from-cleanBlue to-lightBlue rounded-xl p-6 border border-borderSlate shadow-md">
              <p className="text-textMain text-sm font-medium">Approved</p>
              <h3 className="text-primary text-3xl font-bold mt-2">
                {reports.filter(r => r.status === 'Approved').length}
              </h3>
            </div>
            <div className="bg-gradient-to-br from-softaccent to-lightoragne rounded-xl p-6 border border-borderSlate shadow-md">
              <p className="text-textMain text-sm font-medium">Requires Revision</p>
              <h3 className="text-lightoragne text-3xl font-bold mt-2">
                {reports.filter(r => r.status === 'Requires Revision').length}
              </h3>
            </div>
            <div className="bg-gradient-to-br from-background to-borderSlate rounded-xl p-6 border border-borderSlate shadow-md">
              <p className="text-textMain text-sm font-medium">Pending Review</p>
              <h3 className="text-textSecondary text-3xl font-bold mt-2">
                {reports.filter(r => r.status === 'Pending Review').length}
              </h3>
            </div>
          </motion.div>

          <motion.div className="bg-card rounded-xl p-6 shadow-md border border-borderSlate">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center border border-borderSlate rounded-lg px-4 bg-background">
                <FaSearch className="text-textSecondary" />
                <input
                  type="text"
                  placeholder="Search by report title or reviewer..."
                  className="p-3 outline-none bg-transparent flex-1 ml-2 text-textMain"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
              </div>
              <select
                className="px-4 py-3 border border-borderSlate rounded-lg bg-card font-medium text-textMain"
                value={filter}
                onChange={(e) => { setFilter(e.target.value); setPage(1); }}
              >
                <option value="All">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Requires Revision">Requires Revision</option>
                <option value="Pending Review">Pending Review</option>
              </select>
            </div>
          </motion.div>

          <motion.div className="bg-card rounded-xl shadow-md border border-borderSlate overflow-hidden">
            {paginatedReports.length === 0 ? (
              <div className="p-8 text-center text-textSecondary">No reports available yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-background border-b border-borderSlate">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase">Report Title</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase">Reviewer</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-borderSlate">
                    {paginatedReports.map((report) => (
                      <tr key={report.id} className="hover:bg-DashboardBack">
                        <td className="px-6 py-4 text-sm font-semibold text-textMain">{report.title}</td>
                        <td className="px-6 py-4 text-sm text-textSecondary">{report.reviewer}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-cleanBlue text-primary border">
                            {report.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-textSecondary">{report.date}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(report.status)}`}>
                            {getStatusIcon(report.status)}
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedReport(report)}
                              className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-primary hover:bg-cleanBlue rounded-lg"
                            >
                              <FaEye /> View
                            </button>
                            <button
                              onClick={handleDownload}
                              className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-secondary hover:bg-lightBlue rounded-lg"
                            >
                              <FaDownload />
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

          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 border rounded-lg disabled:opacity-50">
                <FaArrowLeft />
              </button>
              <span className="text-sm text-textSecondary">Page {page} of {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 border rounded-lg disabled:opacity-50">
                <FaArrowRight />
              </button>
            </div>
          )}
        </>
      )}

      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedReport(null)}>
          <div className="bg-card rounded-xl shadow-2xl max-w-lg w-full p-6 border border-borderSlate" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-textMain mb-4">{selectedReport.title}</h2>
            <div className="space-y-3 text-sm">
              <p><b>Reviewer:</b> {selectedReport.reviewer}</p>
              <p><b>Category:</b> {selectedReport.category}</p>
              <p><b>Date:</b> {selectedReport.date}</p>
              <p><b>Severity:</b> {selectedReport.severity}</p>
              <p><b>Status:</b> {selectedReport.status}</p>
              <p><b>Remarks:</b> {selectedReport.remarks}</p>
            </div>
            <button onClick={() => setSelectedReport(null)} className="mt-6 w-full bg-primary text-card font-bold py-2 rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CitizenReviewedReports;
