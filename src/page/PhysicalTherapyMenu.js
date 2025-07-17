import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../App';

const menuItems = [
  { label: 'Suggestion', active: true },
  { label: 'Office Syndrome' },
  { label: 'Back pain' },
  { label: 'All course' },
];

const suggestionImg = '/one.webp';
const suggestions = [
  {
    img: suggestionImg,
    title: 'Office Syndrome Relief',
    desc: 'Learn effective stretches and exercises to relieve neck, shoulder, and back pain caused by prolonged desk work. Improve your posture and reduce discomfort with guided routines.'
  },
  {
    img: suggestionImg,
    title: 'Post-Surgery Rehabilitation',
    desc: 'Discover safe and progressive exercises to regain strength and mobility after surgery. Our programs are designed to help you recover faster and return to daily activities with confidence.'
  },
  {
    img: suggestionImg,
    title: 'Sports Injury Recovery',
    desc: 'Explore targeted physical therapy plans for common sports injuries. Prevent re-injury and enhance your performance with expert-approved rehabilitation exercises.'
  },
];

const PhysicalTherapyMenu = () => {
  const navigate = useNavigate();
  const { lang } = useLang();

  if (lang === 'en') {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f4fafd', fontFamily: 'Kanit, Prompt, Arial, sans-serif' }}>
        {/* Sidebar */}
        <aside style={{ width: 280, background: '#fff', boxShadow: '2px 0 16px 0 rgba(30,136,229,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 0' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 36 }}>
            <img src="/logo192.png" alt="ReHabit Logo" style={{ width: 38, height: 38, marginRight: 10 }} />
            <span style={{ fontWeight: 700, fontSize: 24, color: '#1976d2', letterSpacing: 1 }}>ReHabit</span>
          </div>
          {/* Search */}
          <div style={{ width: '50%', marginBottom: 32, position: 'relative', alignSelf: 'flex-start', marginLeft: 25 }}>
            <span style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#1976d2',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              fontSize: 20
            }}>
              {/* Magnifying glass SVG */}
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search here"
              style={{
                width: '100%',
                padding: '12px 16px 12px 44px',
                borderRadius: 16,
                border: 'none',
                background: '#e0f2fe',
                fontSize: 16,
                outline: 'none',
                fontFamily: 'Kanit, Prompt',
              }}
            />
          </div>
          {/* Menu */}
          <nav style={{ width: '80%' }}>
            {menuItems.map((item) => (
              <div
                key={item.label}
                style={{
                  background: item.active ? '#1976d2' : 'transparent',
                  color: item.active ? '#fff' : '#1976d2',
                  borderRadius: 10,
                  padding: '12px 18px',
                  marginBottom: 10,
                  fontWeight: 600,
                  fontSize: 17,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  textAlign: 'left',
                }}
              >
                {item.label}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '40px 48px' }}>
          {/* Hero Image */}
          <div style={{ width: '100%', maxWidth: 900, borderRadius: 28, overflow: 'hidden', marginBottom: 36 }}>
            <img
              src="https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&w=900&h=260&fit=crop"
              alt="Physical Therapy Hero"
              style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }}
            />
          </div>
          {/* Section Title */}
          <div style={{ fontWeight: 700, fontSize: 28, color: '#222', marginBottom: 24 }}>Suggestion</div>
          {/* Suggestion Cards */}
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {suggestions.map((s, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 16px 0 rgba(30,136,229,0.08)', width: 300, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <img src={s.img} alt="Suggestion" style={{ width: '100%', height: 140, objectFit: 'cover' }} />
                <div style={{ padding: '18px 18px 12px 18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#222', marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: '#555', marginBottom: 18 }}>{s.desc}</div>
                  <button
                    style={{ alignSelf: 'flex-end', background: '#19c2d2', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 24px', fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 1px 4px rgba(30,136,229,0.06)' }}
                    onClick={i === 0 ? () => navigate('/office-syndrome') : undefined}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
        <style>{`
          .pt-menu-root {
            display: flex;
            min-height: 100vh;
            background: #f4fafd;
            font-family: 'Kanit', 'Prompt', Arial, sans-serif;
          }
          .pt-menu-sidebar {
            width: 280px;
            background: #fff;
            box-shadow: 2px 0 16px 0 rgba(30,136,229,0.06);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 32px 0;
          }
          .pt-menu-logo {
            display: flex;
            align-items: center;
            margin-bottom: 36px;
          }
          .pt-menu-logo-img {
            width: 38px;
            height: 38px;
            margin-right: 10px;
          }
          .pt-menu-logo-text {
            font-weight: 700;
            font-size: 24px;
            color: #1976d2;
            letter-spacing: 1px;
          }
          .pt-menu-search {
            width: 80%;
            margin-bottom: 24px;
            position: relative;
          }
          .pt-menu-search-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #1976d2;
            pointer-events: none;
            display: flex;
            align-items: center;
            font-size: 20px;
          }
          .pt-menu-search-input {
            width: 100%;
            padding: 12px 16px 12px 44px;
            border-radius: 16px;
            border: none;
            background: #e0f2fe;
            font-size: 16px;
            outline: none;
            font-family: 'Kanit', 'Prompt';
          }
          .pt-menu-nav {
            width: 80%;
          }
          .pt-menu-nav-item {
            background: transparent;
            color: #1976d2;
            border-radius: 10px;
            padding: 12px 18px;
            margin-bottom: 10px;
            font-weight: 600;
            font-size: 17px;
            cursor: pointer;
            transition: background 0.2s;
            text-align: left;
          }
          .pt-menu-nav-item.active {
            background: #1976d2;
            color: #fff;
          }
          .pt-menu-main {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            padding: 32px 0;
          }
          .pt-menu-hero-img {
            width: 100%;
            max-width: 900px;
            border-radius: 28px;
            overflow: hidden;
            margin-bottom: 36px;
          }
          .pt-menu-hero-img img {
            width: 100%;
            height: 220px;
            object-fit: cover;
            display: block;
          }
          .pt-menu-section-title {
            font-weight: 700;
            font-size: 28px;
            color: #222;
            margin-bottom: 24px;
          }
          .pt-menu-suggestions {
            display: flex;
            gap: 32px;
            flex-wrap: wrap;
          }
          .pt-menu-suggestion-card {
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 4px 16px 0 rgba(30,136,229,0.08);
            width: 300px;
            padding: 0;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          .pt-menu-suggestion-img {
            width: 100%;
            height: 140px;
            object-fit: cover;
          }
          .pt-menu-suggestion-content {
            padding: 18px 18px 12px 18px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .pt-menu-suggestion-title {
            font-weight: 700;
            font-size: 16px;
            color: #222;
            margin-bottom: 8px;
          }
          .pt-menu-suggestion-desc {
            font-size: 14px;
            color: #555;
            margin-bottom: 18px;
          }
          .pt-menu-suggestion-btn {
            align-self: flex-end;
            background: #19c2d2;
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 8px 24px;
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
            box-shadow: 0 1px 4px rgba(30,136,229,0.06);
          }
          @media (max-width: 1200px) {
            .pt-menu-sidebar {
              width: 200px;
              padding: 16px 0;
            }
            .pt-menu-hero-img {
              max-width: 100vw;
            }
            .pt-menu-suggestions {
              gap: 16px;
            }
          }
          @media (max-width: 900px) {
            .pt-menu-root {
              flex-direction: column;
            }
            .pt-menu-sidebar {
              width: 100%;
              flex-direction: row;
              justify-content: flex-start;
              align-items: flex-start;
              padding: 8px 0;
              box-shadow: none;
              border-radius: 0;
            }
            .pt-menu-logo {
              margin-bottom: 0;
              margin-right: 24px;
            }
            .pt-menu-nav {
              width: auto;
              display: flex;
              gap: 8px;
            }
            .pt-menu-nav-item {
              font-size: 14px;
              padding: 8px 10px;
              margin-bottom: 0;
            }
          }
          @media (max-width: 600px) {
            .pt-menu-sidebar {
              flex-direction: column;
              align-items: center;
              padding: 4px 0;
            }
            .pt-menu-logo-text {
              font-size: 16px;
            }
            .pt-menu-logo-img {
              width: 24px;
              height: 24px;
            }
            .pt-menu-search-input {
              font-size: 12px;
              padding: 6px 8px 6px 28px;
              border-radius: 8px;
            }
            .pt-menu-section-title {
              font-size: 16px;
              margin-bottom: 10px;
            }
            .pt-menu-suggestions {
              gap: 6px;
            }
            .pt-menu-suggestion-card {
              width: 140px;
              border-radius: 8px;
            }
            .pt-menu-suggestion-img {
              height: 60px;
            }
            .pt-menu-suggestion-title {
              font-size: 10px;
            }
            .pt-menu-suggestion-desc {
              font-size: 8px;
              margin-bottom: 6px;
            }
            .pt-menu-suggestion-btn {
              font-size: 10px;
              padding: 4px 8px;
              border-radius: 4px;
            }
          }
        `}</style>
      </div>
    );
  } else {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f4fafd', fontFamily: 'Kanit, Prompt, Arial, sans-serif' }}>
        {/* Sidebar */}
        <aside style={{ width: 280, background: '#fff', boxShadow: '2px 0 16px 0 rgba(30,136,229,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 0' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 36 }}>
            <img src="/logo192.png" alt="ReHabit Logo" style={{ width: 38, height: 38, marginRight: 10 }} />
            <span style={{ fontWeight: 700, fontSize: 24, color: '#1976d2', letterSpacing: 1 }}>ReHabit</span>
          </div>
          {/* Search */}
          <div style={{ width: '50%', marginBottom: 32, position: 'relative', alignSelf: 'flex-start', marginLeft: 25 }}>
            <span style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#1976d2',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              fontSize: 20
            }}>
              {/* Magnifying glass SVG */}
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search here"
              style={{
                width: '100%',
                padding: '12px 16px 12px 44px',
                borderRadius: 16,
                border: 'none',
                background: '#e0f2fe',
                fontSize: 16,
                outline: 'none',
                fontFamily: 'Kanit, Prompt',
              }}
            />
          </div>
          {/* Menu */}
          <nav style={{ width: '80%' }}>
            {menuItems.map((item) => (
              <div
                key={item.label}
                style={{
                  background: item.active ? '#1976d2' : 'transparent',
                  color: item.active ? '#fff' : '#1976d2',
                  borderRadius: 10,
                  padding: '12px 18px',
                  marginBottom: 10,
                  fontWeight: 600,
                  fontSize: 17,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  textAlign: 'left',
                }}
              >
                {item.label}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '40px 48px' }}>
          {/* Hero Image */}
          <div style={{ width: '100%', maxWidth: 900, borderRadius: 28, overflow: 'hidden', marginBottom: 36 }}>
            <img
              src="https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&w=900&h=260&fit=crop"
              alt="Physical Therapy Hero"
              style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }}
            />
          </div>
          {/* Section Title */}
          <div style={{ fontWeight: 700, fontSize: 28, color: '#222', marginBottom: 24 }}>Suggestion</div>
          {/* Suggestion Cards */}
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {suggestions.map((s, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 16px 0 rgba(30,136,229,0.08)', width: 300, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <img src={s.img} alt="Suggestion" style={{ width: '100%', height: 140, objectFit: 'cover' }} />
                <div style={{ padding: '18px 18px 12px 18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#222', marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: '#555', marginBottom: 18 }}>{s.desc}</div>
                  <button
                    style={{ alignSelf: 'flex-end', background: '#19c2d2', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 24px', fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 1px 4px rgba(30,136,229,0.06)' }}
                    onClick={i === 0 ? () => navigate('/office-syndrome') : undefined}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
        <style>{`
          .pt-menu-root {
            display: flex;
            min-height: 100vh;
            background: #f4fafd;
            font-family: 'Kanit', 'Prompt', Arial, sans-serif;
          }
          .pt-menu-sidebar {
            width: 280px;
            background: #fff;
            box-shadow: 2px 0 16px 0 rgba(30,136,229,0.06);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 32px 0;
          }
          .pt-menu-logo {
            display: flex;
            align-items: center;
            margin-bottom: 36px;
          }
          .pt-menu-logo-img {
            width: 38px;
            height: 38px;
            margin-right: 10px;
          }
          .pt-menu-logo-text {
            font-weight: 700;
            font-size: 24px;
            color: #1976d2;
            letter-spacing: 1px;
          }
          .pt-menu-search {
            width: 80%;
            margin-bottom: 24px;
            position: relative;
          }
          .pt-menu-search-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #1976d2;
            pointer-events: none;
            display: flex;
            align-items: center;
            font-size: 20px;
          }
          .pt-menu-search-input {
            width: 100%;
            padding: 12px 16px 12px 44px;
            border-radius: 16px;
            border: none;
            background: #e0f2fe;
            font-size: 16px;
            outline: none;
            font-family: 'Kanit', 'Prompt';
          }
          .pt-menu-nav {
            width: 80%;
          }
          .pt-menu-nav-item {
            background: transparent;
            color: #1976d2;
            border-radius: 10px;
            padding: 12px 18px;
            margin-bottom: 10px;
            font-weight: 600;
            font-size: 17px;
            cursor: pointer;
            transition: background 0.2s;
            text-align: left;
          }
          .pt-menu-nav-item.active {
            background: #1976d2;
            color: #fff;
          }
          .pt-menu-main {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            padding: 32px 0;
          }
          .pt-menu-hero-img {
            width: 100%;
            max-width: 900px;
            border-radius: 28px;
            overflow: hidden;
            margin-bottom: 36px;
          }
          .pt-menu-hero-img img {
            width: 100%;
            height: 220px;
            object-fit: cover;
            display: block;
          }
          .pt-menu-section-title {
            font-weight: 700;
            font-size: 28px;
            color: #222;
            margin-bottom: 24px;
          }
          .pt-menu-suggestions {
            display: flex;
            gap: 32px;
            flex-wrap: wrap;
          }
          .pt-menu-suggestion-card {
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 4px 16px 0 rgba(30,136,229,0.08);
            width: 300px;
            padding: 0;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          .pt-menu-suggestion-img {
            width: 100%;
            height: 140px;
            object-fit: cover;
          }
          .pt-menu-suggestion-content {
            padding: 18px 18px 12px 18px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .pt-menu-suggestion-title {
            font-weight: 700;
            font-size: 16px;
            color: #222;
            margin-bottom: 8px;
          }
          .pt-menu-suggestion-desc {
            font-size: 14px;
            color: #555;
            margin-bottom: 18px;
          }
          .pt-menu-suggestion-btn {
            align-self: flex-end;
            background: #19c2d2;
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 8px 24px;
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
            box-shadow: 0 1px 4px rgba(30,136,229,0.06);
          }
          @media (max-width: 1200px) {
            .pt-menu-sidebar {
              width: 200px;
              padding: 16px 0;
            }
            .pt-menu-hero-img {
              max-width: 100vw;
            }
            .pt-menu-suggestions {
              gap: 16px;
            }
          }
          @media (max-width: 900px) {
            .pt-menu-root {
              flex-direction: column;
            }
            .pt-menu-sidebar {
              width: 100%;
              flex-direction: row;
              justify-content: flex-start;
              align-items: flex-start;
              padding: 8px 0;
              box-shadow: none;
              border-radius: 0;
            }
            .pt-menu-logo {
              margin-bottom: 0;
              margin-right: 24px;
            }
            .pt-menu-nav {
              width: auto;
              display: flex;
              gap: 8px;
            }
            .pt-menu-nav-item {
              font-size: 14px;
              padding: 8px 10px;
              margin-bottom: 0;
            }
          }
          @media (max-width: 600px) {
            .pt-menu-sidebar {
              flex-direction: column;
              align-items: center;
              padding: 4px 0;
            }
            .pt-menu-logo-text {
              font-size: 16px;
            }
            .pt-menu-logo-img {
              width: 24px;
              height: 24px;
            }
            .pt-menu-search-input {
              font-size: 12px;
              padding: 6px 8px 6px 28px;
              border-radius: 8px;
            }
            .pt-menu-section-title {
              font-size: 16px;
              margin-bottom: 10px;
            }
            .pt-menu-suggestions {
              gap: 6px;
            }
            .pt-menu-suggestion-card {
              width: 140px;
              border-radius: 8px;
            }
            .pt-menu-suggestion-img {
              height: 60px;
            }
            .pt-menu-suggestion-title {
              font-size: 10px;
            }
            .pt-menu-suggestion-desc {
              font-size: 8px;
              margin-bottom: 6px;
            }
            .pt-menu-suggestion-btn {
              font-size: 10px;
              padding: 4px 8px;
              border-radius: 4px;
            }
          }
        `}</style>
      </div>
    );
  }
};

export default PhysicalTherapyMenu; 