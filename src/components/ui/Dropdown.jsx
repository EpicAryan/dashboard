// src/components/ui/Dropdown.jsx

import { useState, useRef, useEffect } from 'react'

const Dropdown = ({ 
  trigger, 
  children, 
  className = '',
  dropdownClassName = '',
  position = 'center',
  isOpen: controlledIsOpen,
  onToggle,
  closeOnSelect = true 
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const containerRef = useRef(null)
  const triggerRef = useRef(null)
  
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const toggleDropdown = onToggle || (() => setInternalIsOpen(!internalIsOpen))

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(event.target)
      const isClickOutsideTrigger = triggerRef.current && !triggerRef.current.contains(event.target)
      
      if (isClickOutsideDropdown && isClickOutsideTrigger) {
        if (onToggle) {
          onToggle(false)
        } else {
          setInternalIsOpen(false)
        }
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        event.preventDefault()
        if (onToggle) {
          onToggle(false)
        } else {
          setInternalIsOpen(false)
        }

        triggerRef.current?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onToggle])

  const positionClasses = {
    right: 'right-0 sm:right-0',
    left: 'left-0 sm:left-0', 
    center: '-left-1/3 md:left-1/2 -translate-x-1/2'
  }

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div 
        ref={triggerRef}
        onClick={() => toggleDropdown(!isOpen)}
      >
        {trigger}
      </div>
      
      {isOpen && (
        <div 
          ref={dropdownRef}
          className={`
            dropdown-container absolute top-full mt-2 z-50
            w-full sm:w-48 max-w-[90vw] sm:max-w-xs min-w-max
            rounded-xl shadow-xl border
            backdrop-blur-sm
            transition-all duration-200 ease-out
            animate-in slide-in-from-top-2 fade-in-0
            ${positionClasses[position]}
            ${dropdownClassName}
          `}
          role="dialog"
          aria-modal="false"
        >
          <div onClick={closeOnSelect ? () => toggleDropdown(false) : undefined}>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}


export const DropdownHeader = ({ children, className = '' }) => (
  <div className={`px-3 sm:px-4 py-2.5 sm:py-3 border-b font-medium text-xs sm:text-sm ${className}`} role="banner">
    {children}
  </div>
)

export const DropdownContent = ({ children, className = '', maxHeight = 'max-h-48 sm:max-h-48', ...props }) => (
  <div 
    className={`py-1 sm:py-2 overflow-y-auto scrollbar-hide ${maxHeight} ${className}`}
    {...props}
  >
    {children}
  </div>
)

export const DropdownItem = ({ children, onClick, isSelected = false, className = '', ...props }) => (
  <button
    onClick={onClick}
    className={`
      w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-normal
      transition-all duration-150 ease-out
      hover:bg-gray-50 dark:hover:bg-gray-700/50
      focus:bg-gray-50 dark:focus:bg-gray-700/50 focus:outline-none
      ${isSelected ? 'dropdown-item--selected font-medium' : ''}
      ${className}
    `}
    role="menuitem"
    tabIndex={0}
    {...props}
  >
    {children}
  </button>
)

export const DropdownFooter = ({ children, className = '', ...props }) => (
  <div 
    className={`px-3 sm:px-4 py-2 sm:py-3 border-t bg-gray-50/50 dark:bg-gray-800/50 ${className}`}
    {...props}
  >
    {children}
  </div>
)

export default Dropdown
