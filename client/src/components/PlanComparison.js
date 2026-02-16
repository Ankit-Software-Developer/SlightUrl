"use client";

import Card from "./Card";
import Badge from "./Badge";
import Button from "./Button";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals getting started",
    features: {
      links: "Up to 50 links",
      analytics: "Basic analytics",
      domains: "slighturl.com only",
      team: "Single user",
      api: false,
      support: "Community support",
      ads: "Display ads enabled",
      export: false,
    },
    cta: "Current Plan",
    tone: "slate",
  },
  {
    name: "Pro",
    price: "$9",
    description: "For professionals and businesses",
    features: {
      links: "Up to 1,000 links",
      analytics: "Advanced analytics",
      domains: "Custom domains",
      team: "Up to 5 team members",
      api: true,
      support: "Priority support",
      ads: "Ad-free",
      export: true,
    },
    cta: "Upgrade to Pro",
    tone: "emerald",
    popular: true,
  },
  {
    name: "Business",
    price: "$29",
    description: "For teams and enterprises",
    features: {
      links: "Unlimited links",
      analytics: "Premium analytics",
      domains: "Multiple custom domains",
      team: "Up to 20 team members",
      api: true,
      support: "24/7 priority support",
      ads: "Ad-free",
      export: true,
    },
    cta: "Upgrade to Business",
    tone: "sky",
  },
];

export default function PlanComparison({ currentPlan = "free" }) {
  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select the plan that best fits your needs
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`p-6 ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge tone="blue">Most Popular</Badge>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold mb-1">{plan.price}<span className="text-lg text-gray-500">/month</span></div>
              <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
            </div>

            <ul className="space-y-3 mb-6">
              {Object.entries(plan.features).map(([key, value]) => (
                <li key={key} className="flex items-center gap-3">
                  {value === true ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : value === false ? (
                    <X className="w-5 h-5 text-gray-300" />
                  ) : (
                    <div className="w-5 h-5 flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    </div>
                  )}
                  <span className={value === false ? 'text-gray-400' : ''}>
                    {typeof value === 'boolean' 
                      ? key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')
                      : value}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              variant={currentPlan === plan.name.toLowerCase() ? "secondary" : "primary"}
              disabled={currentPlan === plan.name.toLowerCase()}
              className="w-full"
              tone={plan.tone}
            >
              {currentPlan === plan.name.toLowerCase() ? "Current Plan" : plan.cta}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}