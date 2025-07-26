//src/components/ui/ProfileModal.jsx

import { useCallback, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useCSSOnlyModal } from '../../hooks/useCSSOnlyModal'
import ProfileSidebar from '../profile/ProfileSidebar'
import ProfileContent from '../profile/ProfileContent'

const ProfileModal = ({ isOpen, onClose, modalRef }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const modalId = 'profile-modal'

  const { checkboxId, handleClose: originalHandleClose } = useCSSOnlyModal(modalId, isOpen, onClose)

  const [profileData, setProfileData] = useState({
    name: 'Aryan',
    email: 'aryan@perccent.io',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Product Designer passionate about creating user-centered experiences.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  })

  const handleClose = useCallback(() => {
    setIsExiting(true)
    setIsEditing(false)
    setTimeout(() => {
      setIsExiting(false)
      originalHandleClose()

      setTimeout(() => setActiveTab('profile'), 150)
    }, 300)
  }, [originalHandleClose])

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      setIsExiting(false)
    } else {
      setIsAnimating(false)
    }
  }, [isOpen])

  const handleSave = () => {
    setIsEditing(false)
    console.log('Profile saved:', profileData)
  }

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && e.key === 'Escape' && !isExiting) {
        e.preventDefault()
        handleClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isExiting, handleClose])

  if (!isOpen && !isExiting) return null

  return (
    <>
      <input type="checkbox" id={checkboxId} className="profile-modal-checkbox sr-only" defaultChecked={isOpen} />
      <div
        className={`profile-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 ${
          isAnimating && !isExiting ? 'backdrop-enter' : isExiting ? 'backdrop-exit' : 'opacity-0'
        }`}
        onClick={(e) => e.target === e.currentTarget && !isExiting && handleClose()}
      >
        <div
          ref={modalRef} 
          className={`profile-modal-container w-full max-w-4xl h-auto max-h-[90vh] flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${
            isAnimating && !isExiting ? 'modal-enter' : isExiting ? 'modal-exit' : 'opacity-0 scale-90'
          }`}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button 
            onClick={handleClose} 
            className="profile-modal-close absolute top-0.5 right-0.5 md:top-4 md:right-4 z-10 p-1 md:p-2 rounded-full md:rounded-lg transition-all hover:scale-110"
          >
            <X className="size-5" />
          </button>

          {/* Sidebar */}
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Content */}
          <main className="profile-main-content w-full md:w-2/3 lg:w-3/4 p-6 sm:p-8 overflow-y-auto">
            <ProfileContent 
              activeTab={activeTab} 
              profileData={profileData} 
              handleInputChange={handleInputChange} 
              isEditing={isEditing} 
              setIsEditing={setIsEditing} 
              handleSave={handleSave} 
            />
          </main>
        </div>
      </div>
    </>
  )
}

export default ProfileModal
