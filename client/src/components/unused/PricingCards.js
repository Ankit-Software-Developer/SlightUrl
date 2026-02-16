import Card from "./Card";
import Button from "./Button";
import Badge from "./Badge";

const TIERS = [
  {
    name: "Free",
    price: "$0",
    badge: "Start",
    tone: "slate",
    bullets: ["Basic short links", "Limited analytics", "Dashboard ads"],
  },
  {
    name: "Pro (comming soon..)",
    price: "$9",
    badge: "Best value",
    tone: "emerald",
    bullets: ["Custom aliases", "Full analytics", "Click Tracking", "No ads"],
  },
  {
    name: "Business (comming soon..)",
    price: "$29",
    badge: "Teams",
    tone: "sky",
    bullets: ["Full Tracking", "QR codes", "Exports", "No ads"],
  },
];

export default function PricingCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Premium is the best long-term revenue
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
          Ads help you start. Plans help you scale.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {TIERS.map((t) => (
          <Card key={t.name} className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-extrabold">{t.name}</div>
              <Badge tone={t.tone}>{t.badge}</Badge>
            </div>
            <div className="mt-4 flex items-end gap-2">
              <div className="text-4xl font-extrabold">{t.price}</div>
              <div className="pb-1 text-sm text-slate-500 dark:text-slate-300">
                / month
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-200">
              {t.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-0.5">✅</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-6 w-full" disabled={t.name !== "Free"}>
              Choose {t.name}
            </Button>
            {/* <Button variant="secondary" className="mt-2 w-full">View details</Button> */}
          </Card>
        ))}
      </div>
    </section>
  );
}
