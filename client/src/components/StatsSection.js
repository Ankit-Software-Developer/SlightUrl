"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const stats = [
  { label: "Links Shortened", value: "10M+", color: "from-blue-500 to-cyan-500" },
  { label: "Active Users", value: "50K+", color: "from-purple-500 to-pink-500" },
  { label: "Revenue Generated", value: "$1M+", color: "from-green-500 to-emerald-500" },
  { label: "Ad CTR", value: "3.2%", color: "from-amber-500 to-orange-500" },
];

// --- helpers ---
function parseTarget(raw) {
  const s = String(raw || "").trim();

  const isMoney = s.includes("$");
  const isPercent = s.includes("%");

  // keep decimal for % like 3.2
  const num = parseFloat(s.replace(/[^0-9.]/g, "")) || 0;

  // detect suffix
  const upper = s.toUpperCase();
  let multiplier = 1;
  if (upper.includes("M")) multiplier = 1_000_000;
  else if (upper.includes("K")) multiplier = 1_000;

  const target = isPercent ? num : num * multiplier;

  return { target, isMoney, isPercent, suffix: upper.includes("M") ? "M" : upper.includes("K") ? "K" : "" };
}

function formatDisplay(value, meta, original) {
  // For percent: show 1 decimal max
  if (meta.isPercent) {
    const v = Math.min(value, meta.target);
    return `${v.toFixed(meta.target % 1 ? 1 : 0)}%`;
  }

  // For money: keep short like $1,000,000 OR $1M+ style
  // We'll follow original style: if original has M/K -> show 1 decimal only if needed
  let prefix = meta.isMoney ? "$" : "";
  let suffix = original.includes("+") ? "+" : "";

  if (meta.suffix === "M") {
    const v = Math.min(value, meta.target) / 1_000_000;
    return `${prefix}${v.toFixed(v < 10 ? 1 : 0)}M${suffix}`;
  }
  if (meta.suffix === "K") {
    const v = Math.min(value, meta.target) / 1_000;
    return `${prefix}${v.toFixed(v < 10 ? 1 : 0)}K${suffix}`;
  }

  // plain number
  return `${prefix}${Math.floor(Math.min(value, meta.target)).toLocaleString()}${suffix}`;
}

export default function StatsSection() {
  const meta = useMemo(() => stats.map((s) => parseTarget(s.value)), []);
  const [counts, setCounts] = useState(() => stats.map(() => 0));

  useEffect(() => {
    const timers = meta.map((m, idx) => {
      const durationMs = 1200; // total animation time
      const stepMs = 16; // ~60fps
      const steps = Math.max(1, Math.floor(durationMs / stepMs));
      const inc = m.target / steps;

      return setInterval(() => {
        setCounts((prev) => {
          const next = [...prev];
          const nv = next[idx] + inc;
          next[idx] = nv >= m.target ? m.target : nv;
          return next;
        });
      }, stepMs);
    });

    return () => timers.forEach(clearInterval);
  }, [meta]);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Trusted by Thousands Worldwide
          </h2>
          <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Join thousands of creators, marketers, and businesses who trust SlightURL
          </p>
        </motion.div>

        {/* tablet-friendly grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-10 blur-xl rounded-3xl" />
              <div className={`relative bg-gradient-to-br ${stat.color} p-1 rounded-2xl`}>
                <div className="bg-white dark:bg-gray-900 rounded-xl px-5 py-6 lg:px-6 lg:py-7 text-center">
                  {/* number */}
                  <div
                    className={[
                      "font-bold bg-gradient-to-r bg-clip-text text-transparent",
                      stat.color,
                      "leading-none tracking-tight",
                      // clamp fixes 1024/tablet overflow
                      "text-[clamp(1.75rem,2.6vw,3.25rem)]",
                      "whitespace-nowrap",
                    ].join(" ")}
                  >
                    {formatDisplay(counts[index], meta[index], stat.value)}
                  </div>

                  {/* label */}
                  <div className="mt-3 text-sm sm:text-[15px] text-gray-600 dark:text-gray-400 font-medium leading-snug">
                    {stat.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ad placement */}
        {/* <AdPlacement position="After Stats" size="970x250 or 728x90" /> */}
      </div>
    </section>
  );
}
