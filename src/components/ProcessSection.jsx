import { motion } from 'framer-motion';
import { useState } from 'react';
import { processSteps } from '../data/sectionsData';

// Componente de animación molecular mejorado y complejo
function VisualState({ state }) {
  
// Estado 1: Nanoencapsulación (Estilo Oval/Elíptico)
if (state === 'nanoencapsulation') {
  const radiusX = 120;
  const radiusY = 190;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-[400px] h-[500px] flex items-center justify-center"
      >
        {/* === NÚCLEO CENTRAL (SOL) === */}
        <motion.div 
          className="absolute z-10"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-300 via-orange-400 to-orange-600 rounded-full shadow-[0_0_60px_rgba(251,146,60,0.6)]" />
            {/* Reflejo giratorio */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* === GLOW PULSANTE DETRÁS DEL NÚCLEO === */}
        <motion.div
          className="absolute w-48 h-48 rounded-full z-0"
          style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.25) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* === ANILLOS ELÍPTICOS === */}
        {[0.5, 0.75, 1].map((scale, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-[50%]"
            style={{
              width: `${radiusX * 2 * scale}px`,
              height: `${radiusY * 2 * scale}px`,
              border: `2px solid rgba(20, 184, 166, ${i === 2 ? 0.8 : 0.3})`,
              boxShadow: i === 2 ? '0 0 15px rgba(20, 184, 166, 0.4)' : 'none',
            }}
            animate={{ 
              rotate: [0, 2, 0, -2, 0],
              scale: [1, 1.01, 1, 0.99, 1],
            }}
            transition={{ 
              duration: 8 + i * 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}

        {/* === PARTÍCULAS ORBITALES === */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((startAngle, i) => (
          <motion.div
            key={`orbiter-${i}`}
            className="absolute rounded-full"
            style={{
              top: '50%',
              left: '50%',
              width: i % 2 === 0 ? '2px' : '1.5px',
              height: i % 2 === 0 ? '2px' : '1.5px',
              backgroundColor: i % 2 === 0 ? 'rgb(94, 234, 212)' : 'rgb(34, 211, 238)',
              boxShadow: `0 0 ${i % 2 === 0 ? 8 : 5}px rgba(20, 184, 166, 0.8)`,
            }}
            animate={{
              x: [
                radiusX * 0.88 * Math.cos((startAngle) * Math.PI / 180),
                radiusX * 0.88 * Math.cos((startAngle + 90) * Math.PI / 180),
                radiusX * 0.88 * Math.cos((startAngle + 180) * Math.PI / 180),
                radiusX * 0.88 * Math.cos((startAngle + 270) * Math.PI / 180),
                radiusX * 0.88 * Math.cos((startAngle + 360) * Math.PI / 180),
              ],
              y: [
                radiusY * 0.88 * Math.sin((startAngle) * Math.PI / 180),
                radiusY * 0.88 * Math.sin((startAngle + 90) * Math.PI / 180),
                radiusY * 0.88 * Math.sin((startAngle + 180) * Math.PI / 180),
                radiusY * 0.88 * Math.sin((startAngle + 270) * Math.PI / 180),
                radiusY * 0.88 * Math.sin((startAngle + 360) * Math.PI / 180),
              ],
              opacity: [0.3, 1, 0.3, 1, 0.3],
            }}
            transition={{
              duration: 10 + (i % 3) * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.4,
            }}
          />
        ))}

        {/* === MOLÉCULAS EN EL PERÍMETRO EXTERIOR === */}
        {[...Array(20)].map((_, i) => {
          const angleDeg = (i * 360) / 20;
          const angleRad = (angleDeg * Math.PI) / 180;
          const x = radiusX * Math.cos(angleRad);
          const y = radiusY * Math.sin(angleRad);
          const rotation = angleDeg + 90;

          // Cada molécula tiene un leve "respirar" desfasado
          const breathDelay = i * 0.25;

          return (
            <motion.div
              key={`lipid-${i}`}
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
                marginLeft: '-4px',
                marginTop: '-10px',
              }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{
                x: x,
                y: y,
                rotate: rotation,
                opacity: 1,
                scale: 1,
              }}
              transition={{ 
                duration: 0.8,
                delay: i * 0.04,
                ease: "easeOut" 
              }}
            >
              <motion.div 
                className="flex flex-col items-center"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: breathDelay,
                }}
              >
                {/* Cabeza */}
                <div className="w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] z-20" />
                {/* Conector */}
                <div className="w-0.5 h-3 bg-teal-500/60" />
                {/* Cola */}
                <div className="w-1.5 h-1.5 bg-teal-600 rounded-full" />
              </motion.div>
            </motion.div>
          );
        })}

        {/* === ETIQUETA FLOTANTE === */}
        <motion.div
          className="absolute -top-12 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-teal-500/10 backdrop-blur-md rounded-full border border-teal-500/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <p className="text-teal-300 font-bold text-sm uppercase tracking-wider whitespace-nowrap">
            Protección Molecular
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
}

  // Estado 2: Biotecnología Aplicada (fermentación y biorreactor)
  if (state === 'biotech') {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-96 h-96"
        >
          {/* Biorreactor (contenedor principal) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="relative w-72 h-80 rounded-3xl border-4 border-cyan-500/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm overflow-hidden"
              style={{
                boxShadow: '0 0 40px rgba(6, 182, 212, 0.3), inset 0 0 40px rgba(6, 182, 212, 0.1)'
              }}
            >
              {/* Líquido de cultivo */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-500/40 via-teal-500/30 to-transparent"
                initial={{ height: '20%' }}
                animate={{ height: ['20%', '85%', '85%', '20%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Burbujas de fermentación */}
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={`bubble-${i}`}
                    className="absolute w-3 h-3 bg-cyan-300/60 rounded-full"
                    style={{
                      left: `${10 + (i * 6)}%`,
                      bottom: '5%'
                    }}
                    animate={{
                      y: [0, -300],
                      opacity: [0, 1, 1, 0],
                      scale: [0.5, 1, 1.2, 0]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>

              {/* Microorganismos (células) */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`cell-${i}`}
                  className="absolute w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${20 + Math.random() * 60}%`,
                    boxShadow: '0 0 10px rgba(52, 211, 153, 0.6)'
                  }}
                  animate={{
                    x: [0, Math.random() * 40 - 20, 0],
                    y: [0, Math.random() * 40 - 20, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}

              {/* Agitador central */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-gradient-to-b from-slate-600 to-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: 'center 10%' }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-600" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-1 h-32 bg-slate-600" />
              </motion.div>

              {/* Indicadores de control */}
              <div className="absolute top-4 left-4 space-y-2">
                {['pH', 'T°', 'O₂'].map((label, i) => (
                  <motion.div
                    key={label}
                    className="flex items-center gap-2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-xs text-cyan-300 font-mono">{label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Flujo de entrada/salida */}
          <motion.div
            className="absolute top-10 right-0 flex items-center gap-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-transparent" />
            <div className="text-xs text-teal-300">Input</div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-0 flex items-center gap-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <div className="text-xs text-cyan-300">Output</div>
            <div className="w-20 h-1 bg-gradient-to-l from-cyan-500 to-transparent" />
          </motion.div>

          {/* Etiqueta flotante */}
          <motion.div
            className="absolute -top-20 left-1/2 -translate-x-1/2 px-6 py-3 bg-cyan-500/10 backdrop-blur-md rounded-full border border-cyan-500/30"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-cyan-300 font-bold text-sm uppercase tracking-wider whitespace-nowrap">
              Fermentación de Precisión
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Estado 3: Secado Emergente (spray drying)
  if (state === 'drying') {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-96 h-96"
        >
          {/* Torre de secado */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Atomizador superior */}
            <motion.div className="relative">
              <div className="w-16 h-8 bg-gradient-to-b from-slate-600 to-slate-700 rounded-t-full border-2 border-slate-500" />
              
              {/* Spray de gotas */}
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`drop-${i}`}
                  className="absolute top-8 left-1/2 w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"
                  style={{
                    left: `${50 + (Math.random() - 0.5) * 100}%`,
                  }}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{
                    y: [0, 280],
                    x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 80],
                    opacity: [1, 0.8, 0],
                    scale: [1, 0.3, 0.1]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeIn"
                  }}
                />
              ))}
            </motion.div>

            {/* Cámara de secado */}
            <motion.div 
              className="relative w-64 h-80 mt-2 rounded-3xl border-4 border-blue-500/40 bg-gradient-to-b from-slate-800/60 to-slate-900/80 backdrop-blur-sm overflow-hidden"
              style={{
                boxShadow: '0 0 40px rgba(59, 130, 246, 0.2), inset 0 0 60px rgba(59, 130, 246, 0.05)'
              }}
            >
              {/* Aire caliente (ondas de calor) */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`heat-${i}`}
                  className="absolute left-0 right-0 h-2 bg-gradient-to-r from-transparent via-orange-400/20 to-transparent blur-sm"
                  style={{ top: `${20 + i * 15}%` }}
                  animate={{
                    x: ['-100%', '100%'],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4
                  }}
                />
              ))}

              {/* Partículas secándose */}
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: '20%',
                    boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)'
                  }}
                  animate={{
                    y: [0, 220],
                    opacity: [0, 1, 1],
                    scale: [0.5, 1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.08,
                    ease: "linear"
                  }}
                />
              ))}

              {/* Polvo acumulándose en el fondo */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/40 via-slate-200/20 to-transparent rounded-b-3xl"
                initial={{ height: '10%' }}
                animate={{ height: ['10%', '25%', '25%', '10%'] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Textura del polvo */}
                <div className="absolute inset-0 opacity-60">
                  {[...Array(50)].map((_, i) => (
                    <div
                      key={`powder-${i}`}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        bottom: `${Math.random() * 100}%`
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Indicadores de temperatura */}
              <div className="absolute top-4 right-4 space-y-2">
                <motion.div
                  className="flex items-center gap-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  <span className="text-xs text-orange-300 font-mono">180°C</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Salida de polvo */}
            <motion.div
              className="w-20 h-8 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-full border-2 border-slate-500 mt-2 relative overflow-hidden"
            >
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-gradient-to-b from-white to-slate-300"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Cristales de hielo (liofilización) */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`crystal-${i}`}
              className="absolute"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L10 18M2 10L18 10M5 5L15 15M15 5L5 15" stroke="rgba(147, 197, 253, 0.5)" strokeWidth="1.5" />
              </svg>
            </motion.div>
          ))}

          {/* Etiqueta flotante */}
          <motion.div
            className="absolute -top-20 left-1/2 -translate-x-1/2 px-6 py-3 bg-blue-500/10 backdrop-blur-md rounded-full border border-blue-500/30"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-blue-300 font-bold text-sm uppercase tracking-wider whitespace-nowrap">
              Secado Avanzado
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return null;
}

