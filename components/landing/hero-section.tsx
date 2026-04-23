import Link from "next/link";
import {
    ArrowRight,
    TrendingUp,
    Shield,
    Zap,
    BarChart3,
    DollarSign,
    PiggyBank,
} from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-purple-100/30 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left — copy */}
                    <div className="max-w-xl">
                        {/* Badge */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1">
                            <Zap className="h-3.5 w-3.5 text-blue-600" />
                            <span className="text-xs font-medium text-blue-700">
                                Smart expense tracking powered by AI
                            </span>
                        </div>

                        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                            Take control of{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                your finances
                            </span>
                        </h1>

                        <p className="mt-5 text-lg leading-relaxed text-gray-600 sm:text-xl">
                            Track expenses, monitor income, set budgets, and get actionable
                            insights — all in one beautifully designed dashboard.
                        </p>

                        {/* CTA buttons */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30"
                            >
                                Start for Free
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <a
                                href="#features"
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                See Features
                            </a>
                        </div>

                        {/* Social proof */}
                        <div className="mt-10 flex items-center gap-6">
                            <div className="flex -space-x-2">
                                {["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500"].map(
                                    (bg, i) => (
                                        <div
                                            key={i}
                                            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white ${bg}`}
                                        >
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                    )
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="h-4 w-4 text-yellow-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">
                                    Loved by <span className="font-semibold text-gray-700">12,000+</span> users
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right — dashboard preview card */}
                    <div className="relative">
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl shadow-gray-200/60">
                            {/* Mini dashboard header */}
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Total Balance</p>
                                    <p className="text-3xl font-bold text-gray-900">$12,540</p>
                                </div>
                                <div className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1">
                                    <TrendingUp className="h-3.5 w-3.5 text-green-600" />
                                    <span className="text-xs font-semibold text-green-700">
                                        +12.5%
                                    </span>
                                </div>
                            </div>

                            {/* Mini stat cards */}
                            <div className="mb-5 grid grid-cols-3 gap-3">
                                {[
                                    {
                                        label: "Income",
                                        value: "$5,200",
                                        icon: DollarSign,
                                        color: "text-green-600",
                                        bg: "bg-green-50",
                                    },
                                    {
                                        label: "Expenses",
                                        value: "$3,400",
                                        icon: BarChart3,
                                        color: "text-red-600",
                                        bg: "bg-red-50",
                                    },
                                    {
                                        label: "Savings",
                                        value: "$1,800",
                                        icon: PiggyBank,
                                        color: "text-purple-600",
                                        bg: "bg-purple-50",
                                    },
                                ].map((stat) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div
                                            key={stat.label}
                                            className="rounded-xl border border-gray-100 bg-gray-50/50 p-3"
                                        >
                                            <div
                                                className={`mb-2 inline-flex h-7 w-7 items-center justify-center rounded-lg ${stat.bg}`}
                                            >
                                                <Icon className={`h-3.5 w-3.5 ${stat.color}`} />
                                            </div>
                                            <p className="text-xs text-gray-500">{stat.label}</p>
                                            <p className="text-sm font-bold text-gray-900">
                                                {stat.value}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Mini chart bars */}
                            <div className="mb-2 flex items-center justify-between">
                                <p className="text-xs font-medium text-gray-500">
                                    Monthly Overview
                                </p>
                                <p className="text-xs text-gray-400">2026</p>
                            </div>
                            <div className="flex items-end gap-1.5">
                                {[40, 55, 35, 65, 50, 70, 45, 60, 55, 75, 65, 80].map(
                                    (h, i) => (
                                        <div key={i} className="flex flex-1 flex-col items-center gap-1">
                                            <div
                                                className="w-full rounded-sm bg-blue-500/80"
                                                style={{ height: `${h}px` }}
                                            />
                                            <span className="text-[9px] text-gray-400">
                                                {
                                                    [
                                                        "J",
                                                        "F",
                                                        "M",
                                                        "A",
                                                        "M",
                                                        "J",
                                                        "J",
                                                        "A",
                                                        "S",
                                                        "O",
                                                        "N",
                                                        "D",
                                                    ][i]
                                                }
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Floating badges */}
                        <div className="absolute -left-4 top-8 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-lg sm:-left-8">
                            <div className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-green-500" />
                                <div>
                                    <p className="text-xs font-semibold text-gray-900">
                                        Bank-level Security
                                    </p>
                                    <p className="text-[10px] text-gray-400">256-bit encryption</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-3 -right-2 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-lg sm:-right-6">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                                    <Zap className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-900">
                                        AI Insights
                                    </p>
                                    <p className="text-[10px] text-gray-400">
                                        Smart recommendations
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
