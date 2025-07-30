// API configuration for ReHabit backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://rehabitbe.onrender.com';

console.log('🔧 API Configuration:', { 
  API_BASE_URL,
  REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  NODE_ENV: process.env.NODE_ENV,
  allEnvVars: Object.keys(process.env).filter(key => key.startsWith('REACT_APP_'))
});

// API utility functions
export const api = {
  // Authentication endpoints
  auth: {
    register: async (userData) => {
      console.log('📤 Making registration request to:', `${API_BASE_URL}/api/auth/register`);
      console.log('📤 Request data:', userData);
      
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      console.log('📥 Registration response status:', response.status);
      const data = await response.json();
      console.log('📥 Registration response data:', data);
      return data;
    },

    login: async (credentials) => {
      console.log('📤 Making login request to:', `${API_BASE_URL}/api/auth/login`);
      console.log('📤 Request data:', credentials);
      
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      console.log('📥 Login response status:', response.status);
      const data = await response.json();
      console.log('📥 Login response data:', data);
      return data;
    },

    getProfile: async (token) => {
      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    },
  },

  // Scores endpoints
  scores: {
    create: async (scoreData, token) => {
      const response = await fetch(`${API_BASE_URL}/api/scores`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scoreData),
      });
      return response.json();
    },

    getAll: async (token) => {
      const response = await fetch(`${API_BASE_URL}/api/scores`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    },

    getStats: async (token) => {
      const response = await fetch(`${API_BASE_URL}/api/scores/stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    },

    getLeaderboard: async (moveType) => {
      const response = await fetch(`${API_BASE_URL}/api/scores/leaderboard/${moveType}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    },
  },

  // Health check
  health: async () => {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return response.json();
  },
};

// Token management
export const tokenManager = {
  setToken: (token) => {
    localStorage.setItem('rehabit_token', token);
  },

  getToken: () => {
    return localStorage.getItem('rehabit_token');
  },

  removeToken: () => {
    localStorage.removeItem('rehabit_token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('rehabit_token');
  },

  logout: () => {
    localStorage.removeItem('rehabit_token');
    // Clear any other user-related data
    localStorage.removeItem('user_data');
    console.log('🔐 User logged out successfully');
  },
}; 