const testimonials = [
    {
        name: "Sarah Chen",
        role: "Product Designer",
        initials: "SC",
        color: "bg-blue-500",
        quote:
            "ExpenseIQ completely changed how I manage my freelance income. The category breakdowns and budget alerts keep me on track every month.",
    },
    {
        name: "Marcus Johnson",
        role: "Software Engineer",
        initials: "MJ",
        color: "bg-green-500",
        quote:
            "I've tried dozens of expense trackers. This is the first one that actually feels modern and doesn't overwhelm me with features I don't need.",
    },
    {
        name: "Emily Rodriguez",
        role: "Small Business Owner",
        initials: "ER",
        color: "bg-purple-500",
        quote:
            "The reports page alone is worth it. I can see exactly where my money goes and the AI insights have helped me save an extra $400/month.",
    },
    {
        name: "David Kim",
        role: "Financial Analyst",
        initials: "DK",
        color: "bg-orange-500",
        quote:
            "Clean UI, fast performance, and the multi-currency support is perfect for my international transactions. Highly recommended.",
    },
    {
        name: "Lisa Thompson",
        role: "Marketing Manager",
        initials: "LT",
        color: "bg-teal-500",
        quote:
            "Setting up budgets took me 2 minutes and now I get alerts before I overspend. It's like having a personal financial advisor.",
    },
    {
        name: "James Wright",
        role: "Freelance Writer",
        initials: "JW",
        color: "bg-red-500",
        quote:
            "The mobile experience is just as good as desktop. I can check my spending on the go and it syncs instantly. Love it.",
    },
];

export function TestimonialsSection() {
    return (
        <section id="testimonials" className="bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        Testimonials
                    </p>
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Trusted by thousands
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                        See what our users have to say about managing their finances with
                        ExpenseIQ.
                    </p>
                </div>

                {/* Testimonial grid */}
                <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((t) => (
                        <div
                            key={t.name}
                            className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:border-gray-200 hover:shadow-lg"
                        >
                            {/* Stars */}
                            <div className="flex gap-0.5">
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

                            {/* Quote */}
                            <p className="mt-4 text-sm leading-relaxed text-gray-600">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="mt-5 flex items-center gap-3">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${t.color}`}
                                >
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {t.name}
                                    </p>
                                    <p className="text-xs text-gray-500">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
