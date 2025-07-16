import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReHabitNavbar from './components/ReHabitNavbar';
import MediaPipefull from './page/MediaPipefull';
import PhysicalTherapyMenu from './page/PhysicalTherapyMenu';
import Home from './page/Home';
import Mediapipe2 from './page/Mediapipe2';


function App() {
  return (
    <Router>
      <ReHabitNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MediaPipefull" element={<MediaPipefull />} />
        <Route path="/Mediapipe2" element={<Mediapipe2 />} />
        <Route path= "/physicalmenu" element={<PhysicalTherapyMenu />}/>
      </Routes>
    </Router>
  );
}

export default App;
