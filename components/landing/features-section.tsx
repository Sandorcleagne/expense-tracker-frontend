import {
    BarChart3,
    PiggyBank,
    Receipt,
    TrendingUp,
    Bell,
    Shield,
    Smartphone,
    Globe,
    Zap,
} from "lucide-react";

const features = [
    {
        icon: Receipt,
        title: "Expense Tracking",
        description:
            "Automatically categorize and track every transaction in real time with smart detection.",
        color: "text-blue-600",
        bg: "bg-blue-50",
    },
    {
        icon: TrendingUp,
        title: "Income Monitoring",
        description:
            "Track all income streams — salary, freelance, investments — in one unified view.",
        color: "text-green-600",
        bg: "bg-green-50",
    },
    {
        icon: PiggyBank,
        title: "Budget Management",
        description:
            "Set category budgets and get alerts before you overspend. Stay on track effortlessly.",
        color: "text-purple-600",
        bg: "bg-purple-50",
    },
    {
        icon: BarChart3,
        title: "Visual Reports",
        description:
            "Beautiful charts and breakdowns that make understanding your finances intuitive.",
        color: "text-orange-600",
        bg: "bg-orange-50",
    },
    {
        icon: Bell,
        title: "Smart Alerts",
        description:
            "Get notified about unusual spending, upcoming bills, and budget milestones.",
        color: "text-red-600",
        bg: "bg-red-50",
    },
    {
        icon: Shield,
        title: "Bank-Level Security",
        description:
            "Your data is encrypted with 256-bit SSL and never shared with third parties.",
        color: "text-teal-600",
        bg: "bg-teal-50",
    },
    {
        icon: Smartphone,
        title: "Mobile Friendly",
        description:
            "Fully responsive design that works beautifully on any device, anywhere.",
        color: "text-indigo-600",
        bg: "bg-indigo-50",
    },
    {
        icon: Globe,
        title: "Multi-Currency",
        description:
            "Support for 50+ currencies with automatic conversion at real-time rates.",
        color: "text-cyan-600",
        bg: "bg-cyan-50",
    },
    {
        icon: Zap,
        title: "AI Insights",
        description:
            "Get personalized recommendations to optimize spending and grow your savings.",
        color: "text-yellow-600",
        bg: "bg-yellow-50",
    },
];

export function FeaturesSection() {
    return (
        <section id="features" className="bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        Features
                    </p>
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Everything you need to manage money
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Powerful tools designed to give you complete visibility and control
                        over your financial life.
                    </p>
                </div>

                {/* Feature grid */}
                <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:border-gray-200 hover:shadow-lg"
                            >
                                <div
                                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg} transition-transform group-hover:scale-110`}
                                >
                                    <Icon className={`h-6 w-6 ${feature.color}`} />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
