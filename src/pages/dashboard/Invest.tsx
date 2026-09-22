import React, { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Award,
  Globe,
  Plus,
  Check,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { koStock, historicalPrices, peers } from "../../data/investment";

export const Invest: React.FC = () => {
  const [timeRange, setTimeRange] = useState<"1D" | "1W" | "1M" | "3M" | "1Y">("1M");
  const [shares, setShares] = useState<string>("10");
  const [orderNotice, setOrderNotice] = useState<string | null>(null);
  const [isWatched, setIsWatched] = useState(false);

  const numShares = Math.max(0, parseInt(shares, 10) || 0);
  const estimatedCost = (numShares * koStock.price).toFixed(2);

  // Time range slice adjustments
  const chartData = React.useMemo(() => {
    if (timeRange === "1D") return historicalPrices.slice(-7);
    if (timeRange === "1W") return historicalPrices.slice(-14);
    if (timeRange === "1M") return historicalPrices;
    if (timeRange === "3M") return historicalPrices;
    return historicalPrices;
  }, [timeRange]);

  const handleOrder = (action: "Buy" | "Sell") => {
    if (numShares <= 0) {
      setOrderNotice("Please enter at least 1 share.");
      return;
    }
    setOrderNotice(
      `Order executed! Successfully placed simulated order to ${action} ${numShares} shares of KO for $${estimatedCost}.`
    );
    setTimeout(() => setOrderNotice(null), 6000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Info Banner */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#F40009]">
          Direct Equity Execution
        </span>
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white mt-1">
          Invest in Coca-Cola (KO)
        </h2>
        <p className="text-xs md:text-sm text-white/60 mt-0.5">
          NYSE: KO • The Coca-Cola Company • Consumer Defensive / Non-Alcoholic Beverages
        </p>
      </div>

      {/* Hero Metric Card: Big Price + 4-col metric grid */}
      <Card className="p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl md:text-5xl font-semibold tracking-tighter text-white">
                ${koStock.price.toFixed(2)}
              </span>
              <span className="inline-flex items-center text-sm md:text-base font-medium text-emerald-400">
                <ArrowUpRight className="w-4 h-4 mr-0.5" />
                +${koStock.change.toFixed(2)} (+{koStock.changePct}%)
              </span>
            </div>
            <p className="text-xs text-white/50 mt-1">
              Market Open • Currency in USD • Real-time simulated feed
            </p>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 self-start lg:self-center">
            {(["1D", "1W", "1M", "3M", "1Y"] as const).map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${
                  timeRange === range
                    ? "bg-[#F40009] text-white shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* 4-col Metric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-xs">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-white/50 block">Day Range</span>
            <span className="text-base font-medium text-white block mt-1">
              ${koStock.dayLow} – ${koStock.dayHigh}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-white/50 block">Market Capitalization</span>
            <span className="text-base font-medium text-white block mt-1">
              {koStock.marketCap}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-white/50 block">P/E Ratio (TTM)</span>
            <span className="text-base font-medium text-white block mt-1">
              {koStock.pe}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-white/50 block">Dividend Yield</span>
            <span className="text-base font-medium text-emerald-400 block mt-1">
              {koStock.dividendYield}
            </span>
          </div>
        </div>

        {/* Large Area Chart of KO Price */}
        <div className="mt-8 w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="koPriceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F40009" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#F40009" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="date"
                stroke="rgba(255,255,255,0.3)"
                fontSize={11}
                tickLine={false}
              />
              <YAxis
                domain={["dataMin - 1", "dataMax + 1"]}
                stroke="rgba(255,255,255,0.3)"
                fontSize={11}
                tickLine={false}
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0A0A0A",
                  borderColor: "rgba(255,255,255,0.15)",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                }}
                formatter={(val: any) => [`$${Number(val).toFixed(2)}`, "KO Price"]}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#F40009"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#koPriceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Two Columns: Left Buy/Sell Panel + Right Why KO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Buy / Sell mock panel (6 cols) */}
        <div className="lg:col-span-6">
          <Card className="p-6 md:p-8 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#F40009] font-medium">
                Simulated Execution
              </span>
              <h3 className="text-xl font-medium text-white tracking-tight mt-0.5">
                Place Equity Order
              </h3>
            </div>

            {orderNotice && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{orderNotice}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-medium mb-1.5">
                  Number of Shares
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-lg focus:outline-none focus:border-[#F40009] focus:ring-1 focus:ring-[#F40009]"
                />
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-white/70">
                  <span>Market Price</span>
                  <span className="font-mono text-white">${koStock.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Estimated Commission</span>
                  <span className="font-mono text-emerald-400">$0.00 (Zero Fee)</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between font-medium text-sm">
                  <span className="text-white">Estimated Total</span>
                  <span className="font-mono text-lg text-white font-semibold">
                    ${estimatedCost}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  onClick={() => handleOrder("Buy")}
                >
                  Buy KO
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="lg"
                  className="w-full justify-center"
                  onClick={() => handleOrder("Sell")}
                >
                  Sell KO
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Why KO Card (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-white/50 font-medium">
                  Investment Thesis
                </span>
                <h3 className="text-xl font-medium text-white tracking-tight mt-0.5">
                  Why Invest in KO?
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsWatched(!isWatched)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isWatched
                    ? "bg-[#F40009]/20 border-[#F40009] text-white"
                    : "bg-white/5 border-white/10 text-white/70 hover:text-white"
                }`}
              >
                {isWatched ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#F40009]" />
                    <span>In Watchlist</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Watchlist</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F40009] shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    64-Year Dividend King
                  </h4>
                  <p className="text-xs text-white/70 mt-0.5 leading-relaxed">
                    Uninterrupted annual cash dividend hikes across six decades, representing one of the most durable defensive cash engines in corporate history.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F40009] shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Unmatched Global Moat
                  </h4>
                  <p className="text-xs text-white/70 mt-0.5 leading-relaxed">
                    Distributed across 200+ countries with over 2.2 billion daily consumer servings via world-class localized bottling partnerships.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F40009] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Pricing Power & Margin Resilience
                  </h4>
                  <p className="text-xs text-white/70 mt-0.5 leading-relaxed">
                    Maintains operating margins exceeding 28% through commodity cycles, powered by unrivaled consumer brand loyalty and Zero Sugar innovation.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom: Peers Grid — PEP, MNST, KDP, CELH */}
      <div>
        <div className="mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
            Sector Benchmarks
          </span>
          <h3 className="text-xl font-medium text-white tracking-tight">
            Beverage Industry Peers
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {peers.map((peer) => {
            const isUp = peer.change >= 0;
            return (
              <Card key={peer.symbol} className="p-5 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-semibold text-white text-base">
                    {peer.symbol}
                  </span>
                  <span
                    className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
                      isUp
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-[#F40009]/10 text-[#F40009] border border-[#F40009]/20"
                    }`}
                  >
                    {isUp ? (
                      <ArrowUpRight className="w-3 h-3 mr-0.5" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-0.5" />
                    )}
                    {isUp ? `+${peer.changePct}%` : `${peer.changePct}%`}
                  </span>
                </div>

                <p className="text-xs text-white/50 truncate mt-1">{peer.name}</p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-lg font-semibold text-white font-mono">
                    ${peer.price.toFixed(2)}
                  </span>
                  <span className="text-white/40">{peer.marketCap}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Invest;
