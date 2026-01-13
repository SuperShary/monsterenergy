'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useProductStore, ProductType } from '@/store/useProductStore';

const TOTAL_FRAMES = 80;

// Map product type to folder name
const productFolders: Record<ProductType, string> = {
    green: 'monstergreen',
    red: 'monsterred',
    blue: 'monsterblue',
};

export default function FrameAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { selectedProduct } = useProductStore();

    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [currentFrame, setCurrentFrame] = useState(1);

    // Get frame path
    const getFramePath = useCallback((product: ProductType, frame: number): string => {
        const paddedFrame = frame.toString().padStart(3, '0');
        return `/${productFolders[product]}/ezgif-frame-${paddedFrame}.jpg`;
    }, []);

    // Preload images for current product
    useEffect(() => {
        setIsLoading(true);
        setLoadedCount(0);

        const loadImage = (index: number): Promise<HTMLImageElement> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = getFramePath(selectedProduct, index);
                img.onload = () => {
                    setLoadedCount(prev => prev + 1);
                    resolve(img);
                };
                img.onerror = () => {
                    // Still resolve with a placeholder to avoid breaking
                    console.warn(`Failed to load frame ${index}`);
                    setLoadedCount(prev => prev + 1);
                    resolve(img);
                };
            });
        };

        // Load all frames
        const loadAllFrames = async () => {
            const promises = [];
            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                promises.push(loadImage(i));
            }

            try {
                const imgs = await Promise.all(promises);
                setImages(imgs);
                setIsLoading(false);
                // Draw first frame immediately
                setCurrentFrame(1);
            } catch (error) {
                console.error('Error loading frames:', error);
                setIsLoading(false);
            }
        };

        loadAllFrames();
    }, [selectedProduct, getFramePath]);

    // Handle scroll-based frame updates
    useEffect(() => {
        if (images.length === 0 || isLoading) return;

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            // Animation runs through first 3 screen heights (300vh hero section)
            const scrollRange = windowHeight * 2.5;

            // Calculate progress (0 to 1)
            const progress = Math.min(Math.max(scrollTop / scrollRange, 0), 1);

            // Map to frame (1 to 80)
            const frame = Math.max(1, Math.min(Math.round(progress * (TOTAL_FRAMES - 1)) + 1, TOTAL_FRAMES));
            setCurrentFrame(frame);
        };

        // Initial call
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [images, isLoading]);

    // Draw frame on canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = images[currentFrame - 1];
        if (img && img.complete && img.naturalWidth > 0) {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            // Use contain mode to show complete can without cropping
            const scale = Math.min(canvasWidth / img.width, canvasHeight / img.height);

            const x = (canvasWidth - img.width * scale) / 2;
            const y = (canvasHeight - img.height * scale) / 2;

            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
    }, [currentFrame, images]);

    // Set canvas size
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const updateCanvasSize = () => {
            const container = containerRef.current;
            if (container) {
                // High DPI support
                const dpr = window.devicePixelRatio || 1;
                const rect = container.getBoundingClientRect();
                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;
                canvas.style.width = `${rect.width}px`;
                canvas.style.height = `${rect.height}px`;

                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.scale(dpr, dpr);
                    // Redraw after resize
                    const img = images[currentFrame - 1];
                    if (img && img.complete && img.naturalWidth > 0) {
                        ctx.clearRect(0, 0, rect.width, rect.height);

                        // Use contain mode to show complete can
                        const scale = Math.min(rect.width / img.width, rect.height / img.height);

                        const x = (rect.width - img.width * scale) / 2;
                        const y = (rect.height - img.height * scale) / 2;
                        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
                    }
                }
            }
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
        return () => window.removeEventListener('resize', updateCanvasSize);
    }, [images, currentFrame]);

    // Get color for current product
    const productColors: Record<ProductType, string> = {
        green: '#ccff00',
        red: '#ff1493',
        blue: '#00d9ff',
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center"
        >
            {/* Loading State */}
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-10"
                >
                    <div
                        className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mb-4"
                        style={{ borderColor: `${productColors[selectedProduct]}40`, borderTopColor: productColors[selectedProduct] }}
                    />
                    <div className="text-monster-text-muted text-sm font-medium">
                        Loading frames... {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
                    </div>
                    {/* Progress bar */}
                    <div className="w-48 h-1 bg-monster-surface rounded-full mt-2 overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: productColors[selectedProduct] }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
                        />
                    </div>
                </motion.div>
            )}

            {/* Canvas with CSS mask for smooth edge fading */}
            <div
                className={`w-full h-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                style={{
                    // Tighter ellipse mask - narrower horizontally to fade left/right edges more
                    maskImage: 'radial-gradient(ellipse 60% 75% at center, black 30%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 60% 75% at center, black 30%, transparent 80%)',
                }}
            >
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Strong vignette overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse 70% 80% at center, transparent 20%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,1) 85%)`
                }}
            />

            {/* Left edge fade - very strong */}
            <div
                className="absolute top-0 bottom-0 left-0 w-[25%] md:w-[20%] pointer-events-none"
                style={{
                    background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.5) 70%, transparent 100%)'
                }}
            />

            {/* Right edge fade - very strong */}
            <div
                className="absolute top-0 bottom-0 right-0 w-[25%] md:w-[20%] pointer-events-none"
                style={{
                    background: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.5) 70%, transparent 100%)'
                }}
            />

            {/* Top gradient for header blend - desktop */}
            <div
                className="absolute top-0 left-0 right-0 h-28 md:h-36 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)'
                }}
            />

            {/* MOBILE ONLY - Extra strong top fade to hide edge */}
            <div
                className="md:hidden absolute top-0 left-0 right-0 h-[20%] pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.3) 80%, transparent 100%)'
                }}
            />

            {/* Bottom gradient for content blend - desktop */}
            <div
                className="absolute bottom-0 left-0 right-0 h-36 md:h-44 pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, transparent 100%)'
                }}
            />

            {/* MOBILE ONLY - Extra strong bottom fade to hide edge */}
            <div
                className="md:hidden absolute bottom-0 left-0 right-0 h-[25%] pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.9) 55%, rgba(0,0,0,0.5) 75%, transparent 100%)'
                }}
            />

            {/* Subtle glow in center */}
            <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                    background: `radial-gradient(circle at center, ${productColors[selectedProduct]}30 0%, transparent 40%)`
                }}
            />
        </div>
    );
}
