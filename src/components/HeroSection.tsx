'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FrameAnimation from './FrameAnimation';
import { useProductStore, productData, ProductType } from '@/store/useProductStore';

const productOrder: ProductType[] = ['green', 'red', 'blue'];

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { selectedProduct, setProduct } = useProductStore();
    const product = productData[selectedProduct];

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    // Parallax effects
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const textY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

    // Navigation handlers
    const currentIndex = productOrder.indexOf(selectedProduct);

    const goToPrevious = () => {
        const prevIndex = currentIndex === 0 ? productOrder.length - 1 : currentIndex - 1;
        setProduct(productOrder[prevIndex]);
    };

    const goToNext = () => {
        const nextIndex = currentIndex === productOrder.length - 1 ? 0 : currentIndex + 1;
        setProduct(productOrder[nextIndex]);
    };

    return (
        <section
            ref={containerRef}
            className="relative min-h-[300vh] bg-black"
        >
            {/* Background Effects */}
            <motion.div
                className="absolute inset-0 overflow-hidden"
                style={{ y: backgroundY }}
            >
                {/* Gradient orbs */}
                <div
                    className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-15"
                    style={{ background: product.color }}
                />
                <div
                    className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10"
                    style={{ background: product.color }}
                />
            </motion.div>

            {/* Sticky Container - Full screen with overlaid content */}
            <div className="sticky top-0 h-screen flex flex-col">

                {/* Frame Animation - Full screen background, positioned higher */}
                <div className="absolute inset-0 flex items-start justify-center pt-16 md:pt-20">
                    <div className="w-full h-[85%] md:h-full max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl">
                        <FrameAnimation />
                    </div>
                </div>

                {/* Left/Right Arrow Navigation for product switching */}
                <motion.div
                    className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 md:px-4 z-20 pointer-events-none"
                    style={{ opacity: textOpacity }}
                >
                    {/* Left Arrow */}
                    <motion.button
                        onClick={goToPrevious}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="pointer-events-auto w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center
                                   bg-black/50 backdrop-blur-sm border border-white/20 transition-all hover:bg-black/70"
                        style={{ borderColor: `${product.color}40` }}
                    >
                        <svg
                            className="w-5 h-5 md:w-6 md:h-6"
                            fill="none"
                            stroke={product.color}
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </motion.button>

                    {/* Right Arrow */}
                    <motion.button
                        onClick={goToNext}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="pointer-events-auto w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center
                                   bg-black/50 backdrop-blur-sm border border-white/20 transition-all hover:bg-black/70"
                        style={{ borderColor: `${product.color}40` }}
                    >
                        <svg
                            className="w-5 h-5 md:w-6 md:h-6"
                            fill="none"
                            stroke={product.color}
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                </motion.div>

                {/* Product Title - Minimal overlay at top */}
                <motion.div
                    className="relative z-10 pt-20 md:pt-24 px-4"
                    style={{ opacity: textOpacity, y: textY }}
                >
                    <div className="container mx-auto text-center">
                        <motion.div
                            key={selectedProduct}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1
                                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight drop-shadow-lg"
                                style={{
                                    color: product.color,
                                    letterSpacing: '-0.02em',
                                    textShadow: '0 2px 20px rgba(0,0,0,0.8)'
                                }}
                            >
                                {product.name}
                            </h1>
                            <p className="text-xs md:text-base text-monster-text-muted mt-1">
                                {product.subtitle}
                            </p>
                        </motion.div>

                        {/* Product Dots Indicator */}
                        <div className="flex justify-center gap-2 mt-3">
                            {productOrder.map((prod) => (
                                <button
                                    key={prod}
                                    onClick={() => setProduct(prod)}
                                    className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${selectedProduct === prod ? 'scale-125' : 'opacity-40'
                                        }`}
                                    style={{
                                        backgroundColor: selectedProduct === prod
                                            ? productData[prod].color
                                            : '#666'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="flex-1" />

                {/* Bottom Content - CTA & Scroll Hint with glass background */}
                <motion.div
                    className="relative z-10 pb-4 md:pb-6 px-4"
                    style={{ opacity: textOpacity }}
                >
                    {/* Glass container for better readability */}
                    <div className="container mx-auto max-w-lg">
                        <div className="bg-black/60 backdrop-blur-md rounded-2xl px-6 py-4 md:py-5 border border-white/5">
                            {/* CTA Buttons */}
                            <div className="flex flex-row gap-3 md:gap-4 justify-center items-center mb-3 md:mb-4">
                                <motion.a
                                    href="#products"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-5 md:px-8 py-2.5 md:py-3 text-xs md:text-sm font-semibold uppercase tracking-wider rounded-xl 
                      transition-all duration-300 text-black"
                                    style={{
                                        backgroundColor: product.color,
                                        boxShadow: `0 0 20px ${product.color}40`,
                                    }}
                                >
                                    Unleash the Beast
                                </motion.a>

                                <motion.a
                                    href="#products"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-5 md:px-8 py-2.5 md:py-3 text-xs md:text-sm font-semibold uppercase tracking-wider rounded-xl 
                      border-2 transition-all duration-300"
                                    style={{
                                        borderColor: product.color,
                                        color: product.color,
                                    }}
                                >
                                    Explore Flavors
                                </motion.a>
                            </div>

                            {/* Scroll Indicator */}
                            <motion.div
                                className="flex flex-col items-center"
                                animate={{ y: [0, 5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <span className="text-monster-text-muted text-[10px] md:text-xs uppercase tracking-widest mb-1">
                                    Scroll to Animate
                                </span>
                                <svg
                                    className="w-4 h-4 text-monster-text-muted"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
