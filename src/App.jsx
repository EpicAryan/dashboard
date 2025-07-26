//App.jsx

import { useState } from 'react'
import DashboardLayout from './components/layout/DashboardLayout'
import Dashboard from './pages/Dashboard'


function App() {
  const [currentPage, setCurrentPage] = useState('/')

  const renderPage = () => {
    switch (currentPage) {
      case '/':
        return <Dashboard />
      default:
        return <Dashboard />
    }
  }

  return (
    <DashboardLayout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </DashboardLayout>
  )
}

export default App
