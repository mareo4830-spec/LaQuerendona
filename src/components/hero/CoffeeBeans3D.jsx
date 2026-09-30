import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Stylized, procedural organic coffee bean with crease
function AbstractCoffeeBean({ initialPos, rotSpeed, scale, delay }) {
  const meshRef = useRef();
  const currentPos = useRef(new THREE.Vector3(...initialPos));
  const targetOffset = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    if (!meshRef.current) return;
    const elapsedTime = typeof state.clock.getElapsedTime === "function" ? state.clock.getElapsedTime() : state.clock.elapsedTime || 0;
    const t = elapsedTime * 0.35 + delay;

    // Very slow, atmospheric floating
    const floatY = Math.sin(t * 0.8) * 0.25;
    const floatX = Math.cos(t * 0.5) * 0.15;
    const floatZ = Math.sin(t * 0.3) * 0.1;

    // Mouse repulsion calculation (particles part away from mouse)
    const pointerX = state.pointer.x * 3.5;
    const pointerY = state.pointer.y * 2.5;

    const dx = meshRef.current.position.x - pointerX;
    const dy = meshRef.current.position.y - pointerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 2.0) {
      const force = (2.0 - dist) * 0.45;
      targetOffset.current.x = (dx / (dist || 1)) * force;
      targetOffset.current.y = (dy / (dist || 1)) * force;
    } else {
      targetOffset.current.lerp(new THREE.Vector3(0, 0, 0), 0.03);
    }

    meshRef.current.position.x = initialPos[0] + floatX + targetOffset.current.x;
    meshRef.current.position.y = initialPos[1] + floatY + targetOffset.current.y;
    meshRef.current.position.z = initialPos[2] + floatZ;

    meshRef.current.rotation.x += rotSpeed[0] * 0.003;
    meshRef.current.rotation.y += rotSpeed[1] * 0.004;
    meshRef.current.rotation.z += rotSpeed[2] * 0.002;
  });

  return (
    <group ref={meshRef} position={initialPos}>
      {/* Bean body: elongated sphere */}
      <mesh scale={[scale * 1.3, scale * 0.85, scale * 0.85]}>
        <sphereGeometry args={[1, 20, 14]} />
        <meshStandardMaterial
          color="#3B2314"
          roughness={0.7}
          metalness={0.1}
          transparent={true}
          opacity={0.10} // 10% opacity as requested
          depthWrite={false}
        />
      </mesh>
      {/* Subtle crease indentation */}
      <mesh position={[0, 0, scale * 0.7]} scale={[scale * 1.1, scale * 0.08, scale * 0.1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color="#18181b"
          transparent={true}
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function WarmParticle({ initialPos, size, speed }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const elapsedTime = typeof state.clock.getElapsedTime === "function" ? state.clock.getElapsedTime() : state.clock.elapsedTime || 0;
    const t = elapsedTime * speed;
    meshRef.current.position.y = initialPos[1] + Math.sin(t + initialPos[0]) * 0.4;
    meshRef.current.position.x = initialPos[0] + Math.cos(t * 0.7 + initialPos[2]) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={initialPos}>
      <sphereGeometry args={[size, 10, 10]} />
      <meshBasicMaterial
        color="#c68a3e"
        transparent={true}
        opacity={0.09} // 9-10% warm ethereal particle opacity
        depthWrite={false}
      />
    </mesh>
  );
}

function OrganicScene() {
  const beans = useMemo(
    () => [
      { pos: [-3.8, 1.8, -1.5], rot: [0.3, 0.5, 0.2], scale: 0.35, delay: 0 },
      { pos: [3.4, -0.6, -1.0], rot: [1.1, 0.4, 0.7], scale: 0.40, delay: 1.2 },
      { pos: [-1.8, -1.6, -2.2], rot: [0.7, 1.2, 0.3], scale: 0.28, delay: 2.5 },
      { pos: [2.2, 2.2, -2.0], rot: [0.2, 0.8, 1.1], scale: 0.38, delay: 0.8 },
      { pos: [-4.2, -1.0, -1.2], rot: [1.4, 0.3, 0.5], scale: 0.30, delay: 3.1 },
      { pos: [4.4, 1.2, -1.8], rot: [0.6, 1.0, 0.4], scale: 0.34, delay: 1.9 },
      { pos: [0.2, -2.2, -1.6], rot: [0.8, 0.5, 1.2], scale: 0.32, delay: 4.0 },
      { pos: [-0.6, 2.4, -2.4], rot: [0.4, 1.3, 0.9], scale: 0.36, delay: 2.2 },
      { pos: [1.2, 0.4, -3.0], rot: [0.9, 0.7, 0.4], scale: 0.26, delay: 1.5 },
      { pos: [-3.0, -2.4, -2.0], rot: [0.5, 1.1, 0.6], scale: 0.30, delay: 3.7 },
    ],
    []
  );

  const particles = useMemo(
    () => [
      { pos: [-4.5, 2.2, -3.0], size: 0.08, speed: 0.3 },
      { pos: [3.8, -1.4, -3.5], size: 0.07, speed: 0.25 },
      { pos: [-2.0, 2.8, -4.0], size: 0.10, speed: 0.35 },
      { pos: [2.5, 2.1, -3.2], size: 0.09, speed: 0.2 },
      { pos: [-3.5, -2.1, -4.0], size: 0.06, speed: 0.3 },
      { pos: [1.0, -2.8, -3.0], size: 0.08, speed: 0.28 },
      { pos: [4.5, 0.8, -4.5], size: 0.05, speed: 0.4 },
      { pos: [-1.2, -1.2, -3.8], size: 0.07, speed: 0.32 },
    ],
    []
  );

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 4]} intensity={0.4} />
      <pointLight position={[-4, -2, 2]} intensity={0.3} color="#c68a3e" />

      {beans.map((bean, i) => (
        <AbstractCoffeeBean
          key={`bean-${i}`}
          initialPos={bean.pos}
          rotSpeed={bean.rot}
          scale={bean.scale}
          delay={bean.delay}
        />
      ))}

      {particles.map((p, i) => (
        <WarmParticle
          key={`part-${i}`}
          initialPos={p.pos}
          size={p.size}
          speed={p.speed}
        />
      ))}
    </>
  );
}

export default function CoffeeBeans3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none hidden md:block overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        style={{ background: "transparent", pointerEvents: "none" }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      >
        <OrganicScene />
      </Canvas>
    </div>
  );
}
