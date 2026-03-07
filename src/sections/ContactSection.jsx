import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import AnimatedSection from '../components/AnimatedSection';
import { FaInstagram, FaEnvelope, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <AnimatedSection id="contact" className="bg-black border-t border-white/5">
      <SectionHeader title="Get In Touch" subtitle="Contact Us" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h3 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tighter">
            Have questions about <br/><span className="text-astravia inline-block mt-2">Kabinet Astravia?</span>
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-12 font-light">
            Reach out to us for collaborations, inquiries, or just to say hello. We are always open to discussing new opportunities and ideas.
          </p>
          
          <div className="space-y-8">
            <motion.a 
              href="#"
              whileHover={{ x: 10 }}
              className="flex items-center gap-6 group"
            >
              <div className="w-16 h-16 rounded-full bg-[#0a0a0a] border border-white/10 group-hover:border-astravia group-hover:bg-astravia/5 flex items-center justify-center text-astravia transition-all duration-300 shadow-xl">
                <FaInstagram size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Instagram</p>
                <p className="text-white text-lg font-medium group-hover:text-astravia transition-colors">@hmif.telkompurwokerto</p>
              </div>
            </motion.a>
            
            <motion.a 
              href="mailto:hmif@telkomuniversity.ac.id"
              whileHover={{ x: 10 }}
              className="flex items-center gap-6 group"
            >
              <div className="w-16 h-16 rounded-full bg-[#0a0a0a] border border-white/10 group-hover:border-astravia group-hover:bg-astravia/5 flex items-center justify-center text-astravia transition-all duration-300 shadow-xl">
                <FaEnvelope size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Email</p>
                <p className="text-white text-lg font-medium group-hover:text-astravia transition-colors">hmif@telkomuniversity.ac.id</p>
              </div>
            </motion.a>
            
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-astravia shadow-xl shrink-0 group-hover:border-astravia transition-all duration-300">
                <FaMapMarkerAlt size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Location</p>
                <p className="text-white text-lg font-medium leading-relaxed">
                  Telkom University Purwokerto <br/>
                  <span className="text-gray-400 text-sm font-normal">Jl. DI Panjaitan No.128, Purwokerto Selatan, Banyumas</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-[#111] to-[#050505] p-10 md:p-14 rounded-[3rem] border border-white/5 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-astravia/10 rounded-full blur-[80px]" />
          <h4 className="text-3xl font-bold text-white mb-8 relative z-10 tracking-tight">Send us a message</h4>
          <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-gray-500 focus:outline-none focus:border-astravia focus:ring-1 focus:ring-astravia transition-all shadow-inner font-medium"
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-gray-500 focus:outline-none focus:border-astravia focus:ring-1 focus:ring-astravia transition-all shadow-inner font-medium"
              />
            </div>
            <div>
              <textarea 
                placeholder="Your Message" 
                rows="4"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-gray-500 focus:outline-none focus:border-astravia focus:ring-1 focus:ring-astravia transition-all shadow-inner resize-none font-medium"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-astravia text-black font-black uppercase tracking-widest text-sm py-5 rounded-2xl hover:bg-white hover:shadow-[0_0_40px_rgba(255,214,0,0.4)] transition-all duration-300 transform hover:-translate-y-1"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default ContactSection;
