//src/hooks/useCSSOnlyModal.js

import { useEffect, useCallback } from 'react'

export const useCSSOnlyModal = (modalId, isOpen, onClose) => {
  const checkboxId = `modal-checkbox-${modalId}`

  useEffect(() => {
    const checkbox = document.getElementById(checkboxId)
    if (!checkbox) return

    const handleCheckboxChange = (e) => {
      if (!e.target.checked && isOpen) {
        setTimeout(() => {
          onClose()
        }, 50)
      }
    }

    checkbox.addEventListener('change', handleCheckboxChange)

    checkbox.checked = isOpen

    return () => {
      checkbox.removeEventListener('change', handleCheckboxChange)
    }
  }, [isOpen, checkboxId, onClose])


  const handleClose = useCallback(() => {
    const checkbox = document.getElementById(checkboxId)
    if (checkbox) {
      checkbox.checked = false
    }
    onClose()
  }, [checkboxId, onClose])

  const triggerCSSClose = useCallback(() => {
    const checkbox = document.getElementById(checkboxId)
    if (checkbox) {
      checkbox.checked = false
    }
  }, [checkboxId])

  return {
    checkboxId,
    handleClose,
    triggerCSSClose
  }
}
