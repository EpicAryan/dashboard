import React from 'react'

const Navbar = ({ onMenuClick }) => {
  return (
    <header 
      className="fixed top-0 right-0 left-0 lg:left-[var(--sidebar-width)] z-30 navbar"
      style={{ height: 'var(--navbar-height)' }}
    >
      <div className="px-4 h-full flex items-center justify-between">
        <button
          type="button"
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          style={{ color: 'var(--text-secondary)' }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        

        <div className="hidden md:block flex-1 max-w-lg mx-8">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <span className="text-xl">🔔</span>
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <span className="text-xl">👤</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
