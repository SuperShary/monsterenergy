/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: false,
        formats: ['image/webp', 'image/avif'],
    },
    experimental: {
        optimizePackageImports: ['framer-motion'],
    },
};

export default nextConfig;
