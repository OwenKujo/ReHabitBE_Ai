import React from 'react'

export default function PhysicalTherapy() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f4fafd',
      fontFamily: 'Kanit, Prompt, Arial, sans-serif',
      padding: window.innerWidth <= 768 ? '20px 16px' : '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <div style={{
        background: 'white',
        borderRadius: window.innerWidth <= 768 ? 12 : 20,
        padding: window.innerWidth <= 768 ? '24px 16px' : '40px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        maxWidth: window.innerWidth <= 768 ? '100%' : '600px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: window.innerWidth <= 768 ? '24px' : '32px',
          fontWeight: 700,
          color: '#4392B1',
          marginBottom: window.innerWidth <= 768 ? '16px' : '24px'
        }}>
          Physical Therapy
        </h1>
        
        <p style={{
          fontSize: window.innerWidth <= 768 ? '14px' : '16px',
          color: '#666',
          lineHeight: 1.6,
          marginBottom: window.innerWidth <= 768 ? '20px' : '32px'
        }}>
          Welcome to the Physical Therapy section. This page is under development and will contain comprehensive physical therapy resources and exercises.
        </p>
        
        <div style={{
          display: 'flex',
          gap: window.innerWidth <= 768 ? '12px' : '20px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button style={{
            background: '#4392B1',
            color: 'white',
            border: 'none',
            borderRadius: window.innerWidth <= 768 ? 8 : 12,
            padding: window.innerWidth <= 768 ? '12px 20px' : '16px 32px',
            fontSize: window.innerWidth <= 768 ? '14px' : '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}>
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  )
}
