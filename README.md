
# 📊 Perccent Financial Dashboard

A modern, responsive financial dashboard built with **React** and **Tailwind CSS**. This project demonstrates **pixel-perfect responsive design**, **accessibility best practices**, and **clean code architecture**.

![Dashboard Preview]([https://via.placeholder.com/800x400/2563eb/ffffff?text=Dashboard+Preview](https://ik.imagekit.io/qt3qsu85k/Screenshot%202025-07-26%20172752.png))
![Dashboard Preview]([https://via.placeholder.com/800x400/2563eb/ffffff?text=Dashboard+Preview](https://ik.imagekit.io/qt3qsu85k/Screenshot%202025-07-26%20172811.png))
---

##  Features

### Core Components
-  **Responsive Sidebar Navigation** – Collapsible sidebar with active state highlighting
-  **Top Navbar** – Search functionality, notifications, and user profile
-  **Summary Cards** – Display key metrics (Revenue, Users, Sales, Conversion Rate)
-  **Interactive Charts** – Revenue trends and portfolio allocation using Recharts
-  **Data Table** – Transactions table with sorting, pagination, and responsive design
-  **Modal Components** – Profile modal and search dialog with CSS-only functionality
-  **Theme Toggle** – Dark/Light mode with smooth transitions

### Design Features
-  **Pixel-perfect responsive design** across mobile, tablet, and desktop
-  **Dark/Light theme support** with CSS custom properties
-  **Full accessibility** with ARIA roles, keyboard navigation, and focus management
-  **Advanced search** with keyboard shortcuts (Cmd/Ctrl + K)
-  **Mobile-first approach** with progressive enhancement
-  **Smooth animations** and micro-interactions

---

## Tech Stack

- **Frontend Framework:** React 19  
- **Styling:** Tailwind CSS + Custom CSS Properties  
- **Charts:** Recharts  
- **Icons:** Lucide React  
- **Build Tool:** Vite  
- **Package Manager:** npm  

---

## Installation

### Prerequisites
- Node.js 20+
- npm or yarn

### Setup Instructions

```bash
1. Clone the repository
git clone https://github.com/EpicAryan/dashboard.git
cd dashboard

2. Install dependencies
npm install

3. Start the development server
npm run dev

4. Build for production
npm run build

5. Preview production build
npm run preview
````

Application runs at: [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```bash
src/
├── components/
│   ├── dashboard/
│   │   ├── DashboardHeader.jsx
│   │   ├── SummaryCard.jsx
│   │   ├── RevenueChart.jsx
│   │   ├── PortfolioChart.jsx
│   │   └── DataTable.jsx
│   ├── layout/
│   │   ├── DashboardLayout.jsx
│   │   ├── Sidebar.jsx
│   │   └── Navbar.jsx
│   ├── profile/
│   │   ├── DangerZoneTab.jsx
│   │   ├── NotificationsTab.jsx
│   │   ├── ProfileContent.jsx
│   │   ├── ProfileInfoTab.jsx
│   │   ├── ProfileSidebar.jsx
│   │   └── SecurityTab.jsx
│   └── ui/
│       ├── Dropdown.jsx
│       ├── CSSCloseButton.jsx
│       ├── ProfileModal.jsx
│       ├── SearchDialog.jsx
│       └── ThemeToggle.jsx
├── hooks/
│   ├── useModalState.js
│   ├── useModalFocus.js
│   └── useCSSOnlyModal.js
├── data/
│   ├── sidebarNavigation.js
│   └── sampleTransactions.js
├── pages/
│   └── Dashboard.jsx
├── styles/
│   ├── base.css
│   ├── animations/
│   │   └── modal-animations.css
│   └── components/
│       ├── chart.css.css
│       ├── close-modal.css
│       ├── data-table.css 
│       ├── navbar.css 
│       ├── profile-modal.css
│       ├── sidebar.css
│       └── summary-cards.css
├── index.css
├── App.jsx
└── main.jsx
```

---

## Key Features Implementation

###  Responsive Design

* Mobile-first approach using Tailwind breakpoints
* Flexible grid system for summary cards and charts
* Horizontal scroll for small-screen charts
* Adaptive navigation sidebar

### Chart Components

* Line chart for revenue trends
* Pie chart for asset allocation
* Responsive and animated with hover effects

### Modal System

* CSS-only modals (no JS dependencies)
* Focus trapping and keyboard navigation
* Prevents background scroll
* Enter/exit transitions

### Theme System

```css
Light Theme 
:root {
  --bg-primary: #ffffff;
  --text-primary: #0f172a;
  --primary: #2563eb;
  /* ...more variables */
}

Dark Theme
[data-theme="dark"] {
  --bg-primary: #111827;
  --text-primary: #f9fafb;
  --primary: #3b82f6;
  /* ...dark theme overrides */
}
```

---

## Design System

### Color Palette

* **Primary:** #2563eb
* **Success:** #10b981
* **Warning:** #f59e0b
* **Danger:**  #ef4444

### Typography

* Font: Inter, system fonts
* Responsive sizing using `clamp()`
* Tailwind-based spacing system

### Component Design

* Rounded corners (default `0.5rem`)
* Shadows, borders, and hover transitions
* Focus-visible outlines for accessibility

---

## Configuration

### 🧩 Tailwind Setup

Using **Tailwind CSS v4**, so no `tailwind.config.js` is required unless customization is needed. Tailwind's new content-aware engine auto-detects class usage.

Just import Tailwind in your main CSS file:

```css
@import "tailwindcss";

```

## Accessibility Features

* ARIA roles and semantic tags
* Full keyboard navigation support
* Focus management inside modals
* High contrast theme support
* Respects user's reduced motion preferences

---

---

## Author

**Aryan Kumar** – [GitHub](https://github.com/EpicAryan)

---

**Built with ❤️ for the Perccent CSS Assignment**

