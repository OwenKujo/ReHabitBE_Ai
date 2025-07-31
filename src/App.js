import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReHabitNavbar from './components/ReHabitNavbar';
import ReHabitNavbarGuest from './components/ReHabitNavbarGuest';
import MediaPipefull from './page/MediaPipefull';
import PhysicalTherapyMenu from './page/PhysicalTherapyMenu';
import Home from './page/Home';
import EditProfile from './page/EditProfile';
import OfficeSyndromePage from './page/OfficeSyndrome';
import ContactUs from './page/ContactUs';
import Login from './page/Login';
import Register from './page/Register';
import TestAPI from './page/TestAPI';
import Footer from './components/Footer';
import MediaPipefullDemo from './page/MediaPipefulldemo'
import ReHabRecord from './page/ReHabRecord';
import ProtectedRoute from './components/ProtectedRoute';
import { tokenManager, api } from './utils/api';
import './i18n';

export const LangContext = createContext();
export function useLang() {
  return useContext(LangContext);
}

export const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

function App() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const changeLang = (l) => {
    setLang(l);
    localStorage.setItem('lang', l);
  };

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = tokenManager.getToken();
      if (token) {
        try {
          const response = await api.auth.getProfile(token);
          if (response.user) {
            setUser(response.user);
            setIsAuthenticated(true);
          } else {
            // Token is invalid, remove it
            tokenManager.removeToken();
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          tokenManager.removeToken();
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const logout = () => {
    tokenManager.logout();
    setIsAuthenticated(false);
    setUser(null);
    console.log('👋 User logged out, navbar will switch to guest mode');
  };

  const login = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <LangContext.Provider value={{ lang, changeLang }}>
      <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
        <Router>
          {isAuthenticated ? <ReHabitNavbar /> : <ReHabitNavbarGuest />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/MediaPipefull" element={<MediaPipefull />} />
            <Route path= "/physicalmenu" element={<PhysicalTherapyMenu />}/>
            <Route path="/edit-profile" element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            } />  
            <Route path="/office-syndrome" element={<OfficeSyndromePage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/test-api" element={<TestAPI />} />
            <Route path="/officesyndromerehab" element={<MediaPipefull />} />
            <Route path="/rehab-record" element={<ReHabRecord />} />
            <Route path="/demo" element={<MediaPipefullDemo />} />
          </Routes>

          <Footer />
        </Router>
      </AuthContext.Provider>
    </LangContext.Provider>
  );
}

export default App;
