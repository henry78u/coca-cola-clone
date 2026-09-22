import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Sparkles,
} from "lucide-react";
import Card from "../../components/Card";
import { koStock, peers } from "../../data/investment";

interface MarketTicker {
  symbol: string;
  name: string;
  category: "Beverages" | "Indices";
  price: number;
  change: number;
  changePct: number;
  sparkline: number[];
}

const allMarketTickers: MarketTicker[] = [
  {
    symbol: "KO",
    name: "Coca-Cola Co.",
    category: "Beverages",
    price: koStock.price,
    change: koStock.change,
    changePct: koStock.changePct,
    sparkline: [61.2, 61.5, 61.8, 62.0, 62.2, 62.41],
  },
  {
    symbol: "PEP",
    name: "PepsiCo, Inc.",
    category: "Beverages",
    price: 168.20,
    change: -0.31,
    changePct: -0.18,
    sparkline: [169.1, 168.8, 168.5, 168.4, 168.2],
  },
  {
    symbol: "MNST",
    name: "Monster Beverage",
    category: "Beverages",
    price: 54.10,
    change: 0.88,
    changePct: 1.65,
    sparkline: [52.8, 53.2, 53.5, 53.9, 54.1],
  },
  {
    symbol: "KDP",
    name: "Keurig Dr Pepper",
    category: "Beverages",
    price: 33.45,
    change: 0.22,
    changePct: 0.66,
    sparkline: [33.1, 33.2, 33.3, 33.4, 33.45],
  },
  {
    symbol: "CELH",
    name: "Celsius Holdings",
    category: "Beverages",
    price: 38.60,
    change: -1.15,
    changePct: -2.89,
    sparkline: [40.2, 39.8, 39.4, 39.0, 38.6],
  },
  {
    symbol: "DEO",
    name: "Diageo plc",
    category: "Beverages",
    price: 132.40,
    change: 1.05,
    changePct: 0.80,
    sparkline: [130.5, 131.0, 131.6, 132.0, 132.4],
  },
  {
    symbol: "SPY",
    name: "S&P 500 Index ETF",
    category: "Indices",
    price: 568.12,
    change: 2.45,
    changePct: 0.43,
    sparkline: [564.0, 565.5, 566.2, 567.8, 568.12],
  },
  {
    symbol: "XLP",
    name: "Consumer Staples Select",
    category: "Indices",
    price: 79.80,
    change: 0.35,
    changePct: 0.44,
    sparkline: [79.2, 79.4, 79.5, 79.7, 79.8],
  },
  {
    symbol: "DIA",
    name: "Dow Jones Industrial",
    category: "Indices",
    price: 421.30,
    change: -0.85,
    changePct: -0.20,
    sparkline: [422.5, 422.0, 421.8, 421.5, 421.3],
  },
];

export const Market: React.FC = () => {
  const [filterTab, setFilterTab] = useState<"All" | "Beverages" | "Indices">("All");

  const filteredTickers = allMarketTickers.filter(
    (t) => filterTab === "All" || t.category === filterTab
  );

  const topGainers = [...allMarketTickers]
    .filter((t) => t.change > 0)
    .sort((a, b) => b.changePct - a.changePct)
    .slice(0, 4);

  const topLosers = [...allMarketTickers]
    .filter((t) => t.change < 0)
    .sort((a, b) => a.changePct - b.changePct)
    .slice(0, 4);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F40009]">
            Sector Intelligence
          </span>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white mt-1">
            Beverage Market Watch
          </h2>
          <p className="text-xs md:text-sm text-white/60 mt-0.5">
            Monitor real-time simulated quotes, consumer staple benchmarks, and relative strength indices.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 self-start sm:self-center">
          {(["All", "Beverages", "Indices"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilterTab(tab)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
                filterTab === tab
                  ? "bg-[#F40009] text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Ticker Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTickers.map((t) => {
          const isUp = t.change >= 0;
          const minP = Math.min(...t.sparkline);
          const maxP = Math.max(...t.sparkline);
          const range = maxP - minP || 1;

          // Build SVG polyline points
          const points = t.sparkline
            .map((p, i) => {
              const x = (i / (t.sparkline.length - 1)) * 90;
              const y = 30 - ((p - minP) / range) * 25;
              return `${x},${y}`;
            })
            .join(" ");

          return (
            <Card key={t.symbol} className="p-6 hover:border-white/20 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg font-bold text-white tracking-tight">
                      {t.symbol}
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                      {t.category}
                    </span>
                  </div>
                  <h4 className="text-xs text-white/60 mt-0.5 truncate max-w-[160px]">
                    {t.name}
                  </h4>
                </div>

                {/* Mini SVG Sparkline */}
                <svg className="w-24 h-8 overflow-visible">
                  <polyline
                    fill="none"
                    stroke={isUp ? "#34D399" : "#F40009"}
                    strokeWidth="2"
                    points={points}
                  />
                </svg>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-baseline justify-between">
                <span className="text-2xl font-mono font-semibold text-white">
                  ${t.price.toFixed(2)}
                </span>
                <span
                  className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
                    isUp
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-[#F40009]/10 text-[#F40009] border border-[#F40009]/20"
                  }`}
                >
                  {isUp ? (
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                  )}
                  {isUp ? `+${t.changePct}%` : `${t.changePct}%`}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Top Gainers and Top Losers Side-by-Side Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {/* Top Gainers */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-base font-medium text-white tracking-tight">
              Top Sector Gainers
            </h3>
          </div>

          <div className="space-y-3">
            {topGainers.map((g) => (
              <div
                key={g.symbol}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-sm"
              >
                <div>
                  <span className="font-mono font-semibold text-white">{g.symbol}</span>
                  <span className="text-xs text-white/50 block">{g.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-white block">${g.price.toFixed(2)}</span>
                  <span className="text-xs text-emerald-400 font-semibold font-mono">
                    +{g.changePct}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Losers */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
            <div className="w-7 h-7 rounded-lg bg-[#F40009]/10 border border-[#F40009]/20 flex items-center justify-center text-[#F40009]">
              <TrendingDown className="w-4 h-4" />
            </div>
            <h3 className="text-base font-medium text-white tracking-tight">
              Top Sector Laggards
            </h3>
          </div>

          <div className="space-y-3">
            {topLosers.map((l) => (
              <div
                key={l.symbol}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-sm"
              >
                <div>
                  <span className="font-mono font-semibold text-white">{l.symbol}</span>
                  <span className="text-xs text-white/50 block">{l.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-white block">${l.price.toFixed(2)}</span>
                  <span className="text-xs text-[#F40009] font-semibold font-mono">
                    {l.changePct}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Market;
