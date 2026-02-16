"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Button from "./Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
              <div className="relative h-10 w-10 grid place-items-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold text-xl">
                S
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SlightURL
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Short links, big insights
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {["Home", "About", "Contact", "dev"].map((item, i) => (
              <Link
                key={i}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors group"
              >
                {item === "dev" ? "Developer" : item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-[80%]">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col px-6 py-6 space-y-5">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Home
              </p>
            </Link>

            <Link href="/about" onClick={() => setMobileOpen(false)}>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                About
              </p>
            </Link>

            <Link href="/contact" onClick={() => setMobileOpen(false)}>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Contact
              </p>
            </Link>

            <Link href="/dev" onClick={() => setMobileOpen(false)}>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Developers
              </p>
            </Link>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
              <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full">
                  Log in
                </Button>
              </Link>

              <Link href="/auth/signup" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
