import React from 'react'

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>
      
      {/* Grid for dashboard components */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Stat cards will go here */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p>Stat Card 1 placeholder</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p>Stat Card 2 placeholder</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p>Stat Card 3 placeholder</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p>Stat Card 4 placeholder</p>
        </div>
      </div>
      
      {/* Chart area */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Chart Placeholder</h2>
        <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
          Chart will go here
        </div>
      </div>
      
      {/* Table area */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Data Table</h2>
        <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
          Table will go here
        </div>
      </div>
    </div>
  )
}

export default Dashboard
