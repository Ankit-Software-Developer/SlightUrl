import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { PublicAdBanner } from "@/components/AdSlots";

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">About slightURL</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              A modern URL shortening platform built for reliability, scale,
              and meaningful insights — trusted by teams and developers.
            </p>
          </div>
          <Badge tone="emerald">Built for Scale</Badge>
        </div>

        <PublicAdBanner />

       <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-extrabold">What We Do</h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-200">
              slightURL helps individuals, teams, and developers create clean,
              short links and share files instantly. There are no limits on
              link creation, no forced signups for basic use, and no unnecessary
              complexity.
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-200">
              Whether you are sharing a URL, distributing a file, or managing
              links from a dashboard, slightURL keeps the experience fast
              and predictable.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-extrabold">Built for Reliability</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              Every link is served over HTTPS and optimized for quick redirects.
              We focus on stability, performance, and transparent behavior —
              links resolve immediately without unnecessary delays or surprises.
            </p>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-extrabold">For Developers & Builders</h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-200">
              slightURL is designed with developers in mind. The dashboard
              provides clear link management and analytics, and future API
              access will allow programmatic link creation, automation,
              and integration into your own products.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-extrabold">Growing Carefully</h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-200">
              We believe core tools like link sharing should remain accessible.
              slightURL starts simple and free, with features added thoughtfully
              over time — always prioritizing usability, clarity, and user trust.
            </p>
          </Card>
          <div className="mt-6">
  <Card className="p-6 relative overflow-hidden">
    {/* Coming Soon Badge */}
    <div className="absolute top-4 right-4">
      <Badge tone="amber">Coming Soon</Badge>
    </div>

    <h2 className="text-lg font-extrabold">Earn From Your Links</h2>

    <p className="mt-3 text-sm text-slate-600 dark:text-slate-200">
      Soon, slightURL will introduce a simple earning model for creators and
      publishers. For every <span className="font-semibold">1,000 valid clicks</span>,
      you will earn <span className="font-semibold">$1</span>.
    </p>

    <p className="mt-2 text-sm text-slate-600 dark:text-slate-200">
      This feature is designed to reward quality traffic while maintaining a
      clean and fast user experience. Detailed analytics and transparent
      tracking will ensure fairness and clarity for all users.
    </p>

    <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
      Monetization tools, payout dashboards, and performance insights will be
      available in an upcoming update.
    </div>
  </Card>
</div>

        </div>

      </main>
      <Footer />
    </div>
  );
}