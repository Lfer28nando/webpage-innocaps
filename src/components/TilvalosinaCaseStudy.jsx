import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

/* ═══════════════════════════════════════════
   SECTION 3 — PROYECTO ALPHA: LA TILVALOSINA
   Hero case study with split-screen layout.
   Left: data, Right: 3D encapsulated molecule.
   ═══════════════════════════════════════════ */

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: 'easeOut' },
};
const stagger = (d = 0) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay: d },
});

/* ── 3D Molecule ── */
function EncapsulatedMolecule() {
  const outerRef = useRef();
  const innerRef = useRef();
  const shellRef = useRef();

  const shellPts = useMemo(() => {
    const pts = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.6;
      pts[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pts[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pts[i * 3 + 2] = r * Math.cos(phi);
    }
    return pts;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.1;
      outerRef.current.rotation.x = Math.sin(t * 0.15) * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.15;
      innerRef.current.rotation.z = Math.sin(t * 0.2) * 0.08;
    }
  });

  return (
    <group>
      {/* Outer capsule shell */}
      <group ref={outerRef}>
        <mesh>
          <sphereGeometry args={[1.6, 64, 64]} />
          <meshPhysicalMaterial
            color="#14b8a6"
            transparent
            opacity={0.12}
            roughness={0.05}
            metalness={0.15}
            clearcoat={1}
            clearcoatRoughness={0}
            side={THREE.DoubleSide}
            envMapIntensity={2}
          />
        </mesh>
        {/* Wireframe ring */}
        <mesh>
          <sphereGeometry args={[1.62, 32, 32]} />
          <meshBasicMaterial color="#5eead4" wireframe transparent opacity={0.06} />
        </mesh>
        {/* Surface particles */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={shellPts}
              count={500}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial color="#5eead4" size={0.018} transparent opacity={0.5} sizeAttenuation depthWrite={false} />
        </points>
      </group>

      {/* Inner molecule — tilvalosina core */}
      <group ref={innerRef}>
        {/* Central atom */}
        <mesh>
          <icosahedronGeometry args={[0.55, 2]} />
          <meshPhysicalMaterial
            color="#f59e0b"
            roughness={0.15}
            metalness={0.5}
            clearcoat={0.8}
            emissive="#92400e"
            emissiveIntensity={0.3}
            envMapIntensity={1.5}
          />
        </mesh>
        {/* Bond-like crosses */}
        {[
          [0, 0.8, 0],
          [0, -0.8, 0],
          [0.7, 0.3, 0],
          [-0.7, 0.3, 0],
          [0, 0.3, 0.7],
          [0, 0.3, -0.7],
        ].map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshPhysicalMaterial
              color={i < 2 ? '#ef4444' : i < 4 ? '#3b82f6' : '#8b5cf6'}
              roughness={0.2}
              metalness={0.4}
            />
          </mesh>
        ))}
        {/* Bond lines (cylinder) */}
        {[
          { from: [0, 0, 0], to: [0, 0.8, 0] },
          { from: [0, 0, 0], to: [0, -0.8, 0] },
          { from: [0, 0, 0], to: [0.7, 0.3, 0] },
          { from: [0, 0, 0], to: [-0.7, 0.3, 0] },
          { from: [0, 0, 0], to: [0, 0.3, 0.7] },
          { from: [0, 0, 0], to: [0, 0.3, -0.7] },
        ].map((bond, i) => {
          const start = new THREE.Vector3(...bond.from);
          const end = new THREE.Vector3(...bond.to);
          const mid = start.clone().lerp(end, 0.5);
          const dir = end.clone().sub(start);
          const len = dir.length();
          return (
            <mesh key={`bond-${i}`} position={mid}>
              <cylinderGeometry args={[0.02, 0.02, len, 4]} />
              <meshBasicMaterial color="#94a3b8" transparent opacity={0.3} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function MoleculeScene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-3, 2, 3]} intensity={0.4} color="#14b8a6" />
      <pointLight position={[3, -1, -2]} intensity={0.3} color="#f59e0b" />

      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.2}>
        <EncapsulatedMolecule />
      </Float>

      <Environment preset="night" />
    </>
  );
}

