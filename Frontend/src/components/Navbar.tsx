import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [currentPath]);

  // Listen for location changes
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Implement smooth scrolling for hash links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    // Only handle hash links (sections on the same page)
    if (targetId.startsWith('#')) {
      e.preventDefault();
      
      // Extract the element id from the hash (remove the # symbol)
      const elementId = targetId.substring(1);
      const targetElement = document.getElementById(elementId);
      
      if (targetElement) {
        // Smooth scroll to the element
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without refreshing the page
        window.history.pushState(null, '', targetId);
        setCurrentPath(window.location.pathname + targetId);
      }
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-purple-900/80 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-white">
          <Sparkles className="h-5 w-5 text-purple-300" />
          <span className="font-bold text-xl">ArtFusion</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center ml-auto">
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-white/80 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatedMobileMenu isOpen={isOpen} links={navLinks} handleNavClick={handleNavClick} />
    </nav>
  );
}

interface AnimatedMobileMenuProps {
  isOpen: boolean;
  links: { name: string; href: string }[];
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

function AnimatedMobileMenu({ isOpen, links, handleNavClick }: AnimatedMobileMenuProps) {
  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={{
        open: { opacity: 1, height: "auto" },
        closed: { opacity: 0, height: 0 },
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="md:hidden overflow-hidden bg-purple-900/95 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-colors"
          >
            {link.name}
          </a>
        ))}

                  <div className="flex flex-col mt-2 pt-4 border-t border-white/10">
          <Link to="/login" className="w-full">
            <Button variant="ghost" className="w-full text-white hover:bg-white/10">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}