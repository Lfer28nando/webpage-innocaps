import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

/* ═══════════════════════════════════════════════════════════════════
   CONSTANTS & DATA
   ═══════════════════════════════════════════════════════════════════ */

const SCIENCE_CARDS = [
  {
    id: 'zero-additives',
    headline: 'El Residuo es el Producto.',
    copy: 'Rompemos el paradigma tradicional. No purificamos el caldo de fermentación; lo integramos. Utilizamos el micelio y los exopolisacáridos (EPS) intrínsecos como matriz encapsulante natural, eliminando aditivos externos costosos.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M16 32V20l8-8 8 8v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="26" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'thermodrying',
    headline: 'Vitrificación Controlada.',
    copy: 'Dominamos el "Spray Drying" con precisión de milisegundos. Controlamos temperaturas de salida (50-65°C) para crear matrices vítreas que inmovilizan células vivas sin matarlas.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <rect x="14" y="8" width="20" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 28h20" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <circle cx="24" cy="34" r="3" fill="currentColor" opacity="0.4" />
        <path d="M22 16v8M26 14v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'stability',
    headline: 'Vehículos Blindados.',
    copy: 'Desde Liposomas bicapa hasta Nanopartículas de Lípidos Sólidos (SLNs). Diseñamos la arquitectura exacta para proteger tu activo de la luz, el calor y el oxígeno.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <path d="M24 4L6 14v12c0 10 8 16 18 18 10-2 18-8 18-18V14L24 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M18 24l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const TEAM_MEMBERS = [
  {
    id: 'elkin',
    alias: 'El Visionario',
    name: 'Elkin Dario Castellon',
    role: 'Director Científico & Fundador',
    credentials: 'PhD en Agroquímica. Químico y Magíster en Química Analítica. Experto en Sistemas Coloidales.',
    photo: '/team/elkin.webp',
  },
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

const BUSINESS_POINTS = [
  {
    id: 'platform',
    title: 'Plataforma, no Vendedor',
    copy: 'Somos una plataforma B2B que conecta investigación, validación y escalado industrial. No solo vendemos un polvo; vendemos la certeza científica.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <path d="M8 28l12-8 12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 20l12-8 12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M8 12l12-8 12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
      </svg>
    ),
  },
  {
    id: 'raas',
    title: 'R&D as a Service',
    copy: 'Ofrecemos modelos de suscripción para el desarrollo continuo de formulaciones. Tu producto evoluciona con nuestra ciencia.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <path d="M6 30V14l14-8 14 8v16l-14 8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M6 14l14 8 14-8" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <path d="M20 22v16" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: 'validation',
    title: 'Validación Visual',
    copy: 'Rompemos la desconfianza con transparencia. Acceso a data experimental cruda y visualización de estabilidad en tiempo real.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <rect x="4" y="6" width="32" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 26l6-8 5 4 9-12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="31" cy="12" r="2" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════════════════════════
   INTERSECTION OBSERVER HOOK — Fade-in on viewport entry
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

/* Wrapper that applies a simple CSS fade-in */
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
   BLOCK 1: EL MANIFIESTO (Hero)
   Pure black bg. Large text. Mouse distortion on desktop only.
   ═══════════════════════════════════════════════════════════════════ */

function HeroManifesto({ isMobile }) {
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

  // Distortion offset for desktop
  const dx = (mouse.x - 0.5) * 6;
  const dy = (mouse.y - 0.5) * 4;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[100dvh] flex items-center justify-center bg-black overflow-hidden"
      aria-label="Manifiesto InnoCaps"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center">
        {/* H1 */}
        <h1
          className="text-[clamp(2.2rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-white mb-6"
          style={!isMobile ? { transform: `translate(${dx}px, ${dy}px)`, transition: 'transform 0.15s ease-out' } : undefined}
        >
          La ciencia que{' '}
          <span className="text-teal-400">protege</span>{' '}
          lo que importa.
        </h1>

        {/* H2 */}
        <h2
          className="text-[clamp(1rem,2.5vw,1.5rem)] font-light text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8"
          style={!isMobile ? { transform: `translate(${dx * 0.5}px, ${dy * 0.5}px)`, transition: 'transform 0.2s ease-out' } : undefined}
        >
          Encapsulación inteligente. Cero aditivos. Ciencia de precisión para una industria que no puede permitirse fallar.
        </h2>

        {/* Body */}
        <p
          className="text-base md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed"
          style={!isMobile ? { transform: `translate(${dx * 0.3}px, ${dy * 0.3}px)`, transition: 'transform 0.25s ease-out' } : undefined}
        >
          Somos InnoCaps — el laboratorio que convierte residuos en plataformas de protección molecular.
        </p>
      </div>

      {/* Subtle gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BLOCK 2: NUESTRA CIENCIA
   Desktop: Interactive grid with hover. Mobile: CSS scroll-snap.
   ═══════════════════════════════════════════════════════════════════ */

function ScienceCard({ card, index, isMobile }) {
  return (
    <FadeInSection
      delay={isMobile ? 0 : index * 0.12}
      className={
        isMobile
          ? 'nosotros-snap-card flex-shrink-0 w-[85vw] max-w-sm'
          : ''
      }
    >
      <div
        className="group relative bg-slate-900/60 backdrop-blur-sm border border-slate-800/60 rounded-2xl p-6 md:p-8 h-full transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80"
        style={{ aspectRatio: isMobile ? '3/4' : undefined }}
      >
        {/* Icon */}
        <div className="text-teal-400 mb-5">{card.icon}</div>

        {/* Headline */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
          {card.headline}
        </h3>

        {/* Copy */}
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          {card.copy}
        </p>

        {/* Hover glow (desktop only) */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-teal-500/5 to-transparent" />
      </div>
    </FadeInSection>
  );
}

function ScienceSection({ isMobile }) {
  return (
    <section className="relative py-20 md:py-32 bg-slate-950" aria-labelledby="ciencia-title">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        {/* Title */}
        <FadeInSection className="mb-12 md:mb-16">
          <p className="text-teal-400 text-sm font-mono tracking-widest uppercase mb-3">Filosofía</p>
          <h2 id="ciencia-title" className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Nuestra Ciencia:<br />
            <span className="text-teal-400">Cero Desperdicio.</span>
          </h2>
        </FadeInSection>

        {/* Cards */}
        {isMobile ? (
          /* ── MOBILE: CSS Scroll-Snap ── */
          <div
            className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
            }}
          >
            {SCIENCE_CARDS.map((card, i) => (
              <ScienceCard key={card.id} card={card} index={i} isMobile={true} />
            ))}
            {/* Spacer for last card peek */}
            <div className="flex-shrink-0 w-4" aria-hidden="true" />
          </div>
        ) : (
          /* ── DESKTOP: Interactive Grid ── */
          <div className="grid grid-cols-3 gap-6">
            {SCIENCE_CARDS.map((card, i) => (
              <ScienceCard key={card.id} card={card} index={i} isMobile={false} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BLOCK 3: EL EQUIPO — Authority Trust
   Desktop: Horizontal layout. Mobile: Vertical list + accordion.
   ═══════════════════════════════════════════════════════════════════ */

function TeamMember({ member, isMobile, index }) {
  const [expanded, setExpanded] = useState(false);

  if (isMobile) {
    return (
      <FadeInSection delay={index * 0.08}>
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center gap-4 py-4 border-b border-slate-800/60 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg"
          aria-expanded={expanded}
        >
          {/* Photo */}
          <div className="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden bg-slate-800" style={{ aspectRatio: '1/1' }}>
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

          {/* Name & role */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm truncate">{member.name}</p>
            <p className="text-teal-400 text-xs">{member.alias}</p>
          </div>

          {/* Chevron */}
          <svg
            className={`w-5 h-5 text-slate-500 transition-transform duration-200 flex-shrink-0 ${expanded ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Accordion content */}
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

  // Desktop card
  return (
    <FadeInSection delay={index * 0.12}>
      <div className="group relative bg-slate-900/40 border border-slate-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-teal-500/30">
        {/* Photo */}
        <div className="aspect-[3/4] overflow-hidden bg-slate-800">
          <img
            src={member.photo}
            alt={member.name}
            width="400"
            height="533"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        {/* Info */}
        <div className="p-5">
          <p className="text-teal-400 text-xs font-mono tracking-wider uppercase mb-1">{member.alias}</p>
          <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
          <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">{member.role}</p>
          <p className="text-slate-400 text-sm leading-relaxed">{member.credentials}</p>
        </div>
      </div>
    </FadeInSection>
  );
}

function TeamSection({ isMobile }) {
  return (
    <section className="relative py-20 md:py-32 bg-black" aria-labelledby="equipo-title">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        {/* Title */}
        <FadeInSection className="mb-12 md:mb-16">
          <p className="text-teal-400 text-sm font-mono tracking-widest uppercase mb-3">Equipo</p>
          <h2 id="equipo-title" className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Ciencia hecha por{' '}
            <span className="text-teal-400">científicos.</span>
          </h2>
        </FadeInSection>

        {isMobile ? (
          <div className="space-y-0">
            {TEAM_MEMBERS.map((m, i) => (
              <TeamMember key={m.id} member={m} isMobile={true} index={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((m, i) => (
              <TeamMember key={m.id} member={m} isMobile={false} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BLOCK 4: MODELO DE NEGOCIO — La Disrupción
   ═══════════════════════════════════════════════════════════════════ */

function BusinessSection({ isMobile }) {
  return (
    <section className="relative py-20 md:py-32 bg-slate-950" aria-labelledby="modelo-title">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        {/* Title */}
        <FadeInSection className="mb-14 md:mb-20 text-center">
          <p className="text-teal-400 text-sm font-mono tracking-widest uppercase mb-3">Modelo</p>
          <h2 id="modelo-title" className="text-3xl md:text-5xl font-bold text-white leading-tight">
            No vendemos productos.<br />
            <span className="text-teal-400">Vendemos certeza.</span>
          </h2>
        </FadeInSection>

        {/* Points */}
        <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {BUSINESS_POINTS.map((point, i) => (
            <FadeInSection key={point.id} delay={isMobile ? 0 : i * 0.12}>
              <div className="flex flex-col items-start gap-4 p-6 md:p-0">
                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  {point.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-white">{point.title}</h3>

                {/* Copy */}
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">{point.copy}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BLOCK 5: CALL TO ACTION (Footer)
   Minimal. Pure.
   ═══════════════════════════════════════════════════════════════════ */

function CTAFooter({ isMobile }) {
  return (
    <section className="relative py-24 md:py-40 bg-black" aria-label="Contacto">
      <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
        <FadeInSection>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            ¿Listo para encapsular{' '}
            <span className="text-teal-400">el futuro</span>?
          </h2>
          <p className="text-base md:text-lg text-slate-400 mb-10 max-w-lg mx-auto">
            Hablemos de cómo nuestra ciencia puede transformar tu producto.
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
   MAIN EXPORT — AboutPage
   ═══════════════════════════════════════════════════════════════════ */

export default function AboutPage() {
  const isMobile = useIsMobile();

  return (
    <main>
      <HeroManifesto isMobile={isMobile} />
      <ScienceSection isMobile={isMobile} />
      <TeamSection isMobile={isMobile} />
      <BusinessSection isMobile={isMobile} />
      <CTAFooter isMobile={isMobile} />
    </main>
  );
}
