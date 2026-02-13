import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════
   GLSL — Simplex 3D Noise (Ashima Arts / Stefan Gustavson, MIT)
   Compacto, GPU-friendly, ~0 allocations.
   ═══════════════════════════════════════════════════════════════ */
const noise3D = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j  = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 fx = x_ * ns.x + ns.yyyy;
    vec4 fy = y_ * ns.x + ns.yyyy;
    vec4 h  = 1.0 - abs(fx) - abs(fy);

    vec4 b0 = vec4(fx.xy, fy.xy);
    vec4 b1 = vec4(fx.zw, fy.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

/* ═══════════════════════════════════════════════════════════════
   VERTEX SHADER
   3 octavas de ruido simplex + distorsión magnética (mouse).
   ═══════════════════════════════════════════════════════════════ */
const vertexShader = /* glsl */ `
  ${noise3D}

  uniform float uTime;
  uniform vec2  uMouse;

  varying vec3  vNormal;
  varying vec3  vWorldPosition;
  varying float vDisplacement;
  varying float vFresnel;

  void main() {
    vec3 pos = position;
    float t  = uTime * 0.35;

    /* ── Octava 1: "respiración" (baja freq) ── */
    float n1 = snoise(pos * 1.2 + t) * 0.12;

    /* ── Octava 2: ondulación orgánica (media freq) ── */
    float n2 = snoise(pos * 2.5 + t * 1.4) * 0.06;

    /* ── Octava 3: micro-detalle (alta freq) ── */
    float n3 = snoise(pos * 5.0 + t * 0.7) * 0.02;

    /* ── Distorsión magnética del mouse ── */
    vec3  mTarget = vec3(uMouse * 2.0, 0.0);
    float mDist   = length(pos.xy - mTarget.xy);
    float mEffect = smoothstep(1.8, 0.0, mDist) * 0.18;

    float disp   = n1 + n2 + n3 + mEffect;
    vec3  newPos  = pos + normal * disp;

    /* ── Fresnel en vértice (perf mobile) ── */
    vec4 worldPos = modelMatrix * vec4(newPos, 1.0);
    vec3 viewDir  = normalize(cameraPosition - worldPos.xyz);
    vec3 wNormal  = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    float fres    = pow(1.0 - abs(dot(viewDir, wNormal)), 2.5);

    vNormal        = normalize(normalMatrix * normal);
    vWorldPosition = worldPos.xyz;
    vDisplacement  = disp;
    vFresnel       = fres;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

/* ═══════════════════════════════════════════════════════════════
   FRAGMENT SHADER
   Paleta Teal → Cyan → NeonGreen.
   Fresnel rim-glow + iridiscencia sutil + especular.
   Alpha dinámico → membrana de vidrio.
   ═══════════════════════════════════════════════════════════════ */
const fragmentShader = /* glsl */ `
  uniform float uTime;

  varying vec3  vNormal;
  varying vec3  vWorldPosition;
  varying float vDisplacement;
  varying float vFresnel;

  void main() {
    /* Paleta */
    vec3 teal      = vec3(0.173, 0.831, 0.749);
    vec3 cyan      = vec3(0.133, 0.827, 0.933);
    vec3 neonGreen = vec3(0.200, 1.000, 0.500);
    vec3 deep      = vec3(0.020, 0.080, 0.100);

    /* Gradiente de superficie */
    vec3 surface = mix(teal, cyan, vFresnel);
    surface = mix(surface, neonGreen, smoothstep(0.08, 0.22, vDisplacement));

    /* Interior (centro de la membrana) */
    vec3 interior = mix(deep, teal * 0.3, clamp(vDisplacement * 3.0, 0.0, 1.0));

    /* Composición */
    vec3 color = mix(interior, surface, vFresnel * 0.85);
    color += cyan * 1.4 * vFresnel * 0.55;

    /* Iridiscencia sutil */
    float iri = sin(vDisplacement * 20.0 + uTime * 0.5) * 0.5 + 0.5;
    color += mix(cyan, neonGreen, iri) * 0.04;

    /* Especular */
    vec3  lightDir = normalize(vec3(1.0, 1.0, 1.5));
    vec3  viewDir  = normalize(cameraPosition - vWorldPosition);
    vec3  halfDir  = normalize(lightDir + viewDir);
    float spec     = pow(max(dot(vNormal, halfDir), 0.0), 48.0);
    color += vec3(1.0) * spec * 0.25;

    /* Alpha: membrana de vidrio (transparente al centro, opaco en bordes) */
    float alpha = mix(0.10, 0.88, vFresnel);
    alpha = max(alpha, spec * 0.4);

    gl_FragColor = vec4(color, alpha);
  }
`;

/* ═══════════════════════════════════════════════════════════════
   R3F — Membrana esférica procedimental
   ═══════════════════════════════════════════════════════════════ */
function Membrane() {
  const meshRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime:  { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    // Lerp suave → evita saltos bruscos que marean
    uniforms.uMouse.value.lerp(state.pointer, 0.05);
    // Rotación lenta constante
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Icosaedro subdiv 4 → 5 120 caras (~2 500 verts). Perfecto. */}
      <icosahedronGeometry args={[1, 4]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Exportación — Canvas autocontenido, fondo transparente.
   ═══════════════════════════════════════════════════════════════ */
export default function FluidSphere() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3], fov: 45 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      resize={{ scroll: false }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
      style={{ background: 'transparent' }}
    >
      {/* Iluminación mínima — el shader hace el trabajo pesado */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, -3]} intensity={1.5} color="#2dd4bf" />
      <directionalLight position={[2, 2, 3]} intensity={0.5} color="#ffffff" />
      <Membrane />
    </Canvas>
  );
}
