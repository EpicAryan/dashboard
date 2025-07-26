// src/hooks/useModalFocus.js

import { useEffect, useRef } from 'react'

export const useModalFocus = (isOpen, options = {}) => {
  const { 
    preventScroll = true,
    restoreFocus = true,
    trapFocus = true 
  } = options
  
  const modalRef = useRef(null)
  const previousActiveElement = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    
    previousActiveElement.current = document.activeElement

    if (preventScroll) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [isOpen, preventScroll])

  useEffect(() => {
    if (!isOpen || !trapFocus || !modalRef.current) return

    const focusableElements = modalRef.current.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
    )
    
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

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

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      
      if (restoreFocus && previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [isOpen, trapFocus, restoreFocus])

  return modalRef
}
