import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ═══════════════════════════════════════════
   ORGANIC NUCLEUS — "El Prisma de la Evolución"
   A fluid organic shape that morphs per industry.
   Uses displaced sphere with simplex-like noise via
   sin combinations (no external noise lib needed).
   ═══════════════════════════════════════════ */

/* ---------- pseudo-noise via layered sin ---------- */
function fbm(x, y, z, t) {
  let v = 0;
  v += 0.5 * Math.sin(x * 1.2 + t * 0.7 + y * 0.8);
  v += 0.25 * Math.sin(y * 2.3 - t * 0.5 + z * 1.5);
  v += 0.125 * Math.sin(z * 3.1 + t * 0.9 + x * 1.8);
  v += 0.0625 * Math.sin((x + y + z) * 4.0 - t * 1.2);
  return v;
}

/* ---------- Morph presets per industry ---------- */
const PRESETS = {
  /* animal: robust / cellular – spikey, structured */
  animal: {
    frequency: 2.2,
    amplitude: 0.38,
    speed: 0.35,
    baseRadius: 1.55,
    color1: new THREE.Color('#f97316'), // orange
    color2: new THREE.Color('#fb923c'),
    emissive: new THREE.Color('#7c2d12'),
    roughness: 0.55,
    metalness: 0.15,
  },
  /* cosmetic: liquid, shiny, viscous serum */
  cosmetic: {
    frequency: 1.3,
    amplitude: 0.22,
    speed: 0.2,
    baseRadius: 1.5,
    color1: new THREE.Color('#e879f9'), // pink/purple
    color2: new THREE.Color('#c084fc'),
    emissive: new THREE.Color('#581c87'),
    roughness: 0.05,
    metalness: 0.85,
  },
  /* human: crystalline helix / neural – medium deformation */
  human: {
    frequency: 1.8,
    amplitude: 0.3,
    speed: 0.25,
    baseRadius: 1.5,
    color1: new THREE.Color('#14b8a6'), // teal
    color2: new THREE.Color('#22d3ee'),
    emissive: new THREE.Color('#0f766e'),
    roughness: 0.2,
    metalness: 0.5,
  },
  /* agro: organic, earthy growth */
  agro: {
    frequency: 2.5,
    amplitude: 0.35,
    speed: 0.3,
    baseRadius: 1.45,
    color1: new THREE.Color('#22c55e'), // green
    color2: new THREE.Color('#84cc16'),
    emissive: new THREE.Color('#14532d'),
    roughness: 0.45,
    metalness: 0.1,
  },
};

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpColor(c, target, t) {
  c.r = lerp(c.r, target.r, t);
  c.g = lerp(c.g, target.g, t);
  c.b = lerp(c.b, target.b, t);
}

/* ---------- MAIN MESH ---------- */
export default function OrganicNucleus({ activePreset = 'human' }) {
  const meshRef = useRef();
  const matRef = useRef();

  /* persistent lerped values */
  const state = useRef({
    frequency: PRESETS.human.frequency,
    amplitude: PRESETS.human.amplitude,
    speed: PRESETS.human.speed,
    baseRadius: PRESETS.human.baseRadius,
    roughness: PRESETS.human.roughness,
    metalness: PRESETS.human.metalness,
    color: new THREE.Color('#14b8a6'),
    emissive: new THREE.Color('#0f766e'),
  });

  /* Store original positions from geometry */
  const originals = useRef(null);

  const geo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1.5, 64);
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;
    const geom = mesh.geometry;
    const t = clock.elapsedTime;
    const s = state.current;
    const preset = PRESETS[activePreset] || PRESETS.human;

    /* Store originals once */
    if (!originals.current) {
      originals.current = new Float32Array(geom.attributes.position.array);
    }
    const orig = originals.current;

    /* Lerp parameters toward target */
    const lt = 0.04; // lerp speed
    s.frequency = lerp(s.frequency, preset.frequency, lt);
    s.amplitude = lerp(s.amplitude, preset.amplitude, lt);
    s.speed = lerp(s.speed, preset.speed, lt);
    s.baseRadius = lerp(s.baseRadius, preset.baseRadius, lt);
    s.roughness = lerp(s.roughness, preset.roughness, lt);
    s.metalness = lerp(s.metalness, preset.metalness, lt);

    /* Lerp colours */
    lerpColor(s.color, preset.color1, lt);
    lerpColor(s.emissive, preset.emissive, lt);

    /* Update material */
    if (matRef.current) {
      matRef.current.color.copy(s.color);
      matRef.current.emissive.copy(s.emissive);
      matRef.current.emissiveIntensity = 0.35;
      matRef.current.roughness = s.roughness;
      matRef.current.metalness = s.metalness;
    }

    /* Displace vertices */
    const pos = geom.attributes.position;
    const count = pos.count;
    for (let i = 0; i < count; i++) {
      const ox = orig[i * 3];
      const oy = orig[i * 3 + 1];
      const oz = orig[i * 3 + 2];

      const len = Math.sqrt(ox * ox + oy * oy + oz * oz) || 1;
      const nx = ox / len;
      const ny = oy / len;
      const nz = oz / len;

      const noise = fbm(
        nx * s.frequency,
        ny * s.frequency,
        nz * s.frequency,
        t * s.speed
      );

      const r = s.baseRadius + noise * s.amplitude;

      pos.setXYZ(i, nx * r, ny * r, nz * r);
    }
    pos.needsUpdate = true;
    geom.computeVertexNormals();

    /* slow rotation */
    mesh.rotation.y = t * 0.08;
    mesh.rotation.x = Math.sin(t * 0.12) * 0.15;
  });

  return (
    <mesh ref={meshRef} geometry={geo}>
      <meshPhysicalMaterial
        ref={matRef}
        color="#14b8a6"
        emissive="#0f766e"
        emissiveIntensity={0.35}
        roughness={0.2}
        metalness={0.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={1.8}
        transparent
        opacity={0.92}
      />
    </mesh>
  );
}
