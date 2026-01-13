import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Monster Energy India | Unleash the Beast",
    description: "Experience the power of Monster Energy. Premium energy drinks with bold flavors for those who push limits. Zero Sugar, Ultra Fantasy, Mango Loco and more.",
    keywords: ["Monster Energy", "Energy Drink", "India", "Zero Sugar", "Ultra Fantasy", "Mango Loco"],
    authors: [{ name: "Monster Energy" }],
    openGraph: {
        title: "Monster Energy India | Unleash the Beast",
        description: "Experience the power of Monster Energy. Premium energy drinks with bold flavors.",
        type: "website",
        locale: "en_IN",
        siteName: "Monster Energy India",
    },
    twitter: {
        card: "summary_large_image",
        title: "Monster Energy India",
        description: "Unleash the Beast with Monster Energy",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className="antialiased bg-black text-white">
                <Header />
                <main className="relative">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
