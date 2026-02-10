import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Float, Center } from '@react-three/drei';

function Model() {
  const ref = useRef();
  const { scene } = useGLTF('/micela.glb');

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return <primitive ref={ref} object={scene} />;
}

export default function ModelViewer() {
  return (
    <div className="w-full h-full">
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 5.5], fov: 45 }} 
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
        }}
        className="bg-transparent"
      >
        {/* Luces */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={3} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={6} color="#2dd4bf" distance={30} />
        <spotLight position={[5, 5, -5]} intensity={5} color="#a855f7" angle={0.5} />
        <pointLight position={[5, 5, 5]} intensity={4} color="#ffffff" distance={25} />

        {/* CONTENIDO FLOTANTE Y CENTRADO */}
        <Float 
          speed={1.5} 
          rotationIntensity={0} 
          floatIntensity={0.5} 
        >
          <Center>
            <Model scale={4.5} /> 
          </Center>
        </Float>

        {/* OrbitControls: permite rotar pero no zoom */}
        <OrbitControls 
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