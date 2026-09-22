import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  TrendingUp,
  DollarSign,
  Activity,
  Eye,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import StatCard from "../../components/StatCard";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { getSession } from "../../lib/auth";
import { koStock, historicalPrices, watchlist } from "../../data/investment";

export const Overview: React.FC = () => {
  const session = getSession();
  const location = useLocation();
  const errorToast = (location.state as { errorToast?: string })?.errorToast;

  const portfolioChartData = historicalPrices.map((item, idx) => ({
    date: item.date,
    portfolioValue: Math.round((item.price * 85 + 7500 + idx * 45) * 100) / 100,
  }));

  const activities = [
    {
      id: 1,
      type: "buy",
      title: "Executed Order: Bought 5 shares of KO",
      time: "2 hours ago",
      amount: "$312.05",
      status: "Completed",
    },
    {
      id: 2,
      type: "dividend",
      title: "Quarterly Dividend Payout (KO)",
      time: "Yesterday, 4:15 PM",
      amount: "+$41.22",
      status: "Credited",
    },
    {
      id: 3,
      type: "watchlist",
      title: "Added PEP (PepsiCo, Inc.) to Watchlist",
      time: "Sep 20, 2026",
      amount: "168.20",
      status: "Active",
    },
    {
      id: 4,
      type: "order",
      title: "Store Fulfillment: 1915 Contour 6-Pack Shipped",
      time: "Sep 19, 2026",
      amount: "$18.99",
      status: "Shipped",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Admin Toast Alert if redirected */}
      {errorToast && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <span>{errorToast}</span>
          </div>
          <span className="text-xs text-amber-400/80 font-mono">ROLE_REQUIRED</span>
        </div>
      )}

      {/* Greeting Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F40009]">
            Simulated Investment Desk
          </span>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white mt-1">
            Good to see you, {session?.name || "Investor"}
          </h2>
          <p className="text-xs md:text-sm text-white/60 mt-0.5">
            Monitor real-time simulated equity positions, dividend yield, and peer beverage indices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button to="/dashboard/invest" variant="primary" size="sm" icon={true}>
            Invest in KO
          </Button>
          <Button to="/dashboard/portfolio" variant="ghost" size="sm">
            View Holdings
          </Button>
        </div>
      </div>

      {/* Row of 4 StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          label="Portfolio Value"
          value="$13,420.50"
          delta="+3.82%"
          isPositive={true}
          subtitle="past 30 days"
          icon={<DollarSign className="w-4 h-4 text-[#F40009]" />}
        />
        <StatCard
          label="Today's Change"
          value="+$184.20"
          delta="+1.39%"
          isPositive={true}
          subtitle="vs market open"
          icon={<ArrowUpRight className="w-4 h-4 text-emerald-400" />}
        />
        <StatCard
          label="KO Current Price"
          value={`$${koStock.price.toFixed(2)}`}
          delta={`+${koStock.changePct}%`}
          isPositive={true}
          subtitle="NYSE: KO"
          icon={<Activity className="w-4 h-4 text-[#F40009]" />}
        />
        <StatCard
          label="Watchlist Assets"
          value={`${watchlist.length} Tickers`}
          delta="+1 new"
          isPositive={true}
          subtitle="Beverage sector"
          icon={<Eye className="w-4 h-4 text-white/60" />}
        />
      </div>

      {/* Two-Column Area: Left Chart (2/3) + Right KO Snapshot (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Portfolio Growth Line Chart (8 cols) */}
        <div className="lg:col-span-8">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-white/50 font-medium">
                  Historical Trajectory
                </span>
                <h3 className="text-lg font-medium text-white tracking-tight">
                  Portfolio – Last 30 Days
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F40009]" />
                <span className="text-white/70">Aggregate Asset Valuation</span>
              </div>
            </div>

            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={portfolioChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="date"
                    stroke="rgba(255,255,255,0.3)"
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis
                    domain={["auto", "auto"]}
                    stroke="rgba(255,255,255,0.3)"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(val) => `$${(val / 1000).toFixed(1)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0A0A0A",
                      borderColor: "rgba(255,255,255,0.15)",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Valuation"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="portfolioValue"
                    stroke="#F40009"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5, fill: "#FFFFFF", stroke: "#F40009", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right: KO Snapshot (4 cols) */}
        <div className="lg:col-span-4">
          <Card className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#F40009] font-medium">
                    Anchor Asset
                  </span>
                  <h3 className="text-xl font-medium text-white tracking-tight">
                    KO Snapshot
                  </h3>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
                  +0.68%
                </div>
              </div>

              <div className="my-4">
                <span className="text-4xl font-semibold tracking-tighter text-white">
                  ${koStock.price.toFixed(2)}
                </span>
                <span className="text-xs text-white/50 block mt-1">
                  Day range: ${koStock.dayLow} – ${koStock.dayHigh}
                </span>
              </div>

              <div className="space-y-3 py-4 border-y border-white/10 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/60">Market Cap</span>
                  <span className="font-mono text-white font-medium">{koStock.marketCap}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">P/E Ratio</span>
                  <span className="font-mono text-white font-medium">{koStock.pe}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Dividend Yield</span>
                  <span className="font-mono text-emerald-400 font-medium">
                    {koStock.dividendYield}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Volume</span>
                  <span className="font-mono text-white font-medium">{koStock.volume}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button
                to="/dashboard/invest"
                variant="primary"
                size="md"
                className="w-full justify-center"
                icon={true}
              >
                Trade & Invest in KO
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Below: Recent Activity List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-white/50 font-medium">
              Audit Trail
            </span>
            <h3 className="text-lg font-medium text-white tracking-tight">
              Recent Account & Trading Activity
            </h3>
          </div>
          <span className="text-xs text-white/40">Real-time local ledger</span>
        </div>

        <div className="divide-y divide-white/5">
          {activities.map((act) => (
            <div
              key={act.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F40009] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{act.title}</p>
                  <p className="text-xs text-white/50">{act.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <span className="font-mono text-sm font-semibold text-white">
                  {act.amount}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-white/80">
                  {act.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Overview;
