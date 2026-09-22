import React from "react";
import { motion } from "framer-motion";

interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // default 3s
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  children,
  className = "",
  speed = 3,
}) => {
  return (
    <motion.span
      className={`inline-block font-medium tracking-tighter ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(110deg, #F40009 0%, #F40009 35%, #FFFFFF 50%, #F40009 65%, #F40009 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
      }}
      animate={{
        backgroundPosition: ["200% 0", "-200% 0"],
      }}
      transition={{
        repeat: Infinity,
        duration: speed,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
};

export default ShinyText;
