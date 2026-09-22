import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface ButtonProps {
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode | boolean;
  to?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  id?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon = false,
  to,
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
  id,
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F40009] focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed select-none whitespace-nowrap";

  const sizeClasses =
    size === "lg"
      ? "px-8 md:px-10 py-4 md:py-5 text-base md:text-lg"
      : size === "sm"
      ? "px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm"
      : "px-6 md:px-8 py-3 md:py-4 text-sm md:text-base";

  const variantClasses =
    variant === "primary"
      ? "bg-[#F40009] hover:bg-[#C10007] text-white shadow-lg shadow-[#F40009]/20 hover:shadow-[#F40009]/40 active:scale-[0.98]"
      : "bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/60 active:scale-[0.98]";

  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;

  const renderIcon = () => {
    if (typeof icon === "boolean" && icon) {
      return (
        <ArrowRight className="w-4 h-4 ml-2.5 transition-transform duration-300 group-hover:translate-x-1" />
      );
    }
    if (icon) {
      return <span className="ml-2.5 transition-transform duration-300 group-hover:translate-x-1">{icon}</span>;
    }
    return null;
  };

  if (to) {
    return (
      <Link id={id} to={to} className={combinedClasses} onClick={onClick}>
        <span>{children}</span>
        {renderIcon()}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
      {renderIcon()}
    </button>
  );
};

export default Button;
