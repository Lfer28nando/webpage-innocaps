import { useState, useEffect, useRef, useCallback } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

/* ═══════════════════════════════════════════════════════════════════
   CONSTANTS & DATA
   ═══════════════════════════════════════════════════════════════════ */

const PHILOSOPHY_PILLARS = [
  {
    id: 'integral-use',
    icon: '🌱',
    headline: 'Aprovechamiento integral',
    copy: 'Creemos en una ciencia eficiente y sostenible. Integramos matrices biológicas completas cuando es técnicamente viable, reduciendo procesos innecesarios y optimizando recursos. Trabajamos bajo el principio de que cada componente puede aportar funcionalidad si se entiende y se diseña correctamente.',
  },
  {
    id: 'stability-engineering',
    icon: '🔬',
    headline: 'Ingeniería de estabilidad',
    copy: 'Dominamos tecnologías como el secado por aspersión (spray drying) y la vitrificación controlada para generar matrices protectoras que preservan la viabilidad y funcionalidad de los activos sensibles.',
  },
  {
    id: 'molecular-architecture',
    icon: '🧬',
    headline: 'Arquitectura molecular a medida',
    copy: 'Diseñamos sistemas como micelas, niosomas, dendrímeros, liposomas, nanopartículas lipídicas sólidas y matrices poliméricas según las propiedades fisicoquímicas del activo. Cada formulación responde a una estrategia: estabilidad, liberación controlada, biodisponibilidad o protección frente a condiciones ambientales.',
  },
];

const LAB_BIO_MODEL = {
  lab: {
    id: 'lab',
    icon: '🔬',
    title: 'InnoCaps Lab',
    subtitle: 'Investigación',
    copy: 'Es el corazón científico y creativo. Aquí investigamos, diseñamos y validamos sistemas de encapsulación. Generamos evidencia experimental, optimizamos formulaciones y construimos el soporte técnico que respalda cada desarrollo.',
  },
  bio: {
    id: 'bio',
    icon: '🏭',
    title: 'InnoCaps Bio',
    subtitle: 'Industrial',
    copy: 'Es la conexión con la industria. Transformamos el desarrollo de laboratorio en procesos escalables, robustos y reproducibles. Integramos ingeniería de proceso, control de calidad y acompañamiento en transferencia tecnológica para llevar el producto a nivel industrial.',
  },
};

const TEAM_DIRECTOR = {
  id: 'elkin',
  name: 'Elkin Dario Castellón Castrillón',
  role: 'Director Científico & Fundador',
  credentials: 'PhD en Agroquímica. Químico y Magíster en Química Analítica. Especialista en sistemas coloidales y plataformas de encapsulación aplicadas.',
  photo: '/team/elkin.webp',
  intro: 'InnoCaps está liderado por una visión científica con enfoque práctico: desarrollar tecnología que funcione en condiciones reales de mercado.',
};

const ALLIES_MEMBERS = [
  {
    id: 'nathalia',
    alias: 'La Arquitecta de Materiales',
    name: 'Nathalia Marín',
    role: 'Ciencia e Ingeniería de Materiales',
    credentials: 'Doctora en Ciencia e Ingeniería de Materiales.',
    photo: '/team/nathalia.webp',
  },
  {
    id: 'carolina',
    alias: 'Química Pura',
    name: 'Carolina Chegwin',
    role: 'Ciencias Químicas',
    credentials: 'Doctora en Ciencias Químicas.',
    photo: '/team/carolina.webp',
  },
  {
    id: 'carlos',
    alias: 'El Matemático',
    name: 'Carlos Salazar',
    role: 'Modelado Computacional e Ingeniero Electrónico',
    credentials: 'Especialista en modelado computacional e ingeniería electrónica aplicada a procesos de encapsulación.',
    photo: '/team/carlos.webp',
  },
];

const PLATFORM_CONNECTIONS = [
  'Investigación aplicada',
  'Validación experimental',
  'Desarrollo tecnológico',
  'Escalado industrial',
];

const PLATFORM_OFFERS = [
  'R&D como servicio con modelos de colaboración continua para el desarrollo y optimización de formulaciones.',
  'Validación técnica transparente para acceso a datos experimentales, estudios de estabilidad y soporte técnico que respalde decisiones estratégicas.',
];

/* ═══════════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════════ */

