import React from 'react';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectsSection';
import Services from '../components/Services';
import ContactSection from '../components/ContactSection';

// Definimos los props que recibirá
interface HomePageProps {
  onOpenModal: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onOpenModal }) => {
  return (
    <>
      {/* Pasamos la función 'onOpenModal' a Hero y Contact */}
      <HeroSection onOpenModal={onOpenModal} />
      <ProjectsSection />
      <Services />
      <ContactSection onOpenModal={onOpenModal} />
    </>
  );
};

export default HomePage;