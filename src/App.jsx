import React, { useState } from 'react'
import DashboardLayout from './components/layout/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
// import Customers from './pages/Customers'
// import Message from './pages/Message'
// import Product from './pages/Product'
// import Invoice from './pages/Invoice'
// import Analytics from './pages/Analytics'
// import Automation from './pages/Automation'
// import Settings from './pages/Settings'
// import Security from './pages/Security'
// import Help from './pages/Help'

function App() {
  const [currentPage, setCurrentPage] = useState('/')

  const renderPage = () => {
    switch (currentPage) {
      case '/':
        return <Dashboard />
      case '/payment':
        return <Transactions />
      // case '/customers':
      //   return <Customers />
      // case '/message':
      //   return <Message />
      // case '/product':
      //   return <Product />
      // case '/invoice':
      //   return <Invoice />
      // case '/analytics':
      //   return <Analytics />
      // case '/automation':
      //   return <Automation />
      // case '/settings':
      //   return <Settings />
      // case '/security':
      //   return <Security />
      // case '/help':
      //   return <Help />
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
