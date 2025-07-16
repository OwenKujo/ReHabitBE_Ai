import React from 'react';
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


function App() {
  return (
    <Router>
      {/* <ReHabitNavbar /> */}
      <ReHabitNavbarGuest />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/MediaPipefull" element={<MediaPipefull />} />
        <Route path= "/physicalmenu" element={<PhysicalTherapyMenu />}/>
        <Route path="/edit-profile" element={<EditProfile />} />  
        <Route path="/office-syndrome" element={<OfficeSyndromePage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/officesyndromerehab" element={<MediaPipefull />} />
        <Route path="/MediaPipefullDemo" element={<MediaPipefullDemo />} />
       
      </Routes>

      <Footer />

    </Router>
  );
}

export default App;
