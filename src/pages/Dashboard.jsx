import React from 'react'
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import SummaryCard from '../components/dashboard/SummaryCard'

const Dashboard = () => {

  const summaryData = [
    {
      title: 'Total Revenue',
      value: 45231,
      change: 12.5,
      changeType: 'positive',
      icon: DollarSign,
      format: 'currency'
    },
    {
      title: 'Total Users',
      value: 8549,
      change: 8.2,
      changeType: 'positive',
      icon: Users,
      format: 'number'
    },
    {
      title: 'Total Sales',
      value: 1247,
      change: -3.1,
      changeType: 'negative',
      icon: ShoppingCart,
      format: 'number'
    },
    {
      title: 'Conversion Rate',
      value: 12.8,
      change: 2.4,
      changeType: 'positive',
      icon: TrendingUp,
      format: 'percentage'
    }
  ]

  return (
    <div className="py-4">
      {/* Dashboard Header */}
      <DashboardHeader />
      
      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {summaryData.map((card, index) => (
          <SummaryCard
            key={index}
            title={card.title}
            value={card.value}
            change={card.change}
            changeType={card.changeType}
            icon={card.icon}
            format={card.format}
          />
        ))}
      </div>
      
      {/* Chart area placeholder */}
      <div className="dashboard-section">
        <h2 className="dashboard-section__title">Revenue Overview</h2>
        <div className="dashboard-section__content">
          <div className="dashboard-placeholder">
            <TrendingUp className="h-12 w-12 text-gray-400" />
            <p className="text-gray-500">Chart component will go here</p>
          </div>
        </div>
      </div>
      
      {/* Table area placeholder */}
      <div className="dashboard-section">
        <h2 className="dashboard-section__title">Recent Transactions</h2>
        <div className="dashboard-section__content">
          <div className="dashboard-placeholder">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
            <p className="text-gray-500">Data table will go here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
