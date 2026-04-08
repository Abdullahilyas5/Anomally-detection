import React from 'react'
import TopSection from './TopSection'
import AnalyticsGraph from './AnalyticsGraph'
import RecentRegister from './RecentRegister'
import ConfirmationRoleTable from './ConfirmationRoleTable'

const AnalyticsDashboard = () => {
  return (
    <div>
        <TopSection/>
        <AnalyticsGraph/>
        <ConfirmationRoleTable/>
        <RecentRegister/>
    </div>
  )
}

export default AnalyticsDashboard