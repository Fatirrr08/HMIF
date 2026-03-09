import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import axios from 'axios'; // Removed for mock data
import SectionHeader from '../components/SectionHeader';
import AnimatedSection from '../components/AnimatedSection';

import { aboutData as mockAboutData, membersData } from '../data/mockData';

const AboutSection = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    // using mock data for github pages deployment
    setAboutData(mockAboutData);
  }, []);

  if (!aboutData) {
    return (
      <AnimatedSection id="about" className="bg-[#050505] relative overflow-hidden bg-pattern-dots flex justify-center py-20">
        <div className="text-white">Loading...</div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection id="about" className="bg-[#050505] relative overflow-hidden bg-pattern-dots">
      <div className="absolute inset-0 bg-[#050505]/90 z-0" />
      
      <div className="relative z-10">
        <SectionHeader title="About HMIF" subtitle="Who We Are" />
        
        <div className="max-w-4xl mx-auto text-center mb-20 relative">
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
            {aboutData.description}
          </p>
        </div>

        <div className="mb-24">
          <div className="bg-gradient-to-br from-[#111] via-[#0a0a0a] to-[#151000] rounded-[2.5rem] p-8 sm:p-10 md:p-14 border border-white/5 border-b-astravia/20 shadow-[0_20px_60px_-15px_rgba(255,214,0,0.1)] relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-astravia/10 to-orange-500/10 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-1000" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-gradient-to-tr from-astravia/5 to-amber-500/5 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-1000" />
            
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-4 relative z-10">
              <span className="w-14 h-14 rounded-full bg-gradient-to-br from-astravia/20 to-orange-500/20 flex items-center justify-center text-astravia shadow-[0_0_15px_rgba(255,214,0,0.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </span>
              Our Vision
            </h3>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed italic border-l-4 border-astravia pl-8 relative z-10">
              "{aboutData.vision}"
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-white mb-12 text-center relative">
            <span className="relative z-10">Our Mission</span>
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-3 bg-astravia/30 blur-sm -z-0"></span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {aboutData.missions?.map((mission, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-[#0a0a0a] p-6 sm:p-8 md:p-10 rounded-3xl border border-white/5 hover:border-astravia/50 hover:shadow-[0_15px_40px_-10px_rgba(255,214,0,0.15)] transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute -inset-px bg-gradient-to-b from-astravia/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                <div className="absolute -right-4 -top-4 text-[6rem] md:text-[10rem] font-black text-white/[0.02] group-hover:text-astravia/[0.07] transition-colors z-0 select-none">
                  {index + 1}
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-astravia to-amber-500 flex items-center justify-center text-black font-bold text-2xl mb-8 shadow-[0_0_20px_rgba(255,214,0,0.4)] group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                    {mission}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Executive Board explicit block on Home Page */}
        {membersData?.executiveBoard && (
          <div className="mt-32">
            <h3 className="text-3xl font-bold text-white mb-2 text-center relative">
              <span className="relative z-10">Executive Board</span>
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-3 bg-amber-500/30 blur-sm -z-0"></span>
            </h3>
            <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto font-light">
              Keenam pilar utama yang memimpin arah gerak inovasi Kabinet Astravia
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {membersData.executiveBoard.map((member, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <div className="aspect-square overflow-hidden rounded-[2rem] border border-white/5 bg-[#0a0a0a] relative mb-6">
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505] opacity-50 z-10 rounded-[2rem]" />
                     <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        loading="lazy"
                     />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-astravia transition-colors">{member.name}</h4>
                    <p className="text-gray-400 font-medium tracking-wide text-sm md:text-base mt-2">{member.position}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </AnimatedSection>
  );
};

export default AboutSection;
