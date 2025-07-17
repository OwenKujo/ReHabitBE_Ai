import React, { useState } from 'react';
import { PlayCircle, ChevronDown, List, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../App';

function OfficeSyndromePage() {
  const navigate = useNavigate();
  const [openMovement, setOpenMovement] = useState(null);
  const movements = [
    { id: 1, name: 'Neck Extension', duration: '2 min' },
    { id: 2, name: 'Chest Out Posture', duration: '2 min' },
    { id: 3, name: 'Right Wing Stretch', duration: '2 min' },
    { id: 4, name: 'Left Shoulder Press', duration: '2 min' },
  ];
  const { lang } = useLang();

  if (lang === 'en') {
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
          @media (max-width: 1200px) {
            .header-image {
              height: 320px;
            }
            .section {
              padding: 36px 10px 10px;
            }
          }
          @media (max-width: 900px) {
            .header-image {
              height: 180px;
            }
            .overlay {
              padding-left: 10px;
              padding-top: 10px;
            }
            .info-box {
              left: 10px;
              gap: 8px;
            }
            .section {
              padding: 18px 2vw 10px;
            }
            .detail-container {
              flex-direction: column;
              gap: 10px;
              padding: 10px;
            }
          }
          @media (max-width: 600px) {
            .header-image {
              height: 90px;
            }
            .overlay h1 {
              font-size: 18px;
              margin-top: 24px;
            }
            .start-button {
              font-size: 12px;
              padding: 8px 16px;
              margin-top: 12px;
            }
            .info-card {
              padding: 6px 10px;
              font-size: 10px;
            }
            .section h2 {
              font-size: 14px;
            }
            .video-text h3 {
              font-size: 12px;
            }
            .video-text p {
              font-size: 10px;
            }
            .movement-item {
              font-size: 12px;
              padding: 6px 0;
            }
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
            <button className="start-button" onClick={() => navigate('/officesyndromerehab')}>▶ Start</button>
          </div>

          {/* Summary cards */}
          <div className="info-box">
            <div className="info-card" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <List size={20} style={{ color: '#1976d2' }} />
              4 movements
            </div>
            <div className="info-card" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={20} style={{ color: '#1976d2' }} />
              8 minutes
            </div>
          </div>
        </div>

        {/* Detail Section */}
        <div className="section">
          <h2>Details</h2>
          <div className="detail-container">
            <div className="preview-video">
              <img src="/neck-stretch-preview.jpg" alt="Preview" />
              <div className="play-icon">
                <PlayCircle size={64} />
              </div>
            </div>
            <div className="video-text">
              <h3>Preview Video Details</h3>
              <p>
                • Neck and shoulder stretching exercises to relieve tension.<br />
                • Proper sitting posture techniques to reduce neck strain.<br />
                • Upper back muscle strengthening routines.<br />
                • Shoulder and scapular relaxation methods.<br />
                • Tips for eye rest and changing work positions regularly.<br />
                <strong>By: Dr. Pingpong Suksomboon</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Movement List Section */}
        <div className="section">
          <h2>Movement List</h2>
          <div className="movement-box">
            {movements.map((move) => (
              <div key={move.id}>
                <div
                  className="movement-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setOpenMovement(openMovement === move.id ? null : move.id)}
                >
                  <div className="movement-name">
                    {move.id}. {move.name}
                  </div>
                  <div className="movement-right">
                    <span>{move.duration}</span>
                    <ChevronDown
                      size={16}
                      style={{
                        transform: openMovement === move.id ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                      }}
                    />
                  </div>
                </div>
                {openMovement === move.id && (
                  <div style={{
                    background: '#f6fbff',
                    borderRadius: '8px',
                    margin: '8px 0 8px 0',
                    padding: '16px 24px',
                    color: '#333',
                    fontSize: '15px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                  }}>
                    <strong>Movement details coming soon</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
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
          @media (max-width: 1200px) {
            .header-image {
              height: 320px;
            }
            .section {
              padding: 36px 10px 10px;
            }
          }
          @media (max-width: 900px) {
            .header-image {
              height: 180px;
            }
            .overlay {
              padding-left: 10px;
              padding-top: 10px;
            }
            .info-box {
              left: 10px;
              gap: 8px;
            }
            .section {
              padding: 18px 2vw 10px;
            }
            .detail-container {
              flex-direction: column;
              gap: 10px;
              padding: 10px;
            }
          }
          @media (max-width: 600px) {
            .header-image {
              height: 90px;
            }
            .overlay h1 {
              font-size: 18px;
              margin-top: 24px;
            }
            .start-button {
              font-size: 12px;
              padding: 8px 16px;
              margin-top: 12px;
            }
            .info-card {
              padding: 6px 10px;
              font-size: 10px;
            }
            .section h2 {
              font-size: 14px;
            }
            .video-text h3 {
              font-size: 12px;
            }
            .video-text p {
              font-size: 10px;
            }
            .movement-item {
              font-size: 12px;
              padding: 6px 0;
            }
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
            <button className="start-button" onClick={() => navigate('/officesyndromerehab')}>▶ Start</button>
          </div>

          {/* Summary cards */}
          <div className="info-box">
            <div className="info-card" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <List size={20} style={{ color: '#1976d2' }} />
              4 movements
            </div>
            <div className="info-card" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={20} style={{ color: '#1976d2' }} />
              8 minutes
            </div>
          </div>
        </div>

        {/* Detail Section */}
        <div className="section">
          <h2>Details</h2>
          <div className="detail-container">
            <div className="preview-video">
              <img src="/neck-stretch-preview.jpg" alt="Preview" />
              <div className="play-icon">
                <PlayCircle size={64} />
              </div>
            </div>
            <div className="video-text">
              <h3>Preview Video Details</h3>
              <p>
                • Neck and shoulder stretching exercises to relieve tension.<br />
                • Proper sitting posture techniques to reduce neck strain.<br />
                • Upper back muscle strengthening routines.<br />
                • Shoulder and scapular relaxation methods.<br />
                • Tips for eye rest and changing work positions regularly.<br />
                <strong>By: Dr. Pingpong Suksomboon</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Movement List Section */}
        <div className="section">
          <h2>Movement List</h2>
          <div className="movement-box">
            {movements.map((move) => (
              <div key={move.id}>
                <div
                  className="movement-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setOpenMovement(openMovement === move.id ? null : move.id)}
                >
                  <div className="movement-name">
                    {move.id}. {move.name}
                  </div>
                  <div className="movement-right">
                    <span>{move.duration}</span>
                    <ChevronDown
                      size={16}
                      style={{
                        transform: openMovement === move.id ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                      }}
                    />
                  </div>
                </div>
                {openMovement === move.id && (
                  <div style={{
                    background: '#f6fbff',
                    borderRadius: '8px',
                    margin: '8px 0 8px 0',
                    padding: '16px 24px',
                    color: '#333',
                    fontSize: '15px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                  }}>
                    <strong>Movement details coming soon</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default OfficeSyndromePage;
