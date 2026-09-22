import React from "react";
import { motion } from "framer-motion";
import { ShinyText } from "./ShinyText";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  shiny?: boolean;
  className?: string;
  id?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  shiny = false,
  className = "",
  id,
}) => {
  const isCenter = align === "center";

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 md:mb-16 ${isCenter ? "text-center mx-auto max-w-3xl" : "max-w-2xl text-left"} ${className}`}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F40009]" />
          <p className="text-xs md:text-sm uppercase tracking-tight text-white/80 font-medium">
            {eyebrow}
          </p>
        </div>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[0.9] text-white">
        {shiny ? <ShinyText>{title}</ShinyText> : title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-sm md:text-base text-white/80 leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
