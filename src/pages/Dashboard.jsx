// src/pages/Dashboard.jsx

import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import SummaryCard from '../components/dashboard/SummaryCard'
import DataTable from '../components/dashboard/DataTable'
import RevenueChart from '../components/dashboard/RevenueChart'
import PortfolioChart from '../components/dashboard/PortfolioChart'
import { sampleTransactions } from '../data/sampleTransactions'

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
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        
        <div className="lg:col-span-1">
          <PortfolioChart />
        </div>
      </div>
      
      {/* Table area */}
      <DataTable 
        title="Recent Transactions"
        data={sampleTransactions}
        showPagination={true}
        itemsPerPage={10}
      />
    </div>
  )
}

export default Dashboard