export default function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const getStateForIndex = (index) => {
    if (index === 0) return 'nanoencapsulation';
    if (index === 1) return 'biotech';
    return 'drying';
  };

  return (
    <section className="relative bg-slate-950 light:bg-slate-100 py-20 md:py-32 overflow-hidden transition-colors duration-300">
      {/* Degradado superior */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-950 light:from-slate-100 to-transparent z-20 pointer-events-none"></div>
      
      {/* Degradado inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 light:from-slate-100 to-transparent z-20 pointer-events-none"></div>
      
      {/* Fondo decorativo — hidden on mobile for perf */}
      <div className="hidden md:block absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-teal-500 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Grid de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(20, 184, 166, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 184, 166, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto relative z-10 px-5 md:px-2 md:max-w-[98%] lg:max-w-7xl sm:px-4 lg:px-6">
        {/* Título de sección */}
        <div className="text-center mb-10 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bold text-white mb-4 text-3xl md:text-5xl lg:text-7xl md:mb-6"
          >
            Nuestra <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400">Tecnología</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-3xl mx-auto text-base leading-[1.5] md:text-xl"
          >
            Tres pilares tecnológicos que transforman bioactivos en ingredientes funcionales superiores
          </motion.p>
        </div>

        {/* ── MOBILE: Vertical timeline with full cards ── */}
        <div className="md:hidden">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/60 via-cyan-500/40 to-blue-500/20" />

            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-14"
                >
                  {/* Timeline node */}
                  <div className="absolute left-3 top-5 w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/30 z-10">
                    <span className="text-slate-900 text-xs font-bold">{step.id}</span>
                  </div>

                  {/* Card */}
                  <div className="bg-slate-900/70 border border-slate-700/50 rounded-2xl p-5 space-y-3">
                    {/* Header row */}
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{step.icon}</span>
                      <div>
                        <p className="text-[10px] text-teal-400 font-bold tracking-widest uppercase">Paso {step.id}</p>
                        <h3 className="text-lg font-bold text-white leading-tight">{step.title}</h3>
                      </div>
                    </div>

                    {/* Subtitle */}
                    <h4 className="text-sm font-semibold bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                      {step.subtitle}
                    </h4>

                    {/* Description */}
                    <p className="text-sm text-slate-300 leading-[1.6]">{step.description}</p>

                    {/* Benefits */}
                    {step.benefits && (
                      <div className="grid grid-cols-1 gap-2 pt-2">
                        {step.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-start gap-2.5 bg-slate-800/50 rounded-xl p-3">
                            <div className="w-1.5 h-1.5 mt-1.5 bg-teal-400 rounded-full flex-shrink-0" />
                            <div>
                              <p className="text-teal-300 font-semibold text-xs">{benefit.label}</p>
                              <p className="text-slate-400 text-xs leading-[1.5]">{benefit.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── DESKTOP: Original accordion ── */}
        <div className="hidden md:block">
          <>
            {/* Tabs de navegación */}
            <div className="flex justify-center gap-4 mb-16">
              {processSteps.map((step, index) => (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveIndex(index)}
                  className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                    activeIndex === index
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-900 shadow-lg shadow-teal-500/50'
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{step.icon}</span>
                    <span className="hidden md:inline">{step.title}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Acordeón horizontal de 3 columnas */}
            <div className="flex flex-col md:flex-row gap-4 md:h-auto lg:h-[700px]">
              {processSteps.map((step, index) => {
                const isActive = activeIndex === index;
                
                return (
                  <motion.div
                    key={step.id}
                    initial={false}
                    animate={{ flex: isActive ? 2 : 0.5 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className={`relative cursor-pointer overflow-hidden rounded-3xl ${
                      isActive ? 'min-h-[550px] md:min-h-[600px] lg:min-h-0' : 'min-h-[80px] md:min-h-0'
                    }`}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <div className={`relative w-full h-full border-2 rounded-3xl transition-all duration-300 ${
                      isActive 
                        ? 'border-teal-500/50 shadow-2xl shadow-teal-500/20' 
                        : 'border-slate-700/50 hover:border-slate-600'
                    }`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-sm" />
                      
                      {isActive ? (
                        <div className="absolute inset-0 flex flex-col lg:flex-row items-center gap-4 lg:gap-8 p-5 lg:p-8">
                          <motion.div 
                            className="w-full lg:w-2/5 h-[40%] lg:h-full flex items-center justify-center shrink-0"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <VisualState state={getStateForIndex(index)} />
                          </motion.div>
                          <motion.div 
                            className="w-full lg:flex-1 h-[60%] lg:h-full flex flex-col justify-start lg:justify-center space-y-3 lg:space-y-6 pr-0 lg:pr-4 overflow-y-auto"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl lg:text-3xl shadow-lg shadow-teal-500/40">
                                {step.icon}
                              </div>
                              <div>
                                <p className="text-xs text-teal-400 font-bold tracking-widest uppercase mb-1">Paso {step.id}</p>
                                <h3 className="text-xl lg:text-3xl font-bold text-white">{step.title}</h3>
                              </div>
                            </div>
                            <h4 className="text-lg lg:text-2xl font-semibold bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">{step.subtitle}</h4>
                            <p className="text-sm lg:text-base text-slate-300 leading-relaxed">{step.description}</p>
                            {step.benefits && (
                              <div className="space-y-3 pt-2">
                                {step.benefits.map((benefit, i) => (
                                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="flex items-start gap-3">
                                    <div className="w-2 h-2 mt-2 bg-teal-400 rounded-full flex-shrink-0" />
                                    <div>
                                      <p className="text-teal-300 font-semibold text-sm">{benefit.label}</p>
                                      <p className="text-slate-400 text-xs">{benefit.detail}</p>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl mb-4 shadow-lg">{step.icon}</div>
                          <h3 className="text-2xl font-bold text-white text-center mb-2" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>{step.title}</h3>
                          <p className="text-sm text-teal-400 font-semibold tracking-wider uppercase">Paso {step.id}</p>
                        </div>
                      )}

                      {isActive && (
                        <motion.div layoutId="activeIndicator" className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500" transition={{ type: "spring", stiffness: 500, damping: 30 }} />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        </div>
      </div>
    </section>
  );
}
