import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function DocumentStack() {
    const group = useRef();

    useFrame(({ clock, pointer }) => {
        if (!group.current) return;
        group.current.rotation.y = clock.elapsedTime * 0.15 + pointer.x * 0.2;
        group.current.rotation.x = Math.sin(clock.elapsedTime * 0.6) * 0.08 - pointer.y * 0.15;
    });

    return (
        <group ref={group} rotation={[0.1, -0.3, -0.1]}>
            {[0, 1, 2, 3, 4].map((i) => (
                <mesh
                    key={i}
                    position={[0, i * 0.15 - 0.3, 0]}
                    rotation={[0, 0, (i - 2) * 0.03]}
                    castShadow
                >
                    <boxGeometry args={[2.5, 0.1, 1.8]} />
                    <meshStandardMaterial
                        color={i === 4 ? '#fffdf8' : '#e5e1d7'}
                        roughness={0.7}
                        metalness={0.05}
                    />
                </mesh>
            ))}
            {/* Accent stripe */}
            <mesh position={[0, 0.1, 0.02]} castShadow>
                <boxGeometry args={[2, 0.03, 1.2]} />
                <meshStandardMaterial color="#f2a93b" roughness={0.5} />
            </mesh>
            {/* Text lines */}
            <mesh position={[0, 0.14, 0.03]}>
                <boxGeometry args={[1.2, 0.03, 0.06]} />
                <meshStandardMaterial color="#16233a" />
            </mesh>
            <mesh position={[0, 0.14, -0.2]}>
                <boxGeometry args={[1.6, 0.03, 0.04]} />
                <meshStandardMaterial color="#16233a" transparent opacity={0.3} />
            </mesh>
        </group>
    );
}

const FloatingDocument = () => {
    return (
        <div className="relative h-[400px] w-full sm:h-[500px] lg:h-[600px]">
            <div className="absolute inset-12 rounded-full bg-[#F2A93B]/25 blur-[100px] animate-pulse" />
            <div className="relative z-10 h-full w-full">
                <Canvas
                    shadows
                    camera={{ position: [0, 2, 6], fov: 35 }}
                    dpr={[1, 2]}
                >
                    <ambientLight intensity={1.5} />
                    <directionalLight
                        position={[4, 5, 4]}
                        intensity={2.8}
                        color="#fff4d8"
                        castShadow
                    />
                    <pointLight
                        position={[-3, 1.5, 2]}
                        intensity={18}
                        distance={9}
                        color="#f2a93b"
                    />
                    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
                        <DocumentStack />
                    </Float>
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                </Canvas>
            </div>
            <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#16233A]/15 bg-white/80 px-5 py-2.5 text-xs font-semibold shadow-xl backdrop-blur-md">
                ✨ Your documents, ready to talk
            </div>
        </div>
    );
};

export default FloatingDocument