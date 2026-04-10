import React, { useState } from 'react'
import { MdOutlineRateReview, MdCheckCircle, MdPending, MdFileDownload } from 'react-icons/md'
import { FaFileContract, FaClock } from 'react-icons/fa'
import { motion } from 'framer-motion'

const CitizenDashboard = () => {
  const [recentProcurements] = useState([
    { id: 1, name: "Infrastructure Project", status: "Pending Review", date: "2026-04-08", amount: "$50,000" },
    { id: 2, name: "Software License", status: "Reviewed", date: "2026-04-07", amount: "$15,000" },
    { id: 3, name: "Office Supplies", status: "Approved", date: "2026-04-06", amount: "$5,000" },
  ])

  const stats = [
    { title: "Total Procurements", value: "24", color: "text-primary", bgColor: "bg-cleanBlue", icon: FaFileContract },
    { title: "Pending Review", value: "6", color: "text-lightoragne", bgColor: "bg-softaccent", icon: FaClock },
    { title: "Reviewed", value: "15", color: "text-secondary", bgColor: "bg-lightBlue", icon: MdCheckCircle },
    { title: "Reports Filed", value: "18", color: "text-DarkBlue", bgColor: "bg-softBlue", icon: MdOutlineRateReview },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary to-DarkBlue rounded-xl p-6 text-card shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-lightBlue opacity-90">Monitor your procurements and review reports in one place.</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`${stat.bgColor} rounded-xl p-6 border border-borderSlate shadow-md hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-textSecondary text-sm font-medium">{stat.title}</p>
                  <h3 className={`${stat.color} text-3xl font-bold mt-2`}>{stat.value}</h3>
                </div>
                <Icon className={`${stat.color} text-4xl opacity-20`} />
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Recent Procurements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-card rounded-xl shadow-md p-6 border border-borderSlate"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-textMain flex items-center gap-2">
            <FaFileContract className="text-primary" />
            Recent Procurements
          </h2>
          <a href="/citizen/procurement-reviews" className="text-primary hover:text-buttonHover text-sm font-medium">
            View All →
          </a>
        </div>

        <div className="space-y-3">
          {recentProcurements.map((proc, index) => (
            <motion.div
              key={proc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              className="flex items-center justify-between p-4 bg-background rounded-lg hover:bg-borderSlate transition-colors border-l-4 border-primary"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-textMain">{proc.name}</h3>
                <p className="text-sm text-textSecondary">{proc.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-textMain font-bold">{proc.amount}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  proc.status === 'Pending Review' ? 'bg-softaccent text-lightoragne' :
                  proc.status === 'Reviewed' ? 'bg-cleanBlue text-primary' :
                  'bg-softBlue text-secondary'
                }`}>
                  {proc.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <a
          href="/citizen/procurement-reviews"
          className="bg-card rounded-xl p-6 border border-borderSlate shadow-md hover:shadow-lg transition-all hover:border-primary group"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-textMain group-hover:text-primary transition-colors">Review Procurements</h3>
              <p className="text-sm text-textSecondary mt-1">Check and review pending procurements</p>
            </div>
            <MdOutlineRateReview className="text-2xl text-textSecondary group-hover:text-primary transition-colors" />
          </div>
        </a>

        <a
          href="/citizen/reviewed-reports"
          className="bg-card rounded-xl p-6 border border-borderSlate shadow-md hover:shadow-lg transition-all hover:border-secondary group"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-textMain group-hover:text-secondary transition-colors">View Reviewed Reports</h3>
              <p className="text-sm text-textSecondary mt-1">Access your filed and processed reports</p>
            </div>
            <MdFileDownload className="text-2xl text-textSecondary group-hover:text-secondary transition-colors" />
          </div>
        </a>
      </motion.div>
    </div>
  )
}

export default CitizenDashboard