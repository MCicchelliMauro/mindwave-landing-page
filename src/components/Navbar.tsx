import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onOpenModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldBeScrolled = window.scrollY > 20;
          setIsScrolled(prev => {
            if (prev !== shouldBeScrolled) return shouldBeScrolled;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-slate-900/60 backdrop-blur-md border-b border-slate-800 shadow-lg'
        : 'bg-transparent'
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 px-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-3 group">
            <span className="text-2xl font-black tracking-wider text-white">MINDWAVE</span>
          </Link>
        </div>

        <div className="flex flex-1 justify-end">
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