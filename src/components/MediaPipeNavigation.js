import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MediaPipeNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isOptimized = location.pathname.includes('optimized');
  
  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.8)',
      padding: '10px 20px',
      borderRadius: '25px',
      display: 'flex',
      gap: '10px',
      alignItems: 'center'
    }}>
      <button
        onClick={() => navigate('/mediapipe')}
        style={{
          padding: '8px 16px',
          background: isOptimized ? '#666' : '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold'
        }}
      >
        Original
      </button>
      <button
        onClick={() => navigate('/mediapipe-optimized')}
        style={{
          padding: '8px 16px',
          background: isOptimized ? '#1976d2' : '#666',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold'
        }}
      >
        Optimized
      </button>
      <div style={{
        color: 'white',
        fontSize: '10px',
        marginLeft: '10px',
        padding: '4px 8px',
        background: isOptimized ? '#4CAF50' : '#FF9800',
        borderRadius: '10px'
      }}>
        {isOptimized ? 'SMOOTH' : 'STANDARD'}
      </div>
    </div>
  );
};

export default MediaPipeNavigation; 