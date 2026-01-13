'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const news = [
    {
        id: 1,
        title: "Patricio 'Pitbull' Freire Earns Hard-Fought Victory",
        category: "UFC",
        excerpt: "Brazilian MMA legend Patricio 'Pitbull' Freire earns a hard-fought unanimous decision at the UFC event...",
        image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&h=500&fit=crop",
        date: "Jan 10, 2026",
    },
    {
        id: 2,
        title: "Elevate Your Gaming with Pro Insights",
        category: "Gaming",
        excerpt: "Elevate your Season 4 Reloaded experience with pro insights from TeeP and Aydan...",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=500&fit=crop",
        date: "Jan 8, 2026",
    },
    {
        id: 3,
        title: "Daniel Sanders Leads 2025 Dakar Rally",
        category: "Motorsports",
        excerpt: "Daniel Sanders (KTM) leads the 2025 Dakar Rally with dominant performance in the desert...",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop",
        date: "Jan 5, 2026",
    },
    {
        id: 4,
        title: "Monster Energy Athletes Dominate X Games",
        category: "Extreme Sports",
        excerpt: "Monster Energy athletes take home multiple gold medals at this year's Winter X Games...",
        image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=400&h=500&fit=crop",
        date: "Jan 3, 2026",
    },
];

export default function NewsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const { scrollXProgress } = useScroll({
        container: containerRef,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section id="news" className="py-20 md:py-32 bg-black relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        background: 'radial-gradient(circle at 50% 100%, rgba(0, 217, 255, 0.15) 0%, transparent 60%)',
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
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
                        Latest <span className="text-monster-blue">News</span>
                    </h2>
                    <p className="text-monster-text-muted max-w-2xl mx-auto">
                        Stay updated with the latest from Monster Energy athletes, events, and sponsorships worldwide.
                    </p>
                </motion.div>

                {/* News Carousel - Mobile */}
                <div className="lg:hidden">
                    <motion.div
                        ref={containerRef}
                        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4
              scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {news.map((item, index) => (
                            <motion.a
                                key={item.id}
                                href="#"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex-shrink-0 w-[280px] snap-center"
                            >
                                <NewsCard item={item} />
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Scroll Hint */}
                    <div className="flex justify-center gap-2 mt-4">
                        {news.map((_, index) => (
                            <div
                                key={index}
                                className="w-2 h-2 rounded-full bg-monster-surface"
                            />
                        ))}
                    </div>
                </div>

                {/* News Grid - Desktop */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="hidden lg:grid grid-cols-4 gap-6"
                >
                    {news.map((item) => (
                        <motion.a
                            key={item.id}
                            href="#"
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                        >
                            <NewsCard item={item} />
                        </motion.a>
                    ))}
                </motion.div>

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-monster-blue 
              text-monster-blue font-bold uppercase tracking-wider rounded-lg 
              hover:bg-monster-blue hover:text-monster-bg-dark transition-all"
                    >
                        View All News
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}

function NewsCard({ item }: { item: typeof news[0] }) {
    return (
        <div className="group relative h-[400px] rounded-2xl overflow-hidden bg-monster-surface">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-monster-bg-dark via-monster-bg-dark/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
                {/* Category */}
                <span
                    className="inline-block w-fit px-3 py-1 bg-monster-blue/20 text-monster-blue 
            text-xs font-bold uppercase tracking-wider rounded-full mb-3 backdrop-blur-sm"
                >
                    {item.category}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold text-monster-text mb-2 line-clamp-2 
          group-hover:text-monster-blue transition-colors">
                    {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-monster-text-muted line-clamp-2 mb-3">
                    {item.excerpt}
                </p>

                {/* Date & Read More */}
                <div className="flex items-center justify-between">
                    <span className="text-xs text-monster-text-muted">
                        {item.date}
                    </span>
                    <span className="text-xs font-semibold text-monster-blue group-hover:underline">
                        Read More →
                    </span>
                </div>
            </div>

            {/* Border Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
        transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 2px rgba(0, 217, 255, 0.5)' }}
            />
        </div>
    );
}
