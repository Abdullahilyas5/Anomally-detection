import React from "react";

const TopSectionAuditor = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">

      <div className="bg-white rounded-xl border border-gray-100 shadow-md p-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Total Anomalies
        </p>
        <h2 className="text-3xl font-semibold text-primary mt-3">
          {data.totalAnomalies}
        </h2>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-md p-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Alert Threshold
        </p>
        <h2 className="text-3xl font-semibold text-primary mt-3">
          {data.alertThreshold ?? "—"}
        </h2>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-md p-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Highlighted
        </p>
        <h2 className="text-3xl font-semibold text-accent mt-3">
          {data.highlighted}
        </h2>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-md p-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Procurement
        </p>
        <h2 className="text-3xl font-semibold text-DarkBlue mt-3">
          {data.totalProcurements}
        </h2>
      </div>

     

    </div>
  );
};

export default TopSectionAuditor;