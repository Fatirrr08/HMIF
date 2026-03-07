import React from 'react';
import { motion } from 'framer-motion';
import { membersData } from '../data/members';
import SectionHeader from '../components/SectionHeader';
import AnimatedSection from '../components/AnimatedSection';

const MemberCard = ({ member, highlight = false }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`bg-gradient-to-b from-[#111] to-[#050505] rounded-3xl overflow-hidden border ${highlight ? 'border-astravia/50 shadow-[0_10px_30px_-10px_rgba(255,214,0,0.3)]' : 'border-white/5 shadow-xl'} hover:border-astravia hover:shadow-[0_15px_40px_-5px_rgba(255,214,0,0.25)] transition-all duration-300 group`}
  >
    <div className="relative h-72 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 opacity-90" />
      <img 
        src={member.image} 
        alt={member.name} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
      />
    </div>
    <div className="p-8 relative z-20 -mt-16 text-center">
      <h4 className="text-xl font-bold text-white mb-2">{member.name}</h4>
      <p className="text-astravia font-semibold text-sm tracking-wide uppercase">{member.position}</p>
    </div>
  </motion.div>
);

const StructureSection = () => {
  return (
    <AnimatedSection id="structure" className="bg-black">
      <SectionHeader title="Organizational Structure" subtitle="The Team" />
      
      {/* Executive Board */}
      <div className="mb-32">
        <h3 className="text-3xl font-bold text-center text-white mb-16 inline-block w-full">
          <span className="border-b-2 border-astravia pb-4 px-8 inline-block relative">
            Executive Board
            <span className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent blur-sm"></span>
          </span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {membersData.executiveBoard.map((member, i) => (
            <MemberCard key={i} member={member} highlight={true} />
          ))}
        </div>
      </div>

      {/* Departments */}
      <div>
        <h3 className="text-3xl font-bold text-center text-white mb-16 inline-block w-full">
          <span className="border-b-2 border-astravia pb-4 px-8 inline-block relative">
            Departments
            <span className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent blur-sm"></span>
          </span>
        </h3>
        <div className="space-y-24">
          {membersData.departments.map((dept, i) => (
            <div key={i} className="bg-gradient-to-tr from-[#0a0a0a] to-[#111] p-8 md:p-14 rounded-[3rem] border border-white/5 overflow-hidden relative shadow-2xl">
              <h4 className="text-2xl md:text-3xl font-bold text-astravia mb-12 text-center relative z-10">{dept.name}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
                <MemberCard member={dept.head} highlight={true} />
                {dept.staff.map((staff, j) => (
                  <MemberCard key={j} member={staff} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default StructureSection;
