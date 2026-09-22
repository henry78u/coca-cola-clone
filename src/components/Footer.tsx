import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, Facebook, ArrowUpRight, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-[#0A0A0A] border-t border-white/10 py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Column 1: Brand & Design Brief */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center transition-colors group-hover:border-[#F40009]">
                <div className="w-2.5 h-2.5 rounded-full bg-white group-hover:bg-[#F40009]" />
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">
                Coca-Cola <span className="text-[#F40009]">Clone</span>
              </span>
            </Link>
            <p className="text-sm text-white/80 leading-relaxed">
              An educational frontend design architecture project exploring typography, kinetic backgrounds, and iconic beverage branding design systems.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
              <span className="w-2 h-2 rounded-full bg-[#F40009] animate-pulse" />
              <span>Educational Assignment Edition</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#F40009] font-medium">
              Explore
            </p>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link to="/products" className="hover:text-white hover:underline transition-colors">
                  Product Catalog
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:underline transition-colors">
                  About Our Project
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-white hover:underline transition-colors">
                  Heritage & Timeline (1886)
                </Link>
              </li>
              <li>
                <Link to="/locator" className="hover:text-white hover:underline transition-colors">
                  Store Locator & Flagships
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white hover:underline transition-colors">
                  The Fizz Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support & Information */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#F40009] font-medium">
              Support & Inquiries
            </p>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link to="/contact" className="hover:text-white hover:underline transition-colors">
                  Contact Design Team
                </Link>
              </li>
              <li>
                <span className="text-white/60 cursor-default">Student FAQ</span>
              </li>
              <li>
                <span className="text-white/60 cursor-default">Design System Tokens</span>
              </li>
              <li>
                <span className="text-white/60 cursor-default">Nutritional Guidelines</span>
              </li>
              <li>
                <span className="text-white/60 cursor-default">Sustainability Report</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Socials & Newsletter */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#F40009] font-medium">
              Connect & Share
            </p>
            <p className="text-sm text-white/80">
              Follow student design developments and design system breakdowns.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:border-[#F40009] hover:bg-[#F40009]/20 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer noopener"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:border-[#F40009] hover:bg-[#F40009]/20 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer noopener"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:border-[#F40009] hover:bg-[#F40009]/20 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer noopener"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:border-[#F40009] hover:bg-[#F40009]/20 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Mandatory Educational Disclaimer */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50 text-center md:text-left">
            © 2026 Coca-Cola Clone. Educational project — not affiliated with The Coca-Cola Company.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/50">
            <span>Class Assignment Project</span>
            <span>•</span>
            <span>Design DNA Framework</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-[#F40009] inline fill-[#F40009]" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
