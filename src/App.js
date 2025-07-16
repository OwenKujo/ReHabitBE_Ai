import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReHabitNavbar from './components/ReHabitNavbar';
import MediaPipefull from './page/MediaPipefull';
import Home from './page/Home';
import MediaPipefullDemo from './page/MediaPipefulldemo'


function App() {
  return (
    <Router>
      <ReHabitNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/officesyndromerehab" element={<MediaPipefull />} />
        <Route path="/MediaPipefullDemo" element={<MediaPipefullDemo />} />
       
      </Routes>
    </Router>
  );
}

export default App;
