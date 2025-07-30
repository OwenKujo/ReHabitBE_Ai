import React, { useState } from 'react';
import { api } from '../utils/api';

function TestAPI() {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testBackendConnection = async () => {
    setLoading(true);
    setTestResult('Testing...');

    try {
      // Test health check
      const healthResponse = await api.health();
      setTestResult(`Health check: ${JSON.stringify(healthResponse, null, 2)}`);

      // Test registration
      const registerResponse = await api.auth.register({
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123'
      });
      
      setTestResult(prev => prev + `\n\nRegistration: ${JSON.stringify(registerResponse, null, 2)}`);
    } catch (error) {
      setTestResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>API Test Page</h1>
      <button 
        onClick={testBackendConnection} 
        disabled={loading}
        style={{ 
          padding: '10px 20px', 
          fontSize: '16px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Testing...' : 'Test Backend Connection'}
      </button>
      
      <pre style={{ 
        marginTop: '20px', 
        padding: '10px', 
        backgroundColor: '#f8f9fa', 
        border: '1px solid #dee2e6',
        borderRadius: '5px',
        whiteSpace: 'pre-wrap',
        fontSize: '12px'
      }}>
        {testResult}
      </pre>
    </div>
  );
}

export default TestAPI; 