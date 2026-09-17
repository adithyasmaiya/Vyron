import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Undulating interactive cyber wave grid — highly optimized
function DigitalWaveField() {
  const meshRef = useRef<THREE.Points>(null);
  const pointer = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // 44 x 28 = 1,232 points: lightweight, high-performance 120fps
  const cols = 44;
  const rows = 28;
  const count = cols * rows;

  const { positions, initialPositions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const init = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color('#38bdf8'); // Cyan
    const color2 = new THREE.Color('#4d7cfe'); // Electric blue
    const color3 = new THREE.Color('#8b5cf6'); // Iris purple

    let idx = 0;
    for (let iy = 0; iy < rows; iy++) {
      for (let ix = 0; ix < cols; ix++) {
        const u = ix / (cols - 1);
        const v = iy / (rows - 1);

        const x = (u - 0.5) * 26;
        const y = (v - 0.5) * 16;
        const z = 0;

        pos[idx * 3] = x;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = z;

        init[idx * 3] = x;
        init[idx * 3 + 1] = y;
        init[idx * 3 + 2] = z;

        const c = new THREE.Color();
        if (u < 0.5) {
          c.lerpColors(color1, color2, u * 2);
        } else {
          c.lerpColors(color2, color3, (u - 0.5) * 2);
        }

        col[idx * 3] = c.r;
        col[idx * 3 + 1] = c.g;
        col[idx * 3 + 2] = c.b;

        idx++;
      }
    }
    return { positions: pos, initialPositions: init, colors: col };
  }, [cols, rows, count]);

  useFrame((state) => {
    // Skip calculations completely when hero is scrolled out of view
    if (typeof window !== 'undefined' && window.scrollY > window.innerHeight * 1.05) return;
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    const { pointer: mouse } = state;

    // Smooth mouse inertia
    pointer.current.targetX = mouse.x * 7;
    pointer.current.targetY = mouse.y * 4;
    pointer.current.x += (pointer.current.targetX - pointer.current.x) * 0.04;
    pointer.current.y += (pointer.current.targetY - pointer.current.y) * 0.04;

    const posAttr = meshRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;

    const px = pointer.current.x;
    const py = pointer.current.y;

    for (let i = 0; i < count; i++) {
      const x = initialPositions[i * 3];
      const y = initialPositions[i * 3 + 1];

      const dx = x - px;
      const dy = y - py;
      const distSq = dx * dx + dy * dy;

      const wave1 = Math.sin(x * 0.35 + time * 1.1) * Math.cos(y * 0.28 + time * 0.8) * 0.75;
      const wave2 = Math.sin((x + y) * 0.22 + time * 1.3) * 0.45;

      let ripple = 0;
      // Skip expensive math when far from cursor
      if (distSq < 64) {
        const dist = Math.sqrt(distSq);
        ripple = Math.sin(dist * 0.6 - time * 2.8) * Math.exp(-dist * 0.16) * 0.5;
      }

      arr[i * 3 + 2] = wave1 + wave2 + ripple;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points
      ref={meshRef}
      position={[0, -2.6, -1.8]}
      rotation={[-Math.PI / 2.7, 0, 0]}
    >
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.088}
        vertexColors
        transparent
        opacity={0.72}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Elegant Prismatic Core with Orbiting Energy Rings
function LuminousCore() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (typeof window !== 'undefined' && window.scrollY > window.innerHeight * 1.05) return;

    const t = state.clock.elapsedTime;
    const { pointer } = state;
    const g = groupRef.current;
    if (!g) return;

    g.rotation.y = t * 0.14 + pointer.x * 0.35;
    g.rotation.x = -pointer.y * 0.25;

    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.25;
      coreRef.current.rotation.z = Math.sin(t * 0.4) * 0.15;
    }

    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.18;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.35) * 0.15;
      ring1Ref.current.rotation.y = t * 0.32;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -Math.PI / 4 + Math.cos(t * 0.28) * 0.18;
      ring2Ref.current.rotation.z = -t * 0.25;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = Math.PI / 2 + Math.sin(t * 0.2) * 0.2;
      ring3Ref.current.rotation.z = t * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.4, 0.2]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.6}>
        {/* Crystal Core — high-performance standard material */}
        <mesh ref={coreRef} scale={1.15}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#4d7cfe"
            emissive="#2d4cdb"
            emissiveIntensity={0.5}
            roughness={0.15}
            metalness={0.4}
            transparent
            opacity={0.82}
          />
        </mesh>

        {/* Wireframe Facets */}
        <mesh ref={wireRef} scale={1.22}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            wireframe
            color="#a78bfa"
            transparent
            opacity={0.38}
          />
        </mesh>

        {/* Inner Glowing Core */}
        <mesh scale={0.35}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>

        {/* Dynamic Orbital Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.0, 0.016, 16, 80]} />
          <meshBasicMaterial color="#4d7cfe" transparent opacity={0.65} />
        </mesh>

        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.35, 0.012, 16, 80]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.55} />
        </mesh>

        <mesh ref={ring3Ref}>
          <torusGeometry args={[2.65, 0.009, 16, 80]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.45} />
        </mesh>
      </Float>
    </group>
  );
}

// Ambient Cosmic Stardust Particles
function StarDust({ count = 220 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4.2 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      arr[i * 3 + 2] = r * Math.cos(phi) - 2.5;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (typeof window !== 'undefined' && window.scrollY > window.innerHeight * 1.05) return;
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.018;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#a5b4fc"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 3, 5]} intensity={14} color="#4d7cfe" distance={15} />
        <pointLight position={[-6, -2, 2]} intensity={10} color="#8b5cf6" distance={15} />
        <pointLight position={[6, -3, 3]} intensity={8} color="#38bdf8" distance={15} />

        <DigitalWaveField />
        <LuminousCore />
        <StarDust />
      </Canvas>
    </div>
  );
}
