import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ReHabitNavbar from './components/ReHabitNavbar';
import ReHabitNavbarGuest from './components/ReHabitNavbarGuest';
import MediaPipefull from './page/MediaPipefull';
import PhysicalTherapyMenu from './page/PhysicalTherapyMenu';
import Home from './page/Home';
import EditProfile from './page/EditProfile';
import OfficeSyndromePage from './page/OfficeSyndrome';
import ContactUs from './page/ContactUs';
import Footer from './components/Footer';
import MediaPipefullDemo from './page/MediaPipefulldemo'
import './i18n';

export const LangContext = createContext();
export function useLang() {
  return useContext(LangContext);
}

function App() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  const changeLang = (l) => {
    setLang(l);
    localStorage.setItem('lang', l);
  };

  return (
    <LangContext.Provider value={{ lang, changeLang }}>
      <Router>
        {/* <ReHabitNavbar /> */}
        <ReHabitNavbarGuest />

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/MediaPipefull" element={<MediaPipefull />} />
          <Route path= "/physicalmenu" element={<PhysicalTherapyMenu />}/>
          <Route path="/edit-profile" element={<EditProfile />} />  
          <Route path="/office-syndrome" element={<OfficeSyndromePage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/officesyndromerehab" element={<MediaPipefull />} />
          <Route path="/demo" element={<MediaPipefullDemo />} />
         
        </Routes>

        <Footer />

      </Router>
    </LangContext.Provider>
  );
}

export default App;
