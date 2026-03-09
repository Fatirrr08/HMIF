import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeroSection from '../../sections/HeroSection';
import AboutSection from '../../sections/AboutSection';
import StructureSection from '../../sections/StructureSection';
import ProgramsSection from '../../sections/ProgramsSection';
import GallerySection from '../../sections/GallerySection';
import NewsSection from '../../sections/NewsSection';
import ContactSection from '../../sections/ContactSection';

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <StructureSection />
        <ProgramsSection />
        <GallerySection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
