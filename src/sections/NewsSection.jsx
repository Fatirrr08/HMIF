import React from 'react';
import { motion } from 'framer-motion';
import { newsData } from '../data/news';
import SectionHeader from '../components/SectionHeader';
import AnimatedSection from '../components/AnimatedSection';

const NewsSection = () => {
  return (
    <AnimatedSection id="news" className="bg-[#050505] relative">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-astravia/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      
      <SectionHeader title="News & Updates" subtitle="Latest Announcements" />
      
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {newsData.map((news) => (
          <motion.div 
            key={news.id}
            whileHover={{ x: 10 }}
            className="bg-[#0a0a0a] border border-white/5 hover:border-astravia p-8 md:p-10 rounded-[2rem] transition-all group flex flex-col md:flex-row gap-8 md:items-center relative overflow-hidden shadow-xl"
          >
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-astravia hidden group-hover:block transition-all shadow-[0_0_15px_rgba(255,214,0,0.8)]" />
            <div className="md:w-1/4">
              <span className="text-astravia font-bold text-xs tracking-widest uppercase border border-astravia/30 px-5 py-3 rounded-full bg-astravia/5 shadow-inner">
                {news.date}
              </span>
            </div>
            
            <div className="md:w-3/4">
              <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-astravia transition-colors">
                {news.title}
              </h4>
              <p className="text-gray-400 leading-relaxed mb-6 font-light">
                {news.summary}
              </p>
              <a 
                href={news.link} 
                className="inline-flex items-center gap-3 text-white font-semibold text-sm hover:text-astravia transition-colors uppercase tracking-widest"
              >
                Read Article
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transform group-hover:translate-x-2 group-hover:bg-astravia/20 transition-all border border-white/10 group-hover:border-astravia/50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-20 text-center relative z-10">
        <button className="px-10 py-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all font-bold tracking-widest uppercase text-sm shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          View All News
        </button>
      </div>
    </AnimatedSection>
  );
};

export default NewsSection;
