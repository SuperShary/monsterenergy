import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import VideosSection from "@/components/VideosSection";
import NewsSection from "@/components/NewsSection";
import CommunitySection from "@/components/CommunitySection";

export default function Home() {
    return (
        <>
            {/* Hero Section - Scroll-driven frame animation */}
            <HeroSection />

            {/* Products Section */}
            <ProductsSection />

            {/* Trending Videos Section */}
            <VideosSection />

            {/* Latest News Section */}
            <NewsSection />

            {/* Community Gallery Section */}
            <CommunitySection />
        </>
    );
}
