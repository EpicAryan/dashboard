import { useEffect, useRef, useState } from 'react'
import { Search, Clock, TrendingUp, ArrowRight, Command } from 'lucide-react'
import { useCSSOnlyModal } from '../../hooks/useCSSOnlyModal'
import CSSCloseButton from './CSSCloseButton'

const SearchDialog = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const searchInputRef = useRef(null)
  const dialogRef = useRef(null)
  const modalId = 'search-dialog'

  const { checkboxId, handleClose: originalHandleClose } = useCSSOnlyModal(modalId, isOpen, onClose)

  const recentSearches = [
    'Monthly revenue report',
    'Customer transactions',
    'Investment portfolio',
    'Tax documents'
  ]

  const suggestions = [
    { icon: TrendingUp, title: 'Analytics Dashboard', description: 'View detailed analytics and insights' },
    { icon: Clock, title: 'Recent Transactions', description: 'Last 30 days transaction history' },
    { icon: Search, title: 'Advanced Search', description: 'Search with filters and options' },
  ]

  const allItems = searchQuery ? suggestions : recentSearches.map(item => ({ title: item, isRecent: true }))

  const handleClose = () => {
    setIsExiting(true)
    
    setTimeout(() => {
      setIsExiting(false)
      originalHandleClose()
    }, 200) 
  }

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      setIsExiting(false)

      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
      
      setSearchQuery('')
      setSelectedIndex(0)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      setIsAnimating(false)
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen || isExiting) return

      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          handleClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, allItems.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (allItems[selectedIndex]) {
            console.log('Selected:', allItems[selectedIndex])
            handleClose()
          }
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, selectedIndex, allItems, isExiting])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isExiting) {
      handleClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      <input
        type="checkbox"
        id={checkboxId}
        className="search-modal-checkbox sr-only"
        aria-hidden="true"
        defaultChecked={isOpen}
      />

      <div
        className={`search-dialog-backdrop fixed inset-0 z-50 flex items-center justify-center px-4 ${
          isAnimating && !isExiting 
            ? 'backdrop-enter' 
            : isExiting 
              ? 'backdrop-exit' 
              : 'opacity-0'
        }`}
        onClick={handleBackdropClick}
      >
        <div
          ref={dialogRef}
          className={`search-dialog w-full max-w-2xl rounded-2xl border shadow-2xl ${
            isAnimating && !isExiting 
              ? 'modal-enter' 
              : isExiting 
                ? 'modal-exit'
                : 'opacity-0 scale-30'
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-dialog-title"
        >
          {/* Search Input Header */}
          <div className="search-dialog__header flex items-center px-6 py-4 border-b rounded-t-2xl">
            <Search className="search-dialog__search-icon h-5 w-5 mr-4" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search transactions, accounts, reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-dialog__input flex-1 bg-transparent border-none outline-none text-base placeholder:text-sm md:placeholder:text-base"
              aria-label="Search"
            />
            <div className="flex items-center space-x-2">
              <kbd className="search-dialog__kbd hidden sm:flex items-center px-2.5 py-1.5 border rounded-lg text-xs font-medium">
                ESC
              </kbd>
              <CSSCloseButton 
                checkboxId={checkboxId}
                className="search-dialog__close-btn"
                aria-label="Close search"
                onClick={handleClose}
              />
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto custom-scrollbar">
            {!searchQuery && (
              <div className="search-dialog__section-header px-6 py-3 border-b">
                <h3 className="search-dialog__section-title text-sm font-semibold mb-1 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Recent Searches
                </h3>
              </div>
            )}

            <div className="py-2">
              {allItems.map((item, index) => (
                <button
                  key={index}
                  className={`group search-dialog__item w-full flex items-center px-6 py-3 text-left transition-all duration-150 ease-out cursor-pointer ${
                    index === selectedIndex 
                      ? 'search-dialog__item--selected' 
                      : ''
                  }`}
                  onClick={() => {
                    console.log('Selected:', item)
                    handleClose()
                  }}
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="icon-wrapper mr-4 p-1 rounded flex-shrink-0">
                      {item.isRecent ? (
                        <Clock className="h-4 w-4" />
                      ) : (
                        <item.icon className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="search-dialog__item-title font-medium text-sm sm:text-base truncate">
                        {item.title}
                      </div>
                      {item.description && (
                        <div className="search-dialog__item-description text-xs sm:text-sm truncate mt-0.5">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="search-dialog__item-arrow h-4 w-4 flex-shrink-0 ml-2" />
                </button>
              ))}
            </div>

            {/* Empty state */}
            {allItems.length === 0 && searchQuery && (
              <div className="px-6 py-12 text-center">
                <div className="search-dialog__empty-icon w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8" />
                </div>
                <p className="search-dialog__empty-text text-sm">
                  No results found for <span className="font-medium">"{searchQuery}"</span>
                </p>
                <p className="search-dialog__empty-subtext text-xs mt-1">
                  Try searching for something else
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="search-dialog__footer px-6 py-4 border-t rounded-b-2xl">
            <div className="flex items-center justify-between text-[11px] sm:text-xs">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1.5">
                  <kbd className="search-dialog__kbd px-2 py-1 border rounded text-xs font-medium">
                    ↑↓
                  </kbd>
                  <span className="search-dialog__footer-text">Navigate</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <kbd className="search-dialog__kbd px-2 py-1 border rounded text-xs font-medium">
                    ↵
                  </kbd>
                  <span className="search-dialog__footer-text">Select</span>
                </div>
              </div>
              <div className="flex items-center space-x-1.5 search-dialog__footer-text">
                <span>Powered by</span>
                <span className="search-dialog__brand font-semibold">Nexus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchDialog
