import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Structure', href: 'structure' },
    { name: 'Programs', href: 'programs' },
    { name: 'Gallery', href: 'gallery' },
    { name: 'News', href: 'news' }
  ];

  const handleScroll = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-3 shadow-lg shadow-astravia/5 border-b border-white/5' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="flex items-center gap-4">
            <div className="flex items-center gap-2">
               <img src={`${import.meta.env.BASE_URL}logos/telkom.png`} alt="Telkom University Logo" className="h-10 w-10 object-contain" />
               <img src={`${import.meta.env.BASE_URL}logos/hmif.png`} alt="HMIF Logo" className="h-10 w-10 object-contain" />
               <div className="h-8 w-px bg-white/20 mx-1 hidden sm:block"></div>
               <img src={`${import.meta.env.BASE_URL}logos/kabinet.png`} alt="Kabinet Astravia Logo" className="h-10 w-10 object-contain hidden sm:block" />
            </div>
            <div className="hidden lg:flex flex-col justify-center">
              <span className="text-xl font-bold text-white tracking-tighter leading-none">HMIF<span className="text-astravia">.</span></span>
              <span className="text-[10px] text-astravia font-semibold tracking-widest uppercase">Kabinet Astravia</span>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={`#${link.href}`}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-gray-300 hover:text-astravia text-sm font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={(e) => handleScroll(e, 'contact')}
              className="bg-astravia text-black px-6 py-2 rounded-full font-semibold text-sm hover:bg-white transition-all hover:scale-105 duration-300 shadow-lg shadow-astravia/20"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-astravia focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {/* Show third logo on mobile menu if hidden from main bar */}
              <div className="flex items-center gap-4 justify-center py-4 border-b border-white/10 mb-4 sm:hidden">
                 <img src={`${import.meta.env.BASE_URL}logos/kabinet.png`} alt="Kabinet Astravia Logo" className="h-12 w-12 object-contain" />
                 <span className="text-astravia font-bold tracking-widest uppercase text-sm">Astravia</span>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.href}`}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-astravia hover:bg-white/5 rounded-xl transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4">
                <a 
                  href="#contact" 
                  onClick={(e) => handleScroll(e, 'contact')}
                  className="block w-full text-center bg-astravia text-black px-6 py-3 rounded-xl font-semibold hover:bg-white transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
