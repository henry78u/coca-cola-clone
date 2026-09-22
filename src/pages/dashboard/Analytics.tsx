import React from "react";
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  Layers,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import StatCard from "../../components/StatCard";
import Card from "../../components/Card";

const revenueTrend = [
  { month: "Apr", revenue: 42300, orders: 1120 },
  { month: "May", revenue: 48900, orders: 1240 },
  { month: "Jun", revenue: 56100, orders: 1480 },
  { month: "Jul", revenue: 64200, orders: 1720 },
  { month: "Aug", revenue: 61800, orders: 1650 },
  { month: "Sep", revenue: 72400, orders: 1890 },
];

const salesByRegion = [
  { name: "North America", value: 34200 },
  { name: "Europe", value: 21800 },
  { name: "Asia-Pacific", value: 16400 },
  { name: "Latin America", value: 12500 },
];

const weeklyOrders = [
  { day: "Mon", units: 280 },
  { day: "Tue", units: 340 },
  { day: "Wed", units: 410 },
  { day: "Thu", units: 390 },
  { day: "Fri", units: 520 },
  { day: "Sat", units: 480 },
  { day: "Sun", units: 310 },
];

const REGION_COLORS = ["#F40009", "#C10007", "#FFFFFF", "#666666"];

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#F40009]">
          Executive Intelligence
        </span>
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white mt-1">
          Store & Commercial Analytics
        </h2>
        <p className="text-xs md:text-sm text-white/60 mt-0.5">
          Gross sales volumes, regional fulfillment breakdown, and week-over-week velocity metrics.
        </p>
      </div>

      {/* 3 StatCards: Revenue, Orders, Avg Order Value */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Gross Revenue"
          value="$345,700"
          delta="+18.4%"
          isPositive={true}
          subtitle="past 6 months"
          icon={<DollarSign className="w-4 h-4 text-[#F40009]" />}
        />
        <StatCard
          label="Orders Fulfilled"
          value="9,100"
          delta="+12.2%"
          isPositive={true}
          subtitle="e-commerce & loungewear"
          icon={<ShoppingBag className="w-4 h-4 text-emerald-400" />}
        />
        <StatCard
          label="Avg Order Value (AOV)"
          value="$37.98"
          delta="+$4.12"
          isPositive={true}
          subtitle="basket lift from packs"
          icon={<TrendingUp className="w-4 h-4 text-white/70" />}
        />
      </div>

      {/* Area Chart: Revenue Trend */}
      <Card className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-white/50 font-medium">
              Financial Progression
            </span>
            <h3 className="text-lg font-medium text-white tracking-tight">
              Monthly Revenue Trend (USD)
            </h3>
          </div>
          <span className="text-xs text-emerald-400 font-mono font-medium">
            Peak Month: Sep ($72.4k)
          </span>
        </div>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueTrend}>
              <defs>
                <linearGradient id="analyticsRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F40009" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#F40009" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                fontSize={12}
                tickLine={false}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0A0A0A",
                  borderColor: "rgba(255,255,255,0.15)",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                }}
                formatter={(val: any) => [`$${Number(val).toLocaleString()}`, "Revenue"]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#F40009"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#analyticsRevenueGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Two Column Grid: Pie Chart (Region) + Bar Chart (Weekly Orders) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sales by Region (5 cols) */}
        <div className="lg:col-span-5">
          <Card className="p-6">
            <div className="mb-4">
              <span className="text-xs uppercase tracking-wider text-white/50 font-medium">
                Geography
              </span>
              <h3 className="text-lg font-medium text-white tracking-tight">
                Sales by Geographic Region
              </h3>
            </div>

            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesByRegion}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={75}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {salesByRegion.map((entry, index) => (
                      <Cell
                        key={`region-cell-${index}`}
                        fill={REGION_COLORS[index % REGION_COLORS.length]}
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
                    formatter={(val: any) => [`$${Number(val).toLocaleString()}`, "Sales"]}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(val) => (
                      <span className="text-xs text-white/70">{val}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Weekly Orders Bar Chart (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="p-6">
            <div className="mb-4">
              <span className="text-xs uppercase tracking-wider text-white/50 font-medium">
                Throughput
              </span>
              <h3 className="text-lg font-medium text-white tracking-tight">
                Daily Order Distribution (Current Week)
              </h3>
            </div>

            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyOrders}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0A0A0A",
                      borderColor: "rgba(255,255,255,0.15)",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                    formatter={(val: any) => [`${val} orders`, "Fulfillments"]}
                  />
                  <Bar dataKey="units" fill="#F40009" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
