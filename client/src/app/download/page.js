import { Suspense } from "react";
import DownloadClient from "./DownloadClient";
import { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

export const metadata = {
  title: "Download Files - SlightURL File Sharing Platform",
  description: "Download shared files securely through SlightURL. Fast, reliable file downloads with no registration required. Share and receive files instantly.",
  keywords: "download files, file sharing, secure download, SlightURL download, file transfer, share files online",
  openGraph: {
    title: "Download Files - SlightURL File Sharing",
    description: "Download shared files securely through SlightURL. Fast and reliable file downloads.",
    url: "https://slighturl.com/download",
    siteName: "SlightURL",
    images: [
      {
        url: "https://slighturl.com/download-og.jpg",
        width: 1200,
        height: 630,
        alt: "Download files with SlightURL",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://slighturl.com/download",
  },
};

// Loading fallback component with proper accessibility
function DownloadLoadingFallback() {
  return (
    <div 
      className="min-h-[400px] flex items-center justify-center"
      role="status"
      aria-label="Loading download page"
    >
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Preparing your download...</p>
      </div>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <>
      {/* Breadcrumb Structured Data */}
      <Script
        id="download-breadcrumb-data"
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
              "name": "Download",
              "item": "https://slighturl.com/download"
            }
          ]
        })}
      </Script>

      {/* WebPage Structured Data */}
      <Script
        id="download-page-data"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Download Files - SlightURL",
          "description": "Download shared files securely through SlightURL",
          "url": "https://slighturl.com/download",
          "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "SlightURL File Download",
            "applicationCategory": "Utility",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }
        })}
      </Script>

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        {/* Hidden SEO content for crawlers */}
        <div className="sr-only">
          <h1>Download Files with SlightURL</h1>
          <p>
            SlightURL provides secure and fast file downloads. Share files with anyone 
            using a simple link. No registration required for basic downloads. Files are 
            encrypted and served over HTTPS for your security.
          </p>
        </div>

        {/* Main client component with Suspense */}
        <Suspense fallback={<DownloadLoadingFallback />}>
          <DownloadClient />
        </Suspense>

        {/* SEO Footer Content - Only visible to search engines */}
        <div className="sr-only" aria-hidden="true">
          <div>
            <h2>About SlightURL File Downloads</h2>
            <p>
              SlightURL makes file sharing simple and secure. When you download files 
              through our platform, you get:
            </p>
            <ul>
              <li>Fast download speeds</li>
              <li>Secure HTTPS connections</li>
              <li>No account required for downloads</li>
              <li>Files available for 30 days</li>
              <li>Automatic virus scanning</li>
            </ul>
          </div>
          
          <div>
            <h2>Frequently Asked Questions</h2>
            
            <h3>How do I download a file?</h3>
            <p>Click the download button on the file page. The download will start automatically.</p>
            
            <h3>Do I need an account to download?</h3>
            <p>No, anyone can download files without creating an account.</p>
            
            <h3>How long are files available?</h3>
            <p>Files are typically available for 30 days after upload.</p>
            
            <h3>Is it safe to download files?</h3>
            <p>All files are scanned for viruses. Download over HTTPS for security.</p>
          </div>
        </div>

        {/* Download Policy Notice - Important for legal compliance */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-xs text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-6 mt-6">
            <p className="mb-2">
              By downloading files from SlightURL, you agree to our{" "}
              <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                Privacy Policy
              </Link>.
            </p>
            <p>
              Files are provided "as is" without warranty. SlightURL is not responsible 
              for the content of user-uploaded files. Report inappropriate content to 
              our support team.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}