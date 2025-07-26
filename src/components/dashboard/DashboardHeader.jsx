// src/components/dashboard/DashboardHeader.jsx

import { useState } from 'react'
import { Calendar, Download, Filter, ChevronDown, X } from 'lucide-react'
import Dropdown, { DropdownHeader, DropdownContent, DropdownItem, DropdownFooter } from '../ui/Dropdown'

const DashboardHeader = () => {
  const [appliedFilters, setAppliedFilters] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)

  const filterOptions = [
    { id: 'income', label: 'Income Only' },
    { id: 'expenses', label: 'Expenses Only' },
    { id: 'high-amount', label: 'High Amount (>$1000)' },
    { id: 'recent', label: 'Recent Transactions' },
    { id: 'pending', label: 'Pending Status' }
  ]

  const handleFilterToggle = (filterId) => {
    setAppliedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const clearFilters = () => setAppliedFilters([])

  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Title Section */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl md:text-2xl font-bold mb-2 leading-tight dashboard-header__title">
            Welcome back Aryan
          </h1>
          <p className="text-sm sm:text-base md:text-sm leading-relaxed dashboard-header__subtitle">
            Here's a snapshot of your financial performance today.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
          <button className="dashboard-header__action-btn flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span className="hidden sm:inline font-normal">
              Last 30 days
            </span>
          </button>
          
          {/* Filter Dropdown */}
          <Dropdown
            isOpen={filterOpen}
            onToggle={setFilterOpen}
            dropdownClassName="w-full sm:w-52"
            position="right"
            closeOnSelect={false}
            trigger={
              <button className={`
                dashboard-header__action-btn flex items-center gap-1.5 sm:gap-2 
                px-2.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium 
                rounded-lg border transition-all duration-200 
                hover:-translate-y-0.5 cursor-pointer
                ${filterOpen ? 'dashboard-header__action-btn--active' : ''}
              `}>
                <Filter className="h-4 w-4 flex-shrink-0" />
                <span className="hidden sm:inline font-normal">Filter</span>
                {appliedFilters.length > 0 && (
                  <span className="dashboard-filter-badge ml-1 px-1.5 py-0.5 text-xs font-semibold rounded-full flex-shrink-0">
                    {appliedFilters.length}
                  </span>
                )}
                <ChevronDown className={`h-3 w-3 flex-shrink-0 transition-transform duration-200 ${
                  filterOpen ? 'rotate-180' : ''
                }`} />
              </button>
            }
          >
            <DropdownHeader className="flex items-center justify-between">
              <span>Filters</span>
              {appliedFilters.length > 0 && (
                <button 
                  onClick={clearFilters}
                  className="text-xs font-medium dashboard-clear-btn hover:underline flex-shrink-0"
                >
                  Clear all
                </button>
              )}
            </DropdownHeader>
            
            <DropdownContent maxHeight="max-h-48 sm:max-h-64">
              {filterOptions.map(option => (
                <label
                  key={option.id}
                  className="flex items-center w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-normal hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={appliedFilters.includes(option.id)}
                    onChange={() => handleFilterToggle(option.id)}
                    className="mr-2 sm:mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 flex-shrink-0"
                  />
                  <span className="truncate">{option.label}</span>
                </label>
              ))}
            </DropdownContent>
            
            {appliedFilters.length > 0 && (
              <DropdownFooter>
                <div className="flex flex-wrap gap-1">
                  {appliedFilters.map(filterId => {
                    const filter = filterOptions.find(f => f.id === filterId)
                    return (
                      <span 
                        key={filterId}
                        className="dashboard-filter-tag inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full"
                      >
                        <span className="truncate max-w-20">{filter?.label}</span>
                        <button
                          onClick={() => handleFilterToggle(filterId)}
                          className="hover:text-red-500 transition-colors flex-shrink-0"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )
                  })}
                </div>
              </DropdownFooter>
            )}
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
