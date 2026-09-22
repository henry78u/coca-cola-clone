import React, { useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  PieChart,
  BarChart3,
  Newspaper,
  Package,
  ShoppingBag,
  LineChart,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Shield,
} from "lucide-react";
import { isAdmin, getSession, signOut } from "../lib/auth";
import TickerStrip from "../components/TickerStrip";
import AvatarDropdown from "../components/AvatarDropdown";

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const mainNav: NavItem[] = [
  { name: "Overview", path: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { name: "Invest in KO", path: "/dashboard/invest", icon: <TrendingUp className="w-4 h-4" /> },
  { name: "Portfolio", path: "/dashboard/portfolio", icon: <PieChart className="w-4 h-4" /> },
  { name: "Market", path: "/dashboard/market", icon: <BarChart3 className="w-4 h-4" /> },
  { name: "Investment News", path: "/dashboard/news", icon: <Newspaper className="w-4 h-4" /> },
];

const adminNav: NavItem[] = [
  { name: "Products Mgmt", path: "/dashboard/products", icon: <Package className="w-4 h-4" /> },
  { name: "Customer Orders", path: "/dashboard/orders", icon: <ShoppingBag className="w-4 h-4" /> },
  { name: "Store Analytics", path: "/dashboard/analytics", icon: <LineChart className="w-4 h-4" /> },
];

export const DashboardLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userIsAdmin = isAdmin();
  const session = getSession();

  // Route title derivation
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Dashboard Overview";
    if (path.startsWith("/dashboard/invest")) return "Invest in Coca-Cola (KO)";
    if (path.startsWith("/dashboard/portfolio")) return "Investment Portfolio";
    if (path.startsWith("/dashboard/market")) return "Beverage Market Intelligence";
    if (path.startsWith("/dashboard/news")) return "Investment News & Filings";
    if (path.startsWith("/dashboard/settings")) return "Account Settings";
    if (path.startsWith("/dashboard/products")) return "Product Catalog Management";
    if (path.startsWith("/dashboard/orders")) return "Customer Order Fulfillments";
    if (path.startsWith("/dashboard/analytics")) return "Performance Analytics";
    return "Dashboard";
  };

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 select-none ${
      isActive
        ? "bg-white/10 text-white border-l-2 border-[#F40009] shadow-sm"
        : "text-white/60 hover:text-white hover:bg-white/5"
    }`;

  return (
    <div className="min-h-screen bg-[#000000] text-white flex">
      {/* ═══════════════════════════════════════════════════════════════
          DESKTOP SIDEBAR (w-64, fixed, bg-[#0A0A0A], border-r border-white/10)
         ═══════════════════════════════════════════════════════════════ */}
      <aside
        id="dashboard-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0A0A0A] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Logo Area */}
          <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center transition-colors group-hover:border-[#F40009]">
                <div className="w-2 h-2 rounded-full bg-white group-hover:bg-[#F40009]" />
              </div>
              <span className="text-white font-semibold text-base tracking-tight">
                Coca-Cola <span className="text-[#F40009]">Clone</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-white/60 hover:text-white p-1"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-10rem)] custom-scrollbar">
            {/* Section: MAIN */}
            <div>
              <p className="px-3 mb-2 text-[10px] uppercase font-semibold tracking-wider text-white/40">
                Main
              </p>
              <nav className="space-y-1">
                {mainNav.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/dashboard"}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={navLinkClasses}
                  >
                    <span className="text-[#F40009]">{item.icon}</span>
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Section: ADMIN (Only if isAdmin) */}
            {userIsAdmin && (
              <div>
                <div className="px-3 mb-2 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-[#F40009]">
                    Admin Controls
                  </span>
                  <Shield className="w-3 h-3 text-[#F40009]" />
                </div>
                <nav className="space-y-1">
                  {adminNav.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={navLinkClasses}
                    >
                      <span className="text-white/80">{item.icon}</span>
                      <span>{item.name}</span>
                    </NavLink>
                  ))}
                </nav>
              </div>
            )}

            {/* Section: ACCOUNT */}
            <div>
              <p className="px-3 mb-2 text-[10px] uppercase font-semibold tracking-wider text-white/40">
                Account
              </p>
              <nav className="space-y-1">
                <NavLink
                  to="/dashboard/settings"
                  onClick={() => setMobileSidebarOpen(false)}
                  className={navLinkClasses}
                >
                  <Settings className="w-4 h-4 text-white/60" />
                  <span>Settings</span>
                </NavLink>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-[#F40009] hover:bg-[#F40009]/5 transition-colors cursor-pointer text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Sidebar Footer Link to Public Website */}
        <div className="p-4 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span>Exit to Public Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#F40009]" />
          </Link>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/80 backdrop-blur-sm md:hidden"
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MAIN WRAPPER (offset by sidebar width on desktop)
         ═══════════════════════════════════════════════════════════════ */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        {/* Topbar (h-16, border-b border-white/10, bg-black/60 backdrop-blur) */}
        <header
          id="dashboard-topbar"
          className="h-16 sticky top-0 z-20 border-b border-white/10 bg-black/60 backdrop-blur-md px-4 md:px-8 flex items-center justify-between"
        >
          {/* Left: Mobile hamburger + Page Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base md:text-lg font-medium text-white tracking-tight truncate">
              {getPageTitle()}
            </h1>
          </div>

          {/* Center: Live Ticker Strip */}
          <TickerStrip />

          {/* Right: Notifications & Avatar Dropdown */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors relative"
              aria-label="Notifications"
              onClick={() => alert("Notification: KO declared quarterly dividend of $0.485 per share.")}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#F40009]" />
            </button>

            <AvatarDropdown align="right" />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>

        {/* Dashboard Footer with Mandatory Educational Disclaimer */}
        <footer className="p-6 border-t border-white/10 text-center text-xs text-white/50 bg-[#080808]">
          <p>
            © 2026 Coca-Cola Clone. Educational project — not affiliated with The Coca-Cola Company. Stock data is simulated for demonstration.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
