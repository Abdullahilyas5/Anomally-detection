import React, { useEffect, useState } from "react";

import { getAuditorDashboard } from "../../apis/dashboard";

import TopSectionAuditor from "./TopSectionAuditor";
import AnalyticsGraph from "../Admin/AnalyticsGraph";

const AuditorDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await getAuditorDashboard();

      setData(res); // ✅ FIX: no res.data
    };

    load();
  }, []);

  if (!data) {
    return (
      <div className="p-6 text-gray-500 font-medium">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TopSectionAuditor data={data} />
      <AnalyticsGraph data={data} />
    </div>
  );
};

export default AuditorDashboard;