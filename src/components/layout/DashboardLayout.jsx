//src/components/layout/DashboardLayout.jsx

import { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const DashboardLayout = ({ children, currentPage, setCurrentPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-container min-h-screen">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      <div className="lg:ml-64">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-4 pt-20">
          <div className="container mx-auto md:px-4 lg:px-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
