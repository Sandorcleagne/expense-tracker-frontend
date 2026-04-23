import { LandingHeader } from "./landing-header";
import { HeroSection } from "./hero-section";
import { FeaturesSection } from "./features-section";
import { StatsSection } from "./stats-section";
import { HowItWorksSection } from "./how-it-works-section";
import { TestimonialsSection } from "./testimonials-section";
import { PricingSection } from "./pricing-section";
import { CtaSection } from "./cta-section";
import { LandingFooter } from "./landing-footer";

export function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <LandingHeader />
            <HeroSection />
            <FeaturesSection />
            <StatsSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <PricingSection />
            <CtaSection />
            <LandingFooter />
        </div>
    );
}
