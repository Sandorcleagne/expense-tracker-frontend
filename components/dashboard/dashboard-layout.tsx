"use client";

import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";

interface DashboardLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}

export function DashboardLayout({
    children,
    title,
    subtitle,
}: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            {/* Main content area — offset by sidebar width on desktop */}
            <div className="lg:pl-64">
                <Navbar title={title} subtitle={subtitle} />
                <main className="p-4 sm:p-6">{children}</main>
            </div>
        </div>
    );
}
