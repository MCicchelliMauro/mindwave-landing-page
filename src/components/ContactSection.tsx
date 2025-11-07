import React from 'react';

// Icons for social links
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

const ContactSection: React.FC = () => {
  return (
    <div className="relative isolate py-24 sm:py-32">
       {/* Abstract background gradient */}
        <div 
          className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div 
            className="relative left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[50rem] aspect-square rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(163, 230, 53, 0.1), transparent 60%)'
            }}
          />
        </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center animate-fadeInUp opacity-0" style={{ animationFillMode: 'forwards', animationDuration: '0.8s' }}>
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            ¿LISTO PARA ROMPER EL MOLDE?
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Nuestra Product Owner y nuestro Lead Tech te esperan. 30 minutos. Sin compromiso. Mucho valor.
          </p>
        </div>
        
        <div 
            className="mt-16 mx-auto w-full max-w-3xl h-[400px] md:h-[500px] rounded-2xl border-2 border-dashed border-lime-400/40 bg-slate-800/20 flex items-center justify-center animate-fadeInUp opacity-0"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards', animationDuration: '0.8s' }}
        >
          <div className="text-center">
            <p className="font-mono text-lg text-lime-400 animate-pulse">
              CALENDLY WIDGET LOADING...
            </p>
            <p className="text-sm text-slate-500 mt-2">(Aquí se cargaría el widget para agendar)</p>
          </div>
        </div>

        <div 
            className="mt-12 text-center animate-fadeInUp opacity-0"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards', animationDuration: '0.8s' }}
        >
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
    </div>
  );
};

export default ContactSection;