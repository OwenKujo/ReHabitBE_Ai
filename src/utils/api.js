// API configuration for ReHabit backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://rehabitbe.onrender.com';

// API utility functions
export const api = {
  // Authentication endpoints
  auth: {
    register: async (userData) => {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return response.json();
    },

    login: async (credentials) => {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      return response.json();
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
}; 