function useFadeIn(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.unobserve(el); } },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function FadeInSection({ children, className = '', delay = 0 }) {
  const { ref, isVisible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BLOCK 1: HERO & MISSION
   ═══════════════════════════════════════════════════════════════════ */

function HeroSection({ isMobile }) {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, [isMobile]);

  const dx = (mouse.x - 0.5) * 6;
  const dy = (mouse.y - 0.5) * 4;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-black overflow-hidden"
      aria-label="InnoCaps: Ciencia que protege y transforma"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center">
        {/* Eyebrow */}
        <FadeInSection className="mb-6">
          <p className="text-teal-400 text-xs md:text-sm font-mono tracking-widest uppercase">
            Sobre Nosotros
          </p>
        </FadeInSection>

        {/* H1 */}
        <h1
          className="text-[clamp(2.2rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-white mb-6"
          style={!isMobile ? { transform: `translate(${dx}px, ${dy}px)`, transition: 'transform 0.15s ease-out' } : undefined}
        >
          Ciencia que{' '}
          <span className="text-teal-400">protege</span> y{' '}
          <span className="text-teal-400">transforma</span>
        </h1>

        {/* Mission */}
        <FadeInSection delay={0.1} className="mb-12">
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            En InnoCaps diseñamos soluciones de micro y nanoencapsulación con enfoque científico, sostenible y escalable. Convertimos conocimiento en plataformas tecnológicas que protegen biomoléculas, optimizan su desempeño y facilitan su llegada al mercado.
          </p>
        </FadeInSection>

        {/* Key point */}
        <FadeInSection delay={0.2} className="border-t border-slate-800/60 pt-8">
          <p className="text-sm md:text-base text-slate-500 font-light italic">
            No solo desarrollamos formulaciones. Desarrollamos soluciones con fundamento científico y visión de producto.
          </p>
        </FadeInSection>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BLOCK 2: FILOSOFÍA CIENTÍFICA
   ═══════════════════════════════════════════════════════════════════ */

function PhilosophyCard({ pillar, index, isMobile }) {
  return (
    <FadeInSection
      delay={isMobile ? 0 : index * 0.12}
      className={isMobile ? 'nosotros-snap-card flex-shrink-0 w-[85vw] max-w-sm' : ''}
    >
      <div className="group relative bg-slate-900/40 backdrop-blur-sm border border-slate-800/60 rounded-2xl p-6 md:p-8 h-full transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/60">
        {/* Icon */}
        <div className="text-3xl mb-4">{pillar.icon}</div>

        {/* Headline */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
          {pillar.headline}
        </h3>

        {/* Copy */}
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          {pillar.copy}
        </p>

        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-teal-500/5 to-transparent" />
      </div>
    </FadeInSection>
  );
}

function PhilosophySection({ isMobile }) {
  return (
    <section className="relative py-20 md:py-32 bg-slate-950" aria-labelledby="filosofia-title">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <FadeInSection className="mb-12 md:mb-16">
          <p className="text-teal-400 text-sm font-mono tracking-widest uppercase mb-3">Filosofía</p>
          <h2 id="filosofia-title" className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Ciencia aplicada con{' '}
            <span className="text-teal-400">propósito</span>
          </h2>
        </FadeInSection>

        {isMobile ? (
          <div
            className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
            }}
          >
            {PHILOSOPHY_PILLARS.map((pillar, i) => (
              <PhilosophyCard key={pillar.id} pillar={pillar} index={i} isMobile={true} />
            ))}
            <div className="flex-shrink-0 w-4" aria-hidden="true" />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {PHILOSOPHY_PILLARS.map((pillar, i) => (
              <PhilosophyCard key={pillar.id} pillar={pillar} index={i} isMobile={false} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BLOCK 3: NUESTRO MODELO — LAB + BIO (DUALIDAD)
   Split Screen (Desktop) | Vertical Stack (Mobile)
   ═══════════════════════════════════════════════════════════════════ */

function LabBioCard({ model, isMobile, isLab }) {
  return (
    <FadeInSection delay={isMobile ? 0 : (isLab ? 0 : 0.15)}>
      <div className="relative bg-slate-900/50 border border-slate-800/60 rounded-2xl p-8 md:p-10 h-full">
        <div className="flex items-start gap-4 mb-6">
          <span className="text-4xl md:text-5xl">{model.icon}</span>
          <div>
            <p className="text-xs md:text-sm font-mono tracking-widest uppercase text-teal-400 mb-1">
              {model.subtitle}
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white">{model.title}</h3>
          </div>
        </div>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          {model.copy}
        </p>
      </div>
    </FadeInSection>
  );
}

function LabBioSection({ isMobile }) {
  return (
    <section className="relative py-20 md:py-32 bg-black" aria-labelledby="modelo-title">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        {/* Title */}
        <FadeInSection className="mb-16">
          <p className="text-teal-400 text-sm font-mono tracking-widest uppercase mb-3">Modelo</p>
          <h2 id="modelo-title" className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Nuestro Modelo:
            <br />
            <span className="text-teal-400">Lab + Bio</span>
          </h2>
        </FadeInSection>

        {/* Lab + Bio Cards */}
        {isMobile ? (
          <div className="space-y-6">
            <LabBioCard model={LAB_BIO_MODEL.lab} isMobile={true} isLab={true} />
            <LabBioCard model={LAB_BIO_MODEL.bio} isMobile={true} isLab={false} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8 mb-12">
            <LabBioCard model={LAB_BIO_MODEL.lab} isMobile={false} isLab={true} />
            <LabBioCard model={LAB_BIO_MODEL.bio} isMobile={false} isLab={false} />
          </div>
        )}

        {/* Integration message */}
        <FadeInSection delay={isMobile ? 0 : 0.3} className="mt-12 text-center">
          <p className="text-teal-400 font-bold text-lg md:text-xl mb-2">
            Lab crea. Bio escala.
          </p>
          <p className="text-slate-400 text-base md:text-lg">
            Juntos convertimos ciencia en producto.
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BLOCK 4: NUESTRO EQUIPO (Solo Director)
   ═══════════════════════════════════════════════════════════════════ */

function DirectorCard({ isMobile }) {
  return (
    <FadeInSection className="max-w-md mx-auto">
      <div className="group relative bg-slate-900/40 border border-slate-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-teal-500/30">
        {/* Photo with priority LCP */}
        <div className="aspect-[3/4] overflow-hidden bg-slate-800">
          <img
            src={TEAM_DIRECTOR.photo}
            alt={TEAM_DIRECTOR.name}
            width="400"
            height="533"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        {/* Info */}
        <div className="p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {TEAM_DIRECTOR.name}
          </h3>
          <p className="text-teal-400 text-sm font-mono tracking-wider uppercase mb-3">
            {TEAM_DIRECTOR.role}
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            {TEAM_DIRECTOR.credentials}
          </p>
          <div className="border-t border-slate-800/60 pt-4">
            <p className="text-slate-500 text-sm italic">
              {TEAM_DIRECTOR.intro}
            </p>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

function TeamSection({ isMobile }) {
  return (
    <section className="relative py-20 md:py-32 bg-slate-950" aria-labelledby="equipo-title">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <FadeInSection className="mb-12 md:mb-16">
          <p className="text-teal-400 text-sm font-mono tracking-widest uppercase mb-3">Equipo</p>
          <h2 id="equipo-title" className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Ciencia hecha por <span className="text-teal-400">científicos</span>
          </h2>
        </FadeInSection>

        <DirectorCard isMobile={isMobile} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BLOCK 5: ALIADOS ESTRATÉGICOS
   ═══════════════════════════════════════════════════════════════════ */

function AllyMember({ member, isMobile, index }) {
  const [expanded, setExpanded] = useState(false);

  if (isMobile) {
    return (
      <FadeInSection delay={index * 0.06}>
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center gap-4 py-4 border-b border-slate-800/60 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg"
          aria-expanded={expanded}
        >
          <div className="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden bg-slate-800">
            <img
              src={member.photo}
              alt={member.name}
              width="56"
              height="56"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover grayscale contrast-125"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm truncate">{member.name}</p>
            <p className="text-teal-400 text-xs">{member.alias}</p>
          </div>
          <svg
            className={`w-5 h-5 text-slate-500 transition-transform duration-200 flex-shrink-0 ${expanded ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: expanded ? '200px' : '0', opacity: expanded ? 1 : 0 }}
        >
          <div className="py-3 pl-[4.5rem] pr-4">
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">{member.role}</p>
            <p className="text-slate-400 text-sm leading-relaxed">{member.credentials}</p>
          </div>
        </div>
      </FadeInSection>
    );
  }

  return (
    <FadeInSection delay={index * 0.1}>
      <div className="group relative bg-slate-900/40 border border-slate-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-teal-500/30">
        <div className="aspect-[3/4] overflow-hidden bg-slate-800">
          <img
            src={member.photo}
            alt={member.name}
            width="300"
            height="400"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
        <div className="p-4">
          <p className="text-teal-400 text-xs font-mono tracking-wider uppercase mb-1">{member.alias}</p>
          <h3 className="text-base font-bold text-white mb-1">{member.name}</h3>
          <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">{member.role}</p>
          <p className="text-slate-400 text-xs leading-relaxed">{member.credentials}</p>
        </div>
      </div>
    </FadeInSection>
  );
}

function AlliesSection({ isMobile }) {
  return (
    <section className="relative py-20 md:py-32 bg-black" aria-labelledby="aliados-title">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <FadeInSection className="mb-12 md:mb-16">
          <p className="text-teal-400 text-sm font-mono tracking-widest uppercase mb-3">Colaboradores</p>
          <h2 id="aliados-title" className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Aliados Estratégicos y{' '}
            <span className="text-teal-400">Colaboradores</span>
          </h2>
        </FadeInSection>

        {isMobile ? (
          <div className="space-y-0">
            {ALLIES_MEMBERS.map((m, i) => (
              <AllyMember key={m.id} member={m} isMobile={true} index={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {ALLIES_MEMBERS.map((m, i) => (
              <AllyMember key={m.id} member={m} isMobile={false} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BLOCK 6: PLATAFORMA B2B
   ═══════════════════════════════════════════════════════════════════ */

function PlatformSection({ isMobile }) {
  return (
    <section className="relative py-20 md:py-32 bg-slate-950" aria-labelledby="plataforma-title">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <FadeInSection className="mb-12 md:mb-16">
          <p className="text-teal-400 text-sm font-mono tracking-widest uppercase mb-3">Modelo B2B</p>
          <h2 id="plataforma-title" className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Plataforma B2B de{' '}
            <span className="text-teal-400">I+D+i</span>
          </h2>
        </FadeInSection>

        {/* Connections */}
        <FadeInSection delay={0.1} className="mb-12">
          <p className="text-teal-400 text-sm font-mono tracking-widest uppercase mb-6">Conectamos</p>
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {PLATFORM_CONNECTIONS.map((connection, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-teal-400 font-bold mt-1">→</span>
                <p className="text-slate-300 text-base md:text-lg md:text-lg">{connection}</p>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Divider */}
        <div className="border-t border-slate-800/60 my-12" />

        {/* Offers */}
        <FadeInSection delay={0.15}>
          <p className="text-teal-400 text-sm font-mono tracking-widest uppercase mb-6">Ofrecemos</p>
          <div className="space-y-5">
            {PLATFORM_OFFERS.map((offer, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-teal-500 font-bold text-xl mt-1 flex-shrink-0">✓</span>
                <p className="text-slate-400 text-base leading-relaxed">{offer}</p>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Key message */}
        <FadeInSection delay={0.2} className="mt-12 p-6 md:p-8 border border-slate-800/60 rounded-2xl bg-slate-900/30 backdrop-blur-sm">
          <p className="text-white text-center text-base md:text-lg leading-relaxed">
            No vendemos únicamente un ingrediente encapsulado.
            <br />
            <span className="text-teal-400 font-bold">Ofrecemos certeza técnica, respaldo científico y acompañamiento estratégico.</span>
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BLOCK 7: CTA FOOTER
   ═══════════════════════════════════════════════════════════════════ */

function CTASection({ isMobile }) {
  return (
    <section className="relative py-24 md:py-40 bg-black" aria-label="Llamada a acción final">
      <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
        <FadeInSection>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            ¿Listos para desarrollar el{' '}
            <span className="text-teal-400">siguiente nivel</span> de tu producto?
          </h2>
          <p className="text-base md:text-lg text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Hablemos de cómo nuestra plataforma Lab + Bio puede transformar tu proyecto en una solución validada y escalable.
          </p>
          <a
            href="/contacto"
            className={`inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-300 ${
              isMobile
                ? 'w-full py-4 text-base bg-teal-500 active:bg-teal-400 text-slate-900'
                : 'px-10 py-4 text-base bg-teal-500 hover:bg-teal-400 hover:scale-105 text-slate-900'
            }`}
          >
            Contactar
          </a>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════════ */

export default function AboutPage() {
  const isMobile = useIsMobile();

  return (
    <main>
      <HeroSection isMobile={isMobile} />
      <PhilosophySection isMobile={isMobile} />
      <LabBioSection isMobile={isMobile} />
      <TeamSection isMobile={isMobile} />
      <AlliesSection isMobile={isMobile} />
      <PlatformSection isMobile={isMobile} />
      <CTASection isMobile={isMobile} />
    </main>
  );
}
