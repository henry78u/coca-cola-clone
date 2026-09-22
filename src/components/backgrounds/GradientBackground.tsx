import React from "react";

export const GradientBackground: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden bg-black pointer-events-none ${className}`}>
      {/* Animated deep crimson to midnight sweep */}
      <div
        className="absolute -inset-10 animate-gradient-sweep opacity-75 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, #F40009 0%, transparent 45%), radial-gradient(circle at 80% 70%, #8B0000 0%, transparent 50%), radial-gradient(circle at 50% 50%, #3a0003 0%, #000000 70%)",
          backgroundSize: "400% 400%",
        }}
      />
      {/* Dynamic secondary ambient light */}
      <div
        className="absolute inset-0 opacity-40 animate-gradient-sweep"
        style={{
          background:
            "linear-gradient(135deg, rgba(244,0,9,0.3) 0%, rgba(139,0,0,0.15) 40%, rgba(0,0,0,0.85) 100%)",
          backgroundSize: "300% 300%",
        }}
      />
      {/* Dark overlay for contrast and legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black pointer-events-none" />
    </div>
  );
};

export default GradientBackground;
