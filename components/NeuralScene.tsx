"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

const NODE_COUNT = 150;
const CONNECT_DIST = 1.9;
const MAX_LINES = 280;

const PALETTE: [number, number, number][] = [
    [1.0, 0.45, 0.09],
    [0.98, 0.52, 0.14],
    [0.23, 0.51, 0.96],
    [0.66, 0.33, 0.97],
    [0.02, 0.71, 0.83],
];

export default function NeuralScene() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0a0a0a, 0.038);

        const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
        camera.position.z = 8;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        // Node positions + colors
        const positions = new Float32Array(NODE_COUNT * 3);
        const colors    = new Float32Array(NODE_COUNT * 3);

        for (let i = 0; i < NODE_COUNT; i++) {
            const phi   = Math.acos(-1 + (2 * i) / NODE_COUNT);
            const theta = Math.sqrt(NODE_COUNT * Math.PI) * phi;
            const r     = 2.8 + Math.random() * 1.8;

            positions[i * 3]     = r * Math.cos(theta) * Math.sin(phi);
            positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi) * 0.75;
            positions[i * 3 + 2] = r * Math.cos(phi);

            const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
            colors[i * 3]     = c[0];
            colors[i * 3 + 1] = c[1];
            colors[i * 3 + 2] = c[2];
        }

        const pointsGeo = new THREE.BufferGeometry();
        pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        pointsGeo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));

        const pointsMat = new THREE.PointsMaterial({
            size: 0.08, vertexColors: true, sizeAttenuation: true,
            transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
        });

        // Connection lines
        const lpos: number[] = [];
        const lcol: number[] = [];
        let lineCount = 0;

        for (let i = 0; i < NODE_COUNT && lineCount < MAX_LINES; i++) {
            for (let j = i + 1; j < NODE_COUNT && lineCount < MAX_LINES; j++) {
                const dx = positions[i*3] - positions[j*3];
                const dy = positions[i*3+1] - positions[j*3+1];
                const dz = positions[i*3+2] - positions[j*3+2];
                const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

                if (dist < CONNECT_DIST) {
                    const a = (1 - dist / CONNECT_DIST) * 0.55;
                    lpos.push(positions[i*3], positions[i*3+1], positions[i*3+2]);
                    lpos.push(positions[j*3], positions[j*3+1], positions[j*3+2]);
                    lcol.push(a, a * 0.45, 0, a, a * 0.45, 0);
                    lineCount++;
                }
            }
        }

        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(lpos), 3));
        lineGeo.setAttribute("color",    new THREE.BufferAttribute(new Float32Array(lcol), 3));

        const lineMat = new THREE.LineBasicMaterial({
            vertexColors: true, transparent: true,
            blending: THREE.AdditiveBlending, depthWrite: false,
        });

        const group = new THREE.Group();
        group.add(new THREE.Points(pointsGeo, pointsMat));
        group.add(new THREE.LineSegments(lineGeo, lineMat));
        scene.add(group);

        let animId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            animId = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            group.rotation.y = t * 0.055;
            group.rotation.x = Math.sin(t * 0.035) * 0.18;
            renderer.render(scene, camera);
        };
        animate();

        const onResize = () => {
            if (!mount) return;
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", onResize);
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
            renderer.dispose();
            pointsGeo.dispose();
            lineGeo.dispose();
            pointsMat.dispose();
            lineMat.dispose();
        };
    }, []);

    return (
        <section id="neural-scene" className="relative border-t border-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-[#0a0a0a]" />
            <div className="relative z-[2] h-[65vh]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0d0d0d] to-transparent z-10" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="pointer-events-none select-none absolute inset-0 flex flex-col items-start justify-center z-10 px-10 md:px-20"
                >
                    <p className="text-orange-500/70 font-mono text-xs tracking-[0.4em] uppercase mb-4">
                        Intelligence Layer
                    </p>
                    <p className="text-white/20 text-5xl md:text-7xl font-black tracking-tighter leading-none">
                        Neural
                    </p>
                    <p className="text-white/10 text-5xl md:text-7xl font-black tracking-tighter leading-none">
                        Systems
                    </p>
                </motion.div>

                <div ref={mountRef} className="w-full h-full" />
            </div>
        </section>
    );
}
