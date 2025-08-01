import React from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const ReHabitFooter = () => {
  return (
    <footer className="footer" style={{ backgroundColor: '#D6E9F7', marginTop: 'auto' }}>
      <style>{`
        .footer {
          font-family: 'Kanit', 'Prompt', Arial, sans-serif;
          display: flex;
          flex-direction: column;
        }
        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 3rem;
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }
        .footer-logo-icon {
          width: 2.8125rem;
          height: 2.8125rem;
          background-color: #2E7BC9;
          border-radius: 0.625rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
        }
        .footer-logo-text {
          font-size: 1.75rem;
          font-weight: 600;
          color: #1a1a1a;
          letter-spacing: 0.03125rem;
        }
        .footer-nav {
          display: flex;
          gap: 2.5rem;
          align-items: center;
        }
        .footer-nav-link {
          color: #2a2a2a;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          padding: 0.625rem 1.25rem;
          border-radius: 0.3125rem;
          transition: all 0.3s ease;
          position: relative;
        }
        .footer-nav-link:hover {
          background-color: rgba(46, 123, 201, 0.1);
          color: #2E7BC9;
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.125rem 3rem;
          border-top: 1px solid rgba(0,0,0,0.08);
          background-color: rgba(255,255,255,0.3);
        }
        .footer-social {
          display: flex;
          gap: 0.9375rem;
          align-items: center;
        }
        .footer-social-icon {
          width: 1.625rem;
          height: 1.625rem;
          color: #555;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0.25rem;
          border-radius: 50%;
        }
        .footer-social-icon:hover {
          color: #2E7BC9;
          background-color: rgba(46, 123, 201, 0.1);
        }
        .footer-copyright {
          font-size: 0.875rem;
          color: #555;
          font-weight: 400;
        }
        
        @media (max-width: 768px) {
          .footer-top, .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.5rem 1.25rem;
            gap: 1.125rem;
          }
          .footer-nav {
            gap: 1.25rem;
            margin-top: 0.75rem;
            flex-wrap: wrap;
          }
          .footer-logo-text {
            font-size: 1.25rem;
          }
          .footer-logo-icon {
            width: 2rem;
            height: 2rem;
            font-size: 1.125rem;
          }
        }
        
        @media (max-width: 480px) {
          .footer-top {
            padding: 1rem 0.5rem;
          }
          .footer-bottom {
            padding: 0.75rem 0.5rem;
          }
          .footer-nav {
            gap: 0.75rem;
          }
          .footer-nav-link {
            font-size: 0.875rem;
            padding: 0.5rem 0.75rem;
          }
          .footer-logo-text {
            font-size: 1.125rem;
          }
          .footer-logo-icon {
            width: 1.75rem;
            height: 1.75rem;
            font-size: 1rem;
          }
        }
      `}</style>
      <div className="footer-top">
        <div className="footer-logo">
          <div className="footer-logo-icon">R</div>
          <span className="footer-logo-text">ReHabit</span>
        </div>
        <nav className="footer-nav">
          <a href="#home" className="footer-nav-link">Home</a>
          <a href="#physical-therapy" className="footer-nav-link">Physical therapy</a>
          <a href="#about" className="footer-nav-link">About</a>
          <a href="#contact" className="footer-nav-link">Contact</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <div className="footer-social">
          <Instagram className="footer-social-icon" />
          <Facebook className="footer-social-icon" />
          <Youtube className="footer-social-icon" />
        </div>
        <div className="footer-copyright">
          © Copyright 2025 | All rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default ReHabitFooter;