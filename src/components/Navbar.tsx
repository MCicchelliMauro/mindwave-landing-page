import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link

// Definimos los props que recibirá
interface NavbarProps {
  onOpenModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  return (
    <header className="sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          {/* El logo ahora es un Link que te lleva al inicio */}
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-black tracking-wider text-white">MINDWAVE</span>
          </Link>
        </div>
        
        <div className="flex flex-1 justify-end">
            {/* El CTA ahora es un botón que abre el modal */}
            <button 
                onClick={onOpenModal}
                className="text-sm font-bold leading-6 text-slate-900 bg-lime-400 hover:bg-lime-300 py-2.5 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-lime-400/50"
            >
                DESAFÍANOS
            </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;