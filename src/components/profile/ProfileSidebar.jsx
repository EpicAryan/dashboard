//src/components/profile/ProfileSidebar.jsx

import { User, Shield, Bell, Trash2 } from 'lucide-react'

const ProfileSidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'danger', label: 'Danger Zone', icon: Trash2 },
  ]

  return (
    <nav className="profile-sidebar w-full md:w-1/3 lg:w-1/4 p-6 border-r">
      <ul className="space-y-1 pt-4 md:pt-0">
        {navItems.map(item => (
          <li key={item.id}>
            <button
              onClick={() => setActiveTab(item.id)}
              className={`profile-sidebar__item flex items-center w-full text-left px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                activeTab === item.id
                  ? 'profile-sidebar__item--active'
                  : 'profile-sidebar__item--inactive'
              }`}
            >
              <item.icon className="h-4 w-4 mr-3" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default ProfileSidebar
