import { Routes, Route } from 'react-router-dom';
import { useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import InteractiveGrid from './components/ui/InteractiveGrid';
import Footer from './components/Footer';

// Code Splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const DescubrimientoPage = lazy(() => import('./pages/DescubrimientoPage'));
const ModalManager = lazy(() => import('./components/ModalManager'));

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <main className="min-h-screen">
      <InteractiveGrid />

      <Navbar onOpenModal={openModal} />

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"></div>}>
        <Routes>
          <Route path="/" element={<HomePage onOpenModal={openModal} />} />
          <Route path="/descubrimiento" element={<DescubrimientoPage />} />
        </Routes>
      </Suspense>

      <Footer />

      <Suspense fallback={null}>
        {modalOpen && <ModalManager isOpen={modalOpen} onClose={closeModal} />}
      </Suspense>

    </main>
  )
}

export default App;