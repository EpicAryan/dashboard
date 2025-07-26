// src/components/dashboard/DashboardHeader.jsx

import { useState, useRef } from 'react'
import { Calendar, Download, Filter, ChevronDown, X } from 'lucide-react'
import Dropdown, { DropdownHeader, DropdownContent, DropdownFooter } from '../ui/Dropdown'

const DashboardHeader = () => {
  const [appliedFilters, setAppliedFilters] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const filterButtonRef = useRef(null)

  const filterOptions = [
    { id: 'income', label: 'Income Only' },
    { id: 'expenses', label: 'Expenses Only' },
    { id: 'high-amount', label: 'High Amount (>$1000)' },
    { id: 'recent', label: 'Recent Transactions' },
    { id: 'pending', label: 'Pending Status' }
  ]

  const handleFilterToggle = (filterId) => {
    setAppliedFilters(prev => {
      if (prev.includes(filterId)) {
        return prev.filter(id => id !== filterId)
      } else if (prev.length < 2) {
        return [...prev, filterId]
      } else {
        return prev
      }
    })
  }

  const clearFilters = () => {
    setAppliedFilters([])
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl md:text-2xl font-bold mb-2 leading-tight dashboard-header__title">
            Welcome back Aryan
          </h1>
          <p className="text-sm sm:text-base md:text-sm leading-relaxed dashboard-header__subtitle">
            Here's a snapshot of your financial performance today.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
          <button className="dashboard-header__action-btn flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span className="hidden sm:inline font-normal">
              Last 30 days
            </span>
          </button>
          
          <Dropdown
            isOpen={filterOpen}
            onToggle={setFilterOpen} 
            dropdownClassName="w-full sm:w-52"
            position="right"
            closeOnSelect={false}
            trigger={
              <button 
                ref={filterButtonRef}
                className={`
                  dashboard-header__action-btn flex items-center gap-1.5 sm:gap-2 
                  px-2.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium 
                  rounded-lg border transition-all duration-200 
                  hover:-translate-y-0.5 cursor-pointer
                  ${filterOpen ? 'dashboard-header__action-btn--active' : ''}
                `}
                aria-expanded={filterOpen}
                aria-haspopup="menu"
                aria-label={`Filter options. ${appliedFilters.length} filters applied`}
              >
                <Filter className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline font-normal">Filter</span>
                {appliedFilters.length > 0 && (
                  <span 
                    className="dashboard-filter-badge ml-1 px-1.5 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full flex-shrink-0"
                    aria-label={`${appliedFilters.length} filters applied`}
                  >
                    {appliedFilters.length}
                  </span>
                )}
                <ChevronDown 
                  className={`h-3 w-3 flex-shrink-0 transition-transform duration-200 ${
                    filterOpen ? 'rotate-180' : ''
                  }`} 
                  aria-hidden="true"
                />
              </button>
            }
          >
            <div role="menu" aria-label="Filter options">
              <DropdownHeader className="flex items-center justify-between">
                <span>
                  Filters 
                  {appliedFilters.length >= 2 && (
                    <span className="text-xs opacity-60 ml-1">(Max 2)</span>
                  )}
                </span>
                {appliedFilters.length > 0 && (
                  <button 
                    onClick={clearFilters}
                    className="text-xs font-medium dashboard-clear-btn hover:underline flex-shrink-0"
                    aria-label="Clear all filters"
                  >
                    Clear all
                  </button>
                )}
              </DropdownHeader>
              
              <DropdownContent 
                maxHeight="max-h-48 sm:max-h-64" 
                role="group" 
                aria-label="Available filters"
              >
                {filterOptions.map(option => {
                  const isSelected = appliedFilters.includes(option.id)
                  const isDisabled = !isSelected && appliedFilters.length >= 2
                  
                  return (
                    <div
                      key={option.id}
                      role="menuitemcheckbox"
                      aria-checked={isSelected}
                      aria-disabled={isDisabled}
                      className={`
                        flex items-center w-full px-3 sm:px-4 py-1.5 sm:py-2 
                        text-xs sm:text-sm font-normal transition-colors cursor-pointer
                        ${isDisabled 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }
                      `}
                      onClick={() => !isDisabled && handleFilterToggle(option.id)}
                      onKeyDown={(e) => {
                        if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
                          e.preventDefault()
                          handleFilterToggle(option.id)
                        }
                      }}
                      tabIndex={0}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => !isDisabled && handleFilterToggle(option.id)}
                        disabled={isDisabled}
                        className="mr-2 sm:mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 flex-shrink-0"
                        aria-hidden="true"
                        tabIndex={-1}
                      />
                      <span className="truncate">{option.label}</span>
                    </div>
                  )
                })}
              </DropdownContent>
              
              {appliedFilters.length > 0 && (
                <DropdownFooter role="group" aria-label="Applied filters">
                  <div className="flex flex-wrap gap-1">
                    {appliedFilters.map(filterId => {
                      const filter = filterOptions.find(f => f.id === filterId)
                      return (
                        <span 
                          key={filterId}
                          className="dashboard-filter-tag inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full"
                          role="group"
                          aria-label={`Applied filter: ${filter?.label}`}
                        >
                          <span className="truncate max-w-20">{filter?.label}</span>
                          <button
                            onClick={() => handleFilterToggle(filterId)}
                            className="hover:text-red-500 transition-colors flex-shrink-0"
                            aria-label={`Remove ${filter?.label} filter`}
                            tabIndex={0}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      )
                    })}
                  </div>
                </DropdownFooter>
              )}
            </div>
          </Dropdown>
          
          <button className="dashboard-header__action-btn dashboard-header__action-btn--primary flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
            <Download className="h-4 w-4 flex-shrink-0" />
            <span className="hidden sm:inline font-normal">Export</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader
