import { motion } from "framer-motion";

export function AnimatedBackground() {
  // Definimos la configuración de transición una vez para reusarla
  const transitionSettings = {
    duration: 12, // Muy lento (25 segundos por ciclo)
    repeat: Infinity,
    repeatType: "reverse", // Va y vuelve suavemente
    ease: "easeInOut", // Aceleración y desaceleración suave
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      
      {/* --- BLOB 1: Verde/Turquesa (Superior Izquierda) --- */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full top-[-200px] left-[-200px]"
        style={{
          // Usamos un degradado radial con alpha para que el centro sea más intenso
          background: 'radial-gradient(circle, rgba(45, 212, 190, 1) 0%, rgba(16, 185, 129, 0.3) 60%, transparent 70%)',
          filter: 'blur(90px)', // Mucho blur para que sea difuso
          mixBlendMode: 'screen', // Ayuda a que los colores se mezclen bonito
        }}
        // Animamos en múltiples puntos para un camino "errante"
        animate={{
          x: [0, 150, -50, 80, 0], 
          y: [0, -80, 100, -40, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
          rotate: [0, 45, -20, 0] // Un poco de rotación sutil
        }}
        transition={transitionSettings}
      />

      {/* --- BLOB 2: Morado/Azul (Inferior Derecha) --- */}
      {/* Agregamos un segundo para contraste y profundidad */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bottom-[-150px] right-[-150px]"
        style={{
          background: 'radial-gradient(circle, rgba(138, 92, 246, 0.95) 0%, rgba(59, 130, 246, 0.25) 60%, transparent 70%)',
          filter: 'blur(100px)',
          mixBlendMode: 'screen',
        }}
        // Diferentes valores y duración para que no se muevan igual
        animate={{
          x: [0, -100, 60, -20, 0],
          y: [0, 70, -90, 40, 0],
          scale: [0.9, 1.15, 1, 1.1, 0.9],
        }}
        transition={{
          ...transitionSettings,
          duration: 15, // Duración diferente para desincronizar
          delay: 2, // Un pequeño retraso inicial
        }}
      />

    </div>
  );
}