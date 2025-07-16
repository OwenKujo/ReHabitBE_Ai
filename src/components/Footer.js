import React from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const ReHabitFooter = () => {
  const footerStyle = {
    backgroundColor: '#D6E9F7',
    padding: '0',
    fontFamily: 'Kanit , Prompt',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto'
  };

  const topSectionStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '30px 60px'
  };

  const logoSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const logoIconStyle = {
    width: '45px',
    height: '45px',
    backgroundColor: '#2E7BC9',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold'
  };

  const logoTextStyle = {
    fontSize: '28px',
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: '0.5px'
  };

  const navStyle = {
    display: 'flex',
    gap: '40px',
    alignItems: 'center'
  };

  const navLinkStyle = {
    color: '#2a2a2a',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '10px 20px',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
    position: 'relative'
  };

  const bottomSectionStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 60px',
    borderTop: '1px solid rgba(0,0,0,0.08)',
    backgroundColor: 'rgba(255,255,255,0.3)'
  };

  const socialLinksStyle = {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  };

  const socialIconStyle = {
    width: '26px',
    height: '26px',
    color: '#555',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    padding: '4px',
    borderRadius: '50%'
  };

  const copyrightStyle = {
    fontSize: '14px',
    color: '#555',
    fontWeight: '400'
  };

  return (
    <footer style={footerStyle}>
      <div style={topSectionStyle}>
        <div style={logoSectionStyle}>
          <div style={logoIconStyle}>
            R
          </div>
          <span style={logoTextStyle}>ReHabit</span>
        </div>
        
        <nav style={navStyle}>
          <a 
            href="#home" 
            style={navLinkStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(46, 123, 201, 0.1)';
              e.target.style.color = '#2E7BC9';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#2a2a2a';
            }}
          >
            Home
          </a>
          <a 
            href="#physical-therapy" 
            style={navLinkStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(46, 123, 201, 0.1)';
              e.target.style.color = '#2E7BC9';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#2a2a2a';
            }}
          >
            Physical therapy
          </a>
          <a 
            href="#about" 
            style={navLinkStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(46, 123, 201, 0.1)';
              e.target.style.color = '#2E7BC9';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#2a2a2a';
            }}
          >
            About
          </a>
          <a 
            href="#contact" 
            style={navLinkStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(46, 123, 201, 0.1)';
              e.target.style.color = '#2E7BC9';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#2a2a2a';
            }}
          >
            Contact
          </a>
        </nav>
      </div>
      
      <div style={bottomSectionStyle}>
        <div style={socialLinksStyle}>
          <Instagram 
            style={socialIconStyle} 
            onMouseEnter={(e) => {
              e.target.style.color = '#E4405F';
              e.target.style.backgroundColor = 'rgba(228, 64, 95, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#555';
              e.target.style.backgroundColor = 'transparent';
            }}
          />
          <Facebook 
            style={socialIconStyle}
            onMouseEnter={(e) => {
              e.target.style.color = '#1877F2';
              e.target.style.backgroundColor = 'rgba(24, 119, 242, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#555';
              e.target.style.backgroundColor = 'transparent';
            }}
          />
          <svg 
            width="26" 
            height="26" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={socialIconStyle}
            onMouseEnter={(e) => {
              e.target.style.color = '#1DA1F2';
              e.target.style.backgroundColor = 'rgba(29, 161, 242, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#555';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
          </svg>
          <Youtube 
            style={socialIconStyle}
            onMouseEnter={(e) => {
              e.target.style.color = '#FF0000';
              e.target.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#555';
              e.target.style.backgroundColor = 'transparent';
            }}
          />
        </div>
        
        <div style={copyrightStyle}>
          © Copyright 2025 | All rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default ReHabitFooter;