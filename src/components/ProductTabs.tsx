'use client';

import { motion } from 'framer-motion';
import { useProductStore, ProductType, productData } from '@/store/useProductStore';

export default function ProductTabs() {
    const { selectedProduct, setProduct } = useProductStore();

    const tabs: { id: ProductType; label: string }[] = [
        { id: 'green', label: 'ZERO SUGAR' },
        { id: 'red', label: 'ULTRA FANTASY' },
        { id: 'blue', label: 'MANGO LOCO' },
    ];

    const productColors: Record<ProductType, string> = {
        green: '#ccff00',
        red: '#ff1493',
        blue: '#00d9ff',
    };

    return (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xl mx-auto">
            {tabs.map((tab) => {
                const isActive = selectedProduct === tab.id;
                const color = productColors[tab.id];

                return (
                    <motion.button
                        key={tab.id}
                        onClick={() => setProduct(tab.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
              relative flex-1 py-3 px-4 sm:py-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base
              uppercase tracking-wider transition-all duration-300 overflow-hidden
              ${isActive
                                ? 'text-monster-bg-dark'
                                : 'text-monster-text-muted bg-monster-surface/50 hover:bg-monster-surface'
                            }
            `}
                        style={{
                            backgroundColor: isActive ? color : undefined,
                            boxShadow: isActive ? `0 0 30px ${color}60, 0 0 60px ${color}30` : undefined,
                        }}
                    >
                        {/* Background glow for inactive */}
                        {!isActive && (
                            <div
                                className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity"
                                style={{ backgroundColor: color }}
                            />
                        )}

                        {/* Active indicator dot */}
                        {isActive && (
                            <motion.div
                                layoutId="activeIndicator"
                                className="absolute top-2 right-2 w-2 h-2 rounded-full bg-monster-bg-dark"
                                initial={false}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                        )}

                        <span className="relative z-10">{tab.label}</span>

                        {/* Animated border for inactive */}
                        {!isActive && (
                            <div
                                className="absolute inset-0 rounded-lg opacity-30"
                                style={{ border: `1px solid ${color}` }}
                            />
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
