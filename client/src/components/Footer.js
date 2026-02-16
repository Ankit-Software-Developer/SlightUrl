import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-extrabold tracking-tight">
              slightURL
            </div>
            <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-300">
              A fast, reliable URL shortener with powerful analytics, custom
              aliases, and developer-friendly APIs. Built for scale.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-slate-600 dark:text-slate-200">
            <Link
              href="/about"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              About
            </Link>
            {/* <Link
              href="/pricing"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Pricing
            </Link> */}
            <Link
              href="/dev"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              API Docs
            </Link>
            <Link
              href="/contact"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Contact
            </Link>
          
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} slightURL. All rights reserved.
          </span>
          <span className="opacity-80">
            Fast • Secure • Developer-friendly
          </span>
        </div>
      </div>
    </footer>
  );
}