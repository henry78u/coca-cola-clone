import React from "react";

export const GridBackground: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden bg-black pointer-events-none ${className}`}>
      {/* Red-tinted dot grid at 30px spacing */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: "radial-gradient(rgba(244, 0, 9, 0.6) 1.2px, transparent 1.2px)",
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0",
        }}
      />
      {/* Subtle fine grid lines */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Soft atmospheric red glow in center */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{ background: "#F40009" }}
      />
      {/* Dark overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black pointer-events-none" />
    </div>
  );
};

export default GridBackground;
