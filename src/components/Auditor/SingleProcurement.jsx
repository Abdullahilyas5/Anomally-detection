import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProcurement } from "../../apis/modelapi"; // adjust path if needed

const SingleProcurement = () => {
  const { id } = useParams();

  const [procurement, setProcurement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getSingleProcurement(id);

        setProcurement(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-gray-600">
        Loading procurement...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        Error: {error}
      </div>
    );
  }

  if (!procurement) return null;

  const riskScore = (procurement.prediction_score * 100).toFixed(2);

  const severity =
    procurement.prediction_score >= 0.7
      ? "High"
      : procurement.prediction_score >= 0.4
      ? "Medium"
      : "Low";

  const severityStyles = {
    High: {
      border: "border-red-500",
      text: "text-red-600",
      badge: "bg-red-100 text-red-700",
    },
    Medium: {
      border: "border-yellow-500",
      text: "text-yellow-600",
      badge: "bg-yellow-100 text-yellow-700",
    },
    Low: {
      border: "border-green-500",
      text: "text-green-600",
      badge: "bg-green-100 text-green-700",
    },
  };

  const style = severityStyles[severity];

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">
        Procurement Details
      </h1>

      <div className={`bg-white rounded-2xl shadow-lg border-l-8 ${style.border}`}>
        <div className="p-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Procurement #{procurement.id}
            </h2>

            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${style.badge}`}>
              {severity}
            </span>
          </div>

          <hr className="mb-6" />

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm">Country</p>
              <p className="font-semibold">{procurement.country}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Tender Year</p>
              <p className="font-semibold">{procurement.tender_year}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Bidder</p>
              <p className="font-semibold">{procurement.bidder_id}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Buyer</p>
              <p className="font-semibold">{procurement.buyer_id}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Bid Price</p>
              <p className="font-semibold">
                ${Number(procurement.bid_price).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Lot Bid Count</p>
              <p className="font-semibold">{procurement.lot_bidscount}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">CPV Level 2</p>
              <p className="font-semibold">{procurement.main_cpv_2}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">CPV Level 3</p>
              <p className="font-semibold">{procurement.main_cpv_3}</p>
            </div>
          </div>

          <hr className="my-6" />

          {/* Risk Section */}
          <div>
            <p className="text-gray-500 text-sm">Risk Score</p>

            <p className={`text-4xl font-bold ${style.text}`}>
              {riskScore}%
            </p>

            <p className="mt-2 text-gray-700">
              Risk Level: <span className="font-bold">{severity}</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SingleProcurement;