import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Undulating interactive cyber wave grid — dynamically scaled for mobile vs desktop
function DigitalWaveField({ isMobile = false }: { isMobile?: boolean }) {
  const meshRef = useRef<THREE.Points>(null);
  const pointer = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Desktop: 44 x 28 = 1,232 points. Mobile <768px: 26 x 16 = 416 points (~66% reduction in per-frame math)
  const cols = isMobile ? 26 : 44;
  const rows = isMobile ? 16 : 28;
  const count = cols * rows;

  const { positions, initialPositions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const init = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color('#38bdf8'); // Cyan
    const color2 = new THREE.Color('#4d7cfe'); // Electric blue
    const color3 = new THREE.Color('#8b5cf6'); // Iris purple

    const spanX = isMobile ? 22 : 26;
    const spanY = isMobile ? 14 : 16;

    let idx = 0;
    for (let iy = 0; iy < rows; iy++) {
      for (let ix = 0; ix < cols; ix++) {
        const u = ix / (cols - 1);
        const v = iy / (rows - 1);

        const x = (u - 0.5) * spanX;
        const y = (v - 0.5) * spanY;
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
  }, [cols, rows, count, isMobile]);

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
        size={isMobile ? 0.102 : 0.082}
        vertexColors
        transparent
        opacity={0.76}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Elegant Prismatic Core with Orbiting Energy Rings — responsively scaled for mobile viewports
function LuminousCore({ scale = 1 }: { scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
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

    // Subtle, restrained organic breathing pulse for inner singularity
    if (innerCoreRef.current) {
      const pulse = 1 + Math.sin(t * 1.8) * 0.04;
      innerCoreRef.current.scale.setScalar(0.34 * pulse);
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
    <group ref={groupRef} position={[0, 0.38, 0.2]} scale={scale}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.6}>
        {/* Crystal Core — high-performance standard material with crisp specular facet response */}
        <mesh ref={coreRef} scale={1.15}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#4574fc"
            emissive="#1c3ba8"
            emissiveIntensity={0.42}
            roughness={0.09}
            metalness={0.32}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Wireframe Facets — precision laser optics character */}
        <mesh ref={wireRef} scale={1.21}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            wireframe
            color="#9fa8da"
            transparent
            opacity={0.28}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Inner Glowing Core — luminous energy singularity */}
        <mesh ref={innerCoreRef} scale={0.34}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color="#e0e7ff"
            transparent
            opacity={0.88}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Dynamic Orbital Rings — refined filigree precision */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.0, 0.014, 16, 96]} />
          <meshBasicMaterial
            color="#5c8dfa"
            transparent
            opacity={0.62}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.35, 0.010, 16, 96]} />
          <meshBasicMaterial
            color="#9d74f7"
            transparent
            opacity={0.50}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <mesh ref={ring3Ref}>
          <torusGeometry args={[2.65, 0.008, 16, 96]} />
          <meshBasicMaterial
            color="#4cc9f0"
            transparent
            opacity={0.42}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Float>
    </group>
  );
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Ambient Cosmic Stardust Particles — responsive desktop 220 / mobile 130
function StarDust({ count }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const actualCount = count ?? (typeof window !== 'undefined' && window.innerWidth < 768 ? 130 : 220);

  const positions = useMemo(() => {
    const arr = new Float32Array(actualCount * 3);
    for (let i = 0; i < actualCount; i++) {
      const r = 4.2 + seededRandom(i * 3 + 1) * 6.5;
      const theta = seededRandom(i * 3 + 2) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 3 + 3) - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      arr[i * 3 + 2] = r * Math.cos(phi) - 2.5;
    }
    return arr;
  }, [actualCount]);

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
        size={0.032}
        color="#c7d2fe"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Micro camera parallax rig: restrained glide (max ±0.22 X, ±0.14 Y) with harmonic ambient drift on touch
function CameraRig({ isMobile = false }: { isMobile?: boolean }) {
  useFrame((state) => {
    if (typeof window !== 'undefined' && window.scrollY > window.innerHeight * 1.05) return;
    const { pointer, camera, clock } = state;
    const t = clock.elapsedTime;

    // On touch devices where pointer cursor isn't moving, add a subtle, elegant ambient harmonic drift
    const ambientX = isMobile ? Math.sin(t * 0.35) * 0.08 : 0;
    const ambientY = isMobile ? Math.cos(t * 0.28) * 0.05 : 0;

    const targetX = pointer.x * 0.22 + ambientX;
    const targetY = pointer.y * 0.14 + ambientY;
    camera.position.x += (targetX - camera.position.x) * 0.025;
    camera.position.y += (targetY - camera.position.y) * 0.025;
  });
  return null;
}

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [coreScale, setCoreScale] = useState(() => {
    if (typeof window === 'undefined') return 1;
    const w = window.innerWidth;
    if (w < 400) return 0.76;
    if (w < 768) return 0.84;
    return 1;
  });

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      if (w < 400) setCoreScale(0.76);
      else if (w < 768) setCoreScale(0.84);
      else setCoreScale(1);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const dpr = useMemo<[number, number]>(() => [1, isMobile ? 1.35 : 1.5], [isMobile]);

  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, isMobile ? 8.1 : 7.8], fov: isMobile ? 44 : 42 }}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        {/* Balanced lighting hierarchy */}
        <ambientLight intensity={0.42} />
        {/* Primary Key Light — crisp white-blue highlight on crystal facets */}
        <pointLight position={[1, 3.5, 4.8]} intensity={12} color="#e2e8ff" distance={14} />
        {/* Secondary Rim Light — rich violet accent */}
        <pointLight position={[-5, -1.8, 1.5]} intensity={8.5} color="#8b5cf6" distance={14} />
        {/* Tertiary Fill Light — cyan cyber edge */}
        <pointLight position={[5, -2.5, 2.5]} intensity={7.5} color="#38bdf8" distance={14} />

        <CameraRig isMobile={isMobile} />
        <DigitalWaveField isMobile={isMobile} />
        <LuminousCore scale={coreScale} />
        <StarDust count={isMobile ? 110 : 220} />
      </Canvas>
    </div>
  );
}
