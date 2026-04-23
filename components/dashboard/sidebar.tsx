"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Receipt,
    TrendingUp,
    PiggyBank,
    BarChart3,
    Settings,
    ChevronLeft,
    Menu,
    X,
    Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Expenses", icon: Receipt, href: "/expenses" },
    { label: "Income", icon: TrendingUp, href: "/income" },
    { label: "Budgets", icon: PiggyBank, href: "/budgets" },
    { label: "Reports", icon: BarChart3, href: "/reports" },
    { label: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* Mobile hamburger button */}
            <button
                onClick={() => setMobileOpen(true)}
                className="fixed top-4 left-4 z-50 rounded-lg bg-white p-2 shadow-md lg:hidden"
                aria-label="Open sidebar"
            >
                <Menu className="h-5 w-5 text-gray-700" />
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-gray-200 bg-white transition-all duration-300",
                    collapsed ? "w-[72px]" : "w-64",
                    mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Logo area */}
                <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                            <Wallet className="h-5 w-5" />
                        </div>
                        {!collapsed && (
                            <span className="text-lg font-bold text-gray-900">
                                ExpenseIQ
                            </span>
                        )}
                    </Link>

                    {/* Mobile close button */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="rounded-md p-1 text-gray-400 hover:text-gray-600 lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {/* Desktop collapse button */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className={cn(
                            "hidden rounded-md p-1 text-gray-400 transition-transform hover:text-gray-600 lg:block",
                            collapsed && "rotate-180"
                        )}
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-3 py-4">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive =
                            item.href === "/dashboard"
                                ? pathname === "/dashboard"
                                : pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <Icon
                                    className={cn(
                                        "h-5 w-5 shrink-0",
                                        isActive ? "text-blue-600" : "text-gray-400"
                                    )}
                                />
                                {!collapsed && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom section */}
                {!collapsed && (
                    <div className="border-t border-gray-100 p-4">
                        <div className="rounded-lg bg-blue-50 p-3">
                            <p className="text-xs font-medium text-blue-800">
                                Pro Plan Active
                            </p>
                            <p className="mt-1 text-xs text-blue-600">
                                Unlimited tracking & reports
                            </p>
                        </div>
                    </div>
                )}
            </aside>
        </>
    );
}
