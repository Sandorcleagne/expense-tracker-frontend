import Link from "next/link";
import { Wallet } from "lucide-react";

const footerLinks = {
    Product: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Integrations", href: "#" },
        { label: "Changelog", href: "#" },
    ],
    Company: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
    ],
    Resources: [
        { label: "Documentation", href: "#" },
        { label: "Help Center", href: "#" },
        { label: "Community", href: "#" },
        { label: "Contact", href: "#" },
    ],
    Legal: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
        { label: "GDPR", href: "#" },
    ],
};

export function LandingFooter() {
    return (
        <footer className="border-t border-gray-100 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
                    {/* Brand column */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                                <Wallet className="h-5 w-5" />
                            </div>
                            <span className="text-lg font-bold text-gray-900">
                                ExpenseIQ
                            </span>
                        </Link>
                        <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-500">
                            The modern way to track expenses, manage budgets, and grow your
                            savings. Built for people who care about their financial future.
                        </p>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="text-sm font-semibold text-gray-900">
                                {category}
                            </h4>
                            <ul className="mt-3 space-y-2">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-gray-500 transition-colors hover:text-gray-700"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row">
                    <p className="text-sm text-gray-400">
                        &copy; 2026 ExpenseIQ. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {["Twitter", "GitHub", "LinkedIn"].map((social) => (
                            <a
                                key={social}
                                href="#"
                                className="text-sm text-gray-400 transition-colors hover:text-gray-600"
                            >
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
