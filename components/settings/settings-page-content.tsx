"use client";

import { useState } from "react";
import {
    User,
    Bell,
    Shield,
    CreditCard,
    Globe,
    Palette,
    Save,
    Camera,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "preferences", label: "Preferences", icon: Palette },
] as const;

type TabId = (typeof tabs)[number]["id"];

function Toggle({
    enabled,
    onToggle,
}: {
    enabled: boolean;
    onToggle: () => void;
}) {
    return (
        <button
            onClick={onToggle}
            className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
                enabled ? "bg-blue-600" : "bg-gray-200"
            )}
            role="switch"
            aria-checked={enabled}
        >
            <span
                className={cn(
                    "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform",
                    enabled ? "translate-x-5" : "translate-x-0"
                )}
            />
        </button>
    );
}

export function SettingsPageContent() {
    const [activeTab, setActiveTab] = useState<TabId>("profile");
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(true);
    const [weeklyReport, setWeeklyReport] = useState(false);
    const [budgetAlerts, setBudgetAlerts] = useState(true);
    const [twoFactor, setTwoFactor] = useState(false);

    return (
        <div className="space-y-6">
            {/* Tab navigation */}
            <div className="flex gap-1 overflow-x-auto rounded-lg border border-gray-200 bg-white p-1">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors",
                                activeTab === tab.id
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Profile tab */}
            {activeTab === "profile" && (
                <div className="space-y-6">
                    <Card className="transition-shadow hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold text-gray-900">
                                Profile Information
                            </CardTitle>
                            <CardDescription>
                                Update your personal details and photo
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {/* Avatar */}
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <Avatar className="h-20 w-20">
                                            <AvatarFallback className="text-xl">JD</AvatarFallback>
                                        </Avatar>
                                        <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition-colors hover:bg-blue-700">
                                            <Camera className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">John Doe</p>
                                        <p className="text-sm text-gray-500">
                                            john.doe@example.com
                                        </p>
                                    </div>
                                </div>

                                {/* Form fields */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700">
                                            First Name
                                        </label>
                                        <Input defaultValue="John" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700">
                                            Last Name
                                        </label>
                                        <Input defaultValue="Doe" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <Input
                                            type="email"
                                            defaultValue="john.doe@example.com"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700">
                                            Phone
                                        </label>
                                        <Input type="tel" defaultValue="+1 (555) 123-4567" />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                                        <Save className="h-4 w-4" />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Notifications tab */}
            {activeTab === "notifications" && (
                <Card className="transition-shadow hover:shadow-md">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold text-gray-900">
                            Notification Preferences
                        </CardTitle>
                        <CardDescription>
                            Choose how and when you want to be notified
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="divide-y divide-gray-100">
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Email Notifications
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Receive transaction alerts via email
                                    </p>
                                </div>
                                <Toggle
                                    enabled={emailNotifs}
                                    onToggle={() => setEmailNotifs(!emailNotifs)}
                                />
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Push Notifications
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Get real-time alerts on your device
                                    </p>
                                </div>
                                <Toggle
                                    enabled={pushNotifs}
                                    onToggle={() => setPushNotifs(!pushNotifs)}
                                />
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <p className="font-medium text-gray-900">Weekly Report</p>
                                    <p className="text-sm text-gray-500">
                                        Receive a weekly spending summary
                                    </p>
                                </div>
                                <Toggle
                                    enabled={weeklyReport}
                                    onToggle={() => setWeeklyReport(!weeklyReport)}
                                />
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <p className="font-medium text-gray-900">Budget Alerts</p>
                                    <p className="text-sm text-gray-500">
                                        Get notified when approaching budget limits
                                    </p>
                                </div>
                                <Toggle
                                    enabled={budgetAlerts}
                                    onToggle={() => setBudgetAlerts(!budgetAlerts)}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Security tab */}
            {activeTab === "security" && (
                <div className="space-y-6">
                    <Card className="transition-shadow hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold text-gray-900">
                                Change Password
                            </CardTitle>
                            <CardDescription>
                                Update your password to keep your account secure
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="max-w-md space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700">
                                        Current Password
                                    </label>
                                    <Input type="password" placeholder="Enter current password" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700">
                                        New Password
                                    </label>
                                    <Input type="password" placeholder="Enter new password" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700">
                                        Confirm New Password
                                    </label>
                                    <Input type="password" placeholder="Confirm new password" />
                                </div>
                                <button className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                                    Update Password
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-shadow hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold text-gray-900">
                                Two-Factor Authentication
                            </CardTitle>
                            <CardDescription>
                                Add an extra layer of security to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                                        <Shield className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {twoFactor ? "Enabled" : "Disabled"}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {twoFactor
                                                ? "Your account is protected with 2FA"
                                                : "Enable 2FA for enhanced security"}
                                        </p>
                                    </div>
                                </div>
                                <Toggle
                                    enabled={twoFactor}
                                    onToggle={() => setTwoFactor(!twoFactor)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-red-200 transition-shadow hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold text-red-600">
                                Danger Zone
                            </CardTitle>
                            <CardDescription>
                                Irreversible actions for your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">Delete Account</p>
                                    <p className="text-sm text-gray-500">
                                        Permanently delete your account and all data
                                    </p>
                                </div>
                                <button className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
                                    Delete Account
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Billing tab */}
            {activeTab === "billing" && (
                <div className="space-y-6">
                    <Card className="transition-shadow hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold text-gray-900">
                                Current Plan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-4">
                                <div>
                                    <p className="text-lg font-bold text-blue-900">Pro Plan</p>
                                    <p className="text-sm text-blue-700">
                                        $12/month &middot; Billed monthly
                                    </p>
                                </div>
                                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                                    Active
                                </span>
                            </div>
                            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                <div className="rounded-lg border border-gray-200 p-3">
                                    <p className="text-sm text-gray-500">Next billing date</p>
                                    <p className="font-medium text-gray-900">May 1, 2026</p>
                                </div>
                                <div className="rounded-lg border border-gray-200 p-3">
                                    <p className="text-sm text-gray-500">Payment method</p>
                                    <p className="font-medium text-gray-900">
                                        Visa &middot;&middot;&middot;&middot; 4242
                                    </p>
                                </div>
                                <div className="rounded-lg border border-gray-200 p-3">
                                    <p className="text-sm text-gray-500">Total spent</p>
                                    <p className="font-medium text-gray-900">$144.00</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-shadow hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold text-gray-900">
                                Billing History
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="divide-y divide-gray-100">
                                {[
                                    { date: "Apr 1, 2026", amount: "$12.00", status: "Paid" },
                                    { date: "Mar 1, 2026", amount: "$12.00", status: "Paid" },
                                    { date: "Feb 1, 2026", amount: "$12.00", status: "Paid" },
                                    { date: "Jan 1, 2026", amount: "$12.00", status: "Paid" },
                                ].map((invoice) => (
                                    <div
                                        key={invoice.date}
                                        className="flex items-center justify-between py-3"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                Pro Plan — Monthly
                                            </p>
                                            <p className="text-xs text-gray-500">{invoice.date}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium text-gray-900">
                                                {invoice.amount}
                                            </span>
                                            <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                                                {invoice.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Preferences tab */}
            {activeTab === "preferences" && (
                <div className="space-y-6">
                    <Card className="transition-shadow hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold text-gray-900">
                                Regional Settings
                            </CardTitle>
                            <CardDescription>
                                Configure currency, language, and timezone
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700">
                                        Currency
                                    </label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <select className="flex h-9 w-full appearance-none rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                                            <option>USD ($)</option>
                                            <option>EUR (€)</option>
                                            <option>GBP (£)</option>
                                            <option>JPY (¥)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700">
                                        Language
                                    </label>
                                    <select className="flex h-9 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                                        <option>English</option>
                                        <option>Spanish</option>
                                        <option>French</option>
                                        <option>German</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700">
                                        Timezone
                                    </label>
                                    <select className="flex h-9 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                                        <option>UTC-5 (Eastern Time)</option>
                                        <option>UTC-6 (Central Time)</option>
                                        <option>UTC-7 (Mountain Time)</option>
                                        <option>UTC-8 (Pacific Time)</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700">
                                        Date Format
                                    </label>
                                    <select className="flex h-9 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                                        <option>MM/DD/YYYY</option>
                                        <option>DD/MM/YYYY</option>
                                        <option>YYYY-MM-DD</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                                    <Save className="h-4 w-4" />
                                    Save Preferences
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-shadow hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold text-gray-900">
                                Appearance
                            </CardTitle>
                            <CardDescription>
                                Customize the look and feel of your dashboard
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p className="text-sm font-medium text-gray-700">Theme</p>
                                <div className="flex gap-3">
                                    {[
                                        { label: "Light", active: true },
                                        { label: "Dark", active: false },
                                        { label: "System", active: false },
                                    ].map((theme) => (
                                        <button
                                            key={theme.label}
                                            className={cn(
                                                "rounded-lg border px-6 py-3 text-sm font-medium transition-colors",
                                                theme.active
                                                    ? "border-blue-600 bg-blue-50 text-blue-700"
                                                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                                            )}
                                        >
                                            {theme.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-shadow hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold text-gray-900">
                                Data & Privacy
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <button className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                                    Export All Data
                                </button>
                                <button className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                                    Download Transaction History
                                </button>
                                <button className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                                    Privacy Policy
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
