import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Float, Center } from '@react-three/drei';

/* ── Modelo 3D ── */
function Model({ onLoaded }) {
  const ref = useRef();
  const { scene } = useGLTF('/micela.glb');

  useEffect(() => { onLoaded?.(); }, [scene]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return <primitive ref={ref} object={scene} />;
}

/* Pre-descarga inmediata (empieza antes de que React monte el componente) */
useGLTF.preload('/micela.glb');

/* ── Loader overlay ── */
function LoaderOverlay({ progress, visible }) {
  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center transition-opacity duration-700"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Porcentaje */}
      <span
        className="font-mono font-extralight tabular-nums leading-none"
        style={{
          fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
          color: '#2dd4bf',
          letterSpacing: '-0.02em',
        }}
      >
        {progress}%
      </span>

      {/* Barra fina */}
      <div className="w-24 h-px mt-3 rounded-full overflow-hidden" style={{ background: 'rgba(45,212,191,0.15)' }}>
        <div
          className="h-full rounded-full transition-[width] duration-300 ease-out"
          style={{
            width: `${progress}%`,
            background: '#2dd4bf',
          }}
        />
      </div>

      {/* Texto de apoyo */}
      <span
        className="mt-2.5 text-[10px] font-mono tracking-[0.25em] uppercase"
        style={{ color: 'rgba(255,255,255,0.35)' }}
      >
        cargando
      </span>
    </div>
  );
}

/* ── Componente principal ── */
export default function ModelViewer() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [hiding, setHiding] = useState(false);

  /* Progreso simulado (XHR real no expuesto por useGLTF) */
  useEffect(() => {
    if (loaded) return;
    let raf;
    let current = 0;
    const tick = () => {
      // Sube rápido hasta 85, luego frena — simula la descarga real
      const target = loaded ? 100 : 85;
      current += (target - current) * 0.04;
      setProgress(Math.min(Math.round(current), 99));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loaded]);

  /* Cuando el modelo termina, saltar a 100% y fade out */
  const handleLoaded = () => {
    setProgress(100);
    setLoaded(true);
    setTimeout(() => setHiding(true), 400);
  };

  return (
    <div className="relative w-full h-full">
      <LoaderOverlay progress={progress} visible={!hiding} />

      <Canvas
        dpr={[1, 1]}
        camera={{ position: [0, 0, 1.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
        }}
        className="bg-transparent"
      >
        {/* Luces */}
        <ambientLight intensity={5} />
        <directionalLight position={[5, 5, 5]} intensity={3} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={6} color="#2dd4bf" distance={30} />
        <spotLight position={[5, 5, -5]} intensity={5} color="#a855f7" angle={0.5} />
        <pointLight position={[5, 5, 5]} intensity={4} color="#ffffff" distance={25} />

        {/* CONTENIDO FLOTANTE Y CENTRADO */}
        <Float 
          speed={0.3} 
          rotationIntensity={0} 
          floatIntensity={0.5} 
        >
          <Center>
            <Suspense fallback={null}>
              <Model scale={10} onLoaded={handleLoaded} />
            </Suspense>
          </Center>
        </Float> {/* OrbitControls: permite rotar pero no zoom */} <OrbitControls
          makeDefault 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
        
      </Canvas>
    </div>
  );
}