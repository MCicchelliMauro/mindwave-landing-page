import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <main className="relative isolate px-6 lg:px-8">
      {/* Contenedor para centrar el contenido y ocupar la altura de la pantalla menos la barra de navegación */}
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center text-center" style={{ minHeight: 'calc(100vh - 88px)' }}> {/* 88px es la altura aprox. de la navbar */}
        
        {/* Gradiente de fondo abstracto */}
        <div 
          className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div 
            className="relative left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[50rem] aspect-square rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15), transparent 60%)'
            }}
          />
        </div>

        {/* Contenido animado */}
        <div>
          <h1 
            className="text-4xl font-black tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl animate-fadeInUp opacity-0"
            style={{ animationFillMode: 'forwards', animationDuration: '0.8s' }}
          >
            ARQUITECTOS DE LA REVOLUCIÓN DIGITAL.
          </h1>
          <p 
            className="mt-6 text-lg leading-8 text-slate-300 max-w-3xl mx-auto animate-fadeInUp opacity-0" 
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards', animationDuration: '0.8s' }}
          >
            Fusionamos Inteligencia Artificial con experiencia humana para crear productos que rompen el mercado.
          </p>
          <div 
            className="mt-10 animate-fadeInUp opacity-0" 
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards', animationDuration: '0.8s' }}
          >
            <a
              href="#"
              className="rounded-full bg-lime-400 px-8 py-4 text-lg font-bold text-slate-900 shadow-lg shadow-lime-400/20 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-lime-300 hover:shadow-xl hover:shadow-lime-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
            >
              INICIA EL CAMBIO
            </a>
          </div>
        </div>

      </div>
    </main>
  );
};

export default HeroSection;