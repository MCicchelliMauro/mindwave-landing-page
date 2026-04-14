import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Definimos los props que recibirá
interface HeroSectionProps {
  onOpenModal: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
  const containerRef = useRef<HTMLElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Timeline de entrada
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(blobRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 1.5,
      ease: 'elastic.out(1, 0.5)'
    })
      .from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1
      }, '-=1')
      .from(textRef.current, {
        y: 30,
        opacity: 0,
        duration: 1
      }, '-=0.6')
      .from(buttonRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }, '-=0.8');

  }, { scope: containerRef });

  // Efecto Parallax con el mouse (Optimizado con rAF)
  const xTo = useRef<number>(0);
  const yTo = useRef<number>(0);

  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      // Calcular valor destino
      xTo.current = (clientX / window.innerWidth - 0.5) * 30;
      yTo.current = (clientY / window.innerHeight - 0.5) * 30;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (blobRef.current) {
            gsap.to(blobRef.current, {
              x: xTo.current,
              y: yTo.current,
              duration: 2,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative isolate px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center text-center" style={{ minHeight: 'calc(100vh - 88px)' }}>

        {/* Fondo: Blob Gradiente */}
        <div
          ref={blobRef}
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
          <h1 ref={titleRef} className="text-4xl font-black tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
            ARQUITECTOS DE LA REVOLUCIÓN DIGITAL.
          </h1>
          <p ref={textRef} className="mt-6 text-lg leading-8 text-slate-300 max-w-3xl mx-auto">
            Fusionamos Inteligencia Artificial con experiencia humana para crear productos que rompen el mercado.
          </p>
          <div ref={buttonRef} className="mt-10">
            {/* El CTA ahora es un botón que abre el modal */}
            <button
              onClick={onOpenModal}
              className="rounded-full bg-lime-400 px-8 py-4 text-lg font-bold text-slate-900 shadow-lg shadow-lime-400/20 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-lime-300 hover:shadow-xl hover:shadow-lime-400/40"
            >
              INICIA EL CAMBIO
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;