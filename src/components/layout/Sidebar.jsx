import React from 'react'

const Sidebar = ({ isOpen }) => {
  const navigationItems = [
    { name: 'Dashboard', icon: '📊', active: true },
    { name: 'Analytics', icon: '📈', active: false },
    { name: 'Users', icon: '👥', active: false },
    { name: 'Settings', icon: '⚙️', active: false },
  ]

  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-50 sidebar
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}
      style={{ width: 'var(--sidebar-width)' }}
    >
      <div className="flex h-full flex-col">
        {/* Logo/Header */}
        <div 
          className="flex items-center px-6 border-b"
          style={{ 
            height: 'var(--navbar-height)',
            borderColor: 'var(--border-color)'
          }}
        >
          <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Dashboard
          </h2>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="sidebar-nav">
            {navigationItems.map((item) => (
              <li key={item.name} className="sidebar-nav-item">
                <a 
                  href="#" 
                  className={`sidebar-nav-link ${item.active ? 'active' : ''}`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
