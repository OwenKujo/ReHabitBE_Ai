import React from 'react';

const menuItems = [
  { label: 'Suggestion', active: true },
  { label: 'Office Syndrome' },
  { label: 'Back pain' },
  { label: 'All course' },
];

const suggestions = [
  {
    img: 'https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&w=400&h=250&fit=crop',
    title: 'Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution',
    desc: 'Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...'
  },
  {
    img: 'https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&w=400&h=250&fit=crop',
    title: 'Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution',
    desc: 'Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...'
  },
  {
    img: 'https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&w=400&h=250&fit=crop',
    title: 'Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution',
    desc: 'Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...'
  },
];

const PhysicalTherapyMenu = () => {
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
        <div style={{ width: '80%', marginBottom: 32 }}>
          <input
            type="text"
            placeholder="Search here"
            style={{
              width: '100%',
              padding: '12px 16px',
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
                <button style={{ alignSelf: 'flex-end', background: '#19c2d2', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 24px', fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 1px 4px rgba(30,136,229,0.06)' }}>View</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PhysicalTherapyMenu; 