//src/components/layout/Sidebar.jsx

import { useEffect, useRef } from 'react'
import {
  ChevronsUpDown,
  Gem,
  X,
} from 'lucide-react'
import {
  sidebarSections
} from '../../data/sidebarNavigation.js'
import ThemeToggle from '../ui/ThemeToggle'

const Sidebar = ({ isOpen = true, onClose, currentPage, setCurrentPage }) => {
  const sidebarRef = useRef(null)
  const firstFocusableRef = useRef(null)
  const lastFocusableRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          onClose()
          break
        case 'Tab':
          if (window.innerWidth < 1024) {
            const focusableElements = sidebarRef.current?.querySelectorAll(
              'a[href], button, input, [tabindex]:not([tabindex="-1"])'
            )
            const firstElement = focusableElements?.[0]
            const lastElement = focusableElements?.[focusableElements.length - 1]

            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                e.preventDefault()
                lastElement?.focus()
              }
            } else {
              if (document.activeElement === lastElement) {
                e.preventDefault()
                firstElement?.focus()
              }
            }
          }
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      if (window.innerWidth < 1024) {
        setTimeout(() => {
          firstFocusableRef.current?.focus()
        }, 100)
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const NavLink = ({ item, isFirst = false }) => {
    const IconComponent = item.icon
    const isActive = currentPage === item.path
    
    const handleClick = (e) => {
      e.preventDefault()
      setCurrentPage(item.path)
      if (window.innerWidth < 1024) {
        onClose()
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick(e)
      }
    }
    
    return (
      <li role="none">
        <a
          ref={isFirst ? firstFocusableRef : null}
          href={item.path}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={`sidebar__nav-link flex items-center p-2 mx-2 rounded-lg transition-all duration-200 cursor-pointer hover:transform hover:translate-x-1 ${
            isActive
              ? 'sidebar__nav-link--active bg-blue-100 font-semibold text-blue-800 shadow-sm pointer-events-none'
              : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
          }`}
          role="menuitem"
          aria-current={isActive ? 'page' : undefined}
          tabIndex={0}
        >
          <IconComponent size={20} className="mr-3" aria-hidden="true" />
          <span className="flex-1 text-sm">{item.name}</span>
          {item.badge && (
            <>
              {item.badge === 'PRO' ? (
                <span 
                  className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full"
                  aria-label="Beta feature"
                >
                  {item.badge}
                </span>
              ) : (
                <span 
                  className="flex items-center justify-center h-5 w-5 text-xs pb-0.5 font-bold text-white bg-red-500 rounded-full animate-pulse"
                  aria-label={`${item.badge} unread notifications`}
                >
                  {item.badge}
                </span>
              )}
            </>
          )}
        </a>
      </li>
    )
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      {isOpen && (
        <div
          className="sidebar__backdrop fixed inset-0 z-40 bg-black lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        ref={sidebarRef}
        className={`sidebar fixed inset-y-0 left-0 z-50 flex h-full w-[256px] flex-col border-r bg-white
                    transform transition-transform duration-600 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0`}
        role="navigation"
        aria-label="Main navigation"
        aria-hidden={!isOpen}
      >

        {/* Header */}
        <div className="sidebar__header flex h-16 shrink-0 items-center justify-between px-4 border-b">
          <div className="flex items-center gap-2">
            <img
              src='/logo.svg'
              alt='Nexus logo'
              className='size-6'
            />
            <span className="sidebar__brand text-xl font-bold">Perccent</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close navigation menu"
            tabIndex={0}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pt-2 px-1" role="menubar">
          {sidebarSections.map(({ id, title, items }, sectionIndex) => (
            <div
              key={id}
              role="group"
              aria-labelledby={`${id}-heading`}
              className={sectionIndex !== 0 ? 'sidebar__section-border border-t pt-2' : ''}
            >
              <h3
                id={`${id}-heading`}
                className="sidebar__section-title px-4 pt-2 pb-2 text-xs font-semibold uppercase tracking-wider"
              >
                {title}
              </h3>
              <ul className="space-y-1" role="menu">
                {items.map((item, itemIndex) => (
                  <NavLink key={item.name} item={item} isFirst={sectionIndex === 0 && itemIndex === 0} />
                ))}
              </ul>
            </div>
          ))}

          {/* Theme Toggle */}
          <div className="md:hidden sidebar__section-border border-t pt-2">
            <div className="justify-self-center">
              <ThemeToggle />
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="sidebar__footer shrink-0 border-t p-2">
          <div className="sidebar__team-card rounded-lg p-2">
            <div className="flex items-center cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                <Gem size={20} className="text-teal-600" aria-hidden="true" />
              </div>
              <div className="ml-3 flex-1">
                <p className="sidebar__team-name text-sm font-semibold">Team</p>
                <p className="sidebar__team-role text-xs">Marketing</p>
              </div>
              <button 
                className="sidebar__team-toggle p-1 hover:bg-gray-200 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Switch team"
                tabIndex={0}
              >
                <ChevronsUpDown size={16} />
              </button>
            </div>
          </div>
          
          <button 
            ref={lastFocusableRef}
            className="sidebar__upgrade-btn mt-2 w-full rounded-lg border py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            aria-label="Upgrade to premium plan"
            tabIndex={0}
          >
            Upgrade Plan
          </button>
          <p className="sidebar__copyright mt-4 text-center text-xs">
            © 2025 Perccent.io, Inc.
          </p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
