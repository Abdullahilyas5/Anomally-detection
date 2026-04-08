import React from 'react'

const TopSection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">

  <div className="bg-white rounded-xl border border-gray-100 shadow-md p-6">
    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
      Total Anomalies
    </p>
    <h2 className="text-3xl font-semibold text-primary mt-3">
      12
    </h2>
  </div>

  <div className="bg-white rounded-xl border border-gray-100 shadow-md p-6">
    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
      Highlighted
    </p>
    <h2 className="text-3xl font-semibold text-accent mt-3">
      5
    </h2>
  </div>

  <div className="bg-white rounded-xl border border-gray-100 shadow-md p-6">
    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
      Procurement
    </p>
    <h2 className="text-3xl font-semibold text-DarkBlue mt-3">
      15
    </h2>
  </div>

  <div className="bg-white rounded-xl border border-gray-100 shadow-md p-6">
    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
      Pending
    </p>
    <h2 className="text-3xl font-semibold text-lightoragne mt-3">
      3
    </h2>
  </div>

</div>
    )
}

export default TopSection