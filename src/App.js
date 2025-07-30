import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LangProvider } from './LangContext';
import ReHabitNavbar from './components/ReHabitNavbar';
import ReHabitNavbarGuest from './components/ReHabitNavbarGuest';
import Home from './page/Home';
import ContactUs from './page/ContactUs';
import EditProfile from './page/EditProfile';
import MediaPipefulldemo from './page/MediaPipefulldemo';
import MediaPipefulldemoOptimized from './page/MediaPipefulldemoOptimized'; // Add optimized version
import OfficeSyndrome from './page/OfficeSyndrome';
import PhysicalTherapy from './page/PhysicalTherapy';
import PhysicalTherapyMenu from './page/PhysicalTherapyMenu';
import './App.css';

function App() {
  return (
    <LangProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/mediapipe" element={<MediaPipefulldemo />} />
            <Route path="/mediapipe-optimized" element={<MediaPipefulldemoOptimized />} /> {/* Add optimized route */}
            <Route path="/officesyndrome" element={<OfficeSyndrome />} />
            <Route path="/physicaltherapy" element={<PhysicalTherapy />} />
            <Route path="/physicaltherapymenu" element={<PhysicalTherapyMenu />} />
          </Routes>
        </div>
      </Router>
    </LangProvider>
  );
}

export default App;
