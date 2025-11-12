import React from 'react';
// Ya no necesitamos useState, AnimatePresence, o ContactModal aquí

// ... (SocialIcons se mantiene igual) ...
const SocialIcons = {
  email: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  linkedin: (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  twitter: (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
};

// Definimos los props que recibirá
interface ContactSectionProps {
  onOpenModal: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ onOpenModal }) => {
  // Quitamos toda la lógica de useState
  
  return (
    <> {/* El Fragment <> sigue siendo útil por si acaso, aunque ya no es 100% necesario */}
      <section id="contact" className="relative isolate py-24 sm:py-32">
        {/* ... (gradiente de fondo se mantiene igual) ... */}
        <div
          className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-200 aspect-square rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(163, 230, 53, 0.1), transparent 60%)'
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center opacity-0 animate-fade-in-up">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              ¿LISTO PARA ROMPER EL MOLDE?
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Nuestro proceso de IA comienza con tu idea. Danos el brief inicial y te enviaremos nuestro cuestionario de descubrimiento detallado.
            </p>
          </div>

          {/* Botón que abre el Modal */}
          <div className="mt-10 flex justify-center opacity-0 animate-fade-in-up delay-200">
            <button
              onClick={onOpenModal}
              className="rounded-full bg-lime-400 px-8 py-4 text-lg font-bold text-slate-900 shadow-lg shadow-lime-400/20 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-lime-300 hover:shadow-xl hover:shadow-lime-400/40"
            >
              Comenzar Proyecto
            </button>
          </div>

          {/* ... (iconos de redes sociales se mantienen igual) ... */}
          <div className="mt-12 text-center opacity-0 animate-fade-in-up delay-400">
            <p className="text-slate-400">O contáctanos por otros medios:</p>
            <div className="mt-6 flex items-center justify-center gap-x-8">
              <a href="mailto:hola@mindwave.tech" className="text-slate-400 hover:text-lime-400 transition-colors" aria-label="Email">
                  {SocialIcons.email}
              </a>
              <a href="#" className="text-slate-400 hover:text-lime-400 transition-colors" aria-label="LinkedIn">
                  {SocialIcons.linkedin}
              </a>
              <a href="#" className="text-slate-400 hover:text-lime-400 transition-colors" aria-label="Twitter">
                  {SocialIcons.twitter}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* YA NO RENDERIZAMOS EL MODAL AQUÍ */}
    </>
  );
};

export default ContactSection;