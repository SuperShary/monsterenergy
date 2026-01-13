# ⚡ Monster Energy India - Scroll Animation Website

> **Built with AI in Minutes** | A SuperShary Tutorial 🔥

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-FF0055?style=for-the-badge&logo=framer)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)

### 🟢 [Live Demo → monsterenergy-theta.vercel.app](https://monsterenergy-theta.vercel.app)

A stunning **Awwwards-level scrollytelling** landing page for Monster Energy featuring **rotating 3D can animations** as you scroll! Built entirely using AI coding assistants - no manual coding required! 🤯

---

## 🎬 Watch the Tutorial

[![SuperShary YouTube](https://img.shields.io/badge/YouTube-SuperShary-red?style=for-the-badge&logo=youtube)](https://www.youtube.com/@SuperSharyG63)

**Subscribe for more AI + Web Development tutorials!**

---

## ✨ Features

- 🎞️ **80-Frame Scroll Animation** - Can rotates with stunning lighting effects
- 🎨 **3 Product Variants** - Zero Sugar (Green), Ultra Fantasy (Pink), Mango Loco (Blue)
- ⚡ **Buttery Smooth Performance** - HTML5 Canvas rendering
- 🌟 **Dynamic Color Themes** - Colors change based on selected product
- 📱 **Fully Responsive** - Works on mobile, tablet, and desktop
- ⏳ **Animated Preloader** - Progress bar with loading percentage
- 🧭 **Sticky Navigation** - Blur effect with scroll detection
- 🔄 **Arrow Navigation** - Switch products with left/right arrows
- 🎭 **Vignette Effects** - Smooth edge blending into black background

---

## 🚀 Quick Start

```bash
# Clone this repo
git clone https://github.com/SuperShary/monsterenergy.git

# Install dependencies
cd monsterenergy
npm install

# Run locally
npm run dev

# Open http://localhost:3000
```

---

## 🤖 AI Prompts Used (Copy-Paste Ready!)

### The Master Prompt

This is the main prompt used to build the entire website:

```
ACT AS: A world-class Creative Developer (Awwwards-level) specializing 
in Next.js, Framer Motion, and high-performance web interactions.

THE TASK: Build a high-end "Scrollytelling" landing page for Monster Energy.
The core mechanic is a scroll-linked animation that plays an image sequence 
of 3 different Monster Energy cans rotating with dramatic lighting effects.

TECH STACK:
- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS
- Animation: Framer Motion (useScroll and useTransform)
- State Management: Zustand
- Rendering: HTML5 Canvas (Crucial for performance with 80 frames)

VISUAL DIRECTION & COLOR:
- Background: Pure Black (#000000)
- Product Colors: Green (#ccff00), Pink (#ff1493), Blue (#00d9ff)
- Typography: Apple System Fonts, bold uppercase headers
- Vibe: Bold, energetic, extreme sports aesthetic

IMPLEMENTATION DETAILS:

Product Switching:
- 3 products: Zero Sugar, Ultra Fantasy, Mango Loco
- Each product has its own 80-frame image sequence
- Arrow buttons to switch between products
- Dot indicators for current product

The "Sticky" Canvas (FrameAnimation.tsx):
- Container with h-[300vh] (3x viewport height)
- Canvas element that is sticky, top-0, full screen
- CSS mask for smooth vignette edge blending

The Scroll Logic:
- Load 80 images per product from /monstergreen/, /monsterred/, /monsterblue/
- Naming convention: ezgif-frame-[001-080].jpg
- Map scroll progress (0.0 to 1.0) to frame index (0 to 79)

Edge Blending:
- CSS mask with radial gradient for smooth edges
- Additional gradient overlays on all 4 edges
- Seamless integration with black background

OUTPUT: Generate complete website with Header, Hero, Products, Videos, News, Footer.
```

---

## 📁 Project Structure

```
monsterenergy/
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout with SEO
│   │   └── page.tsx          # Home page
│   ├── components/
│   │   ├── Header.tsx        # Sticky navigation
│   │   ├── HeroSection.tsx   # Main hero with animation
│   │   ├── FrameAnimation.tsx # Canvas scroll animation
│   │   ├── ProductTabs.tsx   # Product switching tabs
│   │   ├── ProductsSection.tsx
│   │   ├── VideosSection.tsx
│   │   ├── NewsSection.tsx
│   │   └── Footer.tsx
│   └── store/
│       └── useProductStore.ts # Zustand state management
├── public/
│   ├── monstergreen/         # 80 frames for Zero Sugar
│   ├── monsterred/           # 80 frames for Ultra Fantasy
│   ├── monsterblue/          # 80 frames for Mango Loco
│   └── monsterlogo.png
├── package.json
├── tailwind.config.ts
└── README.md
```

---

## 🖼️ Getting the Frame Images

### Method 1: Create Your Own (Recommended)

1. Find or create a 3D can rotation animation video
2. Use [ezgif.com](https://ezgif.com/video-to-jpg) to extract frames
3. Export 80 frames as JPG with naming: `ezgif-frame-001.jpg` to `ezgif-frame-080.jpg`
4. Create 3 folders: `/public/monstergreen/`, `/public/monsterred/`, `/public/monsterblue/`
5. Place respective frames in each folder

### Method 2: Use AI Video Generation

Use Sora, Runway, or Pika to generate:
```
Monster Energy can rotating 360 degrees with dramatic green/pink/blue 
lighting effects, black background, studio lighting, slow motion, 
product photography style
```

---

## 🛠️ Tech Stack Explained

| Technology        | Purpose                          |
| ----------------- | -------------------------------- |
| **Next.js 15**    | React framework with App Router  |
| **Tailwind CSS**  | Utility-first styling            |
| **Framer Motion** | Scroll-linked animations         |
| **Zustand**       | Lightweight state management     |
| **HTML5 Canvas**  | High-performance image rendering |
| **TypeScript**    | Type-safe development            |

---

## 🎯 Key Concepts You'll Learn

1. **Scroll-Linked Animations** - `useScroll()` + `useTransform()`
2. **Canvas Rendering** - Drawing images with cover-fit logic
3. **Image Preloading** - Loading 80+ images with progress indicator
4. **CSS Masks** - Creating vignette effects with radial gradients
5. **Zustand State** - Managing product selection globally
6. **Responsive Design** - Mobile-first with Tailwind breakpoints
7. **Glassmorphism** - Modern backdrop-blur effects

---

## 💡 Pro Tips

- **Black Background is Key** - Frame images MUST have black backgrounds for seamless blending
- **CSS Masks for Edges** - Use `mask-image: radial-gradient()` for smooth vignette
- **Optimize Images** - Compress JPGs to ~50KB each for faster loading
- **Test on Mobile** - Always verify responsive canvas works on phones
- **Preloader is Crucial** - Show loading progress before revealing animation

---

## 🔗 Connect with SuperShary

- 📺 **YouTube**: [@SuperSharyG63](https://www.youtube.com/@SuperSharyG63)
- 🐦 **Twitter/X**: [@SuperShary](https://twitter.com/SuperShary)
- 💼 **LinkedIn**: [SuperShary](https://linkedin.com/in/supershary)

---

## ⭐ Support This Project

If this helped you build something awesome:

1. **Star this repo** ⭐
2. **Subscribe to SuperShary** 🔔
3. **Share with friends** 🚀

---

## 📄 License

MIT License - Use it for your projects, portfolios, or clients!

---

Made with 💚 by **SuperShary** | Powered by AI ✨
