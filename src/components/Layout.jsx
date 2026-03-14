import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, Bell, User, LogOut } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Products', to: '/products' },
  { label: 'Receipts', to: '/receipts' },
  { label: 'Delivery Orders', to: '/delivery' },
  { label: 'Internal Transfers', to: '/transfers' },
  { label: 'Inventory Adjustment', to: '/adjustments' },
  { label: 'Move History', to: '/moves' },
  { label: 'Warehouse Settings', to: '/warehouses' },
  { label: 'Profile', to: '/dashboard' },
];

const Layout = ({ children, title = 'Inventory Management' }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="logo">IMS</div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className="logout-btn" onClick={handleLogout}><LogOut size={14} /> Logout</button>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left"><h1>{title}</h1></div>
          <div className="topbar-right">
            <div className="search-box"><Search size={14} /> <input placeholder="Search SKU or product" /></div>
            <button className="icon-btn"><Bell size={16} /></button>
            <button className="icon-btn" onClick={() => setOpen(!open)}><User size={16} /></button>
            {open && <div className="profile-dropdown"><button onClick={() => navigate('/dashboard')}>My Profile</button><button onClick={handleLogout}>Logout</button></div>}
          </div>
        </header>
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
