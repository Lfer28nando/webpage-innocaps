import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { impactSectors } from '../data/sectionsData';
import { useIsMobile } from '../hooks/useIsMobile';

/* ── Background image URLs by sector index ── */
const SECTOR_IMAGES = [
  'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80',
  'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
];

export default function SectorsAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);
  const isMobile = useIsMobile();

  return (
    <section className={`relative bg-slate-950 overflow-hidden ${isMobile ? 'py-20' : 'py-32'}`}>
      {/* Degradados */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-900 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-20 pointer-events-none" />

      {/* Fondo decorativo — hidden on mobile for perf */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/30 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-[150px]" />
        </div>
      )}

      {/* Header */}
      <div className={`container mx-auto relative z-10 ${isMobile ? 'px-5 mb-10' : 'px-6 mb-20'}`}>
        <div className={`text-center ${isMobile ? 'mb-0' : 'mb-16'}`}>
          <h2 className={`font-bold text-white mb-4 ${isMobile ? 'text-3xl' : 'text-5xl md:text-6xl mb-6'}`}>
            Sectores de <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Impacto</span>
          </h2>
          <p className={`text-slate-400 max-w-3xl mx-auto ${isMobile ? 'text-base leading-[1.5]' : 'text-xl'}`}>
            Transformando industrias clave con ingredientes nanoencapsulados de próxima generación
          </p>
        </div>
      </div>

      {/* ── MOBILE: Stacked vertical cards ── */}
      {isMobile ? (
        <div className="px-5 space-y-4 relative z-10">
          {impactSectors.map((sector, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-2xl overflow-hidden"
              >
                {/* Card header — always visible */}
                <button
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className="w-full relative h-32 overflow-hidden rounded-2xl text-left"
                >
                  {/* BG image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${SECTOR_IMAGES[index]}')` }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${sector.color} opacity-85`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />

                  <div className="relative h-full flex items-end justify-between p-5">
                    <div>
                      <p className="text-[10px] text-teal-300 font-bold tracking-widest uppercase">{sector.sector}</p>
                      <h3 className="text-xl font-bold text-white leading-tight mt-1">{sector.tagline}</h3>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 text-white/60 flex-shrink-0 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Expandable body */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden bg-slate-900/60 border border-t-0 border-slate-700/40 rounded-b-2xl"
                    >
                      <div className="p-5 space-y-4">
                        <p className="text-sm text-slate-300 leading-[1.6]">{sector.description}</p>

                        <div className="space-y-2">
                          <p className="text-[10px] text-teal-300 font-bold tracking-widest uppercase">Beneficios Clave</p>
                          <ul className="space-y-2">
                            {sector.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-slate-300 text-sm">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button className="w-full py-3 bg-white text-slate-900 font-bold rounded-2xl active:bg-teal-400 transition-colors duration-200 text-sm">
                          Explorar Soluciones
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* ── DESKTOP: Original horizontal accordion ── */
        <>
          <div className="w-full h-[600px] flex gap-4 px-6">
            {impactSectors.map((sector, index) => {
              const isActive = activeIndex === index;
              const isInactive = activeIndex !== null && !isActive;

              return (
                <motion.div
                  key={sector.id}
                  className="relative rounded-3xl overflow-hidden cursor-pointer group"
                  initial={false}
                  animate={{ flex: isActive ? 2 : isInactive ? 0.3 : 1 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  onMouseEnter={() => activeIndex === null && setActiveIndex(index)}
                >
                  {/* Imagen de fondo */}
                  <div className="absolute inset-0">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${SECTOR_IMAGES[index]}')` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${sector.color} backdrop-blur-sm transition-opacity duration-500 ${isActive ? 'opacity-80' : 'opacity-95'}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  </div>

                  {/* Contenido */}
                  <div className="relative h-full flex flex-col justify-end p-8">
                    <AnimatePresence>
                      {isInactive && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 flex items-center justify-center">
                          <h3 className="text-3xl font-bold text-white whitespace-nowrap" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>{sector.sector}</h3>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {!isInactive && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.4, delay: 0.2 }} className="space-y-6">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                            <span className="text-sm text-white font-semibold">{sector.sector}</span>
                          </div>
                          <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">{sector.tagline}</h3>
                          {isActive && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-6">
                              <p className="text-lg text-slate-200 leading-relaxed max-w-2xl">{sector.description}</p>
                              <div className="space-y-3">
                                <p className="text-sm text-teal-300 font-semibold uppercase tracking-wider">Beneficios Clave</p>
                                <ul className="space-y-2">
                                  {sector.benefits.map((benefit, i) => (
                                    <motion.li key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="flex items-start gap-3">
                                      <svg className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      <span className="text-slate-300">{benefit}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                              <button className="mt-6 px-6 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-teal-400 hover:text-slate-900 transition-all duration-300 shadow-lg hover:shadow-teal-500/50 hover:scale-105">
                                Explorar Soluciones
                              </button>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isActive && !isInactive && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-8 right-8">
                        <div className="w-10 h-10 border-2 border-white/50 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className={`absolute inset-0 rounded-3xl border-2 transition-all duration-500 ${isActive ? 'border-teal-400/50 shadow-lg shadow-teal-500/30' : 'border-transparent group-hover:border-white/20'}`} />
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
