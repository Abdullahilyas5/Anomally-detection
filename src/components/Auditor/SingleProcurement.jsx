import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getSingleProcurement } from "../../apis/modelapi";
import { getFlagsByProcurement } from "../../apis/flags";
import { getAllAnomalies, markProcurementAsAnomaly } from "../../apis/anomalies";

const SingleProcurement = () => {
  const { id } = useParams();

  const [procurement, setProcurement] = useState(null);
  const [flags, setFlags] = useState([]);
  const [hasAnomaly, setHasAnomaly] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [data, flagData, anomaliesRes] = await Promise.all([
          getSingleProcurement(id),
          getFlagsByProcurement(id),
          getAllAnomalies(),
        ]);

        const anomalyList = anomaliesRes?.data || anomaliesRes || [];
        const isAnomaly = anomalyList.some(
          (a) => String(a.procurement_id) === String(id)
        );

        setProcurement(data);
        setFlags(flagData || []);
        setHasAnomaly(isAnomaly);
        setComment(flagData?.[0]?.description || "");
        setError(null);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleMarkAsAnomaly = async () => {
    if (!comment.trim()) {
      toast.error("Please add a comment before marking as anomaly");
      return;
    }

    const score = procurement.prediction_score || 0;
    const severity =
      score >= 0.7 ? "High" : score >= 0.4 ? "Medium" : "Low";
    const flagType =
      severity === "High" ? "error" : severity === "Medium" ? "suspicious" : "warning";

    try {
      setSaving(true);
      await markProcurementAsAnomaly({
        procurementId: procurement.id,
        description: comment,
        severity,
        flagType,
      });
      setHasAnomaly(true);
      toast.success("Procurement marked as anomaly");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to mark as anomaly");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-600">Loading procurement...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  if (!procurement) return null;

  const riskScore = ((procurement.prediction_score || 0) * 100).toFixed(2);
  const severity =
    procurement.prediction_score >= 0.7
      ? "High"
      : procurement.prediction_score >= 0.4
      ? "Medium"
      : "Low";

  const severityStyles = {
    High: { border: "border-red-500", text: "text-red-600", badge: "bg-red-100 text-red-700" },
    Medium: { border: "border-yellow-500", text: "text-yellow-600", badge: "bg-yellow-100 text-yellow-700" },
    Low: { border: "border-green-500", text: "text-green-600", badge: "bg-green-100 text-green-700" },
  };

  const style = severityStyles[severity];

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Procurement Details</h1>

      <div className={`bg-white rounded-2xl shadow-lg border-l-8 ${style.border}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Procurement #{procurement.id}</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${style.badge}`}>
              {severity}
            </span>
          </div>

          <hr className="mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><p className="text-gray-500 text-sm">Country</p><p className="font-semibold">{procurement.country}</p></div>
            <div><p className="text-gray-500 text-sm">Tender Year</p><p className="font-semibold">{procurement.tender_year}</p></div>
            <div><p className="text-gray-500 text-sm">Bidder</p><p className="font-semibold">{procurement.bidder_id}</p></div>
            <div><p className="text-gray-500 text-sm">Buyer</p><p className="font-semibold">{procurement.buyer_id}</p></div>
            <div><p className="text-gray-500 text-sm">Bid Price</p><p className="font-semibold">${Number(procurement.bid_price).toLocaleString()}</p></div>
            <div><p className="text-gray-500 text-sm">Lot Bid Count</p><p className="font-semibold">{procurement.lot_bidscount}</p></div>
            <div><p className="text-gray-500 text-sm">CPV Level 2</p><p className="font-semibold">{procurement.main_cpv_2}</p></div>
            <div><p className="text-gray-500 text-sm">CPV Level 3</p><p className="font-semibold">{procurement.main_cpv_3}</p></div>
          </div>

          <hr className="my-6" />

          <div>
            <p className="text-gray-500 text-sm">Risk Score</p>
            <p className={`text-4xl font-bold ${style.text}`}>{riskScore}%</p>
            <p className="mt-2 text-gray-700">
              Risk Level: <span className="font-bold">{severity}</span>
            </p>
          </div>

          <hr className="my-6" />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Auditor Review</h3>
            <textarea
              className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-400 outline-none"
              rows={3}
              placeholder="Add auditor comment for this anomaly..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={hasAnomaly}
            />
            <button
              onClick={handleMarkAsAnomaly}
              disabled={hasAnomaly || saving}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
            >
              {saving ? "Saving..." : hasAnomaly ? "Already Marked as Anomaly" : "Mark as Anomaly"}
            </button>
          </div>

          {flags.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Existing Flags ({flags.length})</h3>
              <div className="space-y-2">
                {flags.map((flag) => (
                  <div key={flag.id} className="bg-gray-50 border rounded-lg p-3 text-sm">
                    <p className="font-medium capitalize">{flag.flag_type} — {flag.status}</p>
                    <p className="text-gray-600 mt-1">{flag.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProcurement;
