import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import axios from 'axios'; // Removed for mock data
import SectionHeader from '../components/SectionHeader';
import AnimatedSection from '../components/AnimatedSection';
import { FaCalendarAlt } from 'react-icons/fa';

import { programsData as mockProgramsData } from '../data/mockData';

const ProgramsSection = () => {
  const [programsData, setProgramsData] = useState(null);

  useEffect(() => {
    // using mock data for github pages deployment
    setProgramsData(mockProgramsData);
  }, []);

  if (!programsData) {
    return (
      <AnimatedSection id="programs" className="bg-[#050505] relative overflow-hidden bg-pattern-grid flex justify-center py-20">
        <div className="text-white">Loading...</div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection id="programs" className="bg-[#050505] relative overflow-hidden bg-pattern-grid">
      <div className="absolute inset-0 bg-[#050505]/95 z-0" />
      <div className="relative z-10">
        <SectionHeader title="Work Programs" subtitle="What We Do" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {programsData.map((program) => (
            <motion.div 
              key={program.id}
              whileHover={{ y: -10 }}
              className="group rounded-3xl overflow-hidden bg-gradient-to-b from-[#111] border border-white/5 hover:border-orange-500/50 transition-all duration-300 shadow-xl hover:shadow-[0_20px_50px_-10px_rgba(249,115,22,0.15)] flex flex-col relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-astravia/5 rounded-full blur-[50px] group-hover:bg-orange-500/10 transition-colors duration-500" />
              <div className="relative h-56 overflow-hidden">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-all duration-300 z-10" />
              <img 
                src={program.image} 
                alt={program.name} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6 z-20">
                <span className="px-4 py-2 bg-black/80 backdrop-blur-md text-astravia text-xs font-bold tracking-wider uppercase rounded-full border border-white/10 shadow-lg">
                  {program.department}
                </span>
              </div>
            </div>
            
              <div className="p-5 sm:p-8 flex-1 flex flex-col relative z-10">
                <div className="flex items-center gap-3 text-gray-400 text-sm mb-4 sm:mb-5 font-medium tracking-wide">
                  <FaCalendarAlt className="text-orange-400" />
                  <span className="uppercase">{program.date}</span>
                </div>
                
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-astravia group-hover:to-orange-400 transition-colors">
                  {program.name}
                </h4>
                
                <p className="text-gray-400 leading-relaxed mb-8 flex-1 group-hover:text-gray-300 transition-colors">
                  {program.description}
                </p>
                
                <div className="mt-auto pt-6 border-t border-white/5">
                  <button className="text-white hover:text-orange-400 font-semibold text-sm flex items-center gap-2 transition-colors uppercase tracking-wider">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ProgramsSection;
