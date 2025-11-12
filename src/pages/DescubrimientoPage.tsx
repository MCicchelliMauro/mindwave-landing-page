import React from 'react';
import { motion } from 'framer-motion';

const TallyIcon = () => (
  <svg width="40" height="40" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H256V256H0V0Z" fill="#1B1B1B"/>
    <path d="M80 80H176V112H80V80Z" fill="white"/>
    <path d="M80 144H176V176H80V144Z" fill="white"/>
  </svg>
);

const DescubrimientoPage: React.FC = () => {
  return (
    <section className="relative isolate px-6 lg:px-8 py-24 sm:py-32">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
        
        {/* Header */}
        <motion.div
          className="opacity-0 animate-fade-in-up"
        >
          <div className="flex justify-center">
            <TallyIcon />
          </div>
          <h1 className="mt-8 text-4xl font-black tracking-tighter text-white sm:text-6xl">
            Cuestionario de Descubrimiento
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
            Este es el Paso 2. Tómate 10-15 minutos para darnos la información clave que necesitamos para entender tu proyecto a fondo.
          </p>
        </motion.div>

        {/* Contenedor del Formulario Tally */}
        <motion.div
          className="mt-16 w-full opacity-0 animate-fade-in-up delay-200"
          style={{ minHeight: '800px' }}
        >
          {/* 👇 ACCIÓN PARA ALEJANDRA/CEO: 
            1. Ir a Tally.so, crear el formulario.
            2. Obtener el link para "Embed" (Incrustar).
            3. Reemplazar este div con el código de embed de Tally (usualmente un <iframe>).
          */}
          <div className="w-full h-full min-h-[800px] rounded-2xl border-2 border-dashed border-mindwave-lime/40 bg-slate-800/20 flex flex-col items-center justify-center text-center p-8">
            <TallyIcon />
            <p className="mt-4 font-mono text-lg text-mindwave-lime animate-pulse">
              TALLY FORM EMBED LOADING...
            </p>
            <p className="text-sm text-slate-500 mt-2">
              (Aquí se cargará el formulario de descubrimiento creado en Tally.so)
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default DescubrimientoPage;