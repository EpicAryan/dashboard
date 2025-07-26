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
  const scrollPosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!isOpen || !preventScroll) return
    
    scrollPosition.current = {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop
    }
    

    const body = document.body
    const originalBodyStyle = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      height: body.style.height
    }

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollPosition.current.y}px`
    body.style.left = `-${scrollPosition.current.x}px`
    body.style.right = '0'
    body.style.width = '100%'
    body.style.height = '100%'

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }

    const preventTouchMove = (e) => {
      if (!modalRef.current?.contains(e.target)) {
        e.preventDefault()
      }
    }
    
    document.addEventListener('touchmove', preventTouchMove, { passive: false })
    document.addEventListener('wheel', preventTouchMove, { passive: false })
    

    return () => {
      Object.keys(originalBodyStyle).forEach(key => {
        if (originalBodyStyle[key] !== undefined && originalBodyStyle[key] !== '') {
          body.style[key] = originalBodyStyle[key]
        } else {
          body.style.removeProperty(key.replace(/([A-Z])/g, '-$1').toLowerCase())
        }
      })
      
      body.style.removeProperty('padding-right')

      window.scrollTo(scrollPosition.current.x, scrollPosition.current.y)
      
      document.removeEventListener('touchmove', preventTouchMove)
      document.removeEventListener('wheel', preventTouchMove)
    }
  }, [isOpen, preventScroll])

  useEffect(() => {
    if (!isOpen) return
    
    previousActiveElement.current = document.activeElement
  }, [isOpen])

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
