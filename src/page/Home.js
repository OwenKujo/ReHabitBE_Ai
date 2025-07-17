import React, { useState, useRef } from 'react';

// Add Google Fonts import for Kanit and Prompt
if (typeof document !== 'undefined' && !document.getElementById('kanit-prompt-font')) {
  const link = document.createElement('link');
  link.id = 'kanit-prompt-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Kanit:wght@400;700&family=Prompt:wght@400;700&display=swap';
  document.head.appendChild(link);
}

const features = [
  {
    title: 'Video Preview',
    desc: 'See yourself in real time and follow along with guided exercises.',
    icon: '🎥',
  },
  {
    title: 'AI Detection',
    desc: 'AI-powered posture and movement analysis for better results.',
    icon: '🤖',
  },
  {
    title: 'Track Improvement',
    desc: 'Monitor your progress and stay motivated with session tracking.',
    icon: '📈',
  },
];

const therapyTabs = [
  { label: 'Office Syndrome', key: 'office' },
  { label: 'Low Back Pain', key: 'back' },
  { label: 'Cervicogenic Headache', key: 'headache' },
  { label: 'Herniated Disc', key: 'disc' },
];

const officeSyndromeExercises = [
  {
    title: 'Neck Sidebend Stretching',
    desc: 'Gently tilt your head to the side, bringing your ear toward your shoulder. Hold for 15-30 seconds each side.'
  },
  {
    title: 'Upper Trapezius Stretching',
    desc: 'Sit or stand tall, grasp the side of your head and gently pull toward your shoulder. Hold and repeat.'
  },
  {
    title: 'Neck Shoulder & Chest Stretch',
    desc: 'Interlace your fingers behind your back, straighten your arms, and lift your chest. Hold for 15-30 seconds.'
  },
  {
    title: 'Scapular and Lower Back Stretch',
    desc: 'Cross your arms in front, round your upper back, and gently push your hands forward. Hold and repeat.'
  },
];

const Home = () => {
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

  return (
    <div style={{ fontFamily: 'Kanit, Prompt, Arial, sans-serif', background: '#f8fafc' }}>
      {/* Hero Section */}
      <div style={{
        background: 'url(/balance.webp) center/cover',
        minHeight: 600,
        color: '#fff',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '60px 40px',
      }}>
        <div style={{ background: 'rgba(0,0,0,0.35)', padding: 32, borderRadius: 16, maxWidth: 540 }}>
          <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>ReHabit</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px 0', lineHeight: 1.1 }}>
            REHABILITATION FOR<br />BETTER LIFE AND HEALTH
          </h1>
          <p style={{ fontSize: 18, marginBottom: 24 }}>
            Welcome to ReHabit! Improve your posture, flexibility, and health with AI-powered physical therapy you can do at home. Start your journey to a pain-free life today.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            <button style={{ background: '#1e88e5', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Try out ReHabit</button>
            <button style={{ background: 'transparent', color: '#fff', border: '2px solid #fff', borderRadius: 8, padding: '12px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Contact Us</button>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div style={{ background: '#f4fafd', padding: '48px 0 32px 0', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 700, fontSize: 38, marginBottom: 8, color: '#333' }}>Our Feature</h2>
        <div style={{ fontSize: 18, color: '#6b7280', marginBottom: 40 }}>Sub heading to explain more</div>
        <div
          ref={featureRowRef}
          style={{
            display: 'flex',
            gap: 36,
            alignItems: 'stretch',
            overflowX: 'auto',
            overflowY: 'visible',
            width: 'calc(3.5 * 350px + 3 * 36px)', // 3 full cards + 3 gaps + part of 4th
            maxWidth: '100vw',
            margin: '0 auto',
            paddingBottom: 8,
            paddingLeft: 0,
            paddingRight: 40,
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
          }}
          className="feature-scroll-row"
        >
          {/* Get Started Card */}
          <div style={{
            background: '#155e75',
            color: '#fff',
            borderRadius: 24,
            boxShadow: '0 12px 32px 0 rgba(21,94,117,0.18)',
            padding: '36px 32px',
            minWidth: 280,
            maxWidth: 320,
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flex: '0 0 300px',
          }}>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18, lineHeight: 1.2 }}>Get Started With<br />Your Free Trial</div>
            <div style={{ fontSize: 16, marginBottom: 32, color: '#e0f2fe' }}>
              Start your recovery journey with a free session on ReHabit. Explore personalized rehab plans, connect with certified physical therapists, and experience the benefits of guided at-home therapy today.
            </div>
            <button style={{ background: '#fff', color: '#155e75', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px rgba(21,94,117,0.10)' }}>GetStarted Today</button>
          </div>
          {/* Feature Cards */}
          {features.map((f, i) => (
            <div key={f.title} style={{
              background: '#d1f3fa',
              borderRadius: 24,
              boxShadow: '0 4px 16px 0 rgba(30,136,229,0.08)',
              padding: '36px 32px',
              minWidth: 260,
              maxWidth: 300,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: '0 0 300px',
            }}>
              <div style={{ fontSize: 48, marginBottom: 18, color: '#155e75' }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 10, color: '#155e75' }}>{f.title}</div>
              <div style={{ fontSize: 16, color: '#155e75', marginBottom: 24 }}>{f.desc}</div>
              <button style={{ background: '#fff', color: '#155e75', border: '1px solid #b6e0f2', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 1px 4px rgba(30,136,229,0.06)' }}>Learn More</button>
            </div>
          ))}
        </div>
        {/* Navigation Arrows */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 18, marginTop: 36, maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}>
           <button onClick={() => scrollFeatureRow(-1)} style={{ background: '#e0f2fe', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: 22, color: '#155e75', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             &#8592;
           </button>
           <button onClick={() => scrollFeatureRow(1)} style={{ background: '#e0f2fe', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: 22, color: '#155e75', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             &#8594;
           </button>
          </div>
      </div>

      {/* Physical Therapy Section */}
      <div style={{ background: '#fff', padding: '48px 0', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 24 }}>Physical Therapy</h2>
        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
          {therapyTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              style={{
                background: selectedTab === tab.key ? '#1976d2' : '#e3f2fd',
                color: selectedTab === tab.key ? '#fff' : '#1976d2',
                border: 'none',
                borderRadius: 8,
                padding: '10px 22px',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                boxShadow: selectedTab === tab.key ? '0 2px 8px rgba(30,136,229,0.12)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Content for Office Syndrome */}
        {selectedTab === 'office' && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 40, flexWrap: 'wrap' }}>
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
              alt="Neck Stretch"
              style={{ width: 260, height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 2px 12px rgba(30,136,229,0.10)' }}
            />
            <div style={{ textAlign: 'left', maxWidth: 420 }}>
              <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Office Syndrome</div>
              <div style={{ color: '#444', fontSize: 15, marginBottom: 18 }}>
                Simple exercises to relieve neck, shoulder, and back pain from long hours at the desk.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                {officeSyndromeExercises.map((ex, idx) => (
                  <div key={ex.title} style={{ background: '#e3f2fd', borderRadius: 10, padding: 16, minHeight: 90 }}>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{idx + 1}. {ex.title}</div>
                    <div style={{ fontSize: 14, color: '#333' }}>{ex.desc}</div>
                  </div>
                ))}
              </div>
              <button style={{ marginTop: 24, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Try out ReHabit</button>
            </div>
          </div>
        )}
        {/* Placeholder for other tabs */}
        {selectedTab !== 'office' && (
          <div style={{ color: '#888', fontSize: 18, marginTop: 40 }}>
            Content coming soon...
          </div>
        )}
      </div>

    </div>
  );
};

export default Home;
