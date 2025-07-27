import React from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const ReHabitFooter = () => {
  return (
    <footer className="rehabit-footer">
      <style>{`
        .rehabit-footer {
          background-color: #D6E9F7;
          padding: 0;
          font-family: 'Kanit', 'Prompt', Arial, sans-serif;
          display: flex;
          flex-direction: column;
          margin-top: auto;
        }
        .footer-top-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px 60px;
        }
        .footer-logo-section {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .footer-logo-icon {
          width: 45px;
          height: 45px;
          background-color: #2E7BC9;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: bold;
        }
        .footer-logo-text {
          font-size: 28px;
          font-weight: 600;
          color: #1a1a1a;
          letter-spacing: 0.5px;
        }
        .footer-nav {
          display: flex;
          gap: 40px;
          align-items: center;
        }
        .footer-nav-link {
          color: #2a2a2a;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          padding: 10px 20px;
          border-radius: 5px;
          transition: all 0.3s ease;
          position: relative;
        }
        .footer-nav-link:hover {
          background-color: rgba(46, 123, 201, 0.1);
          color: #2E7BC9;
        }
        .footer-bottom-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 60px;
          border-top: 1px solid rgba(0,0,0,0.08);
          background-color: rgba(255,255,255,0.3);
        }
        .footer-social-links {
          display: flex;
          gap: 15px;
          align-items: center;
        }
        .footer-social-icon {
          width: 26px;
          height: 26px;
          color: #555;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 4px;
          border-radius: 50%;
        }
        .footer-social-icon:hover {
          color: #2E7BC9;
          background-color: rgba(46, 123, 201, 0.1);
        }
        .footer-copyright {
          font-size: 14px;
          color: #555;
          font-weight: 400;
        }
        @media (max-width: 900px) {
          .footer-top-section, .footer-bottom-section {
            flex-direction: column;
            align-items: flex-start;
            padding: 24px 20px;
            gap: 18px;
          }
          .footer-nav {
            gap: 20px;
            margin-top: 12px;
          }
        }
        @media (max-width: 600px) {
          .footer-logo-text {
            font-size: 20px;
          }
          .footer-logo-icon {
            width: 32px;
            height: 32px;
            font-size: 18px;
          }
          .footer-nav-link {
            font-size: 14px;
            padding: 8px 12px;
          }
          .footer-bottom-section {
            padding: 12px 10px;
          }
          .footer-top-section {
            padding: 16px 8px;
          }
        }
      `}</style>
      <div className="footer-top-section">
        <div className="footer-logo-section">
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
      <div className="footer-bottom-section">
        <div className="footer-social-links">
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