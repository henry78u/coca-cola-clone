import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User as UserIcon,
  Shield,
  Bell,
  Palette,
  LogOut,
  Check,
  AlertTriangle,
} from "lucide-react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { getSession, signOut } from "../../lib/auth";

export const Settings: React.FC = () => {
  const session = getSession();
  const navigate = useNavigate();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [activeTheme, setActiveTheme] = useState<"dark" | "oled">("dark");
  const [saveToast, setSaveToast] = useState(false);

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const handleSavePreferences = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#F40009]">
          Preferences & Credentials
        </span>
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white mt-1">
          Account Settings
        </h2>
        <p className="text-xs md:text-sm text-white/60 mt-0.5">
          Manage your simulated investor profile, notification thresholds, and security parameters.
        </p>
      </div>

      {saveToast && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Account preferences successfully updated in browser storage.</span>
        </div>
      )}

      {/* Profile Card */}
      <Card className="p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-white/10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F40009] to-[#800000] text-white flex items-center justify-center text-xl font-bold border-2 border-white/20 shadow-lg">
            {session?.name
              ? session.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
              : "CC"}
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-medium text-white">{session?.name || "Demo User"}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-[#F40009] uppercase tracking-wider">
                {session?.role || "viewer"}
              </span>
            </div>
            <p className="text-xs text-white/50 mt-1">{session?.email || "demo@cokeclone.dev"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block uppercase tracking-wider text-white/60 font-medium mb-1.5">
              Full Name (Read-only)
            </label>
            <input
              type="text"
              readOnly
              value={session?.name || "Demo User"}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white/70 select-none cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-white/60 font-medium mb-1.5">
              Account Email (Read-only)
            </label>
            <input
              type="text"
              readOnly
              value={session?.email || "demo@cokeclone.dev"}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white/70 select-none cursor-not-allowed"
            />
          </div>
        </div>
      </Card>

      {/* Preferences Card */}
      <Card className="p-6 md:p-8 space-y-6">
        <div>
          <h3 className="text-lg font-medium text-white tracking-tight">Display & Notifications</h3>
          <p className="text-xs text-white/60 mt-0.5">Customize your simulated terminal experience.</p>
        </div>

        {/* Theme Toggle (Visual Only) */}
        <div className="space-y-3 pb-6 border-b border-white/10">
          <label className="block text-xs uppercase tracking-wider text-white/70 font-medium">
            Interface Theme (Visual Preference)
          </label>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            <button
              type="button"
              onClick={() => setActiveTheme("dark")}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                activeTheme === "dark"
                  ? "bg-white/10 border-[#F40009] text-white"
                  : "bg-white/5 border-white/10 text-white/60 hover:text-white"
              }`}
            >
              <div className="text-xs font-semibold">Pitch Black</div>
              <div className="text-[11px] text-white/50 mt-0.5">Standard #000000 Canvas</div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTheme("oled")}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                activeTheme === "oled"
                  ? "bg-white/10 border-[#F40009] text-white"
                  : "bg-white/5 border-white/10 text-white/60 hover:text-white"
              }`}
            >
              <div className="text-xs font-semibold">Midnight Obsidian</div>
              <div className="text-[11px] text-white/50 mt-0.5">Deep 0x05 Contrast</div>
            </button>
          </div>
        </div>

        {/* Notification Switches (State only) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Simulated Dividend Alerts</p>
              <p className="text-xs text-white/50">Receive browser notifications upon quarterly KO distributions.</p>
            </div>
            <button
              type="button"
              onClick={() => setEmailAlerts(!emailAlerts)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                emailAlerts ? "bg-[#F40009]" : "bg-white/20"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  emailAlerts ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Weekly Market Intelligence Digest</p>
              <p className="text-xs text-white/50">Curated analytical reports on beverage sector volatility.</p>
            </div>
            <button
              type="button"
              onClick={() => setWeeklyDigest(!weeklyDigest)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                weeklyDigest ? "bg-[#F40009]" : "bg-white/20"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  weeklyDigest ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <Button type="button" variant="primary" size="md" onClick={handleSavePreferences}>
            Save Preferences
          </Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 md:p-8 border-red-500/30 bg-red-950/10 space-y-4">
        <div>
          <h3 className="text-base font-medium text-white tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#F40009]" />
            <span>Session Termination</span>
          </h3>
          <p className="text-xs text-white/60 mt-0.5">
            Log out of your current session on this device. Your simulated portfolio will remain in local storage.
          </p>
        </div>

        <div className="pt-2">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={handleSignOut}
            className="border-red-500/40 text-[#F40009] hover:bg-[#F40009]/10 hover:border-[#F40009]"
          >
            Sign Out of Account
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
