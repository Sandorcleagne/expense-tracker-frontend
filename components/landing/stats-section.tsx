const stats = [
    { value: "12K+", label: "Active Users" },
    { value: "$2.4B", label: "Tracked Annually" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9/5", label: "User Rating" },
];

export function StatsSection() {
    return (
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-3xl font-extrabold text-white sm:text-4xl">
                                {stat.value}
                            </p>
                            <p className="mt-1 text-sm font-medium text-blue-200">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
