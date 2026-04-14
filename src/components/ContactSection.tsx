import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  onOpenModal: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ onOpenModal }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(contentRef.current?.children || [], {
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, { scope: sectionRef });

  return (
    <>
      <section ref={sectionRef} id="contact" className="relative isolate py-24 sm:py-32">
        {/* Gradiente de fondo sutil */}
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

        <div ref={contentRef} className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              ¿LISTO PARA ROMPER EL MOLDE?
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Nuestro proceso comienza con tu idea. Danos el brief inicial y te enviaremos nuestro cuestionario de descubrimiento detallado.
            </p>
          </div>

          {/* Botón que abre el Modal */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={onOpenModal}
              className="rounded-full bg-lime-400 px-8 py-4 text-lg font-bold text-slate-900 shadow-lg shadow-lime-400/20 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-lime-300 hover:shadow-xl hover:shadow-lime-400/40"
            >
              Comenzar Proyecto
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;