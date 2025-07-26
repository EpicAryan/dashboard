//src/components/profile/ProfileContent.jsx

import ProfileInfoTab from './ProfileInfoTab'
import SecurityTab from './SecurityTab'
import NotificationsTab from './NotificationsTab'
import DangerZoneTab from './DangerZoneTab'

const ProfileContent = ({ activeTab, profileData, handleInputChange, isEditing, setIsEditing, handleSave }) => {
  switch (activeTab) {
    case 'profile':
      return <ProfileInfoTab {...{ profileData, handleInputChange, isEditing, setIsEditing, handleSave }} />
    case 'security':
      return <SecurityTab />
    case 'notifications':
      return <NotificationsTab />
    case 'danger':
      return <DangerZoneTab />
    default:
      return null
  }
}

export default ProfileContent
