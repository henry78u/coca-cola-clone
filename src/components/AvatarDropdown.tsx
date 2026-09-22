import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User as UserIcon, LayoutDashboard, Settings, LogOut, Shield } from "lucide-react";
import { getSession, signOut, Session } from "../lib/auth";

export interface AvatarDropdownProps {
  className?: string;
  align?: "left" | "right";
}

export const AvatarDropdown: React.FC<AvatarDropdownProps> = ({
  className = "",
  align = "right",
}) => {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(getSession());
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      setSession(getSession());
    };
    window.addEventListener("cokeclone_auth_change", handleAuthChange);
    return () => window.removeEventListener("cokeclone_auth_change", handleAuthChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (!session) {
    return (
      <Link
        to="/login"
        className="px-4 py-2 rounded-full border border-white/20 text-xs font-medium text-white hover:border-[#F40009] hover:bg-[#F40009]/10 transition-all"
      >
        Sign In
      </Link>
    );
  }

  const handleSignOut = () => {
    signOut();
    setOpen(false);
    navigate("/");
  };

  const initials = session.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        id="avatar-dropdown-trigger"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 p-1 rounded-full border border-white/15 bg-white/5 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-[#F40009] transition-all cursor-pointer select-none"
        aria-expanded={open}
        aria-label="User profile menu"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F40009] to-[#8B0000] text-white flex items-center justify-center text-xs font-semibold shadow-md">
          {initials || "CC"}
        </div>
        <div className="hidden sm:flex flex-col text-left pr-2">
          <span className="text-xs font-medium text-white line-clamp-1 leading-tight">
            {session.name}
          </span>
          <span className="text-[10px] uppercase font-semibold text-[#F40009] tracking-wider leading-tight">
            {session.role}
          </span>
        </div>
      </button>

      {open && (
        <div
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } mt-2 w-56 rounded-2xl bg-[#0F0F0F] border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in-50 duration-150 backdrop-blur-xl`}
        >
          {/* Header */}
          <div className="p-3 border-b border-white/10 mb-1">
            <p className="text-sm font-medium text-white truncate">{session.name}</p>
            <p className="text-xs text-white/50 truncate">{session.email}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-[#F40009] uppercase tracking-wider">
              <Shield className="w-3 h-3" />
              <span>{session.role} access</span>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-0.5">
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-[#F40009]" />
              <span>Dashboard Overview</span>
            </Link>

            <Link
              to="/dashboard/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Settings className="w-4 h-4 text-white/60" />
              <span>Account Settings</span>
            </Link>
          </div>

          {/* Sign Out */}
          <div className="mt-2 pt-2 border-t border-white/10">
            <button
              type="button"
              id="avatar-signout-btn"
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#F40009] hover:bg-[#F40009]/10 transition-colors cursor-pointer text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
