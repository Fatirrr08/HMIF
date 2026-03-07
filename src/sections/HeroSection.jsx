import React from 'react';
import { motion } from 'framer-motion';
import { aboutData } from '../data/about';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-pattern-grid">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/80 z-0" /> {/* Overlay to fade grid slightly */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-astravia/20 rounded-full blur-[120px] blob-shape mix-blend-screen" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] blob-shape mix-blend-screen" style={{ animationDelay: '-4s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-400/5 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 inline-block"
        >
          <span className="px-5 py-2 rounded-full border border-astravia/30 bg-astravia/10 text-astravia text-sm font-semibold tracking-wide uppercase">
            {aboutData.title}
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 leading-tight"
        >
          HMIF Telkom University <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-astravia via-amber-300 to-orange-400">Purwokerto</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed"
        >
          {aboutData.tagline}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
        >
          <a
            href="#about"
            className="px-8 py-4 bg-gradient-to-r from-astravia to-amber-400 text-black rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,214,0,0.3)] hover:shadow-[0_0_60px_rgba(255,214,0,0.5)] flex items-center justify-center gap-2"
          >
            Explore Organization
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </a>
          <a
            href="#programs"
            className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 hover:border-amber-400/50 hover:text-amber-300 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
          >
            Work Programs
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
