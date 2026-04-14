import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 border-t border-slate-800 bg-slate-900/50 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="flex flex-col items-center">

                    <p className="text-slate-300 mb-6">Conecta con nosotros:</p>
                    <div className="flex items-center justify-center gap-x-8">
                        {/* Mail */}
                        <a href="mailto:hola@mindwave.tech" className="text-slate-300 hover:text-mindwave-cyan transition-colors transform hover:scale-110" aria-label="Email">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a href="#" className="text-slate-300 hover:text-pink-500 transition-colors transform hover:scale-110" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                            </svg>
                        </a>

                        {/* WhatsApp */}
                        <a href="#" className="text-slate-300 hover:text-green-500 transition-colors transform hover:scale-110" aria-label="WhatsApp">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                                <path d="M9 10a.5.5 0 0 0 1 1c0 2 2 4 4 4a.5.5 0 0 0 1-1" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-10 text-center">
                    <p className="text-xs leading-5 text-slate-400">
                        &copy; {currentYear} Mindwave. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
