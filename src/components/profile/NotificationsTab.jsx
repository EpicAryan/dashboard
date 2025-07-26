//src/components/profile/NotificationsTab.jsx

import { useState } from 'react'

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false
  })

  const notificationItems = [
    { id: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
    { id: 'push', label: 'Push Notifications', description: 'Receive push notifications in browser' },
    { id: 'sms', label: 'SMS Notifications', description: 'Receive notifications via SMS' },
    { id: 'marketing', label: 'Marketing Emails', description: 'Receive marketing and promotional emails' },
  ]

  return (
    <div className="profile-content-pane">
      <div className="profile-section-header">
        <h3 className="profile-section-title text-lg font-semibold">Notification Preferences</h3>
        <p className="profile-section-subtitle text-sm">Choose how you want to be notified about important updates.</p>
      </div>
      
      <div className="profile-section-body mt-6 space-y-4">
        {notificationItems.map(item => (
          <div key={item.id} className="notification-item flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="notification-item-title font-medium">{item.label}</h4>
              <p className="notification-item-description text-sm">{item.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications[item.id]}
                onChange={(e) => setNotifications(prev => ({ ...prev, [item.id]: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="notification-toggle w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationsTab
