"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent, useMotionValue, animate, motion } from "framer-motion";
import Overlay from "./Overlay";

// ─── helpers ────────────────────────────────────────────────────────────────

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);
    return isMobile;
}

function drawBitmapCover(canvas: HTMLCanvasElement, bitmap: ImageBitmap) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cw = canvas.width, ch = canvas.height;
    const ir = bitmap.width / bitmap.height, cr = cw / ch;
    let dw, dh, ox, oy;
    if (ir > cr) {
        dh = ch; dw = bitmap.width * (ch / bitmap.height);
        ox = (cw - dw) / 2; oy = 0;
    } else {
        dw = cw; dh = bitmap.height * (cw / bitmap.width);
        ox = 0; oy = (ch - dh) / 2;
    }
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(bitmap, ox, oy, dw, dh);
}

// ─── Mobile: 4-step tap-through hero ────────────────────────────────────────
// Each step maps to one key frame + one Overlay text section.
//
//  step 0  → frame   0  →  progress 0.12  (Ayan Ahmed text)
//  step 1  → frame  32  →  progress 0.37  (CGPA / AI Builder text)
//  step 2  → frame  64  →  progress 0.55  (gap — no text)
//  step 3  → frame  88  →  progress 0.67  (Hohnaar Scholar text)

const MOBILE_STEP_FRAMES    = [0, 32, 64, 88];      // source frame index in sequence-webp
const MOBILE_STEP_PROGRESS  = [0.12, 0.37, 0.55, 0.67]; // overlay progress for each step
const MOBILE_STEPS          = MOBILE_STEP_FRAMES.length;

function MobileHero() {
    const canvasRef   = useRef<HTMLCanvasElement>(null);
    const bitmaps     = useRef<(ImageBitmap | null)[]>(new Array(MOBILE_STEPS).fill(null));
    const rafRef      = useRef<number | null>(null);
    const stepRef     = useRef(0);
    const touchStartY = useRef(0);

    const [currentStep, setCurrentStep] = useState(0);
    const [firstReady, setFirstReady]   = useState(false);

    // MotionValue drives Overlay — animate() tweens it smoothly between steps
    const overlayProgress = useMotionValue(MOBILE_STEP_PROGRESS[0]);

    // ── load 4 key frames ───────────────────────────────────────────────────
    useEffect(() => {
        const load = async (i: number) => {
            const frameId = MOBILE_STEP_FRAMES[i].toString().padStart(4, "0");
            try {
                const resp = await fetch(`/sequence-webp/${frameId}.webp`);
                if (!resp.ok) return;
                bitmaps.current[i] = await createImageBitmap(await resp.blob());
                if (i === 0) setFirstReady(true);
            } catch { /* ignore */ }
        };
        load(0).then(() => { for (let i = 1; i < MOBILE_STEPS; i++) load(i); });
        return () => { bitmaps.current.forEach(b => b?.close()); };
    }, []);

    // ── render one step ─────────────────────────────────────────────────────
    const drawStep = useCallback((s: number) => {
        const canvas = canvasRef.current;
        const bitmap = bitmaps.current[s];
        if (!canvas || !bitmap) return;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            drawBitmapCover(canvas, bitmap);
            rafRef.current = null;
        });
    }, []);

    // ── advance / retreat step ──────────────────────────────────────────────
    const goToStep = useCallback((next: number) => {
        if (next >= MOBILE_STEPS) {
            // scroll past hero to the next section
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
            return;
        }
        if (next < 0) return;
        stepRef.current = next;
        setCurrentStep(next);
        animate(overlayProgress, MOBILE_STEP_PROGRESS[next], { duration: 0.35, ease: "easeOut" });
        drawStep(next);
    }, [drawStep, overlayProgress]);

    // ── touch events ────────────────────────────────────────────────────────
    useEffect(() => {
        const onStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
        const onEnd   = (e: TouchEvent) => {
            const delta = touchStartY.current - e.changedTouches[0].clientY;
            if (Math.abs(delta) < 35) return;       // ignore taps
            goToStep(stepRef.current + (delta > 0 ? 1 : -1));
        };
        window.addEventListener("touchstart", onStart, { passive: true });
        window.addEventListener("touchend",   onEnd,   { passive: true });
        return () => {
            window.removeEventListener("touchstart", onStart);
            window.removeEventListener("touchend",   onEnd);
        };
    }, [goToStep]);

    // ── canvas resize ───────────────────────────────────────────────────────
    useEffect(() => {
        const resize = () => {
            if (!canvasRef.current) return;
            canvasRef.current.width  = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            drawStep(stepRef.current);
        };
        window.addEventListener("resize", resize);
        resize();
        return () => window.removeEventListener("resize", resize);
    }, [drawStep]);

    useEffect(() => { if (firstReady) drawStep(0); }, [firstReady, drawStep]);

    return (
        <div className="h-screen relative overflow-hidden">
            {!firstReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#121212] z-50">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
            )}
            <canvas ref={canvasRef} className="block w-full h-full" />
            <Overlay scrollYProgress={overlayProgress} />

            {/* step dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-40 pointer-events-none">
                {Array.from({ length: MOBILE_STEPS }).map((_, i) => (
                    <div
                        key={i}
                        className={`rounded-full transition-all duration-300 ${
                            i === currentStep
                                ? "w-4 h-1.5 bg-white"
                                : "w-1.5 h-1.5 bg-white/30"
                        }`}
                    />
                ))}
            </div>

            {/* swipe hint on step 0 */}
            {currentStep === 0 && firstReady && (
                <motion.div
                    className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 3v14M10 17l-5-5M10 17l5-5" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </motion.div>
            )}
        </div>
    );
}

