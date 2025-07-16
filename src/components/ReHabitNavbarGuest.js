import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

function ReHabitNavbarGuest() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Physical Therapy', href: '/MediaPipefull' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' }
  ];

  const styles = {
    nav: {
      backgroundColor: '#1e293b',
      color: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center'
    },
    logoIcon: {
      width: '32px',
      height: '32px',
      backgroundColor: '#14b8a6',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '12px'
    },
    logoText: {
      fontSize: '20px',
      fontWeight: 'bold'
    },
    navList: {
      display: 'flex',
      alignItems: 'center',
      gap: '32px'
    },
    navItem: {
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      textDecoration: 'none',
      color: '#d1d5db',
      transition: '0.2s'
    },
    navItemHover: {
      color: 'white',
      backgroundColor: '#374151'
    },
    loginButton: {
      padding: '8px 16px',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontWeight: '500',
      cursor: 'pointer'
    },
    iconButton: {
      padding: '8px',
      color: '#9ca3af',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer'
    },
    mobileMenu: {
      display: isMenuOpen ? 'block' : 'none',
      backgroundColor: '#374151',
      padding: '8px'
    },
    mobileItem: {
      display: 'block',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '500',
      textDecoration: 'none',
      marginBottom: '4px',
      color: '#d1d5db'
    }
  };

  const isDesktop = window.innerWidth >= 768;

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.flex}>
          {/* Logo */}
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" />
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" />
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <span style={styles.logoText}>ReHabit</span>
          </div>

          {/* Desktop Nav */}
          {isDesktop && (
            <div style={styles.navList}>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  style={styles.navItem}
                  onMouseEnter={(e) => {
                    e.target.style.color = styles.navItemHover.color;
                    e.target.style.backgroundColor = styles.navItemHover.backgroundColor;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = styles.navItem.color;
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  {item.name}
                </a>
              ))}
              <Link to="/login">
                <button style={styles.loginButton}>Login</button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          {!isDesktop && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={styles.iconButton}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div style={styles.mobileMenu}>
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            style={styles.mobileItem}
            onMouseEnter={(e) => {
              e.target.style.color = 'white';
              e.target.style.backgroundColor = '#4b5563';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#d1d5db';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            {item.name}
          </a>
        ))}
        <Link to="/login" style={{ ...styles.mobileItem, color: '#60a5fa' }}>
          Login
        </Link>
      </div>
    </nav>
  );
}

export default ReHabitNavbarGuest;
