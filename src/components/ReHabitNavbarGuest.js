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
        .nav-menu a:hover {
          color: white;
          background-color: #374151;
        }
        .nav-login-btn {
          padding: 0.5rem 1rem;
          background-color: #4392B1;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
        }
        .nav-login-btn:hover {
          background-color: #3a7a8c;
        }
        .nav-lang-buttons {
          display: flex;
          gap: 0.25rem;
          align-items: center;
          margin-left: 0.75rem;
        }
        .nav-lang-btn {
          background: #4392B1;
          color: #fff;
          border: 1px solid #4392B1;
          border-radius: 6px;
          padding: 0.25rem 0.75rem;
          font-weight: 700;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .nav-lang-btn.inactive {
          background: #fff;
          color: #4392B1;
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
        
        @media (max-width: 768px) {
          .nav-menu {
            display: none;
          }
          .nav-toggle {
            display: block;
          }
          .nav-brand {
            font-size: 1.125rem;
          }
          .nav-brand-icon {
            width: 28px;
            height: 28px;
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" />
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" />
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <span>ReHabit</span>
          </a>

          {/* Desktop Navigation */}
          <ul className="nav-menu">
            {navItems.map((item) => (
              <li key={item.name}>
                <a href={item.href}>
                  {item.name}
                </a>
              </li>
            ))}
            <li>
              <Link to="/login" className="nav-login-btn">
                {lang === 'th' ? 'เข้าสู่ระบบ' : 'Login'}
              </Link>
            </li>
            <li>
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
            </li>
          </ul>

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

      {/* Mobile Menu */}
      <div className={`nav-mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.name}
          </a>
        ))}
        <Link 
          to="/login" 
          onClick={() => setIsMenuOpen(false)}
          style={{ color: '#60a5fa' }}
        >
          {lang === 'th' ? 'เข้าสู่ระบบ' : 'Login'}
        </Link>
      </div>
    </nav>
  );
}

export default ReHabitNavbarGuest;
