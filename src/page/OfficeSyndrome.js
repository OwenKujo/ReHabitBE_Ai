import React from 'react';
import { PlayCircle, ChevronDown, List, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function OfficeSyndromePage() {
  const navigate = useNavigate();
  const movements = [
    { id: 1, name: 'เงยหน้าแหงนไฝ่', duration: '2 min' },
    { id: 2, name: 'ทรงตัวทรวงอกยื่น', duration: '2 min' },
    { id: 3, name: 'หักปีกไก่ขวา', duration: '2 min' },
    { id: 4, name: 'กดบ่าซ้าย', duration: '2 min' },
  ];

  return (
    <div className="page">
      <style>{`
        .page {
          font-family: 'Kanit', 'Prompt';
          background-color: #eaf6fd;
          min-height: 100vh;
          margin: 0;
          padding: 0;
        }

        .header {
          position: relative;
        }

        .header-image {
          width: 100%;
          height: 450px;
          object-fit: cover;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          padding-left: 40px;
          padding-top: 24px;
          color: white;
        }

        .start-button {
          background-color: #14b8a6;
          color: white;
          border: none;
          padding: 16px 36px;
          font-size: 1.25rem;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 32px;
          letter-spacing: 0.5px;
        }

        .info-box {
          position: absolute;
          bottom: -30px;
          left: 40px;
          display: flex;
          gap: 16px;
        }

        .info-card {
          background: white;
          padding: 12px 24px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          font-weight: bold;
        }

        .section {
          padding: 60px 40px 20px;
        }

        .section h2 {
          color: #003d6a;
          margin-bottom: 16px;
        }

        .detail-container {
          display: flex;
          flex-wrap: wrap;
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          gap: 24px;
        }

        .preview-video {
          flex: 1;
          min-width: 280px;
          max-width: 500px;
          position: relative;
        }

        .preview-video img {
          width: 100%;
          border-radius: 10px;
        }

        .play-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
        }

        .video-text {
          flex: 1;
          min-width: 280px;
        }

        .video-text h3 {
          color: #0077b6;
          margin-bottom: 10px;
        }

        .video-text p {
          font-size: 14px;
          color: #444;
          line-height: 1.6;
        }

        .movement-box {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .movement-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #ddd;
        }

        .movement-item:last-child {
          border-bottom: none;
        }

        .movement-name {
          color: #003d6a;
          font-weight: 500;
        }

        .movement-right {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #555;
        }
      `}</style>

      {/* Header Section */}
      <div className="header">
        <img
          src="/office-syndrome-header.jpg" // แก้ path ให้ตรงกับภาพจริง
          alt="Office Syndrome"
          className="header-image"
        />
        <div className="overlay">
          <a href="#" style={{ textDecoration: 'underline', color: 'white', fontSize: '1.15rem', fontWeight: 700, alignSelf: 'flex-start', marginBottom: 24, letterSpacing: 0.5 }}>
            ← Go Back
          </a>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginTop: 80 }}>Office Syndrome</h1>
          <button className="start-button" onClick={() => navigate('/officesyndromerehab')}>▶ Start</button>
        </div>

        {/* Summary cards */}
        <div className="info-box">
          <div className="info-card" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <List size={20} style={{ color: '#1976d2' }} />
            5 movements
          </div>
          <div className="info-card" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={20} style={{ color: '#1976d2' }} />
            7 minutes
          </div>
        </div>
      </div>

      {/* Detail Section */}
      <div className="section">
        <h2>Detail</h2>
        <div className="detail-container">
          <div className="preview-video">
            <img src="/neck-stretch-preview.jpg" alt="Preview" />
            <div className="play-icon">
              <PlayCircle size={64} />
            </div>
          </div>
          <div className="video-text">
            <h3>Detail preview video</h3>
            <p>
              detail ที่1 .....................................................<br />
              detail ที่2 .....................................................<br />
              detail ที่3 .....................................................<br />
              detail ที่4 .....................................................<br />
              detail ที่5 .....................................................<br />
              <strong>แพทย์ชื่อปิงปอง</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Movement List Section */}
      <div className="section">
        <h2>Movement List</h2>
        <div className="movement-box">
          {movements.map((move) => (
            <div className="movement-item" key={move.id}>
              <div className="movement-name">
                {move.id}. {move.name}
              </div>
              <div className="movement-right">
                <span>{move.duration}</span>
                <ChevronDown size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OfficeSyndromePage;
