'use client'

import HeroSection2 from "@/app/components/HeroSection2";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, useProgress } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';

function Model() {
    const gltf = useGLTF('/example.glb');

    useEffect(() => {
        // Optimize the scene
        if (gltf.scene) {
            gltf.scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.frustumCulled = true;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        }

        return () => {
            // Cleanup
            gltf.scene?.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.geometry.dispose();
                    if (child.material instanceof THREE.Material) {
                        child.material.dispose();
                    }
                }
            });
        };
    }, [gltf]);

    return (
        <Stage environment="city" intensity={0.5}>
            <primitive
                object={gltf.scene}
                scale={1}
                position={[0, 0, 0]}
            />
        </Stage>
    );
}

function Loader() {
    const { progress } = useProgress();
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"/>
                <p className="mt-4 text-xl font-semibold text-gray-700">
                    Loading... {progress.toFixed(0)}%
                </p>
            </div>
        </div>
    );
}

export default function KoridorPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return (
        <div>
            <div className="relative min-h-screen">
                <HeroSection2
                    title={"Design Koridor"}
                    description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                />
                <div className="container mx-auto px-4 py-8">
                    <div className="w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden relative">
                        <Suspense fallback={<Loader />}>
                            <Canvas
                                shadows
                                dpr={[1, 2]} // Optimize for different device pixel ratios
                                camera={{
                                    position: [5, 5, 5],
                                    fov: 45,
                                    near: 0.1,
                                    far: 1000
                                }}
                                gl={{
                                    antialias: true,
                                    preserveDrawingBuffer: true,
                                    powerPreference: "high-performance"
                                }}
                                onCreated={({ gl }) => {
                                    gl.setClearColor('#f1f5f9');
                                    gl.toneMapping = THREE.ACESFilmicToneMapping;
                                    gl.toneMappingExposure = 1;
                                }}
                            >
                                <Suspense fallback={null}>
                                    <Model />
                                </Suspense>

                                <OrbitControls
                                    makeDefault
                                    enableDamping
                                    dampingFactor={0.05}
                                    enableZoom={true}
                                    enablePan={true}
                                    enableRotate={true}
                                    maxDistance={20}
                                    minDistance={2}
                                    maxPolarAngle={Math.PI / 2}
                                />
                            </Canvas>
                        </Suspense>
                        
                    </div>

                </div>
            </div>
        </div>
    );
}

// Preload with error handling
try {
    useGLTF.preload('/example.glb');
} catch (error) {
    console.error('Error preloading model:', error);
}