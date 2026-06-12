import React, { useEffect, useState } from "react";

import { getAdminDashboard } from "../../apis/dashboard";

import TopSection from "./TopSection";
import AnalyticsGraph from "./AnalyticsGraph";
import RecentRegister from "./RecentRegister";
import ConfirmationRoleTable from "./ConfirmationRoleTable";

const AnalyticsDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await getAdminDashboard();
      setData(res);
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
      <TopSection data={data} />
      <AnalyticsGraph data={data} />
      <ConfirmationRoleTable data={data.pendingApprovals} />
      <RecentRegister data={data.recentUsers} />
    </div>
  );
};

export default AnalyticsDashboard;