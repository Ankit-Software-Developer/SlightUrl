import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import PricingCards from "@/components/PricingCards";
import { PublicAdBanner, AdPlacement } from "@/components/AdSlots";
import FAQSection from "@/components/FAQSection";
import EnterpriseSection from "@/components/EnterpriseSection";

export const metadata = {
  title: "SlightURL Pricing — Plans for Every Business Size",
  description: "Choose the perfect plan for your needs. Start free, upgrade as you grow, and unlock premium features.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/10" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Most Popular: Pro Plan
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Simple, Transparent
              </span>
              <span className="block mt-2">Pricing That Scales</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Start for free, upgrade as you grow. All plans include core features with
              responsible monetization options.
            </p>
          </div>
        </div>
      </section>

      {/* AD PLACEMENT 1: Before Pricing Cards */}
      <div className="container mx-auto px-4 mb-8">
        <AdPlacement 
          position="Pricing Page Top" 
          size="728x90" 
          recommended="Premium plan promotion"
        />
      </div>

      {/* Pricing Cards Section */}
      {/* <PricingCards /> */}

      {/* AD PLACEMENT 2: Between Pricing and FAQ */}
      <div className="container mx-auto px-4 my-12">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                SPECIAL OFFER
              </span>
              <h3 className="text-2xl font-bold mt-2">Save 20% on Annual Plans</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Get 2 months free when you choose annual billing
              </p>
            </div>
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow whitespace-nowrap">
              View Annual Pricing →
            </button>
          </div>
        </div>
      </div>

      {/* Enterprise Section */}
      <EnterpriseSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* AD PLACEMENT 3: After FAQ */}
      <div className="container mx-auto px-4 my-12">
        <AdPlacement 
          position="Pricing Page Bottom" 
          size="970x250" 
          recommended="Enterprise solution ad"
        />
      </div>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using SlightURL to shorten,
              track, and monetize their links.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl">
                Start Free Trial
              </button>
              <button className="bg-white/20 text-white hover:bg-white/30 px-8 py-4 text-lg font-semibold rounded-xl border-white/30">
                Schedule Demo
              </button>
            </div>
            <p className="text-white/70 mt-8 text-sm">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}