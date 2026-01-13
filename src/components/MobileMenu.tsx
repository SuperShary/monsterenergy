'use client';

import { motion } from 'framer-motion';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    links: { name: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] lg:hidden"
        >
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-monster-bg-dark/80 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 bottom-0 w-[280px] glass-strong flex flex-col"
            >
                {/* Close Button */}
                <div className="flex justify-end p-4">
                    <button
                        onClick={onClose}
                        className="p-2 text-monster-text hover:text-monster-green transition-colors"
                        aria-label="Close menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-6 py-8">
                    <ul className="space-y-6">
                        {links.map((link, index) => (
                            <motion.li
                                key={link.name}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <a
                                    href={link.href}
                                    onClick={onClose}
                                    className="block text-xl font-bold uppercase tracking-wider text-monster-text 
                    hover:text-monster-green transition-colors"
                                >
                                    {link.name}
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom CTA */}
                <div className="p-6 border-t border-white/10">
                    <motion.a
                        href="#products"
                        onClick={onClose}
                        whileTap={{ scale: 0.95 }}
                        className="block w-full py-4 bg-monster-green text-monster-bg-dark font-bold text-center 
              uppercase tracking-wider rounded-lg"
                    >
                        Shop Now
                    </motion.a>

                    <div className="mt-4 flex items-center justify-center gap-2 text-monster-text-muted text-sm">
                        <span>Language:</span>
                        <button className="text-monster-text font-medium hover:text-monster-green transition-colors">
                            EN-IN
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
