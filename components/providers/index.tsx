"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthModal } from "../landing/auth-modal";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const handleSessionExpired = () => setShowAuthModal(true);
    window.addEventListener("session-expired", handleSessionExpired);
    return () =>
      window.removeEventListener("session-expired", handleSessionExpired);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors duration={3000} closeButton />
      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        defaultMode="login"
      />
      {children}
    </QueryClientProvider>
  );
}