/* ── Results data ── */
const results = [
  {
    number: '01',
    title: 'Estabilidad',
    detail: 'Protección superior frente a genéricos del mercado.',
    color: '#14b8a6',
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    number: '02',
    title: 'Cumplimiento',
    detail: 'Alineado con normativas ICA (Colombia).',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    number: '03',
    title: 'Eficiencia',
    detail:
      'Permite reducir la dosis terapéutica necesaria para combatir enfermedades respiratorias porcinas.',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-500',
  },
];

/* ═══════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════ */
export default function TilvalosinaCaseStudy() {
  return (
    <section className="relative bg-slate-950 py-28 lg:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-teal-500/[0.04] rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[180px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* ── Tag ── */}
        <motion.div {...fadeUp} className="text-center mb-6">
          <span className="inline-block px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] uppercase text-amber-400 border border-amber-500/20 rounded-full bg-amber-500/5 mb-8">
            Caso de Éxito — Trust Signal
          </span>
        </motion.div>

        <motion.h2
          {...stagger(0.1)}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-center"
        >
          Proyecto{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-teal-400">
            Alpha
          </span>
        </motion.h2>

        <motion.p
          {...stagger(0.2)}
          className="text-center text-slate-500 text-sm font-mono tracking-widest uppercase mb-16"
        >
          La Tilvalosina
        </motion.p>

        {/* ── Split screen: Data + 3D ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT — Data */}
          <motion.div {...stagger(0.25)} className="space-y-8 order-2 lg:order-1">
            {/* El Reto */}
            <div className="rounded-2xl border border-slate-800/50 bg-slate-900/30 p-7">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-red-400 mb-3">
                El Reto
              </p>
              <p className="text-slate-300 leading-relaxed">
                La Tilvalosina comercial sufre de{' '}
                <span className="text-white font-semibold">inestabilidad</span> y{' '}
                <span className="text-white font-semibold">sabor amargo</span>, limitando su
                eficacia y aceptabilidad en producción porcina.
              </p>
            </div>

            {/* La Innovación */}
            <div className="rounded-2xl border border-teal-500/15 bg-teal-500/[0.03] p-7">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-teal-400 mb-3">
                La Innovación InnoCaps
              </p>
              <p className="text-slate-300 leading-relaxed">
                Desarrollo de un prototipo encapsulado con{' '}
                <span className="text-teal-300 font-semibold">tecnología micelar</span>. El
                sistema protege el activo, enmascara el sabor y permite una liberación controlada
                en el sitio de acción.
              </p>
            </div>

            {/* Resultados Validados */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 mb-5">
                Resultados Validados
              </p>
              <div className="space-y-4">
                {results.map((r, i) => (
                  <motion.div
                    key={r.number}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.12 }}
                    className="flex items-start gap-4"
                  >
                    <span
                      className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-xs font-mono font-bold"
                      style={{
                        backgroundColor: r.color + '15',
                        color: r.color,
                        border: `1px solid ${r.color}30`,
                      }}
                    >
                      {r.number}
                    </span>
                    <div>
                      <p className="text-white font-semibold text-sm">{r.title}</p>
                      <p className="text-slate-500 text-sm">{r.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — 3D Molecule */}
          <motion.div {...stagger(0.3)} className="relative h-[400px] sm:h-[480px] lg:h-[560px] order-1 lg:order-2">
            <div className="absolute inset-0 rounded-3xl border border-slate-800/40 bg-slate-900/20 backdrop-blur-sm overflow-hidden">
              <Canvas
                camera={{ position: [0, 0, 4.5], fov: 42 }}
                dpr={[1, 2]}
                style={{ background: 'transparent' }}
              >
                <Suspense fallback={null}>
                  <MoleculeScene />
                </Suspense>
              </Canvas>

              {/* Label overlay */}
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-teal-400/70 tracking-wider">
                  TILVALOSINA ENCAPSULADA
                </span>
              </div>

              {/* Legend */}
              <div className="absolute bottom-5 left-5 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-400/40 border border-teal-400/60" />
                  <span className="text-[9px] text-slate-500 font-mono">Cápsula micelar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                  <span className="text-[9px] text-slate-500 font-mono">Tilvalosina (activo)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="container mx-auto px-6 mt-24">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      </div>
    </section>
  );
}
