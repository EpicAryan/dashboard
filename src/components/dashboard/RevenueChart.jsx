// src/components/dashboard/RevenueChart.jsx
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', revenue: 4500 },
  { month: 'Feb', revenue: 5200 },
  { month: 'Mar', revenue: 4800 },
  { month: 'Apr', revenue: 6100 },
  { month: 'May', revenue: 5500 },
  { month: 'Jun', revenue: 6700 }
]

const RevenueChart = () => {
  return (
    <div className="dashboard-section">
      <h2 className="dashboard-section__title">Revenue Overview</h2>
      
      {/* Scrollable container */}
      <div className="chart-scroll-container">
        <div className="chart-content">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--border-color)' }}
              />
              <YAxis 
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--border-color)' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#2563eb" 
                strokeWidth={3}
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default RevenueChart
