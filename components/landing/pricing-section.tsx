import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Perfect for getting started with basic expense tracking.",
        features: [
            "Track up to 50 transactions/month",
            "3 budget categories",
            "Basic reports",
            "Mobile access",
            "Email support",
        ],
        cta: "Get Started",
        highlighted: false,
    },
    {
        name: "Pro",
        price: "$12",
        period: "/month",
        description: "For individuals who want full control over their finances.",
        features: [
            "Unlimited transactions",
            "Unlimited budget categories",
            "Advanced reports & analytics",
            "AI-powered insights",
            "Multi-currency support",
            "Export to CSV/PDF",
            "Priority support",
        ],
        cta: "Start Free Trial",
        highlighted: true,
        badge: "Most Popular",
    },
    {
        name: "Business",
        price: "$29",
        period: "/month",
        description: "For teams and small businesses managing shared finances.",
        features: [
            "Everything in Pro",
            "Up to 10 team members",
            "Shared budgets & reports",
            "Role-based access control",
            "API access",
            "Custom integrations",
            "Dedicated account manager",
        ],
        cta: "Contact Sales",
        highlighted: false,
    },
];

export function PricingSection() {
    return (
        <section id="pricing" className="bg-gray-50 py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        Pricing
                    </p>
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Simple, transparent pricing
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                        No hidden fees. Start free and upgrade when you need more.
                    </p>
                </div>

                {/* Pricing cards */}
                <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={cn(
                                "relative rounded-2xl border bg-white p-8 transition-all hover:shadow-lg",
                                plan.highlighted
                                    ? "border-blue-600 shadow-xl shadow-blue-600/10"
                                    : "border-gray-200"
                            )}
                        >
                            {/* Badge */}
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">
                                        {plan.badge}
                                    </span>
                                </div>
                            )}

                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {plan.name}
                                </h3>
                                <div className="mt-3 flex items-baseline justify-center gap-1">
                                    <span className="text-4xl font-extrabold text-gray-900">
                                        {plan.price}
                                    </span>
                                    <span className="text-sm text-gray-500">{plan.period}</span>
                                </div>
                                <p className="mt-3 text-sm text-gray-500">
                                    {plan.description}
                                </p>
                            </div>

                            {/* Features */}
                            <ul className="mt-8 space-y-3">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-2.5">
                                        <Check
                                            className={cn(
                                                "mt-0.5 h-4 w-4 shrink-0",
                                                plan.highlighted ? "text-blue-600" : "text-green-500"
                                            )}
                                        />
                                        <span className="text-sm text-gray-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Link
                                href="/dashboard"
                                className={cn(
                                    "mt-8 block w-full rounded-lg py-3 text-center text-sm font-semibold transition-colors",
                                    plan.highlighted
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700"
                                        : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                )}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
