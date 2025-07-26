//src/components/profile/ProfileInfoTab.jsx

import { User, Mail, Phone, MapPin, Edit3, Save, Camera } from 'lucide-react'

const ProfileInfoTab = ({ profileData, handleInputChange, isEditing, setIsEditing, handleSave }) => {
  const fields = [
    { id: 'name', label: 'Full Name', icon: User, type: 'text' },
    { id: 'email', label: 'Email Address', icon: Mail, type: 'email' },
    { id: 'phone', label: 'Phone Number', icon: Phone, type: 'tel' },
    { id: 'location', label: 'Location', icon: MapPin, type: 'text' },
  ]

  return (
    <div className="profile-content-pane">
      <div className="profile-section-header">
        <h3 className="profile-section-title text-lg font-semibold">Profile Information</h3>
        <p className="profile-section-subtitle text-sm">Update your personal details here.</p>
      </div>
      
      <div className="profile-section-body mt-6">
        {/* Avatar Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <img 
              src={profileData.avatar} 
              alt="Avatar" 
              className="profile-avatar w-16 h-16 rounded-full border-4" 
            />
            {isEditing && (
              <button className="profile-avatar-edit absolute -bottom-1 -right-1 p-1.5 rounded-full border-2 transition-all hover:scale-110">
                <Camera className="h-4 w-4" />
              </button>
            )}
          </div>
          <div>
            <h4 className="profile-avatar-name font-semibold">{profileData.name}</h4>
            <p className="profile-avatar-email text-sm">{profileData.email}</p>
          </div>
        </div>
        
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          {fields.map(field => (
            <div key={field.id} className="profile-field ">
              <label className="profile-field-label flex items-center gap-2 text-sm font-medium mb-2">
                <field.icon className="h-4 w-4" />
                {field.label}
              </label>
              {isEditing ? (
                <input
                  type={field.type}
                  value={profileData[field.id]}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className="profile-form-input w-full px-3 py-2 border rounded-lg text-sm transition-colors"
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
              ) : (
                <div className="profile-form-value px-3 py-2 border rounded-lg text-sm">
                  {profileData[field.id]}
                </div>
              )}
            </div>
          ))}
          
          {/* Bio Field */}
          <div className="md:col-span-2 profile-field">
            <label className="profile-field-label flex items-center gap-2 text-sm font-medium mb-2">
              <Edit3 className="h-4 w-4" />
              Bio
            </label>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows="3"
                className="profile-form-textarea w-full px-3 py-2 border rounded-lg text-sm transition-colors resize-none"
                placeholder="Tell us about yourself"
              />
            ) : (
              <div className="profile-form-value px-3 py-2 border rounded-lg text-sm whitespace-pre-wrap">
                {profileData.bio}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="profile-section-footer mt-8 pt-6 border-t">
        {isEditing ? (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsEditing(false)} 
              className="profile-btn profile-btn--secondary px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 hover:-translate-y-0.5"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave} 
              className="profile-btn profile-btn--primary flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsEditing(true)} 
            className="profile-btn profile-btn--primary flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </button>
        )}
      </div>
    </div>
  )
}

export default ProfileInfoTab
