import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Ensure this is included only once
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Design from './pages/Design';

function App() {
  return (
    <Router>
      <Navbar /> {/* Should appear only here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/design" element={<Design />} />
      </Routes>
    </Router>
  );
}

export default App;
