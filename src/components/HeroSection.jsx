import { AnimatedBackground } from './AnimatedBackground';
import { motion } from "framer-motion";
import ModelViewer from './ModelViewer';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[100vh] flex items-center overflow-hidden bg-slate-950 light:bg-slate-50 transition-colors duration-300">
      
      {/* Degradado inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 light:from-slate-50 to-transparent z-20 pointer-events-none"></div>
      
      {/* --- FONDO --- */}
      <img 
        src="/background.webp" 
        alt="Laboratorio Background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-100" 
      />
      <img 
        src="/Agrupar.svg" 
        alt="Pattern" 
        className="absolute inset-0 w-full h-full object-cover z-0 mix-blend-overlay" 
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-slate-900/30 to-slate-900/10 z-0" />
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
      </div>

      {/* --- CONTENIDO --- */}
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* COLUMNA IZQUIERDA */}
          <div className="text-left space-y-8 pl-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img src="/logotipo.svg" alt="InnocapsLab" className="w-125 mb-6 mt-12" />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-slate-300 w-full lg:w-125 leading-relaxed"
            >
Desarrollamos ingredientes funcionales y aditivos biotecnológicos nanoencapsulados que transforman tus materias primas. Como tu partner estratégico, ofrecemos soluciones de innovación accesibles y escalables para potenciar la capacidad científica y competitividad de tu empresa.            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-full transition-all shadow-lg shadow-teal-500/20">
                Descubre más
              </button>
            </motion.div>
          </div>

          {/* COLUMNA DERECHA: Limpia, solo el modelo */}
          {/* COLUMNA DERECHA */}
<div className="flex justify-center lg:justify-end items-center relative h-full min-h-[400px] md:min-h-[550px] lg:min-h-[600px]">
    
    {/* 1. Aumentamos el Glow de fondo para que no quede pequeño */}
    <div className="absolute w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
    
    {/* Contenedor del Modelo 3D */}
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="relative w-full max-w-[280px] md:max-w-lg lg:max-w-2xl xl:max-w-3xl aspect-square z-10"
    >
       <ModelViewer />
    </motion.div>

    {/* Indicador de interacción */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-slate-400 text-sm select-none pointer-events-none z-20"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ x: [0, 6, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </motion.svg>
      <span>Arrastra para rotar</span>
    </motion.div>
</div>

        </div>
      </div>
    </section>
  );
}