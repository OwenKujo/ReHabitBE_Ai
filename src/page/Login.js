import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Activity } from 'lucide-react';
import { useLang, useAuth } from '../App';
import { api, tokenManager } from '../utils/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { lang } = useLang();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.auth.login({ email, password });
      
      if (response.token) {
        tokenManager.setToken(response.token);
        login(response.user, response.token);
        navigate('/');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Kanit', 'Prompt', Arial, sans-serif;
        }
        
        .login-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          background: white;
          position: relative;
        }
        
        .login-right {
          flex: 1;
          background: url('/loginpage.jpg') center/cover;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }
          
          .login-left {
            flex: none;
            min-height: 100vh;
            padding: 1rem;
          }
          
          .login-right {
            display: none;
          }
        }
        
        @media (max-width: 480px) {
          .login-left {
            padding: 0.75rem;
          }
        }
        
        .login-right::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 20%, rgba(255, 255, 255, 0) 100%);
        }
        
        .login-content {
          max-width: 400px;
          width: 100%;
          text-align: center;
        }
        
        .back-button {
          position: absolute;
          top: 2rem;
          left: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
        }
        
        .back-button:hover {
          color: #475569;
        }
        
        .logo-section {
          margin-bottom: 2rem;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        
        .logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #4392B1, #3a7a9a);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .logo-text {
          font-size: 24px;
          font-weight: bold;
          color: #1e293b;
        }
        
        .welcome-text {
          color: #64748b;
          font-size: 16px;
          margin-bottom: 2rem;
        }
        
        .login-title {
          font-size: 32px;
          font-weight: bold;
          color: #1e293b;
          margin-bottom: 2rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
          text-align: left;
        }
        
        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          color: #374151;
          font-weight: 500;
          font-size: 14px;
        }
        
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.2s;
          background: #f8fafc;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #4392B1;
          background: white;
          box-shadow: 0 0 0 3px rgba(67, 146, 177, 0.1);
        }
        
        .login-button {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #4392B1, #3a7a9a);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 1.5rem;
        }
        
        .login-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(67, 146, 177, 0.3);
        }
        
        .divider {
          display: flex;
          align-items: center;
          margin: 1.5rem 0;
          color: #64748b;
          font-size: 14px;
        }
        
        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }
        
        .divider span {
          padding: 0 1rem;
        }
        
        .social-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .social-button {
          flex: 1;
          padding: 12px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          color: #374151;
        }
        
        .social-button:hover {
          border-color: #4392B1;
          background: #f0f6fa;
        }
        
        .register-link {
          color: #4392B1;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        
        .register-link:hover {
          color: #3a7a9a;
          text-decoration: underline;
        }
        
        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }
          
          .login-right {
            display: none;
          }
          
          .login-left {
            padding: 1rem;
          }
          
          .back-button {
            position: relative;
            top: auto;
            left: auto;
            margin-bottom: 2rem;
          }
        }
      `}</style>
      
      <div className="login-left">
        <Link to="/" className="back-button">
          <ArrowLeft size={16} />
          {lang === 'th' ? 'กลับ' : 'Go Back'}
        </Link>
        
        <div className="login-content">
          <div className="logo-section">
            <div className="logo-container">
              <div className="logo-icon">
                <Heart size={20} />
              </div>
              <span className="logo-text">ReHabit</span>
            </div>
            <p className="welcome-text">
              {lang === 'th' ? 'ยินดีต้อนรับกลับสู่ ReHabit!!' : 'Welcome back to ReHabit!!'}
            </p>
          </div>
          
          <h1 className="login-title">
            {lang === 'th' ? 'เข้าสู่ระบบ' : 'Login'}
          </h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                {lang === 'th' ? 'อีเมล' : 'Email'}
              </label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={lang === 'th' ? 'กรอกอีเมลของคุณ' : 'Enter your email'}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">
                {lang === 'th' ? 'รหัสผ่าน' : 'Password'}
              </label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={lang === 'th' ? 'กรอกรหัสผ่านของคุณ' : 'Enter your password'}
                required
              />
            </div>
            
            {error && (
              <div className="error-message" style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>
                {error}
              </div>
            )}
            
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (lang === 'th' ? 'กำลังเข้าสู่ระบบ...' : 'Logging in...') : (lang === 'th' ? 'เข้าสู่ระบบ' : 'Login')}
            </button>
          </form>
          
          <div className="divider">
            <span>{lang === 'th' ? 'หรือเข้าสู่ระบบด้วย' : 'Or sign in with'}</span>
          </div>
          
          <div className="social-buttons">
            <button className="social-button">
              <img src="/Google__G__logo.svg (1).webp" alt="Google" style={{ width: '20px', height: '20px' }} />
            </button>
            <button className="social-button">
              <img src="/Facebook_Logo_(2019).png.webp" alt="Facebook" style={{ width: '20px', height: '20px' }} />
            </button>
          </div>
          
          <p>
            {lang === 'th' ? 'ครั้งแรกกับ ReHabit?' : 'First time with ReHabit?'}{' '}
            <Link to="/register" className="register-link">
              {lang === 'th' ? 'สมัครสมาชิก' : 'Register'}
            </Link>
          </p>
        </div>
      </div>
      
      <div className="login-right">
        {/* Background image is set via CSS */}
      </div>
    </div>
  );
}

export default Login; 