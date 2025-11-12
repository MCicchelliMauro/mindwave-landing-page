import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DescubrimientoPage from './pages/DescubrimientoPage';
import ContactModal from './components/ContactModal'; // Importar el modal aquí

function App() {
  // El estado del modal AHORA VIVE AQUÍ
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <main className="min-h-screen bg-mindwave-navy bg-tech-grid">
      
      {/* Pasamos la función 'openModal' al Navbar */}
      <Navbar onOpenModal={openModal} />
      
      <Routes>
        {/* Pasamos la función 'openModal' al HomePage */}
        <Route path="/" element={<HomePage onOpenModal={openModal} />} />
        
        <Route path="/descubrimiento" element={<DescubrimientoPage />} />
      </Routes>

      {/* El modal se renderiza aquí, controlado por el estado de App */}
      <AnimatePresence>
        {modalOpen && <ContactModal handleClose={closeModal} />}
      </AnimatePresence>

    </main>
  )
}

export default App;