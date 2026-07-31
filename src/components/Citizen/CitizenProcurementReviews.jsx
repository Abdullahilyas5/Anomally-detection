import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import { FaSearch, FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import { MdCheckCircle, MdPending, MdCancel } from "react-icons/md";
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getAllProcurements } from '../../apis/modelapi';
import { getAllAnomalies } from '../../apis/anomalies';

const ITEMS_PER_PAGE = 10;

const getReviewStatus = (score, hasAnomaly) => {
  if (hasAnomaly) return 'Rejected';
  if (score >= 0.7) return 'Pending Review';
  if (score >= 0.4) return 'Reviewed';
  return 'Approved';
};

const CitizenProcurementReviews = () => {
  const [procurements, setProcurements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedProcurement, setSelectedProcurement] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [procData, anomaliesRes] = await Promise.all([
          getAllProcurements(),
          getAllAnomalies(),
        ]);

        const anomalyList = anomaliesRes?.data || anomaliesRes || [];
        const anomalyProcIds = new Set(anomalyList.map((a) => a.procurement_id));

        const procList = procData?.rows || procData || [];
        const mapped = procList.map((p) => {
          const score = p.prediction_score || 0;
          const hasAnomaly = anomalyProcIds.has(p.id);
          return {
            id: p.id,
            name: `Procurement #${p.id}`,
            vendor: p.bidder_id || '—',
            amount: `$${Number(p.bid_price || 0).toLocaleString()}`,
            date: p.tender_year || '—',
            status: getReviewStatus(score, hasAnomaly),
            category: p.country || 'Procurement',
            country: p.country,
            buyer: p.buyer_id,
            riskScore: (score * 100).toFixed(1),
            hasAnomaly,
          };
        });

        setProcurements(mapped);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load procurement reviews');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case "Approved": return <MdCheckCircle className="text-green-600" />;
      case "Pending Review": return <MdPending className="text-orange-600" />;
      case "Reviewed": return <MdCheckCircle className="text-blue-600" />;
      default: return <MdCancel className="text-red-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Approved": return "bg-cleanBlue text-primary border-cleanBlue";
      case "Pending Review": return "bg-softaccent text-lightoragne border-softaccent";
      case "Reviewed": return "bg-lightBlue text-secondary border-lightBlue";
      default: return "bg-background text-textSecondary border-borderSlate";
    }
  };

  const filteredProcurements = procurements.filter(proc => {
    const matchSearch = proc.name.toLowerCase().includes(search.toLowerCase()) ||
                       proc.vendor.toLowerCase().includes(search.toLowerCase()) ||
                       (proc.country || '').toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" ? true : proc.status === filter;
    return matchSearch && matchFilter;
  });

  const totalPages = Math.ceil(filteredProcurements.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProcurements = filteredProcurements.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold text-textMain mb-2">Procurement Reviews</h1>
        <p className="text-textSecondary">Review procurement data and risk assessments</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-textSecondary">Loading procurements...</div>
      ) : (
        <>
          <motion.div className="bg-card rounded-xl p-6 shadow-md border border-borderSlate">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center border border-borderSlate rounded-lg px-4 bg-background">
                <FaSearch className="text-textSecondary" />
                <input
                  type="text"
                  placeholder="Search by name, vendor, or country..."
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
                <option value="Reviewed">Reviewed</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </motion.div>

          <motion.div className="bg-card rounded-xl shadow-md border border-borderSlate overflow-hidden">
            {paginatedProcurements.length === 0 ? (
              <div className="p-8 text-center text-textSecondary">No procurements found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-background border-b border-borderSlate">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase">Procurement</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase">Vendor</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase">Country</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase">Risk</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-textMain uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-borderSlate">
                    {paginatedProcurements.map((proc) => (
                      <tr key={proc.id} className="hover:bg-DashboardBack">
                        <td className="px-6 py-4 text-sm font-semibold text-textMain">{proc.name}</td>
                        <td className="px-6 py-4 text-sm text-textSecondary">{proc.vendor}</td>
                        <td className="px-6 py-4 text-sm text-textSecondary">{proc.country}</td>
                        <td className="px-6 py-4 text-sm font-medium text-primary">{proc.amount}</td>
                        <td className="px-6 py-4 text-sm text-textSecondary">{proc.riskScore}%</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(proc.status)}`}>
                            {getStatusIcon(proc.status)}
                            {proc.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedProcurement(proc)}
                            className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-primary hover:bg-cleanBlue rounded-lg"
                          >
                            <FaExternalLinkAlt /> View
                          </button>
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

      {selectedProcurement && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-[1px]" onClick={() => setSelectedProcurement(null)}>
          <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-textMain mb-4">{selectedProcurement.name}</h2>
            <div className="space-y-3 text-sm">
              <p><b>Vendor:</b> {selectedProcurement.vendor}</p>
              <p><b>Buyer:</b> {selectedProcurement.buyer}</p>
              <p><b>Country:</b> {selectedProcurement.country}</p>
              <p><b>Amount:</b> {selectedProcurement.amount}</p>
              <p><b>Risk Score:</b> {selectedProcurement.riskScore}%</p>
              <p><b>Status:</b> {selectedProcurement.status}</p>
              {selectedProcurement.hasAnomaly && (
                <p className="text-red-600 font-medium">This procurement has been flagged as an anomaly by an auditor.</p>
              )}
            </div>
            <button onClick={() => setSelectedProcurement(null)} className="mt-6 w-full bg-primary text-card font-bold py-2 rounded-lg">
              Close
            </button>
          </div>
        </div>,
        document.body
      )}
    </motion.div>
  );
};

export default CitizenProcurementReviews;
