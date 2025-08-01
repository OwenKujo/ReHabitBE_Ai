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
    { name: 'กายภาพบำบัด', href: '/PhysicalMenu' },,
    { name: 'เกี่ยวกับเรา', href: '#', active: false },
    { name: 'ติดต่อ', href: '#', active: false },
  ] : [
    { name: 'Home', href: '/', active: true },
    { name: 'Physical Therapy', href: '/PhysicalMenu', active: false },
    { name: 'About', href: '#', active: false },
    { name: 'Contact', href: '#', active: false },
  ];

  return (
    <nav className="nav" style={{ backgroundColor: '#1e293b', color: 'white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
      <style>{`
        .nav {
          position: relative;
          z-index: 1000;
        }
        .nav-brand {
          color: white !important;
          font-size: 1.25rem;
          font-weight: bold;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-right: 3rem;
        }
        .nav-brand-icon {
          width: 32px;
          height: 32px;
          background-color: #14b8a6;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
          margin-left: auto;
        }
        .nav-menu a {
          color: #d1d5db;
          text-decoration: none;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.2s;
          border: none;
        }
        .nav-menu a.active {
          color: #5eead4;
          background-color: #374151;
        }
        .nav-menu a:hover {
          color: white;
          background-color: #374151;
        }
        .nav-right-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-left: 2rem;
        }
        .nav-icon-btn {
          position: relative;
          padding: 0.5rem;
          color: #9ca3af;
          background-color: transparent;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s;
        }
        .nav-icon-btn:hover {
          color: white;
          background-color: #374151;
        }
        .nav-profile-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          color: #d1d5db;
          background-color: transparent;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .nav-profile-btn:hover {
          color: white;
          background-color: #374151;
        }
        .nav-profile-icon {
          width: 32px;
          height: 32px;
          background-color: #4b5563;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-dropdown {
          position: absolute;
          right: 0;
          top: 100%;
          margin-top: 0.5rem;
          width: 12rem;
          background-color: white;
          border-radius: 6px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          padding: 0.25rem 0;
          z-index: 50;
          border: 1px solid #e5e7eb;
        }
        .nav-dropdown-item {
          display: block;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          color: #374151;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.2s;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }
        .nav-dropdown-item:hover {
          background-color: #f3f4f6;
        }
        .nav-notification-dot {
          position: absolute;
          top: 0.25rem;
          right: 0.25rem;
          width: 0.5rem;
          height: 0.5rem;
          background-color: #10b981;
          border-radius: 50%;
        }
        .nav-lang-buttons {
          display: flex;
          gap: 0.25rem;
          align-items: center;
        }
        .nav-lang-btn {
          background: #1976d2;
          color: #fff;
          border: 1px solid #1976d2;
          border-radius: 6px;
          padding: 0.25rem 0.75rem;
          font-weight: 700;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .nav-lang-btn.inactive {
          background: #fff;
          color: #1976d2;
        }
        .nav-lang-btn:hover {
          opacity: 0.8;
        }
        .nav-toggle {
          display: none;
          background: none;
          border: none;
          color: #9ca3af;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
        }
        .nav-toggle:hover {
          background-color: #374151;
        }
        .nav-mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: #374151;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          padding: 1rem;
        }
        .nav-mobile-menu.active {
          display: block;
        }
        .nav-mobile-menu a {
          display: block;
          padding: 0.75rem;
          color: #d1d5db;
          text-decoration: none;
          border-bottom: 1px solid #4b5563;
          font-size: 1rem;
        }
        .nav-mobile-menu a:last-child {
          border-bottom: none;
        }
        .nav-mobile-menu a:hover {
          color: white;
          background-color: #4b5563;
        }
        .nav-mobile-profile {
          padding-top: 1rem;
          border-top: 1px solid #4b5563;
          margin-top: 0.75rem;
        }
        .nav-mobile-profile-header {
          display: flex;
          align-items: center;
          padding: 0 0.75rem;
        }
        .nav-mobile-profile-info {
          margin-left: 0.75rem;
          flex: 1;
        }
        .nav-mobile-profile-name {
          font-size: 1rem;
          font-weight: 500;
          color: white;
        }
        .nav-mobile-profile-email {
          font-size: 0.875rem;
          color: #9ca3af;
        }
        .nav-mobile-profile-actions {
          padding: 0.5rem 0.75rem;
          border-top: 1px solid #4b5563;
          margin-top: 0.5rem;
        }
        .nav-mobile-profile-actions a {
          display: block;
          padding: 0.5rem 0.75rem;
          color: #d1d5db;
          text-decoration: none;
          font-size: 0.875rem;
          border-bottom: none;
        }
        .nav-mobile-profile-actions button {
          width: 100%;
          padding: 0.5rem 0.75rem;
          background: none;
          border: none;
          color: #ef4444;
          font-size: 0.875rem;
          cursor: pointer;
          text-align: left;
        }
        
        @media (max-width: 768px) {
          .nav-menu {
            display: none;
          }
          .nav-toggle {
            display: block;
          }
          .nav-brand {
            font-size: 1.125rem;
            margin-right: 0;
          }
          .nav-brand-icon {
            width: 28px;
            height: 28px;
          }
          .nav-right-section {
            margin-left: 0;
          }
        }
        
        @media (max-width: 480px) {
          .nav {
            padding: 0.75rem 1rem;
          }
          .nav-brand {
            font-size: 1rem;
          }
          .nav-brand-icon {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
      <div className="container">
        <div className="d-flex justify-between align-center">
          {/* Logo */}
          <a href="/" className="nav-brand">
            <div className="nav-brand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span>ReHabit</span>
          </a>

          {/* Desktop Navigation */}
          <ul className="nav-menu">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={item.active ? 'active' : ''}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Section */}
          <div className="nav-right-section">
            {/* Language Switcher */}
            <div className="nav-lang-buttons">
              <button
                onClick={() => changeLang('en')}
                className={`nav-lang-btn ${lang === 'en' ? '' : 'inactive'}`}
                disabled={lang === 'en'}
              >
                EN
              </button>
              <button
                onClick={() => changeLang('th')}
                className={`nav-lang-btn ${lang === 'th' ? '' : 'inactive'}`}
                disabled={lang === 'th'}
              >
                TH
              </button>
            </div>
            
            {/* Notification Bell */}
            <button className="nav-icon-btn">
              <Bell size={20} />
              <span className="nav-notification-dot"></span>
            </button>
            
            {/* Profile Dropdown */}
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="nav-profile-btn"
              >
                <div className="nav-profile-icon">
                  <User size={20} />
                </div>
                <ChevronDown size={16} />
              </button>
              {isProfileOpen && (
                <div className="nav-dropdown">
                  <Link to="#" className="nav-dropdown-item">{lang === 'th' ? 'โปรไฟล์ของคุณ' : 'Your Profile'}</Link>
                  <Link to="/edit-profile" className="nav-dropdown-item" onClick={() => setIsProfileOpen(false)}>{lang === 'th' ? 'แก้ไขโปรไฟล์' : 'Edit Profile'}</Link>
                  <button 
                    onClick={() => {
                      setShowLogoutConfirm(true);
                      setIsProfileOpen(false);
                    }} 
                    className="nav-dropdown-item"
                    style={{ color: '#ef4444' }}
                  >
                    {lang === 'th' ? 'ออกจากระบบ' : 'Sign Out'}
                  </button>
                </div>
              )}
            </div>
            
            {/* Mobile Menu Toggle */}
            <button
              className="nav-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`nav-mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={item.active ? 'active' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.name}
          </a>
        ))}
        
        {/* Mobile Profile Section */}
        <div className="nav-mobile-profile">
          <div className="nav-mobile-profile-header">
            <div className="nav-profile-icon" style={{ width: 40, height: 40 }}>
              <User size={24} />
            </div>
            <div className="nav-mobile-profile-info">
              <div className="nav-mobile-profile-name">{user?.name || (lang === 'th' ? 'ชื่อผู้ใช้' : 'User Name')}</div>
              <div className="nav-mobile-profile-email">{user?.email || (lang === 'th' ? 'อีเมลผู้ใช้' : 'User Email')}</div>
            </div>
            <button className="nav-icon-btn">
              <Bell size={24} />
            </button>
          </div>
          <div className="nav-mobile-profile-actions">
            <Link to="/edit-profile" onClick={() => setIsMenuOpen(false)}>
              {lang === 'th' ? 'แก้ไขโปรไฟล์' : 'Edit Profile'}
            </Link>
            <button 
              onClick={() => {
                setShowLogoutConfirm(true);
                setIsMenuOpen(false);
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