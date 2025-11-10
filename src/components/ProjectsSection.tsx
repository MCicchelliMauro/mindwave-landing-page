import React from 'react';

const projects = [
  {
    id: 1,
    title: 'Tu Data Astral',
    category: 'SaaS / AI Product',
    description: 'No es otro horóscopo genérico. Es una plataforma de autoconocimiento profundo que fusiona la sabiduría astrológica milenaria con modelos de lenguaje (LLMs) afinados por expertos. Generación de cartas natales evolutivas con precisión matemática y profundidad psicológica.',
    techStack: ['React', 'Node.js', 'Google Gemini AI', 'Tailwind CSS'],
    // Usamos un gradiente como placeholder por ahora, luego pondremos una captura real
    imageGradient: 'from-violet-600 to-indigo-900',
  }
  // Aquí añadiremos más proyectos en el futuro
];

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header de la sección */}
        <div className="mx-auto max-w-2xl lg:mx-0 opacity-0 animate-fade-in-up">
          <h2 className="text-base font-semibold leading-7 text-mindwave-cyan">NUESTRO ORGULLO</h2>
          <p className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Construyendo el futuro, <br />una línea de código a la vez.
          </p>
        </div>

        {/* Lista de Proyectos */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-1">
          {projects.map((project) => (
            <article 
              key={project.id}
              className="relative isolate flex flex-col gap-8 lg:flex-row overflow-hidden rounded-3xl bg-slate-900/40 px-8 py-8 sm:px-12 sm:py-12 border border-slate-800 hover:border-mindwave-cyan/50 transition-all duration-500 ease-out group opacity-0 animate-fade-in-up delay-300"
            >
              {/* Efecto Glassmorphism de fondo */}
              <div className="absolute inset-0 -z-10 backdrop-blur-md bg-slate-900/40" />

              {/* Columna de Imagen (Placeholder) */}
              {/* CORRECCIÓN AQUÍ: bg-linear-to-br */}
              <div className={`aspect-video w-full lg:w-1/2 rounded-2xl overflow-hidden bg-linear-to-br ${project.imageGradient} flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500`}>
                 {/* Aquí iría una etiqueta img real. Por ahora, un texto placeholder elegante */}
                 <div className="text-center px-4">
                    <span className="text-white/20 text-4xl sm:text-6xl font-black uppercase tracking-widest opacity-50">
                      {project.title}
                    </span>
                 </div>
              </div>

              {/* Columna de Contenido */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-x-4 text-xs">
                  <span className="relative z-10 rounded-full bg-slate-800 px-3 py-1.5 font-medium text-slate-300">
                    {project.category}
                  </span>
                </div>
                <h3 className="mt-3 text-3xl font-black leading-6 text-white group-hover:text-mindwave-cyan transition-colors duration-300">
                    {project.title}
                </h3>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  {project.description}
                </p>
                
                {/* Stack Tecnológico */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="inline-flex items-center rounded-md bg-mindwave-navy/50 px-2 py-1 text-xs font-medium text-mindwave-cyan ring-1 ring-inset ring-mindwave-cyan/20">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Botón de acción futura */}
                <div className="mt-10 flex">
                    <button className="text-sm font-bold leading-6 text-mindwave-lime flex items-center gap-2 hover:gap-3 transition-all duration-300 cursor-not-allowed opacity-80" disabled>
                        VER CASO DE ESTUDIO <span aria-hidden="true">→</span>
                        <span className="text-xs font-normal text-slate-500">(Próximamente)</span>
                    </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;