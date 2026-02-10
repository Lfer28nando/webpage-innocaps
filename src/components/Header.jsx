import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Efecto para detectar scroll y cambiar el estilo
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cargar tema guardado
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setIsDark(saved === 'dark');
      document.documentElement.classList.toggle('light', saved === 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('light', !newTheme);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div 
          className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${
            scrolled 
              ? 'bg-slate-900/80 backdrop-blur-md border border-slate-700/50 shadow-lg' 
              : 'bg-transparent border border-transparent'
          }`}
        >
          {/* --- LOGO --- */}
          <div className="flex items-center gap-2">
            {/* Logo de Innocaps (Simulado con texto/icono por ahora) */}
           <img src="/logo.svg" alt="InnocapsLab Logo" className="w-10 h-10" />
          </div>

          {/* --- MENÚ DE ESCRITORIO --- */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Tecnología', href: '/tecnologia' },
              { label: 'Soluciones', href: '#soluciones' },
              { label: 'Nosotros', href: '#nosotros' },
              { label: 'Proceso', href: '#proceso' },
            ].map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* --- BOTONES DE ACCIÓN --- */}
          <div className="hidden md:flex items-center gap-3">
            {/* Botón de tema */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 hover:border-teal-500/50 transition-all group"
              aria-label="Cambiar tema"
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400 group-hover:text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700 group-hover:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            <button className="px-5 py-2 bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-slate-900 border border-teal-500/50 hover:border-teal-500 rounded-full text-sm font-bold transition-all">
              Contactar
            </button>
          </div>

          {/* --- MENÚ MÓVIL (HAMBURGUESA) --- */}
          <button className="md:hidden text-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
}