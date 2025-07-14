import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReHabitNavbar from './components/ReHabitNavbar';
import MediaPipefull from './page/MediaPipefull';
import Home from './page/Home';


function App() {
  return (
    <Router>
      <ReHabitNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MediaPipefull" element={<MediaPipefull />} />
      
      </Routes>
    </Router>
  );
}

export default App;
