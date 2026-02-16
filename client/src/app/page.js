import { AdPlacement } from "@/components/AdSlots";
import CTASection from "@/components/CTASection";
import FeatureGrid from "@/components/FeatureGrid";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PublicHero from "@/components/PublicHero";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";

export const metadata = {
  title: "SlightURL — Free URL Shortener & File Sharing Platform",
  description:
    "Create short links and share files instantly. No registration required. Track links, manage files, and share securely — completely free.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      <PublicHero />

      {/* Highlight Section */}
      <div className="container mx-auto px-4 mt-2">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">
            🚀 Simple. Fast. Free.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Shorten URLs or upload files and share them instantly using a single
            link — no signup required.
          </p>
        </div>
      </div>
      <div className="mb-8">
        <AdPlacement
          position="Contact Page Top"
          size="728x90"
          recommended="Sponsorship opportunities ad"
        />
      </div>
      <StatsSection />
      <div className="mb-8">
        <AdPlacement
          position="Contact Page Top"
          size="728x90"
          recommended="Sponsorship opportunities ad"
        />
      </div>
      <FeatureGrid />
      {/* Feature Highlight */}
      <div className="container mx-auto px-4 my-8">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full">
                NEW
              </span>
              <h3 className="text-xl font-bold mt-2">
                File Sharing via Short Links
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Upload a file, generate a link, and share it instantly.
                Downloads work without login.
              </p>
            </div>
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              Secure • Fast • Unlimited
            </span>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <AdPlacement
          position="Contact Page Top"
          size="728x90"
          recommended="Sponsorship opportunities ad"
        />
      </div>

      <Testimonials />

      {/* Trust Section */}
      <div className="container mx-auto px-4 my-12">
        <div className="text-center">
          <div className="inline-block rounded-xl bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-900/20 dark:to-sky-900/20 p-1">
            <div className="rounded-lg bg-white dark:bg-gray-900 px-6 py-4">
              <p className="text-gray-700 dark:text-gray-300">
                🔒 <span className="font-semibold">Privacy First:</span> No
                forced accounts. No tracking abuse.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                Your links and files stay fast, simple, and accessible.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <AdPlacement
          position="Contact Page Top"
          size="728x90"
          recommended="Sponsorship opportunities ad"
        />
      </div>
      <CTASection />

      <Footer />
    </div>
  );
}
