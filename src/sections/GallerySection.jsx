import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryData } from '../data/gallery';
import SectionHeader from '../components/SectionHeader';
import AnimatedSection from '../components/AnimatedSection';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <AnimatedSection id="gallery" className="bg-black">
      <SectionHeader title="Activity Gallery" subtitle="Our Moments" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative h-80 rounded-[2rem] overflow-hidden cursor-pointer shadow-xl border border-white/5"
            onClick={() => setSelectedImage(item)}
          >
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center backdrop-blur-sm">
              <span className="text-black font-bold text-lg tracking-widest uppercase px-8 py-3 bg-astravia rounded-full shadow-[0_0_20px_rgba(255,214,0,0.5)] transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                View Photo
              </span>
            </div>
            <img 
              src={item.url} 
              alt={item.title} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 md:p-12 backdrop-blur-xl"
          >
            <button 
              className="absolute top-8 right-8 text-white hover:text-astravia transition-colors z-50 p-2"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl shadow-astravia/10 border border-white/10"
            />
            <div className="absolute bottom-10 left-0 right-0 text-center">
              <span className="bg-white text-black px-10 py-4 rounded-full font-bold tracking-widest uppercase shadow-lg shadow-white/10">
                {selectedImage.title}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedSection>
  );
};

export default GallerySection;
