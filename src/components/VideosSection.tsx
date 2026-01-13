'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const videos = [
    {
        id: 1,
        title: "Ring of Fire Send 😳",
        category: "Extreme Sports",
        thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=340&fit=crop",
        views: "2.3M views",
    },
    {
        id: 2,
        title: "FASTEST RUN IN DRAG RACE HISTORY! 343.16 MPH 🤯",
        category: "Motorsports",
        thumbnail: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=340&fit=crop",
        views: "5.1M views",
    },
    {
        id: 3,
        title: "Nyjah Made This Line Look So Smooth 😮💨",
        category: "Skateboarding",
        thumbnail: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=600&h=340&fit=crop",
        views: "1.8M views",
    },
    {
        id: 4,
        title: "Epic Mountain Bike Descent 🚵",
        category: "Mountain Biking",
        thumbnail: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&h=340&fit=crop",
        views: "3.2M views",
    },
];

export default function VideosSection() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section id="videos" className="py-20 md:py-32 bg-black relative overflow-hidden">
            {/* Background gradient */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: 'linear-gradient(180deg, transparent 0%, rgba(204, 255, 0, 0.02) 50%, transparent 100%)',
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
                >
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
                            Trending <span className="text-monster-red">Videos</span>
                        </h2>
                        <p className="text-monster-text-muted max-w-xl">
                            Watch the latest extreme sports, motorsports, and gaming content from Monster Energy athletes.
                        </p>
                    </div>

                    <motion.a
                        href="https://youtube.com/monsterenergy"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 md:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-[#FF0000] 
              text-white font-bold uppercase tracking-wider rounded-lg hover:bg-[#CC0000] transition-colors"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        Subscribe
                    </motion.a>
                </motion.div>

                {/* Videos Grid */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {videos.map((video) => (
                        <motion.a
                            key={video.id}
                            href="#"
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="group relative rounded-xl overflow-hidden bg-monster-surface"
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-monster-bg-dark via-transparent to-transparent opacity-60" />

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="w-14 h-14 rounded-full bg-monster-red/90 flex items-center justify-center
                      group-hover:bg-monster-red transition-colors shadow-lg"
                                    >
                                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </motion.div>
                                </div>

                                {/* Category Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className="px-2 py-1 bg-monster-bg-dark/80 backdrop-blur text-xs font-medium 
                    text-monster-text-muted rounded">
                                        {video.category}
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <h3 className="font-semibold text-monster-text line-clamp-2 group-hover:text-monster-green 
                  transition-colors">
                                    {video.title}
                                </h3>
                                <p className="text-sm text-monster-text-muted mt-1">
                                    {video.views}
                                </p>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
