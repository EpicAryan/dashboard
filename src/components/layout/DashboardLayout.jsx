import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden modal-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div style={{ marginLeft: 'var(--sidebar-width)' }} className="lg:ml-[var(--sidebar-width)] ml-0">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-4" style={{ paddingTop: 'calc(var(--navbar-height) + 1rem)' }}>
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
