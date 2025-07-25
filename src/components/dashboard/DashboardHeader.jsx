//src/components/dashboard/DashboardHeader.jsx

import { Calendar, Download, Filter } from 'lucide-react'

const DashboardHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Title Section */}
        <div className="flex-1">
          <h1 className="dashboard-header__title text-3xl sm:text-2xl font-bold mb-2 leading-tight">
            Dashboard
          </h1>
          <p className="dashboard-header__subtitle text-base sm:text-sm leading-relaxed">
            Welcome back! Here&apos;s a snapshot of your financial performance today
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <button className="dashboard-header__action-btn flex items-center gap-2 px-4 py-2.5 sm:px-3 sm:py-2 text-sm font-medium rounded-lg border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Last 30 days</span>
          </button>
          
          <button className="dashboard-header__action-btn flex items-center gap-2 px-4 py-2.5 sm:px-3 sm:py-2 text-sm font-medium rounded-lg border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
          
          <button className="dashboard-header__action-btn dashboard-header__action-btn--primary flex items-center gap-2 px-4 py-2.5 sm:px-3 sm:py-2 text-sm font-medium rounded-lg border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader
