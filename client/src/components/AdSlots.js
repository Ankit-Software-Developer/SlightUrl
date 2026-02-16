"use client";

import { useState } from "react";

// AD PLACEMENT COMPONENTS

export function PublicAdBanner() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="container mx-auto px-4 my-8">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-xl">
              <span className="text-amber-600 dark:text-amber-300 text-2xl">💰</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  ADVERTISEMENT
                </span>
                <span className="text-sm text-amber-600 dark:text-amber-400">Earning opportunity</span>
              </div>
              <h3 className="text-xl font-bold mt-1">Monetize Your Links</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Place non-intrusive ads on your dashboard and public pages
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow">
              Learn More
            </button>
            <button
              onClick={() => setClosed(true)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Close ad"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SidebarAd() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 my-4 border border-gray-200 dark:border-gray-700">
      <div className="text-center">
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full">
          SPONSORED
        </span>
        <div className="mt-4 h-[250px] w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
          {/* Replace this with actual ad */}
          <div className="text-center">
            <div className="text-3xl mb-2">📢</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Ad Space</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">300x250</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Ad supports free tier users
        </p>
      </div>
    </div>
  );
}

export function InterstitialAd({ duration = 2 }) {
  const [visible, setVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(duration);

  useState(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md mx-4 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl">
          ⏳
        </div>
        <h3 className="text-2xl font-bold mb-4">Redirecting...</h3>
        <div className="mb-6">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
              style={{ width: `${(timeLeft / duration) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Ad supports free link shortening
          </p>
        </div>
        
        {/* Ad Content */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            This is where your sponsored content or AdSense ad would appear
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold">
            Learn More
          </button>
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Premium users skip ads • Redirecting in {timeLeft}s
        </p>
      </div>
    </div>
  );
}

// Mark ad placements in code
export function AdPlacement({ position, size, recommended = "AdSense" }) {
  return (
    <div className="relative my-8">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          AD PLACEMENT
        </span>
      </div>
      <div className="border-2 border-dashed border-red-300 dark:border-red-700 rounded-xl p-8 text-center bg-red-50/50 dark:bg-red-900/10">
        <div className="text-red-600 dark:text-red-400 mb-2">
          <span className="text-lg">📢</span>
          <span className="font-semibold ml-2">Position: {position}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Recommended: {size} • {recommended}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          {/* AD PLACEMENT COMMENT */}
          {/* Replace this entire div with your ad code (AdSense, Media.net, etc.) */}
          {/* Example: <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXX" crossorigin="anonymous"></script> */}
        </p>
      </div>
    </div>
  );
}