// ─── Desktop: continuous 96-frame scroll ────────────────────────────────────

function DesktopHero({ frameCount }: { frameCount: number }) {
    const canvasRef    = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const bitmaps      = useRef<(ImageBitmap | null)[]>([]);
    const loadedMask   = useRef<boolean[]>([]);
    const rafRef       = useRef<number | null>(null);
    const currentFrame = useRef(0);
    const [firstReady, setFirstReady] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const drawFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const bitmap = bitmaps.current[index];
        if (!canvas || !bitmap) return;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            drawBitmapCover(canvas, bitmap);
            rafRef.current = null;
        });
    }, []);

    useEffect(() => {
        setFirstReady(false);
        bitmaps.current  = new Array(frameCount).fill(null);
        loadedMask.current = new Array(frameCount).fill(false);

        const load = async (i: number) => {
            const frameId = i.toString().padStart(4, "0");
            try {
                const resp = await fetch(`/sequence-webp/${frameId}.webp`);
                if (!resp.ok) return;
                bitmaps.current[i]  = await createImageBitmap(await resp.blob());
                loadedMask.current[i] = true;
                if (i === 0) setFirstReady(true);
            } catch { /* ignore */ }
        };

        load(0).then(() => {
            const BATCH = 8;
            const runBatches = async () => {
                for (let i = 1; i < frameCount; i += BATCH) {
                    await Promise.all(
                        Array.from({ length: Math.min(BATCH, frameCount - i) }, (_, k) => load(i + k))
                    );
                }
            };
            runBatches();
        });

        return () => { bitmaps.current.forEach(b => b?.close()); };
    }, [frameCount]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!firstReady) return;
        let target = Math.min(frameCount - 1, Math.floor(latest * frameCount));
        while (target > 0 && !loadedMask.current[target]) target--;
        currentFrame.current = target;
        drawFrame(target);
    });

    useEffect(() => {
        const resize = () => {
            if (!canvasRef.current) return;
            canvasRef.current.width  = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            drawFrame(currentFrame.current);
        };
        window.addEventListener("resize", resize);
        resize();
        return () => window.removeEventListener("resize", resize);
    }, [drawFrame]);

    useEffect(() => { if (firstReady) drawFrame(0); }, [firstReady, drawFrame]);

    return (
        <div ref={containerRef} className="h-[500vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {!firstReady && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#121212] z-50">
                        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    </div>
                )}
                <canvas ref={canvasRef} className="block w-full h-full" />
                <Overlay scrollYProgress={scrollYProgress} />
            </div>
        </div>
    );
}

// ─── Entry point ─────────────────────────────────────────────────────────────

export default function ScrollyCanvas({ frameCount = 96 }: { frameCount?: number }) {
    const isMobile = useIsMobile();
    // Render nothing during SSR (window not available)
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return <div className="h-screen bg-[#121212]" />;

    return isMobile ? <MobileHero /> : <DesktopHero frameCount={frameCount} />;
}
