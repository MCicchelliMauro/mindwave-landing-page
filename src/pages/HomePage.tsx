import React, { Suspense, lazy } from 'react';
import HeroSection from '../components/HeroSection';

// Lazy load below-the-fold sections
const ProjectsSection = lazy(() => import('../components/ProjectsSection'));
const Services = lazy(() => import('../components/Services'));
const ContactSection = lazy(() => import('../components/ContactSection'));

interface HomePageProps {
  onOpenModal: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onOpenModal }) => {
  return (
    <>
      {/* Hero renderiza inmediatamente (LCP) */}
      <HeroSection onOpenModal={onOpenModal} />

      {/* Secciones secundarias se cargan bajo demanda */}
      <Suspense fallback={<div className="min-h-screen w-full flex items-center justify-center text-slate-500">Cargando...</div>}>
        <Services />
        <ProjectsSection />
        <ContactSection onOpenModal={onOpenModal} />
      </Suspense>
    </>
  );
};

export default HomePage;