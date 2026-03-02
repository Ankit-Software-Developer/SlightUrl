import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { PublicAdBanner } from "@/components/AdSlots";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";

export const metadata = {
  title: "About SlightURL - Free URL Shortener & Link Management Platform",
  description: "Learn about SlightURL, a reliable URL shortening platform built for individuals, teams, and developers. Create short links, share files, and manage URLs with transparency.",
  keywords: "about SlightURL, URL shortener about, link management platform, free URL shortener, about us",
  openGraph: {
    title: "About SlightURL - Free URL Shortener & Link Management",
    description: "Learn about SlightURL, a reliable URL shortening platform built for individuals, teams, and developers.",
    url: "https://slighturl.com/about",
    siteName: "SlightURL",
    images: [
      {
        url: "https://slighturl.com/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "About SlightURL - Free URL Shortener",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://slighturl.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="SlightURL Team" />
        <link rel="canonical" href="https://slighturl.com/about" />
      </Head>

      {/* BreadcrumbList Structured Data - Compliant with Google policies */}
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://slighturl.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "About",
              "item": "https://slighturl.com/about"
            }
          ]
        })}
      </Script>

      {/* AboutPage Structured Data - Simple and compliant */}
      <Script
        id="about-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About SlightURL",
          "description": "Learn about SlightURL, a reliable URL shortening platform built for individuals, teams, and developers.",
          "url": "https://slighturl.com/about",
          "mainEntity": {
            "@type": "Organization",
            "name": "SlightURL",
            "url": "https://slighturl.com",
            "logo": "https://slighturl.com/logo.png",
            "sameAs": [
              "https://twitter.com/slighturl",
              "https://linkedin.com/company/slighturl"
            ]
          }
        })}
      </Script>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Navbar />
        
        <main className="mx-auto max-w-6xl px-4 py-12">
          {/* Header Section with proper heading hierarchy */}
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                About SlightURL
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                A modern URL shortening platform built for reliability, scale,
                and meaningful insights — trusted by teams and developers worldwide.
              </p>
            </div>
            <Badge tone="emerald" aria-label="Platform status: Built for Scale">
              Built for Scale
            </Badge>
          </header>

          {/* Ad Banner - Clearly labeled for AdSense compliance */}
          <section aria-label="Advertisement" className="my-8">
            <div className="text-xs text-gray-400 mb-2 text-center">ADVERTISEMENT</div>
            <PublicAdBanner />
          </section>

          {/* Main Content Grid */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* What We Do Section */}
            <article className="h-full">
              <Card className="p-6 h-full">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  What We Do
                </h2>
                <div className="mt-4 space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    SlightURL helps individuals, teams, and developers create clean,
                    short links and share files instantly. There are no limits on
                    link creation, no forced signups for basic use, and no unnecessary
                    complexity.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Whether you are sharing a URL, distributing a file, or managing
                    links from a dashboard, SlightURL keeps the experience fast
                    and predictable.
                  </p>
                </div>
              </Card>
            </article>

            {/* Built for Reliability Section */}
            <article className="h-full">
              <Card className="p-6 h-full">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Built for Reliability
                </h2>
                <div className="mt-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Every link is served over HTTPS and optimized for quick redirects.
                    We focus on stability, performance, and transparent behavior —
                    links resolve immediately without unnecessary delays or surprises.
                  </p>
                  
                  {/* Trust indicators - No exaggerated claims */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="font-semibold text-gray-900 dark:text-white">HTTPS</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Secure by default</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="font-semibold text-gray-900 dark:text-white">99.5%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
                    </div>
                  </div>
                </div>
              </Card>
            </article>
          </div>

          {/* Second Row */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* For Developers Section */}
            <article className="h-full">
              <Card className="p-6 h-full">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  For Developers & Builders
                </h2>
                <div className="mt-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    SlightURL is designed with developers in mind. The dashboard
                    provides clear link management and analytics. Future updates will
                    include API access for programmatic link creation and integration
                    into your own products.
                  </p>
                  
                  {/* Feature list - Clear and honest */}
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-blue-500">•</span>
                      <span>REST API (Coming Soon)</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-blue-500">•</span>
                      <span>Analytics Dashboard</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-blue-500">•</span>
                      <span>Link Management Tools</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </article>

            {/* Growing Carefully Section */}
            <article className="h-full">
              <Card className="p-6 h-full">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Growing Carefully
                </h2>
                <div className="mt-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We believe core tools like link sharing should remain accessible.
                    SlightURL starts simple and free, with features added thoughtfully
                    over time — always prioritizing usability, clarity, and user trust.
                  </p>
                  
                  {/* Values - Simple and honest */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                      Transparent
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                      Accessible
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                      Reliable
                    </span>
                  </div>
                </div>
              </Card>
            </article>
          </div>

          {/* Monetization Section - With proper disclaimers for AdSense */}
          <div className="mt-6">
            <article className="relative overflow-hidden">
              <Card className="p-6">
                {/* Coming Soon Badge */}
                <div className="absolute top-4 right-4">
                  <Badge tone="amber">Coming Soon</Badge>
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Future Monetization Plans
                </h2>

                <div className="mt-4 max-w-3xl">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We are exploring ways to help creators earn from their traffic.
                    Any future monetization features will be:
                  </p>
                  
                  <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Transparent about how earnings are calculated</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Clearly labeled and optional to use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Compliant with advertising policies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Designed to maintain user experience</span>
                    </li>
                  </ul>

                  {/* Important disclaimer for AdSense compliance */}
                  <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>Note:</strong> Monetization features are in development. 
                      Any earnings program will have clear terms and conditions. 
                      We do not guarantee specific earnings and will never incentivize 
                      invalid traffic or clicks.
                    </p>
                  </div>

                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    Monetization tools, when available, will include detailed 
                    analytics and transparent tracking. All features will comply 
                    with applicable policies and regulations.
                  </p>
                </div>
              </Card>
            </article>
          </div>

          {/* FAQ Section - Adds SEO value without risking AdSense */}
          <section className="mt-12" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Is SlightURL really free?</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                  Yes, our basic URL shortening service is completely free. We may offer 
                  premium features in the future, but core functionality will remain free.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Do I need an account?</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                  No, you can create short links without an account. Accounts are optional 
                  and provide additional features like link management and analytics.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">How do you make money?</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                  We display non-intrusive advertisements and may offer premium features 
                  in the future. We never sell user data or engage in deceptive practices.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Are my links private?</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                  Links are public by default. We collect basic analytics but do not 
                  track personal information. See our Privacy Policy for details.
                </p>
              </div>
            </div>
          </section>

          {/* Contact CTA - Required for AdSense */}
          <section className="mt-12 text-center bg-blue-50 dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Have Questions?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              We're here to help. Contact our team for support, partnership inquiries, 
              or any questions about our platform.
            </p>
            <Link 
              href="/contact" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              aria-label="Contact SlightURL support"
            >
              Contact Us
            </Link>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}