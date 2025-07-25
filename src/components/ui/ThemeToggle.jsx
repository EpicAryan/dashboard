import React, { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      setIsDark(false)
      document.documentElement.removeAttribute('data-theme')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleTheme()
    }
  }

  return (
    <div className="theme-toggle-container">
      <div className="theme-toggle-wrapper">
        
        <label 
          className="theme-toggle-switch"
          role="switch"
          aria-checked={isDark}
          aria-labelledby="theme-toggle-label"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <input
            type="checkbox"
            checked={isDark}
            onChange={toggleTheme}
            className="theme-toggle-input"
            aria-label="Toggle between light and dark mode"
          />
          
          <span className="theme-toggle-track">
            <span className="theme-toggle-thumb">
              <span className="theme-toggle-icon">
                {isDark ? (
                  <Moon className="h-3 w-3" />
                ) : (
                  <Sun className="h-3 w-3" />
                )}
              </span>
            </span>
            
      
            <span className="theme-toggle-bg-icons">
              <Sun className="theme-toggle-sun-bg h-3 w-3" />
              <Moon className="theme-toggle-moon-bg h-3 w-3" />
            </span>
          </span>
        </label>
      </div>
    </div>
  )
}

export default ThemeToggle
