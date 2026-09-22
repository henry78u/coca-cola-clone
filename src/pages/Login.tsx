import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Lock, Mail, User as UserIcon, Shield, CheckCircle2, AlertCircle } from "lucide-react";
import GradientBackground from "../components/backgrounds/GradientBackground";
import Button from "../components/Button";
import { signIn, signUp, isAuthed } from "../lib/auth";

export const Login: React.FC = () => {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated, redirect to dashboard or target
  const from = (location.state as { from?: string })?.from || "/dashboard";

  React.useEffect(() => {
    if (isAuthed()) {
      navigate(from, { replace: true });
    }
  }, [navigate, from]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Please fill in both email and password.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    const res = signIn({ email, password });
    if (!res.success) {
      setError(res.error || "Authentication failed.");
      return;
    }

    navigate(from, { replace: true });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const res = signUp({ name, email, password });
    if (!res.success) {
      setError(res.error || "Sign up failed.");
      return;
    }

    navigate(from, { replace: true });
  };

  const fillDemo = (demoEmail: string, demoPass: string) => {
    setTab("signin");
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#000000] flex flex-col justify-center items-center px-4 py-12 overflow-hidden">
      {/* Background */}
      <GradientBackground />

      {/* Main Form Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl p-8 shadow-2xl shadow-black/80">
          {/* Logo & Heading */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group focus:outline-none">
              <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center transition-colors group-hover:border-[#F40009]">
                <div className="w-2.5 h-2.5 rounded-full bg-white group-hover:bg-[#F40009]" />
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">
                Coca-Cola <span className="text-[#F40009]">Clone</span>
              </span>
            </Link>
            <h2 className="text-2xl font-medium tracking-tight text-white">
              {tab === "signin" ? "Sign in to Dashboard" : "Create an Account"}
            </h2>
            <p className="text-xs text-white/60 mt-1">
              {tab === "signin"
                ? "Access portfolio analytics, simulated investments, and live metrics"
                : "Join the educational beverage simulation platform"}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 p-1 rounded-full bg-black/40 border border-white/10 mb-6">
            <button
              type="button"
              id="tab-signin-btn"
              onClick={() => {
                setTab("signin");
                setError(null);
              }}
              className={`py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                tab === "signin"
                  ? "bg-[#F40009] text-white shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              id="tab-signup-btn"
              onClick={() => {
                setTab("signup");
                setError(null);
              }}
              className={`py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                tab === "signup"
                  ? "bg-[#F40009] text-white shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Forms */}
          {tab === "signin" ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-medium mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    id="signin-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. demo@cokeclone.dev"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F40009] focus:ring-1 focus:ring-[#F40009] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-medium mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="password"
                    id="signin-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F40009] focus:ring-1 focus:ring-[#F40009] transition-all"
                  />
                </div>
              </div>

              <Button
                type="submit"
                id="signin-submit-btn"
                variant="primary"
                size="lg"
                className="w-full justify-center mt-2"
              >
                Sign In
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-medium mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    id="signup-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Mercer"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F40009] focus:ring-1 focus:ring-[#F40009] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-medium mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    id="signup-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@cokeclone.dev"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F40009] focus:ring-1 focus:ring-[#F40009] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-medium mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="password"
                    id="signup-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F40009] focus:ring-1 focus:ring-[#F40009] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-medium mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="password"
                    id="signup-confirmpassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F40009] focus:ring-1 focus:ring-[#F40009] transition-all"
                  />
                </div>
              </div>

              <Button
                type="submit"
                id="signup-submit-btn"
                variant="primary"
                size="lg"
                className="w-full justify-center mt-2"
              >
                Create Account
              </Button>
            </form>
          )}

          {/* Quick Demo Credentials Picker */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3 text-center">
              Quick Test Credentials
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                id="demo-user-fill-btn"
                onClick={() => fillDemo("demo@cokeclone.dev", "demo123")}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer"
              >
                <div className="font-semibold text-white">Demo User</div>
                <div className="text-[11px] text-white/50">demo123</div>
                <span className="text-[10px] text-[#F40009] font-medium">Viewer role</span>
              </button>
              <button
                type="button"
                id="admin-user-fill-btn"
                onClick={() => fillDemo("admin@cokeclone.dev", "admin123")}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer"
              >
                <div className="font-semibold text-white">Admin</div>
                <div className="text-[11px] text-white/50">admin123</div>
                <span className="text-[10px] text-emerald-400 font-medium">Admin role</span>
              </button>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to public site</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
