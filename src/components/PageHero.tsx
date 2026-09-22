import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ShinyText } from "./ShinyText";
import VideoBackground from "./backgrounds/VideoBackground";
import ParticleBackground from "./backgrounds/ParticleBackground";
import GradientBackground from "./backgrounds/GradientBackground";
import GridBackground from "./backgrounds/GridBackground";

export interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  backgroundType?: "video" | "particles" | "gradient" | "grid";
  videoSrc?: string;
  height?: "full" | "compact";
  shinyTitle?: boolean;
  shinyWord?: string;
  children?: React.ReactNode;
  id?: string;
  showScrollIndicator?: boolean;
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  subtitle,
  backgroundType = "gradient",
  videoSrc,
  height = "compact",
  shinyTitle = false,
  shinyWord,
  children,
  id,
  showScrollIndicator = true,
}) => {
  const isFull = height === "full";

  const renderBackground = () => {
    switch (backgroundType) {
      case "video":
        return <VideoBackground src={videoSrc} />;
      case "particles":
        return <ParticleBackground />;
      case "gradient":
        return <GradientBackground />;
      case "grid":
        return <GridBackground />;
      default:
        return <GradientBackground />;
    }
  };

  const renderTitle = () => {
    if (shinyWord && title.includes(shinyWord)) {
      const parts = title.split(shinyWord);
      return (
        <>
          {parts[0]}
          <ShinyText>{shinyWord}</ShinyText>
          {parts[1]}
        </>
      );
    }
    if (shinyTitle) {
      return <ShinyText>{title}</ShinyText>;
    }
    return title;
  };

  return (
    <section
      id={id || "page-hero"}
      className={`relative w-full overflow-hidden flex flex-col justify-center items-center ${
        isFull
          ? "min-h-screen pt-24 pb-16"
          : "min-h-[55vh] md:min-h-[60vh] pt-32 pb-20"
      }`}
    >
      {/* Dynamic Background */}
      {renderBackground()}

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full text-center flex flex-col items-center">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F40009]" />
            <p className="text-xs md:text-sm uppercase tracking-tight text-white/80 font-medium">
              {eyebrow}
            </p>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-9xl font-medium tracking-tighter leading-[0.85] text-white max-w-5xl"
        >
          {renderTitle()}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-sm md:text-base text-white/80 leading-relaxed max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-white/60" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default PageHero;
