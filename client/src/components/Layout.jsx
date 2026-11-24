
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  ClipboardList,
  Factory,
  Package,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Orders', path: '/orders', icon: ClipboardList },
  { name: 'Production', path: '/production', icon: Factory },
  { name: 'Inventory', path: '/inventory', icon: Package },
  { name: 'Employees', path: '/employees', icon: Users },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings }
]

function Layout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <Factory size={25} />
          </div>
          <div>
            <h2>FactoryFlow</h2>
            <span>SMART MANUFACTURING</span>
          </div>
        </div>

        <div className="nav-label">WORKSPACE</div>

        <nav className="navigation">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="status-dot"></div>
          <span>System Operational</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button menu-button">
              <Menu size={21} />
            </button>
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search anything..." />
            </div>
          </div>

          <div className="topbar-right">
            <button className="icon-button notification-button">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            <div className="profile">
              <div className="avatar">AD</div>
              <div className="profile-info">
                <strong>Administrator</strong>
                <span>Factory Manager</span>
              </div>
            </div>
          </div>
        </header>

        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  )
}

export default Layout
