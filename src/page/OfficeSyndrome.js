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
          
          @media (max-width: 768px) {
            .header-image {
              height: 300px;
            }
          }
          
          @media (max-width: 480px) {
            .header-image {
              height: 250px;
            }
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
          
          @media (max-width: 768px) {
            .overlay {
              padding-left: 20px;
              padding-top: 16px;
            }
          }
          
          @media (max-width: 480px) {
            .overlay {
              padding-left: 16px;
              padding-top: 12px;
              align-items: center;
              text-align: center;
            }
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
          
          @media (max-width: 768px) {
            .start-button {
              padding: 12px 24px;
              font-size: 1rem;
              margin-top: 24px;
            }
          }
          
          @media (max-width: 480px) {
            .start-button {
              padding: 10px 20px;
              font-size: 0.875rem;
              margin-top: 16px;
            }
          }
          .info-box {
            position: absolute;
            bottom: -30px;
            left: 40px;
            display: flex;
            gap: 16px;
          }
          
          @media (max-width: 480px) {
            .info-box {
              position: relative;
              bottom: auto;
              left: auto;
              margin-top: 16px;
              justify-content: center;
              gap: 12px;
            }
          }
          
          .info-card {
            background: white;
            padding: 12px 24px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            font-weight: bold;
          }
          
          @media (max-width: 480px) {
            .info-card {
              padding: 8px 12px;
              font-size: 12px;
            }
          }
          
          .section {
            padding: 60px 40px 20px;
          }
          
          @media (max-width: 480px) {
            .section {
              padding: 24px 16px 16px;
            }
          }
          
          .section h2 {
            color: #003d6a;
            margin-bottom: 16px;
          }
          
          @media (max-width: 480px) {
            .section h2 {
              font-size: 18px;
              text-align: center;
            }
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
          
          @media (max-width: 480px) {
            .detail-container {
              flex-direction: column;
              gap: 16px;
              padding: 16px;
            }
          }
          
          .preview-video {
            flex: 1;
            min-width: 280px;
            max-width: 500px;
            position: relative;
          }
          
          @media (max-width: 480px) {
            .preview-video {
              min-width: auto;
              max-width: 100%;
            }
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
          
          @media (max-width: 480px) {
            .video-text {
              min-width: auto;
              text-align: center;
            }
          }
          
          .video-text h3 {
            color: #0077b6;
            margin-bottom: 10px;
          }
          
          @media (max-width: 480px) {
            .video-text h3 {
              font-size: 16px;
            }
          }
          
          .video-text p {
            font-size: 14px;
            color: #444;
            line-height: 1.6;
          }
          
          @media (max-width: 480px) {
            .video-text p {
              font-size: 14px;
            }
          }
          
          .movement-box {
            background: white;
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          
          @media (max-width: 480px) {
            .movement-box {
              padding: 16px;
            }
          }
          
          .movement-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #ddd;
          }
          
          @media (max-width: 480px) {
            .movement-item {
              font-size: 14px;
              padding: 12px 0;
            }
          }
          
          .movement-item:last-child {
            border-bottom: none;
          }
          .movement-name {
            color: #003d6a;
            font-weight: 500;
          }
          
          @media (max-width: 480px) {
            .movement-name {
              font-size: 14px;
            }
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
        `}</style>

        {/* Header Section */}
        <div className="header">
          <img
            src="/office-syndrome-header.jpg"
            alt="Office Syndrome"
            className="header-image"
          />
          <div className="overlay">
            <a href="/PhysicalMenu" style={{ textDecoration: 'underline', color: 'white', fontSize: '1.15rem', fontWeight: 700, alignSelf: 'flex-start', marginBottom: 24, letterSpacing: 0.5 }}>
              ← Go Back
            </a>
            <h1 style={{ 
              fontSize: window.innerWidth <= 480 ? '24px' : '36px', 
              fontWeight: 'bold', 
              marginTop: window.innerWidth <= 480 ? 16 : 80,
              textAlign: window.innerWidth <= 480 ? 'center' : 'left'
            }}>Office Syndrome</h1>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="start-button" onClick={() => navigate('/officesyndromerehab')}>▶ Start</button>
              <button 
                style={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  padding: '16px 24px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginTop: '32px',
                  letterSpacing: '0.5px'
                }}
                onClick={() => navigate('/rehab-record')}
              >
                📊 View Records
              </button>
            </div>
          </div>

          {/* Summary cards */}
          <div className="info-box">
            <div className="info-card" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <List size={window.innerWidth <= 480 ? 16 : 20} style={{ color: '#1976d2' }} />
              <span style={{ fontSize: window.innerWidth <= 480 ? '12px' : 'inherit' }}>4 movements</span>
            </div>
            <div className="info-card" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={window.innerWidth <= 480 ? 16 : 20} style={{ color: '#1976d2' }} />
              <span style={{ fontSize: window.innerWidth <= 480 ? '12px' : 'inherit' }}>8 minutes</span>
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
              height: 200px;
            }
            .overlay {
              align-items: center;
              text-align: center;
            }
            .overlay h1 {
              font-size: 24px;
              margin-top: 16px;
            }
            .start-button {
              font-size: 14px;
              padding: 12px 20px;
              margin-top: 16px;
            }
            .info-box {
              position: relative;
              bottom: auto;
              left: auto;
              margin-top: 16px;
              justify-content: center;
            }
            .info-card {
              padding: 8px 12px;
              font-size: 12px;
            }
            .section {
              padding: 24px 16px 16px;
            }
            .section h2 {
              font-size: 18px;
              text-align: center;
            }
            .detail-container {
              flex-direction: column;
              gap: 16px;
              padding: 16px;
            }
            .preview-video {
              min-width: auto;
              max-width: 100%;
            }
            .video-text {
              min-width: auto;
              text-align: center;
            }
            .video-text h3 {
              font-size: 16px;
            }
            .video-text p {
              font-size: 14px;
            }
            .movement-box {
              padding: 16px;
            }
            .movement-item {
              font-size: 14px;
              padding: 12px 0;
            }
            .movement-name {
              font-size: 14px;
            }
          }
        `}</style>

        {/* Header Section */}
        <div className="header">
          <img
            src="/office-syndrome-header.jpg"
            alt="Office Syndrome"
            className="header-image"
          />
          <div className="overlay">
            <a href="#" style={{ textDecoration: 'underline', color: 'white', fontSize: '1.15rem', fontWeight: 700, alignSelf: 'flex-start', marginBottom: 24, letterSpacing: 0.5 }}>
              ← Go Back
            </a>
            <h1 style={{ 
              fontSize: window.innerWidth <= 600 ? '24px' : '36px', 
              fontWeight: 'bold', 
              marginTop: window.innerWidth <= 600 ? 16 : 80,
              textAlign: window.innerWidth <= 600 ? 'center' : 'left'
            }}>ออฟฟิศซินโดรม</h1>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="start-button" onClick={() => navigate('/officesyndromerehab')}>▶ Start</button>
              <button 
                style={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  padding: '16px 24px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginTop: '32px',
                  letterSpacing: '0.5px'
                }}
                onClick={() => navigate('/rehab-record')}
              >
                📊 ดูประวัติ
              </button>
            </div>
          </div>

          {/* Summary cards */}
          <div className="info-box">
            <div className="info-card" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <List size={window.innerWidth <= 600 ? 16 : 20} style={{ color: '#1976d2' }} />
              <span style={{ fontSize: window.innerWidth <= 600 ? '12px' : 'inherit' }}>4 movements</span>
            </div>
            <div className="info-card" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={window.innerWidth <= 600 ? 16 : 20} style={{ color: '#1976d2' }} />
              <span style={{ fontSize: window.innerWidth <= 600 ? '12px' : 'inherit' }}>8 minutes</span>
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
