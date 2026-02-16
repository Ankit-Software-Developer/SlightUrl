"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("slight_theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = saved || (systemPrefersDark ? "dark" : "light");
    
    setDark(initialTheme === "dark");
    updateTheme(initialTheme === "dark");
  }, []);

  const updateTheme = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  function toggle() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("slight_theme", next ? "dark" : "light");
    updateTheme(next);
  }

  if (!mounted) {
    // Return a placeholder that matches the size
    return (
      <button className="relative w-14 h-8 bg-gray-200 dark:bg-gray-800 rounded-full p-1">
        <div className="w-6 h-6 bg-white dark:bg-gray-900 rounded-full" />
      </button>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggle}
      className="relative w-14 h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full p-1 transition-all duration-300"
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ x: dark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-lg flex items-center justify-center"
      >
        {dark ? (
          <span className="text-yellow-300">🌙</span>
        ) : (
          <span className="text-amber-500">☀️</span>
        )}
      </motion.div>
    </motion.button>
  );
}