import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <>
      <div className="navbar shadow-md p-4 flex items-center justify-between md:px-8 bg-white">
        <h2 className="text-2xl font-bold text-indigo-600">ArtFusion</h2>
        <button 
          className="md:hidden text-2xl" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-blue-800 hover:text-blue-400">HOME</Link>
          <Link to="/about" className="text-blue-800 hover:text-blue-400">ABOUT</Link>
          <Link to="/contact" className="text-blue-800 hover:text-blue-400">CONTACT</Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      <nav className={`md:hidden space-y-2 p-4 bg-white ${isMobileMenuOpen ? '' : 'hidden'}`}>
        <Link to="/" className="block text-blue-800 hover:text-blue-400">HOME</Link>
        <Link to="/about" className="block text-blue-800 hover:text-blue-400">ABOUT</Link>
        <Link to="/contact" className="block text-blue-800 hover:text-blue-400">CONTACT</Link>
      </nav>
    </>
  );
};

export default Navbar;
