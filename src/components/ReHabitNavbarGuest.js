import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../App';

function ReHabitNavbarGuest() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, changeLang } = useLang();

  const navItems = lang === 'th' ? [
    { name: 'หน้าหลัก', href: '/' },
    { name: 'กายภาพบำบัด', href: '/PhysicalMenu' },
    { name: 'เกี่ยวกับเรา', href: '/contact' },
    { name: 'ติดต่อ', href: '/contact' }
  ] : [
    { name: 'Home', href: '/' },
    { name: 'Physical Therapy', href: '/PhysicalMenu' },
    { name: 'About', href: '/contact' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="rehabit-navbar-guest">
      <style>{`
        .rehabit-navbar-guest {
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
          justify-content: space-between;
          height: 64px;
        }
        .navbar-logo {
          display: flex;
          align-items: center;
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
        }
        .navbar-nav-item {
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          color: #d1d5db;
          transition: all 0.2s;
          cursor: pointer;
        }
        .navbar-nav-item:hover {
          color: white;
          background-color: #374151;
        }
        .navbar-login-btn {
          padding: 8px 16px;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
        }
        .navbar-icon-btn {
          padding: 8px;
          color: #9ca3af;
          background-color: transparent;
          border: none;
          border-radius: 50%;
          cursor: pointer;
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
        }
        @media (max-width: 900px) {
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
          .navbar-login-btn {
            font-size: 12px;
            padding: 6px 10px;
          }
        }
      `}</style>
      <div className="navbar-container">
        <div className="navbar-flex">
          {/* Logo */}
          <div className="navbar-logo">
            <div className="navbar-logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" />
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" />
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <span className="navbar-logo-text">ReHabit</span>
          </div>

          {/* Desktop Nav */}
          <div className="navbar-desktop-nav">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="navbar-nav-item"
              >
                {item.name}
              </a>
            ))}
            <Link to="/login">
              <button className="navbar-login-btn">
                {lang === 'th' ? 'เข้าสู่ระบบ' : 'Login'}
              </button>
            </Link>
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
          </div>

          {/* Mobile Menu Button */}
          <button
            className="navbar-mobile-menu-btn navbar-icon-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="navbar-mobile-menu">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="navbar-nav-item"
            style={{ display: 'block', fontSize: 16, marginBottom: 4 }}
          >
            {item.name}
          </a>
        ))}
        <Link to="/login" className="navbar-nav-item" style={{ display: 'block', color: '#60a5fa', fontSize: 16 }}>
          {lang === 'th' ? 'เข้าสู่ระบบ' : 'Login'}
        </Link>
      </div>
    </nav>
  );
}

export default ReHabitNavbarGuest;
