import React, { useState } from 'react'
import { FaSearch, FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import { MdCheckCircle, MdPending, MdCancel } from "react-icons/md";
import { motion } from 'framer-motion';

const ITEMS_PER_PAGE = 10;

const CitizenProcurementReviews = () => {
  const [procurements, setProcurements] = useState([
    { id: 1, name: "Infrastructure Development", vendor: "Tech Corp", amount: "$50,000", date: "2026-04-08", status: "Pending Review", category: "Infrastructure" },
    { id: 2, name: "Software Licenses", vendor: "Microsoft", amount: "$15,000", date: "2026-04-07", status: "Reviewed", category: "Software" },
    { id: 3, name: "Office Equipment", vendor: "Office Pro", amount: "$8,500", date: "2026-04-06", status: "Approved", category: "Equipment" },
    { id: 4, name: "Consulting Services", vendor: "Consulting Plus", amount: "$35,000", date: "2026-04-05", status: "Pending Review", category: "Services" },
    { id: 5, name: "Hardware Purchases", vendor: "Tech Store", amount: "$22,000", date: "2026-04-04", status: "Reviewed", category: "Hardware" },
    { id: 6, name: "Maintenance Contract", vendor: "Maintenance Inc", amount: "$12,000", date: "2026-04-03", status: "Approved", category: "Maintenance" },
    { id: 7, name: "Training Programs", vendor: "Training Academy", amount: "$18,500", date: "2026-04-02", status: "Pending Review", category: "Training" },
    { id: 8, name: "Cloud Services", vendor: "Cloud Provider", amount: "$25,000", date: "2026-04-01", status: "Rejected", category: "Services" },
  ])

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [page, setPage] = useState(1)
  const [selectedProcurement, setSelectedProcurement] = useState(null)

  const getStatusIcon = (status) => {
    switch(status) {
      case "Approved":
        return <MdCheckCircle className="text-green-600" />
      case "Pending Review":
        return <MdPending className="text-orange-600" />
      case "Rejected":
        return <MdCancel className="text-red-600" />
      default:
        return <MdCheckCircle className="text-blue-600" />
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case "Approved":
        return "bg-cleanBlue text-primary border-cleanBlue"
      case "Pending Review":
        return "bg-softaccent text-lightoragne border-softaccent"
      case "Reviewed":
        return "bg-lightBlue text-secondary border-lightBlue"
      case "Rejected":
        return "bg-background text-textSecondary border-borderSlate"
      default:
        return "bg-background text-textMain border-borderSlate"
    }
  }

  const filteredProcurements = procurements.filter(proc => {
    const matchSearch = proc.name.toLowerCase().includes(search.toLowerCase()) ||
                       proc.vendor.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "All" ? true : proc.status === filter
    return matchSearch && matchFilter
  })

  const totalPages = Math.ceil(filteredProcurements.length / ITEMS_PER_PAGE)
  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const paginatedProcurements = filteredProcurements.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 pb-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-textMain mb-2">Procurement Reviews</h1>
        <p className="text-textSecondary">Review and manage procurement requests</p>
      </div>

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
              placeholder="Search by name or vendor..."
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
            <option value="Pending Review">Pending Review</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl shadow-md border border-borderSlate overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-borderSlate">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase tracking-wider">Procurement Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderSlate">
              {paginatedProcurements.map((proc, index) => (
                <motion.tr
                  key={proc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="hover:bg-DashboardBack transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-textMain">{proc.name}</td>
                  <td className="px-6 py-4 text-sm text-textSecondary">{proc.vendor}</td>
                  <td className="px-6 py-4 text-sm font-bold text-textMain">{proc.amount}</td>
                  <td className="px-6 py-4 text-sm text-textSecondary">{proc.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(proc.status)}`}>
                      {getStatusIcon(proc.status)}
                      {proc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedProcurement(proc)}
                      className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-primary hover:bg-cleanBlue rounded-lg transition-colors"
                    >
                      View <FaExternalLinkAlt className="text-xs" />
                    </button>
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
              Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredProcurements.length)} of {filteredProcurements.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="p-2 border border-borderSlate rounded-lg hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-textSecondary"
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
                className="p-2 border border-borderSlate rounded-lg hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-textSecondary"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Detail Modal */}
      {selectedProcurement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProcurement(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-xl shadow-2xl max-w-lg w-full p-6 border border-borderSlate"
          >
            <h2 className="text-2xl font-bold text-textMain mb-4">{selectedProcurement.name}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background p-4 rounded-lg border border-borderSlate">
                  <p className="text-xs text-textSecondary font-medium uppercase">Vendor</p>
                  <p className="text-lg font-semibold text-textMain mt-1">{selectedProcurement.vendor}</p>
                </div>
                <div className="bg-background p-4 rounded-lg border border-borderSlate">
                  <p className="text-xs text-textSecondary font-medium uppercase">Amount</p>
                  <p className="text-lg font-semibold text-textMain mt-1">{selectedProcurement.amount}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background p-4 rounded-lg border border-borderSlate">
                  <p className="text-xs text-textSecondary font-medium uppercase">Date</p>
                  <p className="text-lg font-semibold text-textMain mt-1">{selectedProcurement.date}</p>
                </div>
                <div className="bg-background p-4 rounded-lg border border-borderSlate">
                  <p className="text-xs text-textSecondary font-medium uppercase">Category</p>
                  <p className="text-lg font-semibold text-textMain mt-1">{selectedProcurement.category}</p>
                </div>
              </div>
              <div className="bg-background p-4 rounded-lg border border-borderSlate">
                <p className="text-xs text-textSecondary font-medium uppercase">Status</p>
                <span className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(selectedProcurement.status)}`}>
                  {getStatusIcon(selectedProcurement.status)}
                  {selectedProcurement.status}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedProcurement(null)}
              className="w-full mt-6 bg-primary hover:bg-buttonHover text-card font-bold py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default CitizenProcurementReviews