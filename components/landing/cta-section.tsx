import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-16 text-center sm:px-16 sm:py-20">
                    {/* Background decoration */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
                        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                    </div>

                    <div className="relative">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            Ready to take control of your finances?
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-lg text-blue-100">
                            Join 12,000+ users who are already saving more and spending
                            smarter with ExpenseIQ.
                        </p>
                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
                            >
                                Get Started for Free
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <a
                                href="#pricing"
                                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                            >
                                View Pricing
                            </a>
                        </div>
                        <p className="mt-4 text-xs text-blue-200">
                            No credit card required &middot; Free plan available forever
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
