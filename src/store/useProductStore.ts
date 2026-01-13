import { create } from 'zustand';

export type ProductType = 'green' | 'red' | 'blue';

interface ProductInfo {
    id: ProductType;
    name: string;
    subtitle: string;
    description: string;
    color: string;
    glowClass: string;
    textGradientClass: string;
    features: string[];
}

interface ProductStore {
    selectedProduct: ProductType;
    setProduct: (product: ProductType) => void;
    products: Record<ProductType, ProductInfo>;
}

export const productData: Record<ProductType, ProductInfo> = {
    green: {
        id: 'green',
        name: 'ZERO SUGAR',
        subtitle: 'Monster Energy',
        description: 'Unleash The Beast! Tear into a can of the meanest energy drink on the planet. Monster Energy with zero sugar, all the energy.',
        color: '#ccff00',
        glowClass: 'glow-green',
        textGradientClass: 'text-gradient-green',
        features: ['Zero Sugar', '200mg Caffeine', 'B-Vitamins', 'Taurine'],
    },
    red: {
        id: 'red',
        name: 'ULTRA FANTASY',
        subtitle: 'Ruby Red',
        description: 'Experience bold, vibrant energy with a tropical twist. Designed for those who dare to be different. Ultra thirst quenching.',
        color: '#ff1493',
        glowClass: 'glow-red',
        textGradientClass: 'text-gradient-red',
        features: ['Zero Sugar', 'Light & Refreshing', 'Tropical Taste', 'Energy Blend'],
    },
    blue: {
        id: 'blue',
        name: 'MANGO LOCO',
        subtitle: 'Juice Monster',
        description: 'Exotic mango juice blend with premium energy. Tropical vibes, premium performance. The perfect fuel for your adventures.',
        color: '#00d9ff',
        glowClass: 'glow-blue',
        textGradientClass: 'text-gradient-blue',
        features: ['Real Juice', 'Energy Blend', 'Exotic Flavor', 'Bold Taste'],
    },
};

export const useProductStore = create<ProductStore>((set) => ({
    selectedProduct: 'green',
    setProduct: (product) => set({ selectedProduct: product }),
    products: productData,
}));
