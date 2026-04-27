"use client";

import { Bell, Search, LogOut, User, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/app/store/authStore";

interface NavbarProps {
    title?: string;
    subtitle?: string;
}

export function Navbar({
    title = "Dashboard",
    subtitle = "Welcome back, here\u2019s your financial overview",
}: NavbarProps) {
    const user = useAuthStore((s) => s.user);
    const clearUser = useAuthStore((s) => s.clearUser);
    const router = useRouter();

    /** Generate initials from full name, e.g. "John Doe" → "JD" */
    function getInitials(name: string) {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    }

    function handleLogout() {
        clearUser();
        router.push("/");
    }

    const displayName = user?.fullName ?? "User";
    const initials = user ? getInitials(user.fullName) : "U";

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-sm sm:px-6">
            {/* Left: Page title */}
            <div className="flex items-center gap-4">
                {/* Spacer for mobile hamburger */}
                <div className="w-8 lg:hidden" />
                <div>
                    <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                    <p className="hidden text-sm text-gray-500 sm:block">{subtitle}</p>
                </div>
            </div>

            {/* Right: Search, notifications, avatar */}
            <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Search transactions..."
                        className="w-64 pl-9"
                    />
                </div>

                {/* Notification bell */}
                <button
                    className="relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                    aria-label="Notifications"
                >
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
                </button>

                {/* User avatar dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-gray-100">
                            <Avatar className="h-8 w-8">
                                {user?.avatar && (
                                    <AvatarImage src={user.avatar} alt={displayName} />
                                )}
                                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                            </Avatar>
                            <span className="hidden text-sm font-medium text-gray-700 sm:block">
                                {displayName}
                            </span>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Billing
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-600 cursor-pointer"
                            onClick={handleLogout}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
