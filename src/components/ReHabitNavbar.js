import React, { useState } from 'react';
import { Bell, ChevronDown, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

function ReHabitNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/', active: true },
    { name: 'Physical Therapy', href: 'MediaPipefull', active: false },
    { name: 'About', href: '#', active: false },
    { name: 'Contact', href: '#', active: false },
  ];

  const navStyle = {
    backgroundColor: '#1e293b',
    color: 'white',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem'
  };

  const flexStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center'
  };

  const logoIconStyle = {
    width: '32px',
    height: '32px',
    backgroundColor: '#14b8a6',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '12px'
  };

  const logoTextStyle = {
    fontSize: '20px',
    fontWeight: 'bold'
  };

  const desktopNavStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '32px'
  };

  const navItemStyle = {
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'none',
    transition: 'all 0.2s',
    cursor: 'pointer'
  };

  const activeNavItemStyle = {
    ...navItemStyle,
    color: '#5eead4',
    backgroundColor: '#374151'
  };

  const inactiveNavItemStyle = {
    ...navItemStyle,
    color: '#d1d5db'
  };

  const rightSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const iconButtonStyle = {
    position: 'relative',
    padding: '8px',
    color: '#9ca3af',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.2s'
  };

  const profileButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    color: '#d1d5db',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  };

  const profileIconStyle = {
    width: '32px',
    height: '32px',
    backgroundColor: '#4b5563',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const dropdownStyle = {
    position: 'absolute',
    right: '0',
    top: '100%',
    marginTop: '8px',
    width: '192px',
    backgroundColor: 'white',
    borderRadius: '6px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    padding: '4px 0',
    zIndex: 50
  };

  const dropdownItemStyle = {
    display: 'block',
    padding: '8px 16px',
    fontSize: '14px',
    color: '#374151',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const mobileMenuStyle = {
    display: isMenuOpen ? 'block' : 'none',
    backgroundColor: '#374151',
    padding: '8px'
  };

  const mobileNavItemStyle = {
    display: 'block',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    textDecoration: 'none',
    marginBottom: '4px',
    cursor: 'pointer'
  };

  const notificationDotStyle = {
    position: 'absolute',
    top: '4px',
    right: '4px',
    width: '8px',
    height: '8px',
    backgroundColor: '#10b981',
    borderRadius: '50%'
  };

  const mediaQuery = window.innerWidth >= 768;

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <div style={flexStyle}>
          {/* Logo */}
          <div style={logoStyle}>
            <div style={logoIconStyle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={logoTextStyle}>ReHabit</span>
          </div>

          {/* Desktop Navigation */}
          {mediaQuery && (
            <div style={desktopNavStyle}>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  style={item.active ? activeNavItemStyle : inactiveNavItemStyle}
                  onMouseEnter={(e) => {
                    if (!item.active) {
                      e.target.style.color = 'white';
                      e.target.style.backgroundColor = '#374151';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!item.active) {
                      e.target.style.color = '#d1d5db';
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}

          {/* Right side - Notifications and Profile */}
          {mediaQuery && (
            <div style={rightSectionStyle}>
              {/* Notification Bell */}
              <button
                style={iconButtonStyle}
                onMouseEnter={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.backgroundColor = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#9ca3af';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <Bell size={20} />
                <span style={notificationDotStyle}></span>
              </button>

              {/* Profile Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  style={profileButtonStyle}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'white';
                    e.target.style.backgroundColor = '#374151';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#d1d5db';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={profileIconStyle}>
                    <User size={20} />
                  </div>
                  <ChevronDown size={16} />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div style={dropdownStyle}>
                    <Link
                      to="#"
                      style={dropdownItemStyle}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      Your Profile
                    </Link>

                    <Link
                      to="/edit-profile"
                      style={dropdownItemStyle}
                      onClick={() => setIsProfileOpen(false)} // ปิด dropdown หลังคลิก
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      Edit Profile
                    </Link>

                    <Link
                      to="#"
                      style={dropdownItemStyle}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      Sign out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          {!mediaQuery && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={iconButtonStyle}
              onMouseEnter={(e) => {
                e.target.style.color = 'white';
                e.target.style.backgroundColor = '#374151';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#9ca3af';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div style={mobileMenuStyle}>
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            style={{
              ...mobileNavItemStyle,
              color: item.active ? '#5eead4' : '#d1d5db',
              backgroundColor: item.active ? '#4b5563' : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (!item.active) {
                e.target.style.color = 'white';
                e.target.style.backgroundColor = '#4b5563';
              }
            }}
            onMouseLeave={(e) => {
              if (!item.active) {
                e.target.style.color = '#d1d5db';
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            {item.name}
          </a>
        ))}

        {/* Mobile Profile Section */}
        <div style={{ paddingTop: '16px', borderTop: '1px solid #4b5563', marginTop: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px' }}>
            <div style={{ ...profileIconStyle, width: '40px', height: '40px' }}>
              <User size={24} />
            </div>
            <div style={{ marginLeft: '12px', flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: '500', color: 'white' }}>User Name</div>
              <div style={{ fontSize: '14px', color: '#9ca3af' }}>user@example.com</div>
            </div>
            <button style={iconButtonStyle}>
              <Bell size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default ReHabitNavbar;