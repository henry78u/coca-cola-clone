import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  id?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = true,
  id,
  onClick,
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 ${
        hover
          ? "hover:border-[#F40009]/40 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(244,0,9,0.15)]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
