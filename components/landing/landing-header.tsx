"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Wallet, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthModal } from "./auth-modal";
import { useAuthStore } from "@/app/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
];

type AuthMode = "login" | "register";

export function LandingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [mounted, setMounted] = useState(false);

  const user = useAuthStore((s) => s.user);

  // Hydration guard: avoid mismatch between SSR (null) and client (persisted user)
  useEffect(() => setMounted(true), []);

  function openAuth(mode: AuthMode) {
    setAuthMode(mode);
    setAuthOpen(true);
    setMobileOpen(false);
  }

  const isLoggedIn = mounted && user !== null;

  /** Generate initials from full name, e.g. "John Doe" → "JD" */
  function getInitials(name: string) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Wallet className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold text-gray-900">ExpenseIQ</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA — changes based on auth state */}
        <div className="hidden items-center gap-3 md:flex">
          {!mounted ? (
            /* Skeleton placeholder while zustand hydrates — prevents flicker */
            <div className="flex items-center gap-3">
              <div className="h-5 w-12 animate-pulse rounded bg-gray-200" />
              <div className="h-9 w-32 animate-pulse rounded-lg bg-gray-200" />
            </div>
          ) : isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Go to Dashboard
              </Link>
              <Link href="/dashboard" className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-blue-200">
                  {user.avatar && (
                    <AvatarImage src={user.avatar} alt={user.fullName} />
                  )}
                  <AvatarFallback className="bg-blue-50 text-xs font-semibold text-blue-700">
                    {getInitials(user.fullName)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => openAuth("login")}
                className="cursor-pointer text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Log in
              </button>
              <button
                onClick={() => openAuth("register")}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Get Started Free
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                {link.label}
              </a>
            ))}
            <hr className="my-2 border-gray-100" />
            {!mounted ? (
              <div className="mt-1 flex flex-col gap-2">
                <div className="h-9 animate-pulse rounded-lg bg-gray-200" />
              </div>
            ) : isLoggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "mt-1 flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700",
                )}
              >
                <Avatar className="h-6 w-6 border border-blue-300">
                  {user.avatar && (
                    <AvatarImage src={user.avatar} alt={user.fullName} />
                  )}
                  <AvatarFallback className="bg-blue-500 text-[10px] font-semibold text-white">
                    {getInitials(user.fullName)}
                  </AvatarFallback>
                </Avatar>
                Go to Dashboard
              </Link>
            ) : (
              <>
                <button
                  onClick={() => openAuth("login")}
                  className="cursor-pointer rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                >
                  Log in
                </button>
                <button
                  onClick={() => openAuth("register")}
                  className={cn(
                    "mt-1 rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700",
                  )}
                >
                  Get Started Free
                </button>
              </>
            )}
          </nav>
        </div>
      )}

      <AuthModal
        open={authOpen}
        onOpenChange={setAuthOpen}
        defaultMode={authMode}
      />
    </header>
  );
}
