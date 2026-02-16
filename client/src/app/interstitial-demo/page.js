"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import { InterstitialAd } from "@/components/AdSlots";

export default function InterstitialDemoPage() {
  const [seconds, setSeconds] = useState(3);
  const [simulateRedirect, setSimulateRedirect] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [stats, setStats] = useState({
    ctr: 3.2,
    revenue: 15.8,
    usersReached: 12500
  });

  useEffect(() => {
    if (seconds > 0 && simulateRedirect) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else if (seconds === 0 && simulateRedirect) {
      // Redirect simulation complete
      setTimeout(() => {
        setSimulateRedirect(false);
        setSeconds(3);
      }, 1000);
    }
  }, [seconds, simulateRedirect]);

  const startDemo = () => {
    setShowAd(true);
    setSimulateRedirect(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      
      {/* Interstitial Ad Demo */}
      {showAd && simulateRedirect && (
        <InterstitialAd duration={seconds} />
      )}

      <main className="container mx-auto px-4 py-16 md:py-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge tone="sky" className="mb-6 animate-slide-up">
            ⚡ Light Interstitial Demo
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Fast, Transparent
            </span>
            <span className="block mt-2">Redirect Monetization</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Experience our optional light interstitial (0-2 seconds) that balances user experience
            with sustainable monetization.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Demo Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 shadow-2xl border-0">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold">Live Demo</h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Experience the interstitial flow
                  </p>
                </div>
                <Badge tone={simulateRedirect ? "red" : "emerald"}>
                  {simulateRedirect ? "Redirecting..." : "Ready"}
                </Badge>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-bold">Redirect Timer</div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {seconds}s
                    </div>
                  </div>
                  
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: "100%" }}
                      animate={{ width: `${(seconds / 3) * 100}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Destination: <span className="font-semibold">https://example.com/product-demo</span>
                  </p>
                </div>

                {!simulateRedirect ? (
                  <Button 
                    onClick={startDemo}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 text-lg font-semibold rounded-xl"
                  >
                    🚀 Start Demo Redirect
                  </Button>
                ) : (
                  <Button 
                    onClick={() => {
                      setSimulateRedirect(false);
                      setSeconds(3);
                      setShowAd(false);
                    }}
                    variant="secondary"
                    className="w-full py-4 text-lg font-semibold rounded-xl"
                  >
                    ⏹️ Stop Demo
                  </Button>
                )}

                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge tone="amber">Ad Placement</Badge>
                    <div className="text-sm font-bold">Sponsored Content Area</div>
                  </div>
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-3">📢</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Your ad content appears here</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        Recommended: Native content ads
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    This space shows how sponsored content integrates seamlessly during the brief redirect.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Stats & Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Why Light Interstitials?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold">Better User Experience</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      0-2 second delay vs. 5-10 seconds on traditional platforms
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-400">💰</span>
                  </div>
                  <div>
                    <div className="font-semibold">Sustainable Revenue</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Higher CTR with less intrusive ads
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 dark:text-purple-400">⚙️</span>
                  </div>
                  <div>
                    <div className="font-semibold">Customizable</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Adjust timing, frequency, and ad types per campaign
                    </p>
                  </div>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Performance Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Click-Through Rate</span>
                    <span className="text-sm font-bold text-green-600">{stats.ctr}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                      style={{ width: `${stats.ctr}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Avg. Revenue per 1K Clicks</span>
                    <span className="text-sm font-bold text-blue-600">${stats.revenue}</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      style={{ width: `${(stats.revenue / 30) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Users Reached (Monthly)</span>
                    <span className="text-sm font-bold text-purple-600">{stats.usersReached.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${(stats.usersReached / 50000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl">🚫</span>
                </div>
                <div>
                  <h4 className="font-bold">Premium Users Skip Ads</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Upgrade to Pro or Business plans for ad-free redirects
                  </p>
                </div>
              </div>
              <Button 
                variant="secondary" 
                className="w-full mt-4"
                onClick={() => window.location.href = '/pricing'}
              >
                View Premium Plans →
              </Button>
            </Card>
          </motion.div>
        </div>

        {/* Comparison Table */}
        <div className="mt-16">
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-8 text-center">Comparison: Light vs Traditional Interstitials</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-6">Feature</th>
                    <th className="text-left py-4 px-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                      <div className="font-bold">SlightURL Light</div>
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">0-2 seconds</div>
                    </th>
                    <th className="text-left py-4 px-6">
                      <div className="font-bold">Traditional</div>
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">5-10 seconds</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-4 px-6 font-medium">Redirect Speed</td>
                    <td className="py-4 px-6">
                      <Badge tone="emerald">Instant - 2s</Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge tone="red">5s - 10s</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-4 px-6 font-medium">User Experience</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                        <span>Excellent</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <span>Poor</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-4 px-6 font-medium">Ad CTR</td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-green-600">3.2%</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-red-600">0.8%</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">Premium Option</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                        <span>Available</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-400 rounded-full" />
                        <span>Rarely</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}