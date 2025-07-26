//src/components/profile/DangerZoneTab.jsx

import { Trash2 } from 'lucide-react'

const DangerZoneTab = () => {
  return (
    <div className="profile-content-pane">
      <div className="profile-section-header border-b pb-4">
        <h3 className="profile-section-title text-lg font-semibold danger-zone-title">Danger Zone</h3>
        <p className="profile-section-subtitle text-sm">These actions are permanent and cannot be undone.</p>
      </div>
      
      <div className="profile-section-body mt-6">
        <div className="danger-zone-section p-4 border rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ">
            <div>
              <h4 className="danger-zone-action-title font-semibold">Delete Account</h4>
              <p className="danger-zone-action-description text-sm">Permanently remove all your data and close your account.</p>
            </div>
            <button className="profile-btn profile-btn--danger group inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg hover:bg-red-200 transition-all cursor-pointer">
              <Trash2 className="h-4 w-4" />
              <span className="leading-none">Delete My Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DangerZoneTab
