import React from 'react';

const PerformanceMonitor = ({ performance, isVisible = true }) => {
  if (!isVisible) return null;

  const { fps, detectionTime, frameCount } = performance;
  
  // Performance indicators
  const getPerformanceStatus = () => {
    if (fps >= 25) return { status: 'Excellent', color: '#00FF00' };
    if (fps >= 20) return { status: 'Good', color: '#FFFF00' };
    if (fps >= 15) return { status: 'Fair', color: '#FFA500' };
    return { status: 'Poor', color: '#FF0000' };
  };

  const performanceStatus = getPerformanceStatus();

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: 1000,
      minWidth: '200px'
    }}>
      <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>
        Performance Monitor
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
        <span>FPS:</span>
        <span style={{ color: performanceStatus.color }}>
          {fps} ({performanceStatus.status})
        </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
        <span>Detection Time:</span>
        <span>{detectionTime.toFixed(2)}ms</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
        <span>Frame Count:</span>
        <span>{frameCount}</span>
      </div>
      <div style={{ 
        marginTop: '5px', 
        padding: '3px', 
        background: performanceStatus.color,
        borderRadius: '3px',
        textAlign: 'center',
        fontSize: '10px',
        color: 'black',
        fontWeight: 'bold'
      }}>
        {performanceStatus.status}
      </div>
    </div>
  );
};

export default PerformanceMonitor; 