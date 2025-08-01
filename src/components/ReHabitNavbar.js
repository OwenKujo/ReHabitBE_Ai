import React, { useState, useEffect, useRef } from 'react';
import { Bell, ChevronDown, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang, useAuth } from '../App';
import LogoutConfirm from './LogoutConfirm';

function ReHabitNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { lang, changeLang } = useLang();
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = lang === 'th' ? [
    { name: 'หน้าหลัก', href: '/', active: true },
    { name: 'กายภาพบำบัด', href: '/PhysicalMenu', active: false },
    { name: 'ประวัติการรักษา', href: '/rehab-record', active: false },
    { name: 'เกี่ยวกับเรา', href: '#', active: false },
    { name: 'ติดต่อ', href: '#', active: false },
  ] : [
    { name: 'Home', href: '/', active: true },
    { name: 'Physical Therapy', href: '/PhysicalMenu', active: false },
    { name: 'Rehab Record', href: '/rehab-record', active: false },
    { name: 'About', href: '#', active: false },
    { name: 'Contact', href: '#', active: false },
  ];

  return (
    <nav className="rehabit-navbar">
      <style>{`
        .rehabit-navbar {
          background-color: #1e293b;
          color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          font-family: 'Kanit', 'Prompt', Arial, sans-serif;
        }
        .navbar-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .navbar-flex {
          display: flex;
          align-items: center;
          height: 64px;
        }
        .navbar-logo {
          display: flex;
          align-items: center;
          margin-right: 48px;
        }
        .navbar-logo-icon {
          width: 32px;
          height: 32px;
          background-color: #14b8a6;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }
        .navbar-logo-text {
          font-size: 20px;
          font-weight: bold;
        }
        .navbar-desktop-nav {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-left: auto;
        }
        .navbar-nav-item {
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
          color: #d1d5db;
        }
        .navbar-nav-item.active {
          color: #5eead4;
          background-color: #374151;
        }
        .navbar-nav-item:hover {
          color: white;
          background-color: #374151;
        }
        .navbar-right-section {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-left: 32px;
        }
        .navbar-icon-btn {
          position: relative;
          padding: 8px;
          color: #9ca3af;
          background-color: transparent;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s;
        }
        .navbar-icon-btn:hover {
          color: white;
          background-color: #374151;
        }
        .navbar-profile-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px;
          color: #d1d5db;
          background-color: transparent;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .navbar-profile-btn:hover {
          color: white;
          background-color: #374151;
        }
        .navbar-profile-icon {
          width: 32px;
          height: 32px;
          background-color: #4b5563;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .navbar-dropdown {
          position: absolute;
          right: 0;
          top: 100%;
          margin-top: 8px;
          width: 192px;
          background-color: white;
          border-radius: 6px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          padding: 4px 0;
          z-index: 50;
          border: 1px solid #e5e7eb;
        }
        .navbar-dropdown-item {
          display: block;
          padding: 8px 16px;
          font-size: 14px;
          color: #374151;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.2s;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }
        .navbar-dropdown-item:hover {
          background-color: #f3f4f6;
        }
        .navbar-notification-dot {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 8px;
          height: 8px;
          background-color: #10b981;
          border-radius: 50%;
        }
        .navbar-mobile-menu-btn {
          display: none;
        }
        .navbar-mobile-menu {
          display: none;
        }
        @media (max-width: 900px) {
          .navbar-desktop-nav {
            display: none;
          }
          .navbar-mobile-menu-btn {
            display: block;
          }
          .navbar-mobile-menu {
            display: ${isMenuOpen ? 'block' : 'none'};
            background-color: #374151;
            padding: 8px;
          }
        }
        @media (max-width: 600px) {
          .navbar-container {
            padding: 0 0.5rem;
          }
          .navbar-flex {
            height: 54px;
          }
          .navbar-logo-text {
            font-size: 16px;
          }
          .navbar-nav-item {
            font-size: 12px;
            padding: 6px 8px;
          }
        }
      `}</style>
      <div className="navbar-container">
        <div className="navbar-flex">
          {/* Logo */}
          <div className="navbar-logo">
            <div className="navbar-logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="navbar-logo-text">ReHabit</span>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-desktop-nav">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`navbar-nav-item${item.active ? ' active' : ''}`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="navbar-right-section">
            {/* Language Switcher */}
            <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginLeft: 12 }}>
              <button
                onClick={() => changeLang('en')}
                style={{
                  background: lang === 'en' ? '#1976d2' : '#fff',
                  color: lang === 'en' ? '#fff' : '#1976d2',
                  border: '1px solid #1976d2',
                  borderRadius: 6,
                  padding: '4px 12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: 14
                }}
                disabled={lang === 'en'}
              >EN</button>
              <button
                onClick={() => changeLang('th')}
                style={{
                  background: lang === 'th' ? '#1976d2' : '#fff',
                  color: lang === 'th' ? '#fff' : '#1976d2',
                  border: '1px solid #1976d2',
                  borderRadius: 6,
                  padding: '4px 12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: 14
                }}
                disabled={lang === 'th'}
              >TH</button>
            </div>
            {/* Notification Bell */}
            <button className="navbar-icon-btn">
              <Bell size={20} />
              <span className="navbar-notification-dot"></span>
            </button>
            {/* Profile Dropdown */}
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="navbar-profile-btn"
              >
                <div className="navbar-profile-icon">
                  <User size={20} />
                </div>
                <ChevronDown size={16} />
              </button>
              {isProfileOpen && (
                <div className="navbar-dropdown">
                  <Link to="#" className="navbar-dropdown-item">{lang === 'th' ? 'โปรไฟล์และประวัติ' : 'ReHabit Record'}</Link>
                  <Link to="/edit-profile" className="navbar-dropdown-item" onClick={() => setIsProfileOpen(false)}>{lang === 'th' ? 'แก้ไขโปรไฟล์' : 'Edit Profile'}</Link>
                  <button 
                    onClick={() => {
                      setShowLogoutConfirm(true);
                      setIsProfileOpen(false);
                    }} 
                    className="navbar-dropdown-item"
                    style={{ color: '#ef4444' }}
                  >
                    {lang === 'th' ? 'ออกจากระบบ' : 'Sign Out'}
                  </button>
                </div>
              )}
            </div>
            {/* Mobile menu button */}
            <button
              className="navbar-mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className="navbar-mobile-menu">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`navbar-nav-item${item.active ? ' active' : ''}`}
            style={{ display: 'block', fontSize: 16, marginBottom: 4 }}
          >
            {item.name}
          </a>
        ))}
        {/* Mobile Profile Section */}
        <div style={{ paddingTop: 16, borderTop: '1px solid #4b5563', marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px' }}>
            <div className="navbar-profile-icon" style={{ width: 40, height: 40 }}>
              <User size={24} />
            </div>
            <div style={{ marginLeft: 12, flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 500, color: 'white' }}>{user?.name || (lang === 'th' ? 'ชื่อผู้ใช้' : 'User Name')}</div>
              <div style={{ fontSize: 14, color: '#9ca3af' }}>{user?.email || (lang === 'th' ? 'อีเมลผู้ใช้' : 'User Email')}</div>
            </div>
            <button className="navbar-icon-btn">
              <Bell size={24} />
            </button>
          </div>
          <div style={{ padding: '8px 12px', borderTop: '1px solid #4b5563', marginTop: 8 }}>
            <Link to="/edit-profile" style={{ display: 'block', padding: '8px 12px', color: '#d1d5db', textDecoration: 'none', fontSize: 14 }}>
              {lang === 'th' ? 'แก้ไขโปรไฟล์' : 'Edit Profile'}
            </Link>
            <button 
              onClick={() => setShowLogoutConfirm(true)}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'none',
                border: 'none',
                color: '#ef4444',
                fontSize: 14,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              {lang === 'th' ? 'ออกจากระบบ' : 'Sign Out'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <LogoutConfirm onClose={() => setShowLogoutConfirm(false)} />
      )}
    </nav>
  );
}

export default ReHabitNavbar;