//src/components/profile/SecurityTab.jsx

import { useState } from 'react'
import { Lock, Shield, Eye, EyeOff } from 'lucide-react'

const SecurityTab = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  return (
    <div className="profile-content-pane">
      <div className="profile-section-header">
        <h3 className="profile-section-title text-lg font-semibold">Security Settings</h3>
        <p className="profile-section-subtitle text-sm">Manage your password and security preferences.</p>
      </div>
      
      <div className="profile-section-body mt-6 space-y-6">
        {/* Change Password Section */}
        <div className="security-section p-4 border rounded-lg">
          <h4 className="security-section-title font-medium mb-4 flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Change Password
          </h4>
          
          <div className="space-y-4">
            <div className="profile-field">
              <label className="profile-field-label text-sm font-medium mb-2 block">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwords.current}
                  onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                  className="profile-form-input w-full px-3 py-2 pr-10 border rounded-lg text-sm"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="profile-field">
                <label className="profile-field-label text-sm font-medium mb-2 block">New Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwords.new}
                  onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                  className="profile-form-input w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="Enter new password"
                />
              </div>
              
              <div className="profile-field">
                <label className="profile-field-label text-sm font-medium mb-2 block">Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwords.confirm}
                  onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                  className="profile-form-input w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="security-section p-4 border rounded-lg">
          <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
            <div>
              <h4 className="security-section-title font-medium flex items-center justify-center md:justify-start gap-2">
                <Shield className="h-4 w-4" />
                Two-Factor Authentication
              </h4>
              <p className="security-section-subtitle text-sm mt-1 justify-center md:justify-start">Add an extra layer of security to your account.</p>
            </div>
            <button className="profile-btn profile-btn--primary px-4 py-2 text-sm font-medium rounded-lg">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>
      
      <div className="profile-section-footer mt-8 pt-6 border-t">
        <button className="profile-btn profile-btn--primary px-4 py-2 text-sm font-medium rounded-lg">
          Update Password
        </button>
      </div>
    </div>
  )
}

export default SecurityTab
