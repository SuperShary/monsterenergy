'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { productData, ProductType } from '@/store/useProductStore';
import Image from 'next/image';

// Map product type to folder name
const productFolders: Record<ProductType, string> = {
    green: 'monstergreen',
    red: 'monsterred',
    blue: 'monsterblue',
};

export default function ProductsSection() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const products = Object.values(productData);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section id="products" className="py-20 md:py-32 bg-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(204, 255, 0, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(0, 217, 255, 0.1) 0%, transparent 50%)
            `,
                    }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
                        Our <span className="text-monster-green">Flavors</span>
                    </h2>
                    <p className="text-monster-text-muted max-w-2xl mx-auto">
                        Discover the perfect energy boost. Each Monster variant is crafted for those who push beyond limits.
                    </p>
                </motion.div>

                {/* Products Grid */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={itemVariants}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group relative bg-[#111111] rounded-2xl overflow-hidden"
                            style={{
                                boxShadow: `0 0 0 1px ${product.color}20`,
                            }}
                        >
                            {/* Card Glow Effect */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `radial-gradient(circle at 50% 0%, ${product.color}20 0%, transparent 70%)`,
                                }}
                            />

                            {/* Product Image */}
                            <div className="relative aspect-square bg-black p-8">
                                <Image
                                    src={`/${productFolders[product.id]}/ezgif-frame-040.jpg`}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Floating particles */}
                                <div
                                    className="absolute top-4 right-4 w-3 h-3 rounded-full opacity-60 animate-float"
                                    style={{ backgroundColor: product.color }}
                                />
                            </div>

                            {/* Product Info */}
                            <div className="p-6">
                                <h3
                                    className="text-xl font-bold uppercase tracking-wider mb-2"
                                    style={{ color: product.color }}
                                >
                                    {product.name}
                                </h3>
                                <p className="text-sm text-monster-text-muted mb-4 line-clamp-2">
                                    {product.description}
                                </p>

                                {/* Features */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {product.features.slice(0, 3).map((feature) => (
                                        <span
                                            key={feature}
                                            className="text-xs px-2 py-1 rounded-full bg-black text-monster-text-muted"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 font-semibold uppercase tracking-wider rounded-xl 
                    transition-all duration-300"
                                    style={{
                                        backgroundColor: `${product.color}20`,
                                        color: product.color,
                                        border: `1px solid ${product.color}40`,
                                    }}
                                >
                                    Learn More
                                </motion.button>
                            </div>

                            {/* Border Glow on Hover */}
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                  transition-opacity duration-500 pointer-events-none"
                                style={{
                                    boxShadow: `inset 0 0 0 2px ${product.color}60`,
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-monster-green text-black 
              font-semibold uppercase tracking-wider rounded-xl hover:glow-green transition-all"
                    >
                        View All Products
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
