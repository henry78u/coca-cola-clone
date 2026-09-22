import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DollarSign,
  TrendingUp,
  Percent,
  PlusCircle,
  PieChart as PieIcon,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import StatCard from "../../components/StatCard";
import Card from "../../components/Card";
import Button from "../../components/Button";
import DataTable, { Column } from "../../components/DataTable";
import { portfolioHoldings, PortfolioHolding } from "../../data/investment";

const PIE_COLORS = ["#F40009", "#C10007", "#FFFFFF", "#888888", "#444444"];

export const Portfolio: React.FC = () => {
  const [holdings, setHoldings] = useState<PortfolioHolding[]>(portfolioHoldings);

  // Compute portfolio calculations
  const totalValue = holdings.reduce(
    (acc, h) => acc + h.shares * h.currentPrice,
    0
  );
  const totalCost = holdings.reduce((acc, h) => acc + h.shares * h.avgCost, 0);
  const totalGain = totalValue - totalCost;
  const totalGainPct = totalCost > 0 ? (totalGain / totalCost) * 100 : 0;
  const annualDividend = (totalValue * 0.0295).toFixed(2);

  const pieData = holdings.map((h) => ({
    name: h.symbol,
    value: Math.round(h.shares * h.currentPrice),
  }));

  const columns: Column<PortfolioHolding>[] = [
    {
      header: "Asset / Symbol",
      accessor: "symbol",
      render: (h) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-mono font-semibold text-xs text-white">
            {h.symbol}
          </div>
          <div>
            <span className="font-semibold text-white block">{h.symbol}</span>
            <span className="text-xs text-white/50">{h.name}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Shares Owned",
      accessor: "shares",
      align: "right",
      render: (h) => <span className="font-mono text-white">{h.shares}</span>,
    },
    {
      header: "Avg Cost Basis",
      accessor: "avgCost",
      align: "right",
      render: (h) => (
        <span className="font-mono text-white/80">${h.avgCost.toFixed(2)}</span>
      ),
    },
    {
      header: "Current Price",
      accessor: "currentPrice",
      align: "right",
      render: (h) => (
        <span className="font-mono text-white">${h.currentPrice.toFixed(2)}</span>
      ),
    },
    {
      header: "Position Value",
      align: "right",
      render: (h) => (
        <span className="font-mono font-semibold text-white">
          ${(h.shares * h.currentPrice).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      header: "Unrealized P/L",
      align: "right",
      render: (h) => {
        const cost = h.shares * h.avgCost;
        const current = h.shares * h.currentPrice;
        const diff = current - cost;
        const diffPct = (diff / cost) * 100;
        const isUp = diff >= 0;

        return (
          <div className="flex flex-col items-end">
            <span
              className={`font-mono font-semibold inline-flex items-center gap-0.5 ${
                isUp ? "text-emerald-400" : "text-[#F40009]"
              }`}
            >
              {isUp ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" />
              )}
              {isUp ? `+$${diff.toFixed(2)}` : `-$${Math.abs(diff).toFixed(2)}`}
            </span>
            <span className="text-[11px] text-white/50 font-mono">
              ({isUp ? `+${diffPct.toFixed(1)}%` : `${diffPct.toFixed(1)}%`})
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F40009]">
            Asset Allocation Desk
          </span>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white mt-1">
            Your Portfolio
          </h2>
          <p className="text-xs md:text-sm text-white/60 mt-0.5">
            Holdings breakdown, dividend forecasts, and weighted sector exposure.
          </p>
        </div>

        <Button to="/dashboard/invest" variant="primary" size="sm" icon={true}>
          Add Equity Position
        </Button>
      </div>

      {/* 3 StatCards: Total Value, Total Gain, Dividend Income */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Portfolio Value"
          value={`$${totalValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          delta="+3.82%"
          isPositive={true}
          subtitle="updated live"
          icon={<DollarSign className="w-4 h-4 text-[#F40009]" />}
        />
        <StatCard
          label="Total Unrealized Gain"
          value={`${totalGain >= 0 ? "+" : "-"}$${Math.abs(totalGain).toLocaleString(
            undefined,
            { minimumFractionDigits: 2, maximumFractionDigits: 2 }
          )}`}
          delta={`${totalGainPct >= 0 ? "+" : ""}${totalGainPct.toFixed(2)}%`}
          isPositive={totalGain >= 0}
          subtitle="all-time returns"
          icon={<TrendingUp className="w-4 h-4 text-emerald-400" />}
        />
        <StatCard
          label="Est. Annual Dividend Income"
          value={`$${annualDividend}`}
          delta="2.95% yield"
          isPositive={true}
          subtitle="projected cash distributions"
          icon={<Percent className="w-4 h-4 text-white/70" />}
        />
      </div>

      {holdings.length === 0 ? (
        /* Empty State */
        <Card className="p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F40009] mx-auto">
            <PieIcon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-medium text-white">No Holdings Found</h3>
          <p className="text-xs text-white/60">
            Start investing in Coca-Cola (KO) or peer beverage stocks to construct your portfolio.
          </p>
          <Button to="/dashboard/invest" variant="primary" size="md">
            Start Investing — Browse KO
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Holdings DataTable (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white tracking-tight">
                Current Holdings ({holdings.length})
              </h3>
              <span className="text-xs text-white/50">Market close values</span>
            </div>

            <DataTable
              id="portfolio-holdings-table"
              columns={columns}
              data={holdings}
              keyExtractor={(h) => h.symbol}
            />
          </div>

          {/* Right: Allocation Pie Chart (4 cols) */}
          <div className="lg:col-span-4">
            <Card className="p-6">
              <div className="mb-4">
                <span className="text-xs uppercase tracking-wider text-white/50 font-medium">
                  Exposure
                </span>
                <h3 className="text-lg font-medium text-white tracking-tight">
                  Portfolio Allocation
                </h3>
              </div>

              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0A0A0A",
                        borderColor: "rgba(255,255,255,0.15)",
                        borderRadius: "12px",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                      formatter={(val: any) => [`$${Number(val).toLocaleString()}`, "Valuation"]}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => (
                        <span className="text-xs text-white/70 font-mono">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/60 space-y-2">
                <div className="flex justify-between">
                  <span>Top Position</span>
                  <span className="text-white font-medium">KO (Coca-Cola Co.) — ~48%</span>
                </div>
                <div className="flex justify-between">
                  <span>Sector Concentration</span>
                  <span className="text-white font-medium">100% Beverage Equities</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
