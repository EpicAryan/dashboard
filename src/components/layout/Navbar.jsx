//src/components/layout/Navbar.jsx

import { useState, useEffect } from 'react'
import { Menu, Search, Bell, Command } from 'lucide-react'
import SearchDialog from '../ui/SearchDialog'
import ThemeToggle from '../ui/ThemeToggle'
import ProfileModal from '../ui/ProfileModal'

const Navbar = ({ onMenuClick }) => {
  const [isMenuPressed, setIsMenuPressed] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleMenuClick = () => {
    setIsMenuPressed(true)
    onMenuClick()
    setTimeout(() => setIsMenuPressed(false), 300)
  }

  const handleSearchClick = () => {
    setIsSearchOpen(true)
  }

  const handleSearchClose = () => {
    setIsSearchOpen(false)
  }

  const handleProfileClick = () => {
    setIsProfileOpen(true)
  }

  const handleProfileClose = () => {
    setIsProfileOpen(false)
  }

  return (
    <>
      <header className="navbar fixed top-0 right-0 left-0 lg:left-64 z-30 border-b backdrop-blur-md">
        <div className='container mx-auto px-4 md:px-7 lg:px-10'>
          <div className="bg-transparent h-16 flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={handleMenuClick}
              className={`navbar__menu-btn lg:hidden py-2.5 rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-1 hover:scale-105 active:scale-95 ${
                isMenuPressed ? 'hamburger-icon--rotating' : ''
              }`}
              aria-label="Open navigation menu"
            >
              <Menu size={20} className="hamburger-icon" />
            </button>

            {/* Search Bar */}
            <div className="navbar__search flex-1 max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-lg">
              <button
                onClick={handleSearchClick}
                className="navbar__search-btn group w-full flex items-center pl-2 pr-1 py-1 text-left rounded-xl border transition-all duration-300 ease-out hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 active:scale-[0.99] cursor-pointer"
                aria-label="Open search dialog"
              >
                <Search className="hidden sm:block h-4 w-4 mr-3 navbar__search-icon transition-colors duration-200" />
                <span className="hidden sm:block flex-1 text-sm navbar__search-text transition-colors duration-200">
                  Search transactions, accounts...
                </span>
                <div className="hidden sm:flex items-center space-x-1 text-xs">
                  <kbd className="navbar__kbd px-2.5 py-1.5 rounded-lg border font-mono text-xs font-medium transition-all duration-200 group-hover:border-blue-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50">
                    <Command className="h-3 w-3 inline mr-1" />
                    / K
                  </kbd>
                </div>
                <div className="flex items-center gap-2 sm:hidden opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                  <Search className="h-4 w-4" />
                  <span className="flex-1 text-sm navbar__search-text transition-colors duration-200">
                    Search accounts...
                  </span>
                </div>
              </button>
            </div>

            {/* Right Section */}
            <div className="navbar__actions flex items-center space-x-1 sm:space-x-2">
              <div className="hidden md:block sidebar__section-border">
                  <ThemeToggle />
              </div>
              {/* Notification Bell */}
              <button 
                className="navbar__notification-btn group relative p-2.5 sm:mr-6 rounded-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-1 active:scale-95 cursor-pointer"
                aria-label="View notifications"
              >
                <Bell className="size-5 sm:size-6 transition-transform duration-200 group-hover:rotate-12" />
                <span className="navbar__notification-dot absolute -top-0.5 -right-0.5 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-[10px] sm:text-[11px] font-bold text-white">3</span>
                </span>
              </button>

              {/* User Avatar */}
              <div className="navbar__avatar-container">
                <button 
                  onClick={handleProfileClick}
                  className="navbar__avatar-btn group flex items-center md:space-x-3 p-1.5 rounded-xl transition-all duration-300 ease-out hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-1 active:scale-95 cursor-pointer"
                  aria-label="Open profile settings"
                >
                  <div className="relative">
                    <img
                      className="size-7 lg:size-8 rounded-full ring-2 ring-offset-1 navbar__avatar-img transition-all duration-200 group-hover:ring-blue-300"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="User avatar"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="navbar__user-name text-xs lg:text-sm font-semibold transition-colors duration-200">
                      Aryan
                    </div>
                    <div className="navbar__user-email text-xs transition-colors duration-200">
                      aryan@perccent.io
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Dialog */}
      <SearchDialog isOpen={isSearchOpen} onClose={handleSearchClose} />
      <ProfileModal isOpen={isProfileOpen} onClose={handleProfileClose} />
    </>
  )
}

export default Navbar
