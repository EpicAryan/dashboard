// src/hooks/useModalState.js

import { useState, useCallback } from 'react'
import { useModalFocus } from './useModalFocus'

export const useModalState = (initialOpen = false, options = {}) => {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const modalRef = useModalFocus(isOpen, options)

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])
  const toggleModal = useCallback(() => setIsOpen(prev => !prev), [])

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    modalRef,
    modalProps: {
      isOpen,
      onClose: closeModal,
      modalRef
    }
  }
}
