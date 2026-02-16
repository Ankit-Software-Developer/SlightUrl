import Card from "./Card";
import Badge from "./Badge";

const FEATURES = [
  {
    title: "Unlimited Short Links",
    desc: "Create as many short URLs as you want with fast, reliable redirects.",
    tag: "Free",
    tone: "emerald",
  },
  {
    title: "Simple & Fast Redirects",
    desc: "Optimized global redirect infrastructure for low latency worldwide.",
    tag: "Free",
    tone: "sky",
  },
  {
    title: "Developer API Access",
    desc: "Programmatically create and manage short links using secure API tokens.",
    tag: "Free",
    tone: "rose",
  },
  {
    title: "Link Analytics & Tracking",
    desc: "Track clicks, referrers, devices, locations, and performance over time.",
    // tag: "Pro",
    tag: "Free",
    tone: "amber",
  },
  {
    title: "Custom aliases",
    desc: "Use your own aliases for trusted, professional-looking short links.",
    // tag: "Pro",
    tag: "Free",
    tone: "emerald",
  },
  {
    title: "Exports & Advanced Controls",
    desc: "Export analytics, manage links in bulk, and unlock advanced settings.",
    // tag: "Business",
    tag: "Free",
    tone: "rose",
  },
];

export default function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            Powerful link shortening for everyone
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
            Start free with unlimited links. Upgrade for insights, branding, and
            control.
          </p>
        </div>
        <Badge tone="slate">Fast • Secure • Scalable</Badge>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <Card key={f.title} className="p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-extrabold">{f.title}</h3>
              <Badge tone={f.tone}>{f.tag}</Badge>
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              {f.desc}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
