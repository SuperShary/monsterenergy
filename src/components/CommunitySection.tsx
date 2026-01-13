'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const communityImages = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=400&h=400&fit=crop",
        alt: "Extreme snowboarding",
        title: "Winter Session",
        size: "normal",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
        alt: "Athlete training",
        title: "Beast Mode",
        size: "tall",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=400&fit=crop",
        alt: "Cycling competition",
        title: "Race Day",
        size: "normal",
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=400&h=400&fit=crop",
        alt: "Surfing",
        title: "Wave Rider",
        size: "normal",
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop",
        alt: "Motor racing",
        title: "Full Throttle",
        size: "tall",
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1502904550040-7534597429ae?w=400&h=400&fit=crop",
        alt: "Gaming setup",
        title: "Game On",
        size: "normal",
    },
    {
        id: 7,
        src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=400&fit=crop",
        alt: "Running athlete",
        title: "Push Limits",
        size: "normal",
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=600&fit=crop",
        alt: "Tech setup",
        title: "Power Up",
        size: "tall",
    },
];

export default function CommunitySection() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="community" className="py-20 md:py-32 bg-black relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at 30% 50%, rgba(255, 20, 147, 0.1) 0%, transparent 50%)',
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
                        Join the <span className="text-monster-red">Community</span>
                    </h2>
                    <p className="text-monster-text-muted max-w-2xl mx-auto">
                        Monster Energy lifestyle. From extreme sports to gaming, join millions who live life unleashed.
                    </p>
                </motion.div>

                {/* Masonry Grid */}
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
                >
                    {communityImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="break-inside-avoid group relative rounded-xl overflow-hidden cursor-pointer"
                        >
                            <div className={`relative ${image.size === 'tall' ? 'aspect-[3/4]' : 'aspect-square'}`}>
                                {/* Image */}
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    loading="lazy"
                                />

                                {/* Overlay - Hidden by default, shows on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-monster-bg-dark via-transparent to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Content - Shows on hover */}
                                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="text-lg font-bold text-monster-text">
                                        {image.title}
                                    </h3>
                                </div>

                                {/* Like Button */}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-monster-bg-dark/50 
                    backdrop-blur-sm flex items-center justify-center opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <svg className="w-4 h-4 text-monster-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </motion.button>

                                {/* Border */}
                                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300 pointer-events-none"
                                    style={{ boxShadow: 'inset 0 0 0 2px rgba(255, 20, 147, 0.5)' }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Social CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <p className="text-monster-text-muted mb-6">
                        Share your Monster moments with <span className="text-monster-green font-semibold">#MonsterEnergy</span>
                    </p>
                    <div className="flex justify-center gap-4">
                        <motion.a
                            href="https://instagram.com/monsterenergy"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 
                text-white font-bold uppercase tracking-wider rounded-lg transition-all"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                            Follow on Instagram
                        </motion.a>

                        <motion.a
                            href="https://tiktok.com/@monsterenergy"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 bg-monster-surface border border-white/10
                text-monster-text font-bold uppercase tracking-wider rounded-lg 
                hover:border-monster-text/30 transition-all"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                            </svg>
                            TikTok
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
