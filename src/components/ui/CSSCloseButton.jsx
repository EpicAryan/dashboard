//src/components/ui/CSSCloseButton.jsx

import { X } from 'lucide-react'

const CSSCloseButton = ({ 
  checkboxId, 
  className = '',
  size = 'default',
  variant = 'default',
  children,
  onClick,
  ...props 
}) => {
  const sizeClasses = {
    sm: 'p-1',
    default: 'p-1.5',
    lg: 'p-2'
  }

  const iconSizes = {
    sm: 'h-3 w-3',
    default: 'h-4 w-4', 
    lg: 'h-5 w-5'
  }

  const variantClasses = {
    default: 'css-close-btn',
    ghost: 'css-close-btn-ghost',
    outline: 'css-close-btn-outline'
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      const checkbox = document.getElementById(checkboxId)
      if (checkbox) {
        checkbox.checked = false
        checkbox.dispatchEvent(new Event('change', { bubbles: true }))
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <label
      htmlFor={checkboxId}
      className={`${variantClasses[variant]} ${sizeClasses[size]} ${className} rounded-lg transition-colors duration-200 cursor-pointer flex items-center justify-center`}
      role="button"
      tabIndex={0}
      aria-label="Close"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children || <X className={iconSizes[size]} />}
    </label>
  )
}

export default CSSCloseButton
