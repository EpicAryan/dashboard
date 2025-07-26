// src/components/ui/Dropdown.jsx

import { useState, useRef, useEffect } from 'react'

const Dropdown = ({ 
  trigger, 
  children, 
  className = '',
  dropdownClassName = '',
  position = 'right',
  isOpen: controlledIsOpen,
  onToggle,
  closeOnSelect = true 
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [actualPosition, setActualPosition] = useState(position)
  const dropdownRef = useRef(null)
  const containerRef = useRef(null)
  
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const toggleDropdown = onToggle || (() => setInternalIsOpen(!internalIsOpen))

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const dropdownWidth = 240 

      if (viewportWidth < 640) {
        setActualPosition('center')
      } else {
        if (rect.right < dropdownWidth) {
          setActualPosition('left')
        } else if (rect.left > viewportWidth - dropdownWidth) {
          setActualPosition('right')
        } else {
          setActualPosition(position)
        }
      }
    }
  }, [isOpen, position])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (onToggle) {
          onToggle(false)
        } else {
          setInternalIsOpen(false)
        }
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onToggle])

  const positionClasses = {
    right: 'right-0 sm:right-0',
    left: 'left-0 sm:left-0', 
    center: 'left-1/2 -translate-x-1/2'
  }

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div onClick={() => toggleDropdown(!isOpen)}>
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
            ${positionClasses[actualPosition]}
            ${dropdownClassName}
          `}
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
  <div className={`px-3 sm:px-4 py-2.5 sm:py-3 border-b font-medium text-xs sm:text-sm ${className}`}>
    {children}
  </div>
)

export const DropdownContent = ({ children, className = '', maxHeight = 'max-h-48 sm:max-h-48' }) => (
  <div className={`py-1 sm:py-2 overflow-y-auto scrollbar-hide ${maxHeight} ${className}`}>
    {children}
  </div>
)

export const DropdownItem = ({ children, onClick, isSelected = false, className = '' }) => (
  <button
    onClick={onClick}
    className={`
      w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-normal
      transition-all duration-150 ease-out
      hover:bg-gray-50 dark:hover:bg-gray-700/50
      ${isSelected ? 'dropdown-item--selected font-medium' : ''}
      ${className}
    `}
  >
    {children}
  </button>
)

export const DropdownFooter = ({ children, className = '' }) => (
  <div className={`px-3 sm:px-4 py-2 sm:py-3 border-t bg-gray-50/50 dark:bg-gray-800/50 ${className}`}>
    {children}
  </div>
)

export default Dropdown
