import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'CRM-Gimmaster',
    category: 'Gestión Deportiva · B2B SaaS',
    description: 'Sistema SaaS de alto rendimiento para la administración integral de gimnasios y centros de fitness. Cobros recurrentes y links de pago con Mercado Pago, control de accesos por QR, Lead Scoring con IA y panel de métricas financieras (MRR, KPIs).',
    techStack: ['React', 'Node.js', 'MercadoPago', 'OpenAI', 'RBAC'],
    imageGradient: 'from-emerald-500 to-teal-900',
  },
  {
    id: 2,
    title: 'MenuFlow AI',
    category: 'Marketing Automation · B2B SaaS',
    description: 'Solución SaaS que automatiza las campañas de marketing digital de restaurantes. Se integra con sistemas de punto de venta y redes sociales para generar promociones personalizadas, gestionar reservas y analizar el rendimiento desde un panel centralizado.',
    techStack: ['React', 'Node.js', 'Meta API', 'WhatsApp API', 'Analytics'],
    imageGradient: 'from-orange-500 to-amber-900',
  },
  {
    id: 3,
    title: 'SynthVoice',
    category: 'VoiceTech · B2B/B2C SaaS',
    description: 'Plataforma SaaS de IA para traducción, síntesis y clonación de voz en tiempo real con muy baja latencia. Orquesta WebRTC vía LiveKit con un pipeline completo: Whisper (transcripción) → Qwen (traducción) → CosyVoice (TTS) → RVC (clonación de voz), con soporte de barge-in.',
    techStack: ['LiveKit', 'WebRTC', 'Whisper', 'CosyVoice', 'RVC'],
    imageGradient: 'from-violet-600 to-indigo-900',
  },
  {
    id: 4,
    title: 'SynthVoice S2ST',
    category: 'IA y Comunicaciones · Speech-to-Speech',
    description: 'Orquestador de muy baja latencia para traducción de voz a voz en tiempo real (S2ST pipeline). Usa WebRTC (LiveKit) para el audio en vivo y procesa las señales con modelos avanzados de IA para romper la barrera del idioma con mínima latencia de procesamiento.',
    techStack: ['Python', 'LiveKit', 'Qwen', 'Whisper Streaming', 'WebRTC'],
    imageGradient: 'from-fuchsia-600 to-purple-900',
  },
];

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const moveSlider = (index: number) => {
    if (!sliderRef.current) return;
    gsap.to(sliderRef.current, {
      xPercent: -100 * index,
      duration: 0.8,
      ease: 'power3.out'
    });
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % projects.length;
    moveSlider(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + projects.length) % projects.length;
    moveSlider(newIndex);
  };

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      duration: 1
    });
  }, { scope: sectionRef });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    moveSlider(currentIndex);
  }, [currentIndex]);

  return (
    <section ref={sectionRef} id="projects" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-2xl lg:mx-0 mb-16">
          <h2 className="text-base font-semibold leading-7 text-mindwave-cyan">NUESTRO TRABAJO</h2>
          <p className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Proyectos que definen el mañana.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl touch-pan-y">
            <div
              ref={sliderRef}
              className="flex w-full will-change-transform"
              style={{ userSelect: 'none' }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="w-full shrink-0 px-4 md:px-12 box-border flex justify-center"
                >
                  <article
                    className="w-full max-w-4xl relative isolate flex flex-col gap-8 lg:flex-row overflow-hidden rounded-3xl bg-slate-900/60 px-8 py-8 sm:px-12 sm:py-12 border border-slate-800 hover:border-mindwave-cyan/50 transition-all duration-500 ease-out group"
                  >
                    <div className="absolute inset-0 -z-10 backdrop-blur-md bg-slate-900/60" />

                    <div className={`aspect-video w-full lg:w-1/2 rounded-2xl overflow-hidden bg-gradient-to-br ${project.imageGradient} flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500 shadow-2xl`}>
                      <div className="text-center px-4">
                        <span className="text-white/20 text-4xl sm:text-5xl font-black uppercase tracking-widest opacity-50">
                          {project.title.substring(0, 2)}
                        </span>
                      </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
                      <div className="flex items-center gap-x-4 text-xs">
                        <span className="relative z-10 rounded-full bg-slate-800 px-3 py-1.5 font-medium text-slate-300 border border-slate-700">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="mt-3 text-3xl font-black leading-tight text-white group-hover:text-mindwave-cyan transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="mt-4 text-lg leading-relaxed text-slate-300">
                        {project.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="inline-flex items-center rounded-md bg-mindwave-navy/80 px-2 py-1 text-xs font-medium text-mindwave-cyan ring-1 ring-inset ring-mindwave-cyan/30">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-slate-800/50 hover:bg-mindwave-cyan/20 border border-slate-700 hover:border-mindwave-cyan/50 text-white transition-all group"
              aria-label="Anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <div className="flex gap-2">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => moveSlider(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-8 bg-mindwave-cyan' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
                  aria-label={`Ir a proyecto ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-slate-800/50 hover:bg-mindwave-cyan/20 border border-slate-700 hover:border-mindwave-cyan/50 text-white transition-all group"
              aria-label="Siguiente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
