import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // <--- 1. Importar el hook de navegación

// Icono para el botón de cerrar
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);

interface ContactModalProps {
  handleClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ handleClose }) => {
  const navigate = useNavigate(); // <--- 2. Inicializar el hook

  // Efecto para evitar el scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // 3. ESTA FUNCIÓN ES LA SOLUCIÓN
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // <--- PREVIENE EL ENVÍO (POST) Y EL ERROR 404
    
    // Aquí iría la lógica de envío de datos (ej. Netlify, Formspark, etc.)
    // Como lo simulamos, simplemente cerramos el modal y navegamos.
    
    handleClose();
    navigate('/descubrimiento'); // Redirige a la página del formulario
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop (fondo) */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Panel del Modal */}
        <motion.div
          className="relative w-full max-w-lg rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 p-8 shadow-2xl shadow-black/30"
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Botón de Cerrar */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
            aria-label="Cerrar modal"
          >
            <XIcon />
          </button>

          <h3 className="text-3xl font-black text-white">Inicia la conversación.</h3>
          <p className="mt-2 text-slate-400">Paso 1 de 2: Cuéntanos tu idea. Te responderemos con el enlace a nuestro cuestionario de descubrimiento.</p>

          {/* 4. ASEGÚRATE DE USAR 'onSubmit' Y NO 'action' */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-slate-300">Tu Nombre</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-2 block w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-white shadow-sm focus:border-mindwave-lime focus:ring focus:ring-mindwave-lime focus:ring-opacity-50"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-slate-300">Tu Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-2 block w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-white shadow-sm focus:border-mindwave-lime focus:ring focus:ring-mindwave-lime focus:ring-opacity-50"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium text-slate-300">Tu idea (en resumen)</label>
              <textarea
                name="message"
                id="message"
                rows={4}
                required
                className="mt-2 block w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-white shadow-sm focus:border-mindwave-lime focus:ring focus:ring-mindwave-lime focus:ring-opacity-50"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full rounded-full bg-mindwave-lime px-8 py-4 text-lg font-bold text-slate-900 shadow-lg shadow-mindwave-lime/20 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-lime-300 hover:shadow-xl hover:shadow-mindwave-lime/40"
              >
                Enviar y Continuar
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactModal;