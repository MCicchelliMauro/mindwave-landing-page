import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Bot, Store, Rocket, Briefcase, ShoppingBag, RefreshCw } from 'lucide-react';
import TiltCard from './ui/TiltCard';
import ServiceModal, { ServiceData } from './ServiceModal';

gsap.registerPlugin(ScrollTrigger);

const services: ServiceData[] = [
  {
    name: 'Chatbots & Automatizaciones',
    description: 'Atención 24/7 y flujos de trabajo inteligentes (n8n) que conectan tu negocio.',
    detailDescription: 'Automatiza lo aburrido para enfocarte en lo importante. Implementamos chatbots con IA que atienden clientes al instante y creamos flujos de trabajo con n8n que conectan tus apps (CRM, Google Sheets, Email) para que tu negocio funcione en piloto automático.',
    icon: <Bot className="h-8 w-8 text-mindwave-lime" />,
    benefits: [
      'Atención inmediata 24/7 (IA)',
      'Automatización de procesos (n8n)',
      'Integración de Apps (CRM, Email)',
      'Reducción de carga operativa'
    ]
  },
  {
    name: 'Sitios Webs para Comercios',
    description: 'Presencia digital robusta. Diseño profesional que transmite confianza y atrae clientes.',
    detailDescription: 'Más que una simple tarjeta de presentación digital. Desarrollamos un sitio web rápido, seguro y optimizado para Google (SEO), diseñado específicamente para generar confianza inmediata en quien te visita y posicionar tu comercio como líder en su zona.',
    icon: <Store className="h-8 w-8 text-mindwave-lime" />,
    benefits: [
      'Diseño responsive adaptado a móbiles',
      'Optimización SEO local',
      'Integración con Google Maps y WhatsApp',
      'Panel de administración fácil de usar'
    ]
  },
  {
    name: 'Landing Page',
    description: 'Páginas de alto impacto diseñadas para convertir visitantes en leads cualificados.',
    detailDescription: 'Diseño estratégico donde cada elemento, color y palabra tiene un único propósito: convertir visitantes en contactos valiosos. Ideal para lanzamientos de productos, ofertas especiales o campañas de publicidad pagada donde el ROI es crítico.',
    icon: <Rocket className="h-8 w-8 text-mindwave-lime" />,
    benefits: [
      'Estructura persuasiva probada',
      'Velocidad de carga ultrarrápida',
      'Llamadas a la acción (CTA) claras',
      'A/B Testing ready'
    ]
  },
  {
    name: 'Portfolios',
    description: 'Muestra tu trabajo con elegancia. Galerías interactivas que destacan tu talento.',
    detailDescription: 'Tu trabajo merece el mejor escenario posible. Creamos galerías inmersivas con animaciones fluidas que cuentan la historia de tus proyectos, resaltan tus habilidades y convencen a futuros clientes o empleadores de que eres la mejor opción.',
    icon: <Briefcase className="h-8 w-8 text-mindwave-lime" />,
    benefits: [
      'Galerías visuales de alta calidad',
      'Diseño minimalista y moderno',
      'Sección de biografía y contacto',
      'Integración con redes sociales'
    ]
  },
  {
    name: 'Tienda Online',
    description: 'Tu negocio abierto al mundo. E-commerce seguro y optimizado para ventas.',
    detailDescription: 'Vende sin límites geográficos ni horarios. Te entregamos una plataforma de e-commerce robusta con gestión de inventario intuitiva, carrito de compras optimizado para evitar abandonos y pasarelas de pago seguras integradas. Tu negocio funcionando y vendiendo 24/7.',
    icon: <ShoppingBag className="h-8 w-8 text-mindwave-lime" />,
    benefits: [
      'Pasarelas de pago seguras (MercadoPago, Stripe)',
      'Gestión de stock en tiempo real',
      'Panel de clientes y pedidos',
      'Notificaciones automáticas por email'
    ]
  },
  {
    name: 'Restructuración & Migración',
    description: 'Renueva tu sitio actual. Modernizamos tecnología y mejoramos el rendimiento.',
    detailDescription: '¿Tu web es lenta, insegura o se ve anticuada? No siempre necesitas empezar de cero. Analizamos tu plataforma actual, modernizamos su código base, mejoramos drásticamente su velocidad de carga y optimizamos la experiencia de usuario para adaptarla a los estándares actuales.',
    icon: <RefreshCw className="h-8 w-8 text-mindwave-lime" />,
    benefits: [
      'Auditoría completa de rendimiento',
      'Mejora de Core Web Vitals',
      'Migración segura de datos',
      'Actualización de seguridad y parches'
    ]
  },
];

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  useGSAP(() => {
    // Header Animation
    gsap.from(headerRef.current, {
      scrollTrigger: {
        trigger: headerRef.current,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Grid Items Animation
    const items = gsap.utils.toArray<HTMLElement>('.service-item', gridRef.current);
    gsap.from(items, {
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 75%'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.2)'
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={headerRef} className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-mindwave-lime">NUESTROS SERVICIOS</h2>
          <p className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Soluciones digitales que impulsan tu negocio
          </p>
        </div>
        <div ref={gridRef} className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.name}
                className="service-item cursor-pointer group"
                onClick={() => setSelectedService(service)}
              >
                <TiltCard className="flex flex-col h-full p-8 rounded-3xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 group-hover:border-mindwave-lime/50 transition-colors duration-300 relative overflow-hidden">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-mindwave-lime/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <dt className="flex items-center gap-x-4 relative z-10">
                    <div className="p-3 rounded-xl bg-slate-800/80 text-mindwave-lime border border-slate-700/50 shadow-lg shadow-mindwave-lime/10 group-hover:shadow-mindwave-lime/30 transition-shadow duration-300">
                      {service.icon}
                    </div>
                    <span className="text-xl font-bold text-white leading-tight group-hover:text-mindwave-lime transition-colors duration-300">
                      {service.name}
                    </span>
                  </dt>
                  <dd className="mt-6 text-base leading-7 text-slate-300 flex-grow relative z-10">
                    {service.description}
                  </dd>
                  <div className="mt-6 flex items-center text-sm font-medium text-mindwave-lime opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Ver más detalles <span aria-hidden="true" className="ml-2">→</span>
                  </div>
                </TiltCard>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <ServiceModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
};

export default Services;