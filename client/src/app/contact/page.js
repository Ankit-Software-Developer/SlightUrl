import { Mail, Globe, Users, Clock, Shield, CheckCircle } from "lucide-react";
import { AdPlacement } from "@/components/AdSlots";
import Navbar from "@/components/Navbar";
import Badge from "@/components/Badge";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";

// Import client component
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact SlightURL - Support, Partnerships & Enterprise Inquiries",
  description:
    "Get in touch with the SlightURL team. Contact us for support, partnership opportunities, enterprise pricing, and general inquiries. We typically respond within 24 hours.",
  keywords:
    "contact SlightURL, URL shortener support, partnership inquiries, enterprise pricing, contact form",
  openGraph: {
    title: "Contact SlightURL - Support & Partnerships",
    description:
      "Get in touch with our team for support, partnerships, and enterprise solutions.",
    url: "https://slighturl.com/contact",
    siteName: "SlightURL",
    images: [
      {
        url: "https://slighturl.com/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Contact SlightURL Support",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://slighturl.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="SlightURL Team" />
        <link rel="canonical" href="https://slighturl.com/contact" />
      </Head>

      {/* BreadcrumbList Structured Data */}
      <Script
        id="contact-breadcrumb-data"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://slighturl.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Contact",
              item: "https://slighturl.com/contact",
            },
          ],
        })}
      </Script>

      {/* ContactPage Structured Data */}
      <Script
        id="contact-page-data"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact SlightURL",
          description: "Contact page for SlightURL support and inquiries",
          url: "https://slighturl.com/contact",
          mainEntity: {
            "@type": "Organization",
            name: "SlightURL",
            email: "support@slighturl.com",
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: "support@slighturl.com",
                availableLanguage: ["English"],
              },
              {
                "@type": "ContactPoint",
                contactType: "partnerships",
                email: "partnerships@slighturl.com",
                availableLanguage: ["English"],
              },
              {
                "@type": "ContactPoint",
                contactType: "enterprise",
                email: "enterprise@slighturl.com",
                availableLanguage: ["English"],
              },
            ],
          },
        })}
      </Script>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Navbar />

        <main className="container mx-auto px-4 py-12 md:py-16">
          {/* Hero Section - Simplified claims for AdSense compliance */}
          <header className="text-center max-w-3xl mx-auto mb-10">
            <Badge tone="sky" className="mb-4">
              Contact Us
            </Badge>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
              Get in Touch with Our Team
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300">
              Have questions about our platform? Need help with a link?
              Interested in working together? We're here to help.
            </p>
          </header>

          {/* Ad Placement 1 - Clearly labeled */}
          <section aria-label="Advertisement" className="mb-10">
            <div className="text-xs text-gray-400 mb-2 text-center">
              ADVERTISEMENT
            </div>
            <AdPlacement position="Contact Page Top" size="728x90" />
          </section>

          {/* Main Contact Form Section */}
          <section aria-labelledby="contact-form-heading" className="mb-10">
            <h2
              id="contact-form-heading"
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Send Us a Message
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-1">
                <ContactForm />
              </div>

              {/* Sidebar with additional info */}
              <aside className="lg:col-span-1 space-y-6">
                {/* Quick Help Section */}
                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>Before You Contact Us</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    For faster assistance, check these resources first:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/faq"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        • Frequently Asked Questions
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/help"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        • Help Center
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/privacy"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        • Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </Card>

                {/* Trust Indicators - No exaggerated claims */}
                <Card className="p-6 bg-blue-50 dark:bg-gray-800 border border-blue-100 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span>Our Commitment</span>
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>
                        We respect your privacy and never share your information
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>
                        Your data is protected with industry-standard security
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>We respond to all legitimate inquiries</span>
                    </li>
                  </ul>
                </Card>

                {/* Ad Placement 2 - Sidebar ad */}
                <div>
                  <div className="text-xs text-gray-400 mb-2">
                    ADVERTISEMENT
                  </div>
                  <AdPlacement position="Contact Sidebar" size="300x250" />
                </div>
              </aside>
            </div>
          </section>

          {/* Ad Placement 3 - Bottom ad */}
          <section aria-label="Advertisement" className="mb-10">
            <div className="text-xs text-gray-400 mb-2 text-center">
              ADVERTISEMENT
            </div>
            <AdPlacement position="Contact Page Bottom" size="728x90" />
          </section>

          {/* FAQ Section - Adds SEO value */}
          <section aria-labelledby="faq-heading" className="mt-16">
            <h2
              id="faq-heading"
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center"
            >
              Frequently Asked Questions
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  How quickly do you respond?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  We aim to respond to general inquiries within 1-2 business
                  days. Partnership and enterprise inquiries may take 3-5
                  business days.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Do you offer phone support?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Currently, we provide support via email only. For urgent
                  matters, please mark your email as "URGENT" in the subject
                  line.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Can I request a feature?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Yes! We welcome feature suggestions. Please include "Feature
                  Request" in your email subject line.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Do you have a phone number?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  We operate as a digital-first company and currently offer
                  email support only. This helps us keep our service free and
                  respond efficiently.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Info Cards - Simplified and honest */}
          <section
            aria-label="Contact Information"
            className="grid md:grid-cols-3 gap-6 m-10"
          >
            {/* General Inquiries */}
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  General Support
                </h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                For questions about using SlightURL
              </p>
              <a
                href="mailto:support@slighturl.com"
                className="text-blue-600 dark:text-blue-400 text-sm break-all hover:underline"
                rel="nofollow"
              >
                support@slighturl.com
              </a>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Response within 1-2 business days
              </p>
            </Card>

            {/* Partnerships */}
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                </div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Partnerships
                </h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Collaboration and sponsorship opportunities
              </p>
              <a
                href="mailto:partnerships@slighturl.com"
                className="text-purple-600 dark:text-purple-400 text-sm break-all hover:underline"
                rel="nofollow"
              >
                partnerships@slighturl.com
              </a>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                We'll respond within 3-5 business days
              </p>
            </Card>

            {/* Enterprise */}
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-green-600 dark:text-green-300" />
                </div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Enterprise
                </h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Custom solutions for businesses
              </p>
              <a
                href="mailto:enterprise@slighturl.com"
                className="text-green-600 dark:text-green-400 text-sm break-all hover:underline"
                rel="nofollow"
              >
                enterprise@slighturl.com
              </a>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Dedicated support for business clients
              </p>
            </Card>
          </section>
          {/* Stats Section - REMOVED exaggerated claims */}
          {/* The stats section with "$1M+ Revenue Shared" and "150+ Active Partners" 
              has been removed as it could be seen as misleading or unverifiable */}

          {/* Alternative: Simple trust building without numbers */}
          <section className="mt-12 text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              We're Here to Help
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
              Whether you're a user with a question, a potential partner, or
              just curious about our platform — we'd love to hear from you.
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>✓ No spam</span>
              <span>✓ Privacy respected</span>
              <span>✓ We read every message</span>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
