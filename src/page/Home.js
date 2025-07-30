import React, { useState, useRef } from 'react';
import { useLang } from '../LangContext';
// Remove useTranslation import and usage
// Restore all hardcoded English text for headings, buttons, features, tabs, and exercises

// Add Google Fonts import for Kanit and Prompt
if (typeof document !== 'undefined' && !document.getElementById('kanit-prompt-font')) {
  const link = document.createElement('link');
  link.id = 'kanit-prompt-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Kanit:wght@400;700&family=Prompt:wght@400;700&display=swap';
  document.head.appendChild(link);
}

const Home = () => {
  const { lang } = useLang();
  // All arrays using t must be defined here:
  const features = [
    { title: 'Video Preview', desc: 'See yourself in real time and follow along with guided exercises.', icon: '🎥' },
    { title: 'AI Detection', desc: 'AI-powered posture and movement analysis for better results.', icon: '🤖' },
    { title: 'Track Improvement', desc: 'Monitor your progress and stay motivated with session tracking.', icon: '📈' },
  ];
  const therapyTabs = [
    { label: 'Office Syndrome', key: 'office' },
    { label: 'Low Back Pain', key: 'back' },
    { label: 'Cervicogenic Headache', key: 'headache' },
    { label: 'Herniated Disc', key: 'disc' },
  ];
  const officeSyndromeExercises = [
    { title: 'Neck Sidebend Stretching', desc: 'Gently tilt your head to the side, bringing your ear toward your shoulder. Hold for 15-30 seconds each side.' },
    { title: 'Upper Trapezius Stretching', desc: 'Sit or stand tall, grasp the side of your head and gently pull toward your shoulder. Hold and repeat.' },
    { title: 'Neck Shoulder & Chest Stretch', desc: 'Interlace your fingers behind your back, straighten your arms, and lift your chest. Hold for 15-30 seconds.' },
    { title: 'Scapular and Lower Back Stretch', desc: 'Cross your arms in front, round your upper back, and gently push your hands forward. Hold and repeat.' },
  ];
  // Add Thai translations for features, therapyTabs, officeSyndromeExercises
  const featuresTH = [
    { title: 'ดูตัวอย่างวิดีโอ', desc: 'ดูตัวเองแบบเรียลไทม์และทำตามท่าทางที่แนะนำ', icon: '🎥' },
    { title: 'AI ตรวจจับ', desc: 'วิเคราะห์ท่าทางและการเคลื่อนไหวด้วย AI เพื่อผลลัพธ์ที่ดียิ่งขึ้น', icon: '🤖' },
    { title: 'ติดตามความก้าวหน้า', desc: 'ตรวจสอบความก้าวหน้าและสร้างแรงจูงใจด้วยการบันทึกผล', icon: '📈' },
  ];
  const therapyTabsTH = [
    { label: 'ออฟฟิศซินโดรม', key: 'office' },
    { label: 'ปวดหลังส่วนล่าง', key: 'back' },
    { label: 'ปวดศีรษะจากคอ', key: 'headache' },
    { label: 'หมอนรองกระดูกทับเส้น', key: 'disc' },
  ];
  const officeSyndromeExercisesTH = [
    { title: 'ท่ายืดคอด้านข้าง', desc: 'เอียงศีรษะไปด้านข้างให้หูเข้าใกล้ไหล่ ค้างไว้ 15-30 วินาทีต่อข้าง' },
    { title: 'ท่ายืดกล้ามเนื้อสะบัก', desc: 'นั่งหรือตรง จับศีรษะด้านข้างแล้วดึงเบาๆ เข้าหาไหล่ ค้างไว้และทำซ้ำ' },
    { title: 'ท่ายืดคอ ไหล่ และอก', desc: 'ประสานมือไว้ด้านหลัง เหยียดแขนตรง แล้วยกอกขึ้น ค้างไว้ 15-30 วินาที' },
    { title: 'ท่ายืดสะบักและหลังส่วนล่าง', desc: 'ไขว้แขนด้านหน้า โค้งหลังส่วนบน แล้วดันมือไปข้างหน้า ค้างไว้และทำซ้ำ' },
  ];
  const [selectedTab, setSelectedTab] = useState('office');
  const [featureIndex, setFeatureIndex] = useState(0);
  // Touch state for swipe
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // Carousel navigation
  const prevFeature = () => setFeatureIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  const nextFeature = () => setFeatureIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));

  // Touch handlers
  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchMove = (e) => setTouchEndX(e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchStartX - touchEndX;
      if (diff > 50) nextFeature(); // swipe left
      else if (diff < -50) prevFeature(); // swipe right
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Helper to get the correct index with wrap-around
  const getFeatureAt = (offset) => {
    const len = features.length;
    return features[(featureIndex + offset + len) % len];
  };

  // Responsive: show 1 card on mobile, 3 on desktop
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;
  const visibleCards = isMobile ? 1 : 3;

  // Ref for horizontal scroll
  const featureRowRef = useRef(null);

  // Scroll handler for arrows
  const scrollFeatureRow = (dir) => {
    const node = featureRowRef.current;
    if (!node) return;
    const scrollAmount = 340; // width of one card + gap
    node.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
  };

  if (lang === 'en') {
    return (
      <div className="home-page" style={{ fontFamily: 'Kanit, Prompt, Arial, sans-serif', background: '#f8fafc' }}>
        <style>{`
          .home-hero {
            background: url(/balance.webp) center/cover;
            min-height: 600px;
            color: #fff;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding: 60px 40px;
          }
          .home-hero-content {
            background: rgba(0,0,0,0.35);
            padding: 32px;
            border-radius: 16px;
            max-width: 540px;
          }
          .home-hero-title {
            font-weight: 700;
            font-size: 22px;
            margin-bottom: 8px;
          }
          .home-hero-h1 {
            font-size: 36px;
            font-weight: 800;
            margin: 0 0 16px 0;
            line-height: 1.1;
          }
          .home-hero-p {
            font-size: 18px;
            margin-bottom: 24px;
          }
          .home-hero-btns {
            display: flex;
            gap: 16px;
          }
          .home-hero-btn-primary {
            background: #1e88e5;
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 12px 28px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
          }
          .home-hero-btn-secondary {
            background: transparent;
            color: #fff;
            border: 2px solid #fff;
            border-radius: 8px;
            padding: 12px 28px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
          }
          .home-features-section {
            background: #f4fafd;
            padding: 48px 0 32px 0;
            text-align: center;
          }
          .home-features-title {
            font-weight: 700;
            font-size: 38px;
            margin-bottom: 8px;
            color: #333;
          }
          .home-features-desc {
            font-size: 18px;
            color: #6b7280;
            margin-bottom: 40px;
          }
          .feature-scroll-row {
            display: flex;
            gap: 36px;
            align-items: stretch;
            overflow-x: auto;
            overflow-y: visible;
            width: calc(3.5 * 350px + 3 * 36px);
            max-width: 100vw;
            margin: 0 auto;
            padding-bottom: 8px;
            padding-left: 0;
            padding-right: 40px;
            scroll-behavior: smooth;
            scrollbar-width: none;
            ms-overflow-style: none;
          }
          .feature-card, .get-started-card {
            border-radius: 24px;
            box-shadow: 0 4px 16px 0 rgba(30,136,229,0.08);
            padding: 36px 32px;
            min-width: 260px;
            max-width: 300px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            flex: 0 0 300px;
          }
          .get-started-card {
            background: #155e75;
            color: #fff;
            text-align: left;
            align-items: flex-start;
          }
          .feature-card {
            background: #d1f3fa;
            color: #155e75;
          }
          .feature-card-icon {
            font-size: 48px;
            margin-bottom: 18px;
            color: #155e75;
          }
          .feature-card-title {
            font-weight: 700;
            font-size: 20px;
            margin-bottom: 10px;
          }
          .feature-card-desc {
            font-size: 16px;
            margin-bottom: 24px;
          }
          .feature-card-btn {
            background: #fff;
            color: #155e75;
            border: 1px solid #b6e0f2;
            border-radius: 8px;
            padding: 10px 24px;
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
            box-shadow: 0 1px 4px rgba(30,136,229,0.06);
            margin-bottom: 12px;
          }
          .feature-arrows {
            display: flex;
            justify-content: flex-end;
            gap: 18px;
            margin-top: 36px;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
          }
          .feature-arrow-btn {
            background: #e0f2fe;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 22px;
            color: #155e75;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .therapy-section {
            padding: 40px 0 0 0;
          }
          .therapy-tabs {
            display: flex;
            gap: 18px;
            justify-content: center;
            margin-bottom: 32px;
          }
          .therapy-tab {
            background: #e0f2fe;
            color: #1976d2;
            border: none;
            border-radius: 8px;
            padding: 10px 24px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.2s, color 0.2s;
          }
          .therapy-tab.active {
            background: #1976d2;
            color: #fff;
          }
          .therapy-tab:hover {
            background: #b6e0f2;
          }
          .therapy-content {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 40px;
            flex-wrap: wrap;
          }
          .therapy-img {
            width: 260px;
            height: 260px;
            object-fit: cover;
            border-radius: 16px;
            box-shadow: 0 2px 12px rgba(30,136,229,0.10);
          }
          .therapy-details {
            text-align: left;
            max-width: 420px;
          }
          .therapy-title {
            font-weight: 700;
            font-size: 20px;
            margin-bottom: 12px;
          }
          .therapy-desc {
            color: #444;
            font-size: 15px;
            margin-bottom: 18px;
          }
          .therapy-exercises {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
          }
          .therapy-exercise-card {
            background: #e3f2fd;
            border-radius: 10px;
            padding: 16px;
            min-height: 90px;
          }
          .therapy-exercise-title {
            font-weight: 700;
            font-size: 16px;
            margin-bottom: 4px;
          }
          .therapy-exercise-desc {
            font-size: 14px;
            color: #333;
          }
          .therapy-btn {
            margin-top: 24px;
            background: #1976d2;
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 12px 28px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
          }
          .therapy-coming-soon {
            color: #888;
            font-size: 18px;
            margin-top: 40px;
          }
          @media (max-width: 1200px) {
            .feature-scroll-row {
              width: 100vw;
              padding-right: 0;
            }
            .therapy-content {
              gap: 20px;
            }
          }
          @media (max-width: 900px) {
            .home-hero {
              padding: 40px 10px;
              min-height: 400px;
            }
            .home-hero-content {
              padding: 18px;
              max-width: 100%;
            }
            .home-hero-h1 {
              font-size: 26px;
            }
            .home-features-title {
              font-size: 28px;
            }
            .therapy-content {
              flex-direction: column;
              align-items: center;
            }
            .therapy-details {
              max-width: 100%;
            }
          }
          @media (max-width: 600px) {
            .home-hero {
              padding: 18px 2vw;
              min-height: 220px;
            }
            .home-hero-content {
              padding: 8px;
            }
            .home-hero-title {
              font-size: 16px;
            }
            .home-hero-h1 {
              font-size: 18px;
            }
            .home-hero-p {
              font-size: 12px;
            }
            .home-hero-btn-primary, .home-hero-btn-secondary {
              font-size: 12px;
              padding: 8px 12px;
            }
            .home-features-title {
              font-size: 18px;
            }
            .home-features-desc {
              font-size: 12px;
            }
            .feature-card, .get-started-card {
              min-width: 180px;
              max-width: 220px;
              padding: 16px 8px;
            }
            .feature-card-icon {
              font-size: 28px;
            }
            .feature-card-title {
              font-size: 14px;
            }
            .feature-card-desc {
              font-size: 12px;
            }
            .feature-card-btn {
              font-size: 12px;
              padding: 6px 10px;
            }
            .feature-arrows {
              gap: 8px;
              margin-top: 16px;
            }
            .feature-arrow-btn {
              width: 28px;
              height: 28px;
              font-size: 14px;
            }
            .therapy-section {
              padding: 18px 0 0 0;
            }
            .therapy-tabs {
              gap: 8px;
              margin-bottom: 12px;
            }
            .therapy-tab {
              font-size: 12px;
              padding: 6px 10px;
            }
            .therapy-img {
              width: 120px;
              height: 120px;
            }
            .therapy-title {
              font-size: 14px;
            }
            .therapy-desc {
              font-size: 10px;
            }
            .therapy-exercises {
              grid-template-columns: 1fr;
              gap: 8px;
            }
            .therapy-exercise-title {
              font-size: 12px;
            }
            .therapy-exercise-desc {
              font-size: 10px;
            }
            .therapy-btn {
              font-size: 12px;
              padding: 8px 12px;
            }
            .therapy-coming-soon {
              font-size: 12px;
              margin-top: 18px;
            }
          }
        `}</style>
        {/* Hero Section */}
        <div className="home-hero">
          <div className="home-hero-content">
            <div className="home-hero-title">ReHabit</div>
            <h1 className="home-hero-h1">reHabilitaion For Better Life And Health</h1>
            <p className="home-hero-p">Welcome to ReHabit, your digital rehabilitation companion.</p>
            <div className="home-hero-btns">
              <button className="home-hero-btn-primary">Try Out ReHabit</button>
              <button className="home-hero-btn-secondary">Contact Us</button>
            </div>
          </div>
        </div>
        {/* Feature Section */}
        <div className="home-features-section">
          <h2 className="home-features-title">Our Features</h2>
          <div className="home-features-desc">Learn more about our platform</div>
          <div ref={featureRowRef} className="feature-scroll-row">
            {/* Get Started Card */}
            <div className="get-started-card">
              <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18, lineHeight: 1.2 }}>Get Started With Your Free Trial</div>
              <div style={{ fontSize: 16, marginBottom: 32, color: '#e0f2fe' }}>
                Start your recovery journey today.
              </div>
              <button style={{ background: '#fff', color: '#155e75', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px rgba(21,94,117,0.10)' }}>Get Started Today</button>
            </div>
            {/* Feature Cards */}
            {features.map((f, i) => (
              <div key={f.title} className="feature-card">
                <div className="feature-card-icon">{f.icon}</div>
                <div className="feature-card-title">{f.title}</div>
                <div className="feature-card-desc">{f.desc}</div>
                <button className="feature-card-btn">Learn More</button>
              </div>
            ))}
          </div>
          {/* Navigation Arrows */}
          <div className="feature-arrows">
            <button onClick={() => scrollFeatureRow(-1)} className="feature-arrow-btn">&#8592;</button>
            <button onClick={() => scrollFeatureRow(1)} className="feature-arrow-btn">&#8594;</button>
          </div>
        </div>
        {/* Therapy Section */}
        <div className="therapy-section">
          <div className="therapy-tabs">
            {therapyTabs.map(tab => (
              <button
                key={tab.key}
                className={`therapy-tab${selectedTab === tab.key ? ' active' : ''}`}
                onClick={() => setSelectedTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="therapy-content">
            {selectedTab === 'office' && (
              <>
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
                  alt="Neck Stretch"
                  className="therapy-img"
                />
                <div className="therapy-details">
                  <div className="therapy-title">Office Syndrome</div>
                  <div className="therapy-desc">Simple exercises to relieve neck, shoulder, and back pain.</div>
                  <div className="therapy-exercises">
                    {officeSyndromeExercises.map((ex, idx) => (
                      <div key={ex.title} className="therapy-exercise-card">
                        <div className="therapy-exercise-title">{idx + 1}. {ex.title}</div>
                        <div className="therapy-exercise-desc">{ex.desc}</div>
                      </div>
                    ))}
                  </div>
                  <button className="therapy-btn">Try Out ReHabit</button>
                </div>
              </>
            )}
            {selectedTab !== 'office' && (
              <div className="therapy-coming-soon">Content Coming Soon</div>
            )}
          </div>
        </div>
        {/* Add a <div style={{ marginBottom: 32 }} /> after the last main section (after the therapy section, before the end of the main container) */}
        <div style={{ marginBottom: 32 }} />
      </div>
    );
  } else {
    return (
      <div className="home-page" style={{ fontFamily: 'Kanit, Prompt, Arial, sans-serif', background: '#f8fafc' }}>
        <style>{`
          .home-hero {
            background: url(/balance.webp) center/cover;
            min-height: 600px;
            color: #fff;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding: 60px 40px;
          }
          .home-hero-content {
            background: rgba(0,0,0,0.35);
            padding: 32px;
            border-radius: 16px;
            max-width: 540px;
          }
          .home-hero-title {
            font-weight: 700;
            font-size: 22px;
            margin-bottom: 8px;
          }
          .home-hero-h1 {
            font-size: 36px;
            font-weight: 800;
            margin: 0 0 16px 0;
            line-height: 1.1;
          }
          .home-hero-p {
            font-size: 18px;
            margin-bottom: 24px;
          }
          .home-hero-btns {
            display: flex;
            gap: 16px;
          }
          .home-hero-btn-primary {
            background: #1e88e5;
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 12px 28px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
          }
          .home-hero-btn-secondary {
            background: transparent;
            color: #fff;
            border: 2px solid #fff;
            border-radius: 8px;
            padding: 12px 28px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
          }
          .home-features-section {
            background: #f4fafd;
            padding: 48px 0 32px 0;
            text-align: center;
          }
          .home-features-title {
            font-weight: 700;
            font-size: 38px;
            margin-bottom: 8px;
            color: #333;
          }
          .home-features-desc {
            font-size: 18px;
            color: #6b7280;
            margin-bottom: 40px;
          }
          .feature-scroll-row {
            display: flex;
            gap: 36px;
            align-items: stretch;
            overflow-x: auto;
            overflow-y: visible;
            width: calc(3.5 * 350px + 3 * 36px);
            max-width: 100vw;
            margin: 0 auto;
            padding-bottom: 8px;
            padding-left: 0;
            padding-right: 40px;
            scroll-behavior: smooth;
            scrollbar-width: none;
            ms-overflow-style: none;
          }
          .feature-card, .get-started-card {
            border-radius: 24px;
            box-shadow: 0 4px 16px 0 rgba(30,136,229,0.08);
            padding: 36px 32px;
            min-width: 260px;
            max-width: 300px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            flex: 0 0 300px;
          }
          .get-started-card {
            background: #155e75;
            color: #fff;
            text-align: left;
            align-items: flex-start;
          }
          .feature-card {
            background: #d1f3fa;
            color: #155e75;
          }
          .feature-card-icon {
            font-size: 48px;
            margin-bottom: 18px;
            color: #155e75;
          }
          .feature-card-title {
            font-weight: 700;
            font-size: 20px;
            margin-bottom: 10px;
          }
          .feature-card-desc {
            font-size: 16px;
            margin-bottom: 24px;
          }
          .feature-card-btn {
            background: #fff;
            color: #155e75;
            border: 1px solid #b6e0f2;
            border-radius: 8px;
            padding: 10px 24px;
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
            box-shadow: 0 1px 4px rgba(30,136,229,0.06);
            margin-bottom: 12px;
          }
          .feature-arrows {
            display: flex;
            justify-content: flex-end;
            gap: 18px;
            margin-top: 36px;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
          }
          .feature-arrow-btn {
            background: #e0f2fe;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 22px;
            color: #155e75;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .therapy-section {
            padding: 40px 0 0 0;
          }
          .therapy-tabs {
            display: flex;
            gap: 18px;
            justify-content: center;
            margin-bottom: 32px;
          }
          .therapy-tab {
            background: #e0f2fe;
            color: #1976d2;
            border: none;
            border-radius: 8px;
            padding: 10px 24px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.2s, color 0.2s;
          }
          .therapy-tab.active {
            background: #1976d2;
            color: #fff;
          }
          .therapy-tab:hover {
            background: #b6e0f2;
          }
          .therapy-content {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 40px;
            flex-wrap: wrap;
          }
          .therapy-img {
            width: 260px;
            height: 260px;
            object-fit: cover;
            border-radius: 16px;
            box-shadow: 0 2px 12px rgba(30,136,229,0.10);
          }
          .therapy-details {
            text-align: left;
            max-width: 420px;
          }
          .therapy-title {
            font-weight: 700;
            font-size: 20px;
            margin-bottom: 12px;
          }
          .therapy-desc {
            color: #444;
            font-size: 15px;
            margin-bottom: 18px;
          }
          .therapy-exercises {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
          }
          .therapy-exercise-card {
            background: #e3f2fd;
            border-radius: 10px;
            padding: 16px;
            min-height: 90px;
          }
          .therapy-exercise-title {
            font-weight: 700;
            font-size: 16px;
            margin-bottom: 4px;
          }
          .therapy-exercise-desc {
            font-size: 14px;
            color: #333;
          }
          .therapy-btn {
            margin-top: 24px;
            background: #1976d2;
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 12px 28px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
          }
          .therapy-coming-soon {
            color: #888;
            font-size: 18px;
            margin-top: 40px;
          }
          @media (max-width: 1200px) {
            .feature-scroll-row {
              width: 100vw;
              padding-right: 0;
            }
            .therapy-content {
              gap: 20px;
            }
          }
          @media (max-width: 900px) {
            .home-hero {
              padding: 40px 10px;
              min-height: 400px;
            }
            .home-hero-content {
              padding: 18px;
              max-width: 100%;
            }
            .home-hero-h1 {
              font-size: 26px;
            }
            .home-features-title {
              font-size: 28px;
            }
            .therapy-content {
              flex-direction: column;
              align-items: center;
            }
            .therapy-details {
              max-width: 100%;
            }
          }
          @media (max-width: 600px) {
            .home-hero {
              padding: 18px 2vw;
              min-height: 220px;
            }
            .home-hero-content {
              padding: 8px;
            }
            .home-hero-title {
              font-size: 16px;
            }
            .home-hero-h1 {
              font-size: 18px;
            }
            .home-hero-p {
              font-size: 12px;
            }
            .home-hero-btn-primary, .home-hero-btn-secondary {
              font-size: 12px;
              padding: 8px 12px;
            }
            .home-features-title {
              font-size: 18px;
            }
            .home-features-desc {
              font-size: 12px;
            }
            .feature-card, .get-started-card {
              min-width: 180px;
              max-width: 220px;
              padding: 16px 8px;
            }
            .feature-card-icon {
              font-size: 28px;
            }
            .feature-card-title {
              font-size: 14px;
            }
            .feature-card-desc {
              font-size: 12px;
            }
            .feature-card-btn {
              font-size: 12px;
              padding: 6px 10px;
            }
            .feature-arrows {
              gap: 8px;
              margin-top: 16px;
            }
            .feature-arrow-btn {
              width: 28px;
              height: 28px;
              font-size: 14px;
            }
            .therapy-section {
              padding: 18px 0 0 0;
            }
            .therapy-tabs {
              gap: 8px;
              margin-bottom: 12px;
            }
            .therapy-tab {
              font-size: 12px;
              padding: 6px 10px;
            }
            .therapy-img {
              width: 120px;
              height: 120px;
            }
            .therapy-title {
              font-size: 14px;
            }
            .therapy-desc {
              font-size: 10px;
            }
            .therapy-exercises {
              grid-template-columns: 1fr;
              gap: 8px;
            }
            .therapy-exercise-title {
              font-size: 12px;
            }
            .therapy-exercise-desc {
              font-size: 10px;
            }
            .therapy-btn {
              font-size: 12px;
              padding: 8px 12px;
            }
            .therapy-coming-soon {
              font-size: 12px;
              margin-top: 18px;
            }
          }
        `}</style>
        {/* Hero Section */}
        <div className="home-hero">
          <div className="home-hero-content">
            <div className="home-hero-title">ReHabit</div>
            <h1 className="home-hero-h1">ยินดีต้อนรับสู่ ReHabit</h1>
            <p className="home-hero-p">เพื่อนคู่ใจด้านการฟื้นฟูสุขภาพของคุณ</p>
            <div className="home-hero-btns">
              <button className="home-hero-btn-primary">ทดลองใช้ ReHabit</button>
              <button className="home-hero-btn-secondary">ติดต่อเรา</button>
            </div>
          </div>
        </div>
        {/* Feature Section */}
        <div className="home-features-section">
          <h2 className="home-features-title">ฟีเจอร์ของเรา</h2>
          <div className="home-features-desc">เรียนรู้เพิ่มเติมเกี่ยวกับแพลตฟอร์มของเรา</div>
          <div ref={featureRowRef} className="feature-scroll-row">
            {/* Get Started Card */}
            <div className="get-started-card">
              <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18, lineHeight: 1.2 }}>เริ่มต้นทดลองใช้ฟรี</div>
              <div style={{ fontSize: 16, marginBottom: 32, color: '#e0f2fe' }}>
                เริ่มต้นเส้นทางฟื้นฟูสุขภาพของคุณวันนี้
              </div>
              <button style={{ background: '#fff', color: '#155e75', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px rgba(21,94,117,0.10)' }}>เริ่มต้นวันนี้</button>
            </div>
            {/* Feature Cards */}
            {(lang === 'th' ? featuresTH : features).map((f, i) => (
              <div key={f.title} className="feature-card">
                <div className="feature-card-icon">{f.icon}</div>
                <div className="feature-card-title">{f.title}</div>
                <div className="feature-card-desc">{f.desc}</div>
                <button className="feature-card-btn">{lang === 'th' ? 'ดูรายละเอียด' : 'Learn More'}</button>
              </div>
            ))}
          </div>
          {/* Navigation Arrows */}
          <div className="feature-arrows">
            <button onClick={() => scrollFeatureRow(-1)} className="feature-arrow-btn">&#8592;</button>
            <button onClick={() => scrollFeatureRow(1)} className="feature-arrow-btn">&#8594;</button>
          </div>
        </div>
        {/* Therapy Section */}
        <div className="therapy-section">
          <div className="therapy-tabs">
            {(lang === 'th' ? therapyTabsTH : therapyTabs).map(tab => (
              <button
                key={tab.key}
                className={`therapy-tab${selectedTab === tab.key ? ' active' : ''}`}
                onClick={() => setSelectedTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="therapy-content">
            {selectedTab === 'office' && (
              <>
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
                  alt="Neck Stretch"
                  className="therapy-img"
                />
                <div className="therapy-details">
                  <div className="therapy-title">{lang === 'th' ? 'ออฟฟิศซินโดรม' : 'Office Syndrome'}</div>
                  <div className="therapy-desc">{lang === 'th' ? 'ท่าง่ายๆ เพื่อบรรเทาอาการปวดคอ ไหล่ และหลัง' : 'Simple exercises to relieve neck, shoulder, and back pain.'}</div>
                  <div className="therapy-exercises">
                    {(lang === 'th' ? officeSyndromeExercisesTH : officeSyndromeExercises).map((ex, idx) => (
                      <div key={ex.title} className="therapy-exercise-card">
                        <div className="therapy-exercise-title">{idx + 1}. {ex.title}</div>
                        <div className="therapy-exercise-desc">{ex.desc}</div>
                      </div>
                    ))}
                  </div>
                  <button className="therapy-btn" style={{ marginBottom: 32 }}>{lang === 'th' ? 'ทดลองใช้ ReHabit' : 'Try Out ReHabit'}</button>
                </div>
              </>
            )}
            {selectedTab !== 'office' && (
              <div className="therapy-coming-soon">{lang === 'th' ? 'เนื้อหาเร็วๆ นี้' : 'Content Coming Soon'}</div>
            )}
          </div>
        </div>
        {/* Add a <div style={{ marginBottom: 32 }} /> after the last main section (after the therapy section, before the end of the main container) */}
        <div style={{ marginBottom: 0}} />
      </div>
    );
  }
};

export default Home;
