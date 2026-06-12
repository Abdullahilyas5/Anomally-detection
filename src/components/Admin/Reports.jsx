import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFileAlt, FaFilePdf, FaEnvelope, FaFilter, FaChartLine, FaExclamationTriangle,
  FaShieldAlt, FaListUl, FaCalendarAlt, FaSpinner, FaTimesCircle, FaChevronRight 
} from 'react-icons/fa';
import { 
  getSummaryReport, getExecutiveReport, getComplianceReport, 
  getIncidentReport, sendReportEmail, getReportPdfUrl 
} from '../../apis/reports';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, BarChart, Bar 
} from 'recharts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const Reports = () => {
  const location = useLocation();
  const [reportType, setReportType] = useState(
    location.state?.anomalyId ? 'incident' : 'summary'
  );
  const [filters, setFilters] = useState({
    days: 30,
    severity: '',
    status: '',
    limit: 10
  });
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailForm, setEmailForm] = useState({
    to: '',
    subject: '',
    message: ''
  });
  const [sendingEmail, setSendingEmail] = useState(false);

  // Fetch report data
  const loadReport = async () => {
    setLoading(true);
    try {
      let data;
      const apiFilters = {
        days: filters.days,
        severity: filters.severity || undefined,
        status: filters.status || undefined,
        limit: filters.limit
      };

      if (reportType === 'summary') {
        data = await getSummaryReport(apiFilters);
      } else if (reportType === 'executive') {
        data = await getExecutiveReport(apiFilters);
      } else if (reportType === 'compliance') {
        data = await getComplianceReport(apiFilters);
      } else {
        data = await getIncidentReport(apiFilters);
      }

      if (data && data.success) {
        setReportData(data.data);
      } else {
        toast.error('Failed to parse report data.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error generating report on the server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, [reportType, filters]);

  const handleDownloadPdf = () => {
    const apiFilters = {
      days: filters.days,
      severity: filters.severity || undefined,
      status: filters.status || undefined,
      limit: filters.limit
    };
    const downloadUrl = getReportPdfUrl(reportType, apiFilters);
    window.open(downloadUrl, '_blank');
    toast.info('Initiating PDF download...');
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!emailForm.to.trim()) {
      toast.error('Recipient email is required.');
      return;
    }
    setSendingEmail(true);
    try {
      const apiFilters = {
        days: filters.days,
        severity: filters.severity || undefined,
        status: filters.status || undefined,
        limit: filters.limit
      };
      const payload = {
        type: reportType,
        to: emailForm.to,
        subject: emailForm.subject || undefined,
        message: emailForm.message || undefined,
        filters: apiFilters
      };
      const res = await sendReportEmail(payload);
      if (res && res.success) {
        toast.success('Report dispatched successfully to ' + emailForm.to);
        setEmailModalOpen(false);
        setEmailForm({ to: '', subject: '', message: '' });
      } else {
        toast.error(res?.message || 'Failed to send report.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error sending report via email.');
    } finally {
      setSendingEmail(false);
    }
  };

  // Format charts data
  const getSeverityChartData = () => {
    if (!reportData || !reportData.severityBreakdown) return [];
    return reportData.severityBreakdown.map(item => ({
      name: item.severity.toUpperCase(),
      value: Number(item.count)
    }));
  };

  const getTrendsChartData = () => {
    if (!reportData || !reportData.trends) return [];
    return reportData.trends.map(item => ({
      date: item.date,
      Count: Number(item.count)
    }));
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen text-slate-800">
      <ToastContainer position="top-right" autoClose={4500} />
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <FaFileAlt className="text-blue-600" /> Reports Engine
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Generate, analyze, and distribute automated procurement risk reports.
          </p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={handleDownloadPdf}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition"
          >
            <FaFilePdf /> Download PDF
          </button>
          
          <button
            onClick={() => setEmailModalOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition"
          >
            <FaEnvelope /> Share via Email
          </button>
        </div>
      </div>

      {/* Grid Layout: Control Panel & visual reports */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
          
          {/* Report Type Selector */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FaListUl /> Report Template
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { id: 'summary', label: 'Summary Report', desc: 'High-level metrics & trends' },
                { id: 'executive', label: 'Executive Report', desc: 'Minimal KPIs & risk scores' },
                { id: 'compliance', label: 'Audit / Compliance', desc: 'Historical action logs' },
                { id: 'incident', label: 'Detailed Incident', desc: 'Audit anomaly details' }
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => setReportType(type.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    reportType === type.id 
                      ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-sm font-semibold' 
                      : 'border-slate-100 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="text-sm">{type.label}</div>
                  <div className="text-xs text-slate-400 font-normal mt-0.5">{type.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Filtering Parameters */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FaFilter /> Filters
            </h3>
            <div className="flex flex-col gap-4">
              
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">Time Period (Days)</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={filters.days}
                  onChange={e => setFilters(prev => ({ ...prev, days: Number(e.target.value) }))}
                >
                  <option value={7}>Last 7 Days</option>
                  <option value={30}>Last 30 Days</option>
                  <option value={90}>Last 90 Days</option>
                  <option value={365}>Last Year</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">Severity</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={filters.severity}
                  onChange={e => setFilters(prev => ({ ...prev, severity: e.target.value }))}
                >
                  <option value="">All Severities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">Status</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={filters.status}
                  onChange={e => setFilters(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="">All Statuses</option>
                  <option value="open">Open</option>
                  <option value="investigating">Investigating</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">Row Limit</label>
                <input 
                  type="number"
                  min={1}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={filters.limit}
                  onChange={e => setFilters(prev => ({ ...prev, limit: Number(e.target.value) }))}
                />
              </div>

            </div>
          </div>

        </div>

        {/* Report Content View */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {loading ? (
            <div className="bg-white border rounded-2xl p-16 flex flex-col items-center justify-center gap-4 text-slate-400 min-h-[400px]">
              <FaSpinner className="animate-spin text-4xl text-blue-600" />
              <p className="text-sm font-medium">Assembling report payload from database...</p>
            </div>
          ) : reportData ? (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              {/* KPIs Header Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                
                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                  <div className="text-xs font-semibold text-slate-400">Total Anomalies</div>
                  <div className="text-2xl font-bold text-slate-800 mt-1">
                    {reportData.kpis?.totalAnomalies ?? 0}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                  <div className="text-xs font-semibold text-slate-400">Resolution Rate</div>
                  <div className="text-2xl font-bold text-emerald-600 mt-1">
                    {Math.round(reportData.kpis?.resolutionRate ?? 100)}%
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                  <div className="text-xs font-semibold text-slate-400">Overall Risk Score</div>
                  <div className={`text-2xl font-bold mt-1 ${
                    (reportData.kpis?.riskScore ?? 0) >= 70 ? 'text-red-600' :
                    (reportData.kpis?.riskScore ?? 0) >= 35 ? 'text-amber-500' :
                    'text-blue-500'
                  }`}>
                    {reportData.kpis?.riskScore ?? 0} / 100
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                  <div className="text-xs font-semibold text-slate-400">Business Impact</div>
                  <div className={`text-2xl font-bold mt-1 ${
                    reportData.kpis?.businessImpact === 'High' ? 'text-red-600' :
                    reportData.kpis?.businessImpact === 'Medium' ? 'text-amber-500' :
                    'text-emerald-600'
                  }`}>
                    {reportData.kpis?.businessImpact ?? 'Low'}
                  </div>
                </div>

              </div>

              {/* Data Visualization Charts */}
              {reportType !== 'compliance' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Area Chart: Anomaly Trends */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-500 mb-4 flex items-center gap-1.5">
                      <FaChartLine className="text-blue-500" /> Detection History
                    </h3>
                    <div className="h-64">
                      {getTrendsChartData().length === 0 ? (
                        <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                          No trends historical data found
                        </div>
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={getTrendsChartData()}>
                            <defs>
                              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} />
                            <YAxis stroke="#94A3B8" fontSize={11} />
                            <Tooltip />
                            <Area type="monotone" dataKey="Count" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </div>

                  {/* Pie Chart: Severity Distribution */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-500 mb-4 flex items-center gap-1.5">
                      <FaExclamationTriangle className="text-amber-500" /> Severity Breakdown
                    </h3>
                    <div className="h-64 flex flex-col md:flex-row items-center justify-center gap-6">
                      {getSeverityChartData().length === 0 ? (
                        <div className="text-slate-400 text-sm">No severity metrics returned</div>
                      ) : (
                        <>
                          <div className="w-1/2 h-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={getSeverityChartData()}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={55}
                                  outerRadius={75}
                                  paddingAngle={4}
                                  dataKey="value"
                                >
                                  {getSeverityChartData().map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="flex flex-col gap-2.5">
                            {getSeverityChartData().map((item, idx) => (
                              <div key={item.name} className="flex items-center gap-2 text-xs">
                                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                                <span className="font-semibold text-slate-600">{item.name}:</span>
                                <span className="text-slate-500">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* Recommendations Box */}
              <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl shadow-sm flex gap-4">
                <FaShieldAlt className="text-3xl text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-900 text-sm mb-1.5">Auditor Recommendations</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-blue-800">
                    {reportData.recommendations?.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-bold text-sm text-slate-600">
                    {reportType === 'compliance' ? 'System Audit Log Records' : 'Detected Anomalies'}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    Showing max {filters.limit} entries
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                      <tr>
                        {reportType === 'compliance' ? (
                          <>
                            <th className="p-3">Timestamp</th>
                            <th className="p-3">User</th>
                            <th className="p-3">Action</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Severity</th>
                          </>
                        ) : (
                          <>
                            <th className="p-3">ID</th>
                            <th className="p-3">Procurement Title</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Severity</th>
                            <th className="p-3">Status</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {reportType === 'compliance' ? (
                        reportData.logs?.length === 0 ? (
                          <tr><td colSpan={5} className="p-8 text-center text-slate-400">No audit logs found.</td></tr>
                        ) : (
                          reportData.logs?.map((log) => (
                            <tr key={log.id} className="hover:bg-slate-50 transition">
                              <td className="p-3 text-slate-500">{new Date(log.createdAt).toLocaleString()}</td>
                              <td className="p-3 font-semibold text-slate-700">{log.user?.name ?? 'System'}</td>
                              <td className="p-3 text-slate-600 font-medium">{log.action}</td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  log.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                  {log.status}
                                </span>
                              </td>
                              <td className="p-3 font-semibold uppercase">{log.severity}</td>
                            </tr>
                          ))
                        )
                      ) : (
                        reportData.anomalies?.length === 0 ? (
                          <tr><td colSpan={5} className="p-8 text-center text-slate-400">No anomalies flagged.</td></tr>
                        ) : (
                          reportData.anomalies?.map((anom) => (
                            <tr key={anom.id} className="hover:bg-slate-50 transition">
                              <td className="p-3 font-bold text-slate-400">#{anom.id}</td>
                              <td className="p-3 font-semibold text-slate-700">{anom.procurement?.title ?? anom.title}</td>
                              <td className="p-3 text-slate-500 font-medium">{anom.anomaly_type}</td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  anom.severity === 'critical' || anom.severity === 'high' ? 'bg-red-100 text-red-700' :
                                  anom.severity === 'medium' ? 'bg-amber-100 text-amber-700' :
                                  'bg-blue-100 text-blue-700'
                                }`}>
                                  {anom.severity}
                                </span>
                              </td>
                              <td className="p-3 font-semibold capitalize text-slate-600">{anom.status}</td>
                            </tr>
                          ))
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </motion.div>
          ) : (
            <div className="bg-white border rounded-2xl p-16 flex flex-col items-center justify-center text-slate-400 min-h-[400px]">
              <FaTimesCircle className="text-4xl text-slate-300" />
              <p className="text-sm font-medium mt-2">Could not retrieve report metrics</p>
            </div>
          )}

        </div>

      </div>

      {/* Share Report via Email Modal */}
      <AnimatePresence>
        {emailModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100"
            >
              <div className="bg-blue-600 p-5 text-white flex justify-between items-center">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <FaEnvelope /> Email PDF Report
                </h3>
                <button 
                  onClick={() => setEmailModalOpen(false)}
                  className="text-white/80 hover:text-white transition text-xl"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleSendEmail} className="p-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">To Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="recipient@domain.com"
                    className="p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    value={emailForm.to}
                    onChange={e => setEmailForm(prev => ({ ...prev, to: e.target.value }))}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">Subject (Optional)</label>
                  <input
                    type="text"
                    placeholder="Audit Procurement Anomaly Report"
                    className="p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    value={emailForm.subject}
                    onChange={e => setEmailForm(prev => ({ ...prev, subject: e.target.value }))}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">Message (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Please review the attached PDF report."
                    className="p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    value={emailForm.message}
                    onChange={e => setEmailForm(prev => ({ ...prev, message: e.target.value }))}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sendingEmail}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {sendingEmail ? (
                    <>
                      <FaSpinner className="animate-spin" /> Dispatched PDF...
                    </>
                  ) : (
                    'Send Email Report'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Reports;