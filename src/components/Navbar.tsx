import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import AvatarDropdown from "./AvatarDropdown";

interface NavbarProps {
  variant?: "transparent" | "solid";
}

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About Us", path: "/about" },
  { name: "History", path: "/history" },
  { name: "Store Locator", path: "/locator" },
  { name: "Invest", path: "/dashboard/invest" },
  { name: "Blog", path: "/blog" },
];

export const Navbar: React.FC<NavbarProps> = ({ variant = "solid" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navPosition = isHome
    ? "absolute top-0 left-0 right-0 z-50 pt-6"
    : "sticky top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-white/10 py-4";

  return (
    <header className={`${navPosition} transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with bottle-cap motif */}
          <Link
            to="/"
            id="nav-logo"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Coca-Cola Clone Home"
          >
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:border-[#F40009]">
              <div className="w-2.5 h-2.5 rounded-full bg-white transition-colors duration-300 group-hover:bg-[#F40009]" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight select-none">
              Coca-Cola <span className="text-[#F40009]">Clone</span>
            </span>
          </Link>

          {/* Desktop Navigation Links in Rounded Pill Container */}
          <nav
            id="desktop-nav-pill"
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center bg-black/50 backdrop-blur-md border border-gray-700/80 rounded-full px-5 py-2 shadow-lg"
          >
            <div className="flex items-center gap-6">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm transition-colors duration-200 select-none ${
                      isActive
                        ? "text-white font-medium"
                        : "text-white/80 hover:text-white"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              {/* Contact Us with Arrow icon */}
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 text-sm transition-colors duration-200 pl-2 border-l border-white/15 select-none ${
                    isActive
                      ? "text-white font-medium"
                      : "text-white/80 hover:text-white"
                  }`
                }
              >
                <span>Contact us</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F40009]" />
              </NavLink>
            </div>
          </nav>

          {/* Right action / quick badge on desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/products"
              id="nav-quick-cta"
              className="text-xs uppercase font-medium tracking-wider px-4 py-2 rounded-full border border-white/20 text-white/90 hover:text-white hover:border-[#F40009] hover:bg-[#F40009]/10 transition-all duration-200"
            >
              Order Online
            </Link>
            <AvatarDropdown align="right" />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#F40009]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Full-Screen Overlay Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-overlay-menu"
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-6 pt-24 lg:hidden"
        >
          <div className="flex flex-col space-y-5">
            <p className="text-xs uppercase tracking-widest text-[#F40009] font-medium">
              Navigation Menu
            </p>
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-2xl font-medium tracking-tight transition-colors ${
                    isActive ? "text-[#F40009]" : "text-white/80 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between text-2xl font-medium tracking-tight transition-colors pt-4 border-t border-white/10 ${
                  isActive ? "text-[#F40009]" : "text-white/80 hover:text-white"
                }`
              }
            >
              <span>Contact us</span>
              <ArrowUpRight className="w-6 h-6 text-[#F40009]" />
            </NavLink>
          </div>

          <div className="pt-8 border-t border-white/10">
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block text-center py-4 bg-[#F40009] hover:bg-[#C10007] text-white font-medium rounded-full transition-all"
            >
              Explore Our Products
            </Link>
            <p className="mt-4 text-center text-xs text-white/50">
              Educational project — not affiliated with The Coca-Cola Company.
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
