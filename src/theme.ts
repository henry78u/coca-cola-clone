/**
 * Design Tokens for Coca-Cola Clone Educational Project
 * Strict adherence to the original hero prompt design DNA.
 */

export const THEME = {
  font: "Inter, sans-serif",
  colors: {
    background: "#000000",
    surface: "rgba(255, 255, 255, 0.05)",
    surfaceBorder: "rgba(255, 255, 255, 0.10)",
    accent: "#F40009",
    accentHover: "#C10007",
    shine: "#FFFFFF",
    textPrimary: "#FFFFFF",
    textSecondary: "rgba(255, 255, 255, 0.80)",
    textMuted: "rgba(255, 255, 255, 0.50)",
  },
  radii: {
    pill: "rounded-full",
    card: "rounded-2xl",
    hero: "rounded-3xl",
  },
  spacing: {
    section: "py-24 md:py-32",
    container: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8",
  },
  typography: {
    eyebrow: "text-xs md:text-sm uppercase tracking-tight text-white/80 font-medium",
    h1: "text-5xl md:text-7xl lg:text-9xl font-medium tracking-tighter leading-[0.85] text-white",
    h2: "text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[0.9] text-white",
    h3: "text-2xl md:text-3xl font-medium text-white tracking-tight",
    body: "text-sm md:text-base text-white/80 leading-relaxed",
  },
  motion: {
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  },
} as const;

export default THEME;
