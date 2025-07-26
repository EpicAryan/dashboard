import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'Stocks', value: 45 },
  { name: 'Bonds', value: 25 },
  { name: 'Real Estate', value: 15 },
  { name: 'Crypto', value: 10 },
  { name: 'Cash', value: 5 }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

const PortfolioChart = () => {
  return (
    <div className="dashboard-section">
      <h2 className="dashboard-section__title">Portfolio Allocation</h2>
      <div className="pie-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={380}>
            <Pie
              data={data}
              cx="50%"
              cy="45%" 
              innerRadius={0}
              outerRadius="var(--pie-radius)" 
              dataKey="value"
              stroke="#fff"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Allocation']}
              labelStyle={{ color: 'var(--text-primary)' }}
              contentStyle={{ 
                backgroundColor: 'var(--bg-primary)', 
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
              itemStyle={{
                color: 'var(--text-primary)'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={80} 
              formatter={(value) => value}
              wrapperStyle={{
                color: 'var(--text-secondary)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PortfolioChart
