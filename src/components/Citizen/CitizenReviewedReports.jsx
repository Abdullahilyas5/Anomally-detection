import React, { useState } from 'react'
import { FaSearch, FaArrowLeft, FaArrowRight, FaDownload, FaEye } from "react-icons/fa";
import { MdCheckCircle, MdError, MdWarning } from "react-icons/md";
import { motion } from 'framer-motion';

const ITEMS_PER_PAGE = 10;

const CitizenReviewedReports = () => {
  const [reports, setReports] = useState([
    { id: 1, title: "Q1 Financial Report", reviewer: "Admin", date: "2026-04-08", status: "Approved", category: "Financial", remarks: "All details verified" },
    { id: 2, title: "Procurement Audit 2026", reviewer: "External Auditor", date: "2026-04-07", status: "Approved", category: "Audit", remarks: "Compliant with standards" },
    { id: 3, title: "Budget Allocation Report", reviewer: "Finance Manager", date: "2026-04-06", status: "Requires Revision", category: "Budget", remarks: "Minor corrections needed" },
    { id: 4, title: "Vendor Performance Review", reviewer: "Procurement Officer", date: "2026-04-05", status: "Approved", category: "Vendor", remarks: "Excellent performance" },
    { id: 5, title: "Risk Assessment Report", reviewer: "Risk Officer", date: "2026-04-04", status: "Requires Revision", category: "Risk", remarks: "Review risk mitigation strategies" },
    { id: 6, title: "Compliance Checklist", reviewer: "Compliance Team", date: "2026-04-03", status: "Approved", category: "Compliance", remarks: "All items checked" },
    { id: 7, title: "Annual Procurement Report", reviewer: "Auditor", date: "2026-04-02", status: "Rejected", category: "Procurement", remarks: "Incomplete documentation" },
    { id: 8, title: "Stakeholder Report", reviewer: "Manager", date: "2026-04-01", status: "Approved", category: "General", remarks: "Stakeholders satisfied" },
  ])

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [page, setPage] = useState(1)
  const [selectedReport, setSelectedReport] = useState(null)

  const getStatusIcon = (status) => {
    switch(status) {
      case "Approved":
        return <MdCheckCircle className="text-green-600" />
      case "Requires Revision":
        return <MdWarning className="text-orange-600" />
      case "Rejected":
        return <MdError className="text-red-600" />
      default:
        return <MdCheckCircle className="text-blue-600" />
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case "Approved":
        return "bg-cleanBlue text-primary border-cleanBlue"
      case "Requires Revision":
        return "bg-softaccent text-lightoragne border-softaccent"
      case "Rejected":
        return "bg-background text-textSecondary border-borderSlate"
      default:
        return "bg-background text-textMain border-borderSlate"
    }
  }

  const filteredReports = reports.filter(report => {
    const matchSearch = report.title.toLowerCase().includes(search.toLowerCase()) ||
                       report.reviewer.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "All" ? true : report.status === filter
    return matchSearch && matchFilter
  })

  const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE)
  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const paginatedReports = filteredReports.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 pb-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-textMain mb-2">Reviewed Reports</h1>
        <p className="text-textSecondary">Access and manage all reviewed and processed reports</p>
      </div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-gradient-to-br from-cleanBlue to-lightBlue rounded-xl p-6 border border-borderSlate shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textMain text-sm font-medium">Approved</p>
              <h3 className="text-primary text-3xl font-bold mt-2">{reports.filter(r => r.status === 'Approved').length}</h3>
            </div>
            <MdCheckCircle className="text-primary text-5xl opacity-20" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-softaccent to-lightoragne rounded-xl p-6 border border-borderSlate shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textMain text-sm font-medium">Requires Revision</p>
              <h3 className="text-lightoragne text-3xl font-bold mt-2">{reports.filter(r => r.status === 'Requires Revision').length}</h3>
            </div>
            <MdWarning className="text-lightoragne text-5xl opacity-20" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-background to-borderSlate rounded-xl p-6 border border-borderSlate shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textMain text-sm font-medium">Rejected</p>
              <h3 className="text-textSecondary text-3xl font-bold mt-2">{reports.filter(r => r.status === 'Rejected').length}</h3>
            </div>
            <MdError className="text-textSecondary text-5xl opacity-20" />
          </div>
        </div>
      </motion.div>

      {/* Filters & Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl p-6 shadow-md border border-borderSlate"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center border border-borderSlate rounded-lg px-4 bg-background">
            <FaSearch className="text-textSecondary" />
            <input
              type="text"
              placeholder="Search by report title or reviewer..."
              className="p-3 outline-none bg-transparent flex-1 ml-2 text-textMain placeholder-textSecondary"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
            />
          </div>

          <select
            className="px-4 py-3 border border-borderSlate rounded-lg bg-card font-medium text-textMain hover:border-primary transition-colors"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value)
              setPage(1)
            }}
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Requires Revision">Requires Revision</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-xl shadow-md border border-borderSlate overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-borderSlate">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase tracking-wider">Report Title</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase tracking-wider">Reviewer</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderSlate">
              {paginatedReports.map((report, index) => (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="hover:bg-DashboardBack transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-textMain">{report.title}</td>
                  <td className="px-6 py-4 text-sm text-textSecondary">{report.reviewer}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cleanBlue text-primary border border-borderSlate">
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
                        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-primary hover:bg-cleanBlue rounded-lg transition-colors"
                      >
                        <FaEye /> View
                      </button>
                      <button
                        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-secondary hover:bg-lightBlue rounded-lg transition-colors"
                      >
                        <FaDownload />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-6 border-t border-borderSlate bg-background">
            <span className="text-sm text-textSecondary">
              Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredReports.length)} of {filteredReports.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="p-2 border border-borderSlate rounded-lg hover:bg-borderSlate disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-textSecondary"
              >
                <FaArrowLeft />
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      page === p ? 'bg-primary text-card' : 'border border-borderSlate hover:bg-background text-textMain'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="p-2 border border-borderSlate rounded-lg hover:bg-borderSlate disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-textSecondary"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Detail Modal */}
      {selectedReport && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedReport(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-xl shadow-2xl max-w-lg w-full p-6 border border-borderSlate"
          >
            <h2 className="text-2xl font-bold text-textMain mb-4">{selectedReport.title}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background p-4 rounded-lg border border-borderSlate">
                  <p className="text-xs text-textSecondary font-medium uppercase">Reviewer</p>
                  <p className="text-lg font-semibold text-textMain mt-1">{selectedReport.reviewer}</p>
                </div>
                <div className="bg-background p-4 rounded-lg border border-borderSlate">
                  <p className="text-xs text-textSecondary font-medium uppercase">Category</p>
                  <p className="text-lg font-semibold text-textMain mt-1">{selectedReport.category}</p>
                </div>
              </div>
              <div className="bg-background p-4 rounded-lg border border-borderSlate">
                <p className="text-xs text-textSecondary font-medium uppercase">Date</p>
                <p className="text-lg font-semibold text-textMain mt-1">{selectedReport.date}</p>
              </div>
              <div className="bg-background p-4 rounded-lg border border-borderSlate">
                <p className="text-xs text-textSecondary font-medium uppercase">Status</p>
                <span className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(selectedReport.status)}`}>
                  {getStatusIcon(selectedReport.status)}
                  {selectedReport.status}
                </span>
              </div>
              <div className="bg-background p-4 rounded-lg border border-borderSlate">
                <p className="text-xs text-textSecondary font-medium uppercase">Remarks</p>
                <p className="text-textMain mt-2">{selectedReport.remarks}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedReport(null)}
                className="flex-1 bg-background hover:bg-borderSlate text-textMain font-bold py-2 rounded-lg transition-colors border border-borderSlate"
              >
                Close
              </button>
              <button
                className="flex-1 bg-primary hover:bg-buttonHover text-card font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FaDownload /> Download
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default CitizenReviewedReports