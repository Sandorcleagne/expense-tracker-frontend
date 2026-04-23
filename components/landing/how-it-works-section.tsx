import { UserPlus, Link2, BarChart3, Target } from "lucide-react";

const steps = [
    {
        step: "01",
        icon: UserPlus,
        title: "Create Your Account",
        description:
            "Sign up in seconds with your email. No credit card required to get started.",
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
    },
    {
        step: "02",
        icon: Link2,
        title: "Connect Your Accounts",
        description:
            "Link your bank accounts and cards for automatic transaction syncing.",
        color: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
    },
    {
        step: "03",
        icon: Target,
        title: "Set Your Budgets",
        description:
            "Define spending limits for each category and let us handle the tracking.",
        color: "text-purple-600",
        bg: "bg-purple-50",
        border: "border-purple-200",
    },
    {
        step: "04",
        icon: BarChart3,
        title: "Get Insights",
        description:
            "View detailed reports, trends, and AI-powered recommendations to save more.",
        color: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-200",
    },
];

export function HowItWorksSection() {
    return (
        <section id="how-it-works" className="bg-gray-50 py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        How It Works
                    </p>
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Get started in minutes
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Four simple steps to take full control of your financial life.
                    </p>
                </div>

                {/* Steps */}
                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.step} className="relative text-center">
                                {/* Connector line (hidden on last item and mobile) */}
                                {index < steps.length - 1 && (
                                    <div className="absolute right-0 top-10 hidden h-px w-full translate-x-1/2 bg-gray-200 lg:block" />
                                )}

                                <div
                                    className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border-2 ${item.border} ${item.bg}`}
                                >
                                    <Icon className={`h-8 w-8 ${item.color}`} />
                                </div>

                                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                                    Step {item.step}
                                </p>
                                <h3 className="mt-2 text-lg font-semibold text-gray-900">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
