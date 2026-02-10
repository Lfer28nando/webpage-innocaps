import { motion } from 'framer-motion';
import {
  Dna,
  Hexagon,
  Droplets,
  Heart,
  Sparkles,
  FlaskConical,
  Atom,
  ArrowRight,
  Microscope,
  Leaf,
  CircuitBoard,
} from 'lucide-react';

/* ──────────────────────────────
   Animación helpers
   ────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const stagger = (delay = 0) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay },
});

/* ──────────────────────────────
   1. HERO
   ────────────────────────────── */
function TechHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-32 pb-20">
      {/* Radial gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-teal-500/10 rounded-full blur-[180px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-blue-500/8 rounded-full blur-[120px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(20,184,166,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-teal-400 rounded-full"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.7,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div {...stagger(0)}>
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.25em] uppercase text-teal-400 border border-teal-500/30 rounded-full bg-teal-500/5">
            Innovación Molecular
          </span>
        </motion.div>

        <motion.h1
          {...stagger(0.15)}
          className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-8 leading-tight"
        >
          Ingeniería de lo{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400">
            Invisible
          </span>
        </motion.h1>

        <motion.p
          {...stagger(0.3)}
          className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
        >
          Desde nanoemulsiones estables hasta arquitecturas moleculares complejas (MOFs).
          Diseñamos sistemas de liberación que transforman la manera en que los bioactivos
          interactúan con el organismo.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          {...stagger(0.5)}
          className="mt-12 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent"
        />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
}

/* ──────────────────────────────
   2. CORE TECHNOLOGIES (2 Cards)
   ────────────────────────────── */
const coreTechs = [
  {
    icon: Dna,
    title: 'Sistemas de Liberación Avanzada',
    subtitle: 'Liposomas & Nanoemulsiones',
    description:
      'Encapsulamos compuestos bioactivos dentro de vesículas lipídicas y nanoemulsiones termodinámicamente estables, garantizando su protección y liberación controlada.',
    features: [
      { label: 'Mayor absorción', detail: 'Biodisponibilidad hasta 10x superior' },
      { label: 'Enmascaramiento de sabor', detail: 'Eliminación de sabores y olores indeseados' },
      { label: 'Estabilidad térmica', detail: 'Resistencia a procesos industriales' },
    ],
    gradient: 'from-teal-500 to-cyan-500',
    glow: 'teal',
  },
  {
    icon: Hexagon,
    title: 'Arquitectura Molecular (MOFs)',
    subtitle: 'Metal-Organic Frameworks & Cages',
    description:
      'Diseñamos estructuras cristalinas porosas con precisión atómica para la captura selectiva de moléculas y su liberación programada en el sitio de acción.',
    features: [
      { label: 'Captura selectiva', detail: 'Afinidad molecular programable' },
      { label: 'Liberación precisa', detail: 'Respuesta a estímulos específicos (pH, T°)' },
      { label: 'Alta superficie', detail: 'Hasta 7.000 m²/g de área disponible' },
    ],
    gradient: 'from-blue-500 to-purple-500',
    glow: 'blue',
  },
];

function CoreTechnologies() {
  return (
    <section className="relative bg-slate-950 py-28 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[180px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section heading */}
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-teal-400 mb-3 block">
            Plataformas
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Core{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              Technologies
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Dos pilares científicos que definen nuestra capacidad de innovación
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {coreTechs.map((tech, index) => (
            <motion.div
              key={tech.title}
              {...stagger(index * 0.2)}
              className="group relative"
            >
              {/* Glow behind card */}
              <div
                className={`absolute -inset-1 bg-gradient-to-r ${tech.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
              />

              <div className="relative h-full rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-8 lg:p-10 overflow-hidden transition-all duration-300 group-hover:border-slate-700/80">
                {/* Corner accent */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${tech.gradient} opacity-5 rounded-bl-[80px]`}
                />

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tech.gradient} flex items-center justify-center mb-6 shadow-lg shadow-${tech.glow}-500/20`}
                >
                  <tech.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  {tech.title}
                </h3>
                <p
                  className={`text-sm font-semibold bg-gradient-to-r ${tech.gradient} bg-clip-text text-transparent mb-4`}
                >
                  {tech.subtitle}
                </p>
                <p className="text-slate-400 leading-relaxed mb-8">
                  {tech.description}
                </p>

                {/* Features */}
                <div className="space-y-4">
                  {tech.features.map((feat, fi) => (
                    <motion.div
                      key={feat.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + fi * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div
                        className={`w-2 h-2 mt-2 rounded-full bg-gradient-to-r ${tech.gradient} flex-shrink-0`}
                      />
                      <div>
                        <p className="text-white font-semibold text-sm">{feat.label}</p>
                        <p className="text-slate-500 text-xs">{feat.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────
   3. APLICACIONES POR INDUSTRIA
   ────────────────────────────── */
const industries = [
  {
    title: 'Nutrición Humana',
    icon: Droplets,
    color: 'teal',
    gradient: 'from-teal-500 to-cyan-500',
    borderColor: 'border-t-teal-500',
    items: [
      { name: 'CBD Hidrosoluble', desc: 'Biodisponibilidad optimizada' },
      { name: 'Omega 3', desc: 'Sin retrogusto a pescado' },
      { name: 'Hierro Nanoencapsulado', desc: 'Absorción mejorada sin efectos GI' },
    ],
  },
  {
    title: 'Salud Animal',
    icon: Heart,
    color: 'orange',
    gradient: 'from-orange-500 to-amber-500',
    borderColor: 'border-t-orange-500',
    items: [
      { name: 'Sustitución de antibióticos', desc: 'Alternativas naturales eficaces' },
      { name: 'Aceites esenciales', desc: 'Protección contra oxidación' },
      { name: 'Vitaminas estabilizadas', desc: 'Mayor vida útil en premix' },
    ],
  },
  {
    title: 'Cosmética',
    icon: Sparkles,
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500',
    borderColor: 'border-t-purple-500',
    items: [
      { name: 'Retinol estable', desc: 'Liberación controlada sin irritación' },
      { name: 'Ácido Hialurónico', desc: 'Penetración profunda en dermis' },
      { name: 'Resveratrol', desc: 'Antioxidante protegido de la luz' },
    ],
  },
];

function IndustryApplications() {
  return (
    <section className="relative bg-slate-950 py-28 overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(rgba(20,184,166,0.5) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-teal-400 mb-3 block">
            Sectores
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Aplicaciones por{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400">
              Industria
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Soluciones nanoencapsuladas adaptadas a las necesidades de cada sector
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              {...stagger(index * 0.15)}
              className="group"
            >
              <div
                className={`relative h-full rounded-2xl border border-slate-800/60 ${industry.borderColor} border-t-2 bg-slate-900/40 backdrop-blur-sm p-7 transition-all duration-300 hover:bg-slate-900/70 hover:border-slate-700/60`}
              >
                {/* Icon header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <industry.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{industry.title}</h3>
                </div>

                {/* Items */}
                <div className="space-y-4">
                  {industry.items.map((item, ii) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + ii * 0.1 }}
                      className="flex items-start gap-3 group/item"
                    >
                      <ArrowRight
                        className={`w-4 h-4 mt-0.5 text-${industry.color}-500 flex-shrink-0 transition-transform group-hover/item:translate-x-1`}
                        strokeWidth={2}
                      />
                      <div>
                        <p className="text-white font-medium text-sm">{item.name}</p>
                        <p className="text-slate-500 text-xs">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom glow on hover */}
                <div
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r ${industry.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────
   4. FUTURO / I+D
   ────────────────────────────── */
const futureItems = [
  {
    icon: FlaskConical,
    title: 'Medios de Cultivo',
    description:
      'Desarrollo de medios de cultivo optimizados para agricultura celular, reduciendo costos y mejorando la eficiencia de producción.',
  },
  {
    icon: Atom,
    title: 'Suero Fetal Bovino Sintético',
    description:
      'Reemplazo libre de crueldad del FBS tradicional, manteniendo la misma capacidad de soporte celular con componentes definidos.',
  },
  {
    icon: Microscope,
    title: 'Factores de Crecimiento',
    description:
      'Producción recombinante de FGF, EGF y otros factores esenciales para la proliferación y diferenciación celular.',
  },
  {
    icon: Leaf,
    title: 'Agricultura Celular',
    description:
      'Infraestructura biotecnológica para la producción de proteínas y tejidos sin necesidad de ganadería intensiva.',
  },
];

function FutureRD() {
  return (
    <section className="relative bg-slate-950 py-28 overflow-hidden">
      {/* Tech network pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(20,184,166,0.6) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        {/* Connecting lines effect */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="techGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M80 0 L0 80" stroke="rgba(20,184,166,0.5)" strokeWidth="0.5" fill="none" />
              <path d="M0 0 L80 80" stroke="rgba(20,184,166,0.3)" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#techGrid)" />
        </svg>
      </div>

      {/* Colored glow accents */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-teal-500/8 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header – horizontal layout */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <motion.div {...fadeUp} className="lg:max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <CircuitBoard className="w-5 h-5 text-teal-400" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-teal-400">
                I+D
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Más allá de la{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400">
                Nanoencapsulación
              </span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Exploramos las fronteras de la biotecnología con proyectos de investigación
              en agricultura celular y medios de cultivo de nueva generación.
            </p>
          </motion.div>

          <motion.div {...stagger(0.2)}>
            <div className="flex items-center gap-2 text-teal-400/60 text-sm font-mono">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
              En desarrollo activo
            </div>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {futureItems.map((item, index) => (
            <motion.div
              key={item.title}
              {...stagger(index * 0.12)}
              className="group"
            >
              <div className="relative h-full rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-6 transition-all duration-300 hover:bg-slate-900/60 hover:border-teal-500/20 overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl border border-slate-700/50 bg-slate-800/50 flex items-center justify-center mb-5 group-hover:border-teal-500/30 transition-colors duration-300">
                    <item.icon
                      className="w-6 h-6 text-slate-400 group-hover:text-teal-400 transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight badges */}
        <motion.div
          {...stagger(0.5)}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {['Suero Fetal Bovino Sintético', 'FGF · EGF', 'Medios Definidos', 'Cell-Based'].map(
            (badge) => (
              <span
                key={badge}
                className="px-4 py-2 text-xs font-mono font-semibold tracking-wide text-teal-300 bg-teal-500/5 border border-teal-500/20 rounded-full"
              >
                {badge}
              </span>
            )
          )}
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div className="container mx-auto px-6 mt-20">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      </div>
    </section>
  );
}

/* ──────────────────────────────
   MAIN EXPORT
   ────────────────────────────── */
export default function TechnologyPage() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <TechHero />
      <CoreTechnologies />
      <IndustryApplications />
      <FutureRD />
    </div>
  );
}
