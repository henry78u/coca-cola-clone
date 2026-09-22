import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import Card from "./Card";

export interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
  subtitle?: string;
  className?: string;
  id?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  delta,
  isPositive = true,
  icon,
  subtitle,
  className = "",
  id,
}) => {
  return (
    <Card id={id} className={`p-6 flex flex-col justify-between ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider font-medium text-white/60">
          {label}
        </span>
        {icon && (
          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-3xl font-medium tracking-tight text-white">{value}</h3>

        {(delta || subtitle) && (
          <div className="mt-2 flex items-center gap-2 text-xs">
            {delta && (
              <span
                className={`inline-flex items-center gap-0.5 font-medium px-2 py-0.5 rounded-full ${
                  isPositive
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-[#F40009]/10 text-[#F40009] border border-[#F40009]/20"
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                <span>{delta}</span>
              </span>
            )}
            {subtitle && <span className="text-white/50">{subtitle}</span>}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
