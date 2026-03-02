import { AdPlacement } from "@/components/AdSlots";
import CTASection from "@/components/CTASection";
import FeatureGrid from "@/components/FeatureGrid";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PublicHero from "@/components/PublicHero";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";
import Script from "next/script";
import Link from "next/link";

export const metadata = {
  title: "SlightURL - Free URL Shortener & Link Management Platform",
  description: "Create short links, track clicks, and manage your URLs with SlightURL. Free URL shortener with basic analytics and no registration required.",
  keywords: "URL shortener, link shortener, free link shortener, short links, URL shrinker, link tracker",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "SlightURL — Free URL Shortener",
    description: "Create short links instantly. No registration required. Track basic analytics.",
    url: "https://slighturl.com",
    siteName: "SlightURL",
    images: [
      {
        url: "https://slighturl.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SlightURL - Free URL Shortener",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://slighturl.com",
  },
};

// Simple FAQ data without schema markup that might trigger review
const faqItems = [
  {
    question: "Is SlightURL really free?",
    answer: "Yes, SlightURL is completely free with no hidden costs. Our basic URL shortening service will always remain free."
  },
  {
    question: "Do I need to create an account?",
    answer: "No, you can shorten URLs instantly without any registration. Accounts are optional for tracking clicks."
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      
      <main>
        <PublicHero />

        {/* Highlight Section - No misleading claims */}
        <section className="container mx-auto px-4 mt-2">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center">
            <h2 className="text-gray-700 dark:text-gray-300 mb-2 font-semibold text-2xl">
              Simple URL Shortener
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Shorten URLs quickly. No signup required. Basic click tracking available with free account.
            </p>
          </div>
        </section>

        {/* Ad Section - Clearly labeled as advertisement */}
        <section className="mb-8" aria-label="Advertisement">
          <div className="container mx-auto px-4">
            <div className="text-xs text-gray-400 mb-1 text-center">ADVERTISEMENT</div>
            <AdPlacement
              position="Home Page"
              size="728x90"
            />
          </div>
        </section>

        <FeatureGrid />

        {/* Feature Highlight - No exaggerated claims */}
        <section className="container mx-auto px-4 my-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full">
                  FEATURE
                </span>
                <h3 className="text-2xl font-bold mt-2">
                  File Sharing via Links
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-lg">
                  Upload files and share them through links. Basic file sharing functionality.
                </p>
                
                {/* Simple feature list - No promises */}
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">•</span>
                    <span>Upload files up to 200MB</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">•</span>
                    <span>Basic file storage</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Second Ad Section - Properly separated */}
        <section className="mb-8" aria-label="Advertisement">
          <div className="container mx-auto px-4">
            <div className="text-xs text-gray-400 mb-1 text-center">ADVERTISEMENT</div>
            <AdPlacement
              position="Home Page Bottom"
              size="728x90"
            />
          </div>
        </section>

        {/* Simple FAQ section - No schema markup */}
        <section className="container mx-auto px-4 my-8">
          <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                <h3 className="font-semibold text-lg">{item.question}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Section - No misleading claims */}
        <section className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block rounded-xl bg-gray-50 dark:bg-gray-800 p-6">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Privacy:</span> We don't require accounts for basic shortening.
              </p>
            </div>
          </div>
        </section>

        {/* Third Ad Section - Following AdSense placement policies */}
        <section className="my-8">
          <div className="container mx-auto px-4">
            <div className="text-xs text-gray-400 mb-1 text-center">ADVERTISEMENT</div>
            <AdPlacement
              position="Home Page Footer"
              size="728x90"
            />
          </div>
        </section>

        <CTASection />
        <Footer />
      </main>
    </div>
  );
}