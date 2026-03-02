import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "SlightURL - Free URL Shortener",
    template: "%s | SlightURL",
  },
  description:
    "Free URL shortener service. Create short links instantly. No registration required for basic shortening.",
  keywords: "URL shortener, link shortener, free link shortener, short links",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    url: "https://slighturl.com",
    siteName: "SlightURL",
    title: "SlightURL — Free URL Shortener",
    description: "Create short links instantly. No registration required.",
    images: [
      {
        url: "https://slighturl.com/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "SlightURL - Free URL Shortener",
      },
    ],
  },
  alternates: {
    canonical: "https://slighturl.com",
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-icon.png" }],
  },
 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#3b82f6" />
        {/* Add this script to prevent FOUC (Flash of Unstyled Content) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('slight_theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = saved || (systemPrefersDark ? 'dark' : 'light');
                  
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
