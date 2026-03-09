import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios'; // Removed for mock data
import SectionHeader from '../components/SectionHeader';
import AnimatedSection from '../components/AnimatedSection';

const MemberCard = ({ member, highlight = false }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
    whileHover={{ y: -10 }}
    className={`bg-gradient-to-b from-[#111] to-[#050505] rounded-3xl overflow-hidden border ${highlight ? 'border-astravia/50 shadow-[0_10px_30px_-10px_rgba(255,214,0,0.3)]' : 'border-white/5 shadow-xl'} hover:border-astravia hover:shadow-[0_15px_40px_-5px_rgba(255,214,0,0.25)] transition-all duration-300 group`}
  >
    <div className="relative aspect-square w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 opacity-90" />
      <img 
        src={member.image} 
        alt={member.name} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
      />
    </div>
    <div className="p-6 sm:p-8 relative z-20 -mt-16 text-center">
      <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{member.name}</h4>
      <p className="text-astravia font-semibold text-xs sm:text-sm tracking-wide uppercase">{member.position}</p>
    </div>
  </motion.div>
);

import { membersData as mockMembersData } from '../data/mockData';

const StructureSection = () => {
  const [membersData, setMembersData] = useState(null);
  const [activeTab, setActiveTab] = useState('Executive Board');

  useEffect(() => {
    // using mock data for github pages deployment
    setMembersData(mockMembersData);
  }, []);

  if (!membersData) {
    return (
      <AnimatedSection id="structure" className="bg-black flex justify-center py-20">
        <div className="text-white">Loading...</div>
      </AnimatedSection>
    );
  }

  const allTabs = ['Executive Board', ...membersData.departments.map(d => d.name.match(/\((.*?)\)/)[1])]; // Extract short names e.g., ERA

  return (
    <AnimatedSection id="structure" className="bg-black">
      <SectionHeader title="Organizational Structure" subtitle="The Team" />
      
      {/* Tabs / Carousel */}
      <div className="mb-16 w-full overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex gap-4 justify-start md:justify-center min-w-max px-4">
          {allTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300 border ${
                activeTab === tab 
                  ? 'bg-astravia text-black border-astravia shadow-[0_0_20px_rgba(255,214,0,0.4)] transform scale-105' 
                  : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/30 hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="min-h-[600px]">
        <AnimatePresence mode="wait">
          {activeTab === 'Executive Board' ? (
            <motion.div
              key="Executive Board"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="max-w-7xl mx-auto"
            >
              <h3 className="text-3xl font-bold text-center text-white mb-16 inline-block w-full">
                <span className="border-b-2 border-astravia pb-4 px-8 inline-block relative">
                  Executive Board
                  <span className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent blur-sm"></span>
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {membersData.executiveBoard.map((member, i) => (
                  <MemberCard key={i} member={member} highlight={true} />
                ))}
              </div>
            </motion.div>
          ) : (
            membersData.departments
              .filter(dept => dept.name.includes(`(${activeTab})`))
              .map((dept, i) => (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-tr from-[#0a0a0a] to-[#111] p-6 sm:p-10 md:p-14 rounded-[2rem] sm:rounded-[3rem] border border-white/5 overflow-hidden relative shadow-2xl max-w-7xl mx-auto"
                >
                  <h4 className="text-2xl md:text-3xl font-bold text-astravia mb-8 sm:mb-12 text-center relative z-10">{dept.name}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 relative z-10">
                    <MemberCard member={dept.head} highlight={true} />
                    {dept.staff.map((staff, j) => (
                      <MemberCard key={j} member={staff} />
                    ))}
                  </div>
                </motion.div>
              ))
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
};

export default StructureSection;
