import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <path d="m9 11 3 3L22 4"/>
  </svg>
);

// URL del webhook de n8n — configurar en .env.local como VITE_N8N_CONTACTO_URL
// Ejemplo: https://tu-n8n.tudominio.com/webhook/mindwave-contacto
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_CONTACTO_URL as string | undefined;

interface ContactModalProps {
  handleClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ handleClose }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    // Si no hay webhook configurado, simulamos éxito y navegamos
    if (!N8N_WEBHOOK_URL) {
      console.warn('VITE_N8N_CONTACTO_URL no está configurada. Simulando envío.');
      setStatus('success');
      setTimeout(() => {
        handleClose();
        navigate('/descubrimiento');
      }, 1800);
      return;
    }

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      setStatus('success');
      setTimeout(() => {
        handleClose();
        navigate('/descubrimiento');
      }, 1800);
    } catch (err) {
      console.error('Error al enviar formulario:', err);
      setStatus('error');
      setErrorMsg('Hubo un problema al enviar. Por favor, intentá de nuevo.');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={status !== 'loading' ? handleClose : undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          className="relative w-full max-w-lg rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 p-8 shadow-2xl shadow-black/30"
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {status !== 'loading' && (
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
              aria-label="Cerrar modal"
            >
              <XIcon />
            </button>
          )}

          {/* Estado: Éxito */}
          {status === 'success' ? (
            <motion.div
              className="flex flex-col items-center justify-center text-center py-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-mindwave-lime mb-4">
                <CheckIcon />
              </div>
              <h3 className="text-2xl font-black text-white">¡Recibido!</h3>
              <p className="mt-2 text-slate-400">Te redirigimos al cuestionario de descubrimiento...</p>
            </motion.div>
          ) : (
            <>
              <h3 className="text-3xl font-black text-white">Inicia la conversación.</h3>
              <p className="mt-2 text-slate-400">Paso 1 de 2: Cuéntanos tu idea. Continuaremos con el cuestionario de descubrimiento.</p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-slate-300">Tu Nombre</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    disabled={status === 'loading'}
                    className="mt-2 block w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-white shadow-sm focus:border-mindwave-lime focus:ring focus:ring-mindwave-lime focus:ring-opacity-50 disabled:opacity-60"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium text-slate-300">Tu Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    disabled={status === 'loading'}
                    className="mt-2 block w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-white shadow-sm focus:border-mindwave-lime focus:ring focus:ring-mindwave-lime focus:ring-opacity-50 disabled:opacity-60"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium text-slate-300">Tu idea (en resumen)</label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    disabled={status === 'loading'}
                    className="mt-2 block w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-white shadow-sm focus:border-mindwave-lime focus:ring focus:ring-mindwave-lime focus:ring-opacity-50 disabled:opacity-60"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-400 bg-red-900/20 border border-red-800/50 rounded-lg px-4 py-3">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full rounded-full bg-mindwave-lime px-8 py-4 text-lg font-bold text-slate-900 shadow-lg shadow-mindwave-lime/20 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-lime-300 hover:shadow-xl hover:shadow-mindwave-lime/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === 'loading' ? 'Enviando...' : 'Enviar y Continuar'}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactModal;
