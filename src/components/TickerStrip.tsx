import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  isUp: boolean;
}

const tickers: TickerItem[] = [
  { symbol: "KO", price: "62.41", change: "+0.42%", isUp: true },
  { symbol: "PEP", price: "168.20", change: "-0.31%", isUp: false },
  { symbol: "MNST", price: "54.10", change: "+0.88%", isUp: true },
  { symbol: "KDP", price: "33.45", change: "+0.66%", isUp: true },
  { symbol: "CELH", price: "38.60", change: "-2.89%", isUp: false },
];

export const TickerStrip: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      className={`hidden md:flex items-center gap-4 text-xs font-mono text-white/60 overflow-hidden select-none ${className}`}
      aria-label="Stock market ticker preview"
    >
      {tickers.map((t, idx) => (
        <React.Fragment key={t.symbol}>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="font-semibold text-white/80">{t.symbol}</span>
            <span>{t.price}</span>
            <span
              className={`flex items-center text-[11px] font-medium ${
                t.isUp ? "text-emerald-400" : "text-[#F40009]"
              }`}
            >
              {t.isUp ? (
                <ArrowUpRight className="w-3 h-3 inline" />
              ) : (
                <ArrowDownRight className="w-3 h-3 inline" />
              )}
              {t.change}
            </span>
          </div>
          {idx < tickers.length - 1 && (
            <span className="text-white/20 select-none">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TickerStrip;
