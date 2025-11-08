import React from 'react';

const services = [
  {
    name: 'AI Native Products',
    description: 'Integración profunda de modelos de IA para crear soluciones que aprenden, se adaptan y evolucionan.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-lime-400">
        <path d="M12 2V6"/><path d="M12 18V22"/><path d="M4.93 4.93L7.76 7.76"/><path d="M16.24 16.24L19.07 19.07"/><path d="M2 12H6"/><path d="M18 12H22"/><path d="M4.93 19.07L7.76 16.24"/><path d="M16.24 7.76L19.07 4.93"/>
      </svg>
    ),
  },
  {
    name: 'Radical UX/UI',
    description: 'Diseñamos interfaces que desafían las convenciones, priorizando la audacia y la funcionalidad intuitiva.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-lime-400">
        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
      </svg>
    ),
  },
  {
    name: 'Full-Stack Heavy Lifting',
    description: 'Construimos la columna vertebral de tu producto con arquitecturas robustas, seguras y masivamente escalables.',
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-lime-400">
        <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M17 3v18"/><path d="M3 7h18"/><path d="M3 17h18"/>
       </svg>
    ),
  },
  {
    name: 'Growth Hacking',
    description: 'Implementamos estrategias de adquisición no convencionales para un crecimiento exponencial y sostenible.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-lime-400">
        <path d="M3 17L9 11L13 15L21 7"/><path d="M14 7H21V14"/>
      </svg>
    ),
  },
]

const Services: React.FC = () => {
  return (
    <div className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center opacity-0 animate-fade-in-up">
          <h2 className="text-base font-semibold leading-7 text-lime-400">NUESTROS CAMPOS DE BATALLA</h2>
          <p className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Donde la innovación se vuelve un arma.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
            {services.map((service, index) => (
              <div 
                key={service.name} 
                // Usamos un estilo en línea SOLO para el delay dinámico del mapeo, es aceptable aquí.
                className="flex flex-col p-8 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-lime-400/50 transition-all duration-300 ease-in-out transform hover:-translate-y-2 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }} 
                >
                <dt className="flex items-center gap-x-4">
                  <div className="p-2 rounded-lg bg-slate-800/80 text-lime-400 border border-slate-700">{service.icon}</div>
                  <span className="text-xl font-black text-white">{service.name}</span>
                </dt>
                <dd className="mt-4 text-base leading-7 text-slate-400">
                  {service.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Services;