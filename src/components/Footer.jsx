import React from 'react';
import { FaInstagram, FaEnvelope, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <a href="#home" className="inline-block mb-8">
              <div className="flex items-center gap-4 mb-4">
                 <div className="bg-white/5 p-2 rounded-xl backdrop-blur-sm border border-white/10 flex items-center gap-3">
                   <img src="/logos/telkom.png" alt="Telkom" className="h-12 w-12 object-contain" />
                   <img src="/logos/hmif.png" alt="HMIF" className="h-12 w-12 object-contain" />
                   <img src="/logos/kabinet.png" alt="Kabinet" className="h-12 w-12 object-contain" />
                 </div>
              </div>
              <span className="text-3xl font-bold text-white tracking-tighter block">HMIF<span className="text-astravia">.</span></span>
              <span className="text-astravia text-sm font-semibold tracking-widest uppercase">Kabinet Astravia</span>
            </a>
            <p className="text-gray-400 leading-relaxed lg:pr-12">
              Himpunan Mahasiswa Teknik Informatika (HMIF) Telkom University Purwokerto. Empowering students to innovate, collaborate, and create impact for society.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 tracking-wide">Explore</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-400 hover:text-astravia hover:translate-x-1 inline-block transition-all">About Us</a></li>
              <li><a href="#structure" className="text-gray-400 hover:text-astravia hover:translate-x-1 inline-block transition-all">Organization</a></li>
              <li><a href="#programs" className="text-gray-400 hover:text-astravia hover:translate-x-1 inline-block transition-all">Work Programs</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-astravia hover:translate-x-1 inline-block transition-all">Activity Gallery</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 tracking-wide">Connect</h3>
            <div className="flex space-x-4 mb-8">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-astravia hover:text-black hover:border-astravia transition-all">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-astravia hover:text-black hover:border-astravia transition-all">
                <FaEnvelope size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-astravia hover:text-black hover:border-astravia transition-all">
                <FaGlobe size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} HMIF Telkom University Purwokerto. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <span className="text-astravia text-lg leading-none">♥</span> by Kabinet Astravia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
