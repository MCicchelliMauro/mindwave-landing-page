import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative isolate px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center text-center" style={{ minHeight: 'calc(100vh - 88px)' }}>
        
        {/* Gradiente central (Hero glow) */}
        <div 
          className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div 
            className="relative left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-160 md:w-240 aspect-square rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.1), transparent 70%)'
            }}
          />
        </div>

        <div>
          {/* Aplicando la nueva clase de animación y opacity-0 por defecto para que no parpadee al cargar */}
          <h1 className="text-4xl font-black tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl opacity-0 animate-fade-in-up">
            ARQUITECTOS DE LA REVOLUCIÓN DIGITAL.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300 max-w-3xl mx-auto opacity-0 animate-fade-in-up delay-200">
            Fusionamos Inteligencia Artificial con experiencia humana para crear productos que rompen el mercado.
          </p>
          <div className="mt-10 opacity-0 animate-fade-in-up delay-400">
            <a
              href="#contact"
              className="rounded-full bg-lime-400 px-8 py-4 text-lg font-bold text-slate-900 shadow-lg shadow-lime-400/20 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-lime-300 hover:shadow-xl hover:shadow-lime-400/40"
            >
              INICIA EL CAMBIO
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;