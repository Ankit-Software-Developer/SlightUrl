"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Link as LinkIcon,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Zap,
  Shield,
  Users,
  Globe,
  TrendingUp,
  User,
  CreditCard,
  Key,
  Bell,
  HelpCircle,
  ChevronDown,
  Share2,
  QrCode,
  Lock,
  Calendar,
  Target,
  KeyRound,
  Mail,
} from "lucide-react";

// NOTE: Update these imports to your project paths
import Card from "@/components/Card";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import Input from "@/components/Input";

import { AdPlacement, SidebarAd } from "@/components/AdSlots";
import axios from "axios";
import { baseurl } from "@/utils/constant";
import Cookies from "js-cookie";

/* -------------------- Mock Data -------------------- */
const mockUser = {
  name: "Alex Johnson",
  email: "alex@example.com",
  plan: "free", // free, pro, business
  planExpiry: "2026-03-15",
  credits: 250,
  totalLinks: 42,
  totalClicks: 12500,
  conversionRate: 3.2,
};

const mockLinks = [
  {
    id: 1,
    shortUrl: "slighturl.com/campaign1",
    originalUrl:
      "https://example.com/very-long-product-url-with-many-parameters",
    clicks: 1250,
    createdAt: "2026-01-15",
    status: "active",
    tags: ["marketing", "summer-sale"],
  },
  {
    id: 2,
    shortUrl: "slighturl.com/docs-api",
    originalUrl: "https://docs.example.com/api/v2/reference",
    clicks: 842,
    createdAt: "2026-01-10",
    status: "active",
    tags: ["documentation", "api"],
  },
  {
    id: 3,
    shortUrl: "slighturl.com/social-post",
    originalUrl: "https://social.media.com/posts/12345",
    clicks: 321,
    createdAt: "2026-01-05",
    status: "active",
    tags: ["social", "campaign"],
  },
];

const mockAnalytics = {
  totalClicks: 12500,
  todayClicks: 245,
  uniqueVisitors: 8900,
  topCountries: [
    { country: "United States", clicks: 4200, percentage: 33.6 },
    { country: "United Kingdom", clicks: 2100, percentage: 16.8 },
    { country: "Germany", clicks: 1250, percentage: 10 },
  ],
  topReferrers: [
    { source: "Facebook", clicks: 3200, percentage: 25.6 },
    { source: "Twitter", clicks: 2100, percentage: 16.8 },
    { source: "Direct", clicks: 1800, percentage: 14.4 },
  ],
  devices: [
    { device: "Mobile", percentage: 62 },
    { device: "Desktop", percentage: 35 },
    { device: "Tablet", percentage: 3 },
  ],
};

const planFeatures = {
  free: {
    maxLinks: 50,
    analytics: false,
    customDomains: false,
    billing: false,
    adFree: false,
  },
  pro: {
    maxLinks: 1000,
    analytics: true,
    customDomains: true,
    billing: true,
    adFree: true,
  },
  business: {
    maxLinks: "Unlimited",
    analytics: true,
    customDomains: true,
    billing: true,
    adFree: true,
  },
};

/* -------------------- Helpers -------------------- */
function toneForPlan(plan) {
  if (plan === "free") return "slate";
  if (plan === "pro") return "emerald";
  return "sky";
}

function isPaid(plan) {
  return plan === "pro" || plan === "business";
}

function percentUsage(current, max) {
  if (max === "Unlimited") return 15;
  const p = (current / max) * 100;
  return Math.max(4, Math.min(100, p));
}

/* -------------------- Locked Screen -------------------- */
function LockedFeature({ title, description, onUpgrade }) {
  return (
    <Card className="p-6">
      <div className="text-center py-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500">
          <Lock className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-extrabold">{title}</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-300">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button
            onClick={onUpgrade}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            Upgrade to Pro
          </Button>
          <Button variant="secondary" onClick={() => alert("Demo: Learn more")}>
            Learn more
          </Button>
        </div>
      </div>
    </Card>
  );
}

/* -------------------- Page -------------------- */
export default function DashboardPage() {
  const token = Cookies.get("slightUrl_token");
  const [user, setUser] = useState(mockUser);
  const [links, setLinks] = useState(mockLinks);
  const [analytics] = useState(mockAnalytics);

  // default active tab: free -> overview
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [keyShow, setkeyShow] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Developer tokens: free vs paid
  const [devToken, setDevToken] = useState("");
  const [listkeys, setlistkeys] = useState([]);
  const [tokenRevealed, setTokenRevealed] = useState(false);

  const fetchuserDetails = async () => {
    try {
      if (!token) {
        setIsLoading(false);
        return;
      }

      const res = await axios.get(`${baseurl}api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      if (res.status === 200) {
        setUser(res.data.user);
      }
    } catch (err) {
      console.log(err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  const GetAPIkeys = async () => {
    try {
      if (!token) return;

      const res = await axios.get(`${baseurl}api/setting/apikeys`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API KEY list RESPONSE:", res.data);
      setlistkeys(res.data.keys || []); // show only once
      setTokenRevealed(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };
  useEffect(() => {
    fetchuserDetails();
    GetAPIkeys();
  }, []);

  function tokenPrefixForPlan(plan) {
    // visually + logically different
    if (plan === "free") return "sk_free_";
    if (plan === "pro") return "sk_pro_";
    return "sk_biz_";
  }

  const genTokenForPlan = async () => {
    try {
      if (!token) return;

      const res = await axios.post(
        `${baseurl}api/setting/genrateapikey`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("API KEY RESPONSE:", res.data);
      setDevToken(res.data.apiKey); // show only once
      setTokenRevealed(true);
      GetAPIkeys();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // function genTokenForPlan(plan) {
  //   const chars =
  //     "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  //   const rand = (n) =>
  //     Array.from(
  //       { length: n },
  //       () => chars[Math.floor(Math.random() * chars.length)],
  //     ).join("");

  //   // ex: sk_free_xxxxxx.yyyyyy.zzzz
  //   return `${tokenPrefixForPlan(plan)}${rand(10)}.${rand(18)}.${rand(8)}`;
  // }
  function maskValue(str, start = 12, end = 6) {
    if (!str) return "";
    if (str.length <= start + end) return str;
    return `${str.slice(0, start)}••••••••••••••${str.slice(-end)}`;
  }
  function displayTokenFromKeyRow(k) {
    // not a real token. just a stable "display token"
    const created = new Date(k.created_at).getTime().toString(36);
    return `sk_live_${k.id}_${created}`;
  }
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  }

  // UI-only limits (you will enforce these in backend later)
  const apiAccess = useMemo(() => {
    if (user.plan === "free") {
      return {
        tier: "Free API Token",
        badgeTone: "slate",
        rpm: 20, // requests per minute
        daily: 200,
        endpoints: ["POST /api/links/create (basic)", "GET /api/links (basic)"],
        note: "Free API has limited rate limits and basic endpoints. Upgrade for analytics + domains + higher limits.",
      };
    }
    if (user.plan === "pro") {
      return {
        tier: "Pro API Token",
        badgeTone: "emerald",
        rpm: 120,
        daily: 5000,
        endpoints: [
          "POST /api/links/create",
          "GET /api/links",
          // "GET /api/analytics/summary",
          // "GET /api/analytics/link/:id",
          // "POST /api/domains",
        ],
        note: "Pro API includes analytics & domains endpoints with higher limits.",
      };
    }
    return {
      tier: "Business API Token",
      badgeTone: "sky",
      rpm: 300,
      daily: 20000,
      endpoints: [
        "POST /api/links/create",
        "GET /api/links",
        // "GET /api/analytics/*",
        // "POST /api/domains",
        // "Team endpoints (optional)",
        // "Webhooks (optional)",
      ],
      note: "Business API has the highest limits and advanced endpoints.",
    };
  }, [user.plan]);
  const filteredLinks = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return links.filter(
      (link) =>
        link.shortUrl.toLowerCase().includes(q) ||
        link.originalUrl.toLowerCase().includes(q) ||
        link.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }, [links, searchTerm]);

  function safeSetTab(tab) {
    // Free gating: allow only a subset
    const freeAllowed = new Set([
      "overview",
      "links",
      "profile",
      "security",
      "API",
    ]);
    if (user.plan === "free" && !freeAllowed.has(tab)) {
      // show locked page for premium tabs
      setActiveTab(tab); // keep state so header changes
      return;
    }
    setActiveTab(tab);
  }

  const sidebarItems = useMemo(() => {
    const common = [
      { key: "overview", label: "Overview", icon: BarChart3, premium: false },
      { key: "links", label: "My Links", icon: LinkIcon, premium: false },
    ];

    const premium = [
      { key: "analytics", label: "Analytics", icon: TrendingUp, premium: true },
      // { key: "domains", label: "Domains", icon: Globe, premium: true },
      // { key: "billing", label: "Billing", icon: CreditCard, premium: true },
    ];

    const account = [
      { key: "profile", label: "Profile", icon: User, premium: false },
      { key: "security", label: "Security", icon: Shield, premium: false },
      { key: "API", label: "API", icon: Key, premium: false },
    ];

    // Free users: only common + account
    if (user.plan === "free") return [...common, ...account];

    // Paid users: everything
    return [...common, ...premium, ...account];
  }, [user.plan]);

  function deleteLink(id) {
    if (user.plan === "free" && links.length <= 3) {
      alert(
        "Free users must keep at least 3 active links. Upgrade to Pro for more control.",
      );
      return;
    }
    if (window.confirm("Are you sure you want to delete this link?")) {
      setLinks((prev) => prev.filter((l) => l.id !== id));
    }
  }

  function handleUpgrade(plan) {
    setIsLoading(true);
    setTimeout(() => {
      setUser((u) => ({ ...u, plan }));
      setShowUpgradeModal(false);
      setIsLoading(false);
      alert(`Successfully upgraded to ${plan} plan!`);
    }, 1200);
  }

  const headerTitle = useMemo(() => {
    const map = {
      overview: "Dashboard Overview",
      links: "My Links",
      analytics: "Analytics",
      domains: "Domains",
      billing: "Billing",
      profile: "Profile",
      security: "Security",
      API: "API",
    };
    return map[activeTab] || "Dashboard";
  }, [activeTab]);

  const headerDesc = useMemo(() => {
    const map = {
      overview: "Welcome back! Here’s your activity overview.",
      links: "Manage and track all your short links.",
      analytics: "Detailed insights and performance metrics.",
      domains: "Configure and manage custom domains.",
      billing: "Manage your subscription and invoices.",
      profile: "Update your profile information.",
      security: "Password, sessions, and account security.",
      API: "Developer API Token.",
    };
    return map[activeTab] || "";
  }, [activeTab]);
  function normalizePlan(plan) {
    if (!plan) return "free";
    return plan.toLowerCase(); // FREE → free, PRO → pro
  }
  // Copy icon component (if not already available)
  const Copy = ({ className }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );

  // Info icon component
  const InfoIcon = () => (
    <svg fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  );
  const currentPlan = normalizePlan(user.plan);
  const paid = isPaid(currentPlan);
  const planMaxLinks = planFeatures[currentPlan].maxLinks;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      {/* Upgrade Modal */}
      {/* {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl bg-white p-6 dark:bg-slate-900"
          >
            <h3 className="text-2xl font-extrabold">Upgrade Your Plan</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Unlock premium features: analytics, custom domains, billing, and
              ad-free experience.
            </p>

            <div className="mt-6 space-y-3">
              <Button
                onClick={() => handleUpgrade("pro")}
                disabled={isLoading}
                className="w-full justify-between"
              >
                <span>Pro Plan - $9/month</span>
                <span>✨</span>
              </Button>
              <Button
                onClick={() => handleUpgrade("business")}
                disabled={isLoading}
                className="w-full justify-between bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <span>Business Plan - $29/month</span>
                <span>🚀</span>
              </Button>
            </div>

            <button
              onClick={() => setShowUpgradeModal(false)}
              className="mt-4 w-full text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Maybe later
            </button>
          </motion.div>
        </div>
      )} */}

      {/* Top Navigation */}
      <nav className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                <span className="text-sm font-extrabold text-white">S</span>
              </div>
              <h1 className="text-xl font-extrabold">slightURL</h1>
              <Badge tone={toneForPlan(user.plan)}>
                {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
              </Badge>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Bell className="h-5 w-5" />
              </button>
              <button className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                <HelpCircle className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                  <span className="text-sm font-extrabold text-white">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <Card className="p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
                  <span className="text-xl font-extrabold text-white">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-extrabold">{user.name}</h3>
                  <p className="truncate text-sm text-slate-500 dark:text-slate-300">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                {sidebarItems.map((it) => {
                  const Icon = it.icon;
                  const active = activeTab === it.key;
                  const locked = user.plan === "free" && it.premium;

                  return (
                    <button
                      key={it.key}
                      onClick={() => {
                        // if free and premium -> show locked page but keep tab selected
                        setActiveTab(it.key);
                      }}
                      className={[
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition",
                        active
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
                      ].join(" ")}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{it.label}</span>

                      {locked && (
                        <span className="ml-auto inline-flex items-center gap-2">
                          <Badge tone="amber">Pro</Badge>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Usage */}
              <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Plan Usage</span>
                  <span className="text-sm text-slate-500 dark:text-slate-300">
                    {links.length}/{planMaxLinks}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{
                      width: `${percentUsage(links.length, planMaxLinks)}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {user.plan === "free"
                    ? "Upgrade for higher limits + premium features."
                    : "Usage this month."}
                </p>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="mb-4 text-sm font-extrabold">Quick Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">
                    Total Links
                  </span>
                  <span className="font-extrabold">{user.totalLinks}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">
                    Total Clicks
                  </span>
                  <span className="font-extrabold">
                    {(user.totalClicks ?? 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">
                    Conversion Rate
                  </span>
                  <span className="font-extrabold">{user.conversionRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">
                    Credits
                  </span>
                  <span className="font-extrabold">{user.credits}</span>
                </div>
              </div>
            </Card>

            {/* Sidebar Ad (best for Free) */}
            {!planFeatures[currentPlan].adFree && <SidebarAd />}
            {!planFeatures[currentPlan].adFree && <SidebarAd />}
            {!planFeatures[currentPlan].adFree && <SidebarAd />}

            {/* Upgrade card for free */}
            {user.plan === "free" && (
              <Card className="border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 dark:border-amber-800 dark:from-amber-900/20 dark:to-orange-900/20">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="mb-2 font-extrabold">Upgrade to Pro</h4>
                  <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                    Unlock analytics, custom domains, and remove most ads.
                  </p>
                  <Button
                    onClick={() => setShowUpgradeModal(true)}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  >
                    Upgrade Now
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="space-y-6 lg:col-span-3">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold">{headerTitle}</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {headerDesc}
                </p>
              </div>

              {/* Search + Create */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {(activeTab === "links" || activeTab === "overview") && (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      placeholder="Search links..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                )}

                {(activeTab === "links" || activeTab === "overview") && (
                  <Button
                    onClick={() => {
                      if (
                        user.plan === "free" &&
                        links.length >= planFeatures.free.maxLinks
                      ) {
                        alert(
                          `Free plan limited to ${planFeatures.free.maxLinks} links. Upgrade to Pro for more.`,
                        );
                        setShowUpgradeModal(true);
                        return;
                      }
                      alert("Create link modal (demo)");
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Create Link
                  </Button>
                )}
              </div>
            </div>

            {/* Dashboard Top Ad */}
            {!planFeatures[currentPlan].adFree && (
              <div>
                <AdPlacement
                  position="Dashboard Top"
                  size="728x90"
                  recommended="Dashboard-optimized ads"
                />
              </div>
            )}

            {/* -------------------- TABS RENDER -------------------- */}

            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-300">
                          Total Clicks
                        </p>
                        <p className="text-2xl font-extrabold">
                          {analytics.totalClicks.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
                        <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">
                      +12% from last week
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-300">
                          Today’s Clicks
                        </p>
                        <p className="text-2xl font-extrabold">
                          {analytics.todayClicks}
                        </p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                        <Target className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">
                      +8% from yesterday
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-300">
                          Unique Visitors
                        </p>
                        <p className="text-2xl font-extrabold">
                          {analytics.uniqueVisitors.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
                        <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">
                      +5% from last week
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-300">
                          Active Links
                        </p>
                        <p className="text-2xl font-extrabold">
                          {links.length}
                        </p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
                        <LinkIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-slate-500 dark:text-slate-300">
                      {planMaxLinks === "Unlimited"
                        ? "Unlimited"
                        : `${links.length}/${planMaxLinks}`}
                    </div>
                  </Card>
                </div>

                <Card className="p-6">
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-extrabold">Recent Links</h3>
                    <Button
                      variant="secondary"
                      onClick={() => setActiveTab("links")}
                    >
                      View All
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {filteredLinks.slice(0, 3).map((link) => (
                      <div
                        key={link.id}
                        className="flex flex-col gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/40 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <a
                              href={`https://${link.shortUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="truncate font-extrabold text-blue-600 hover:underline dark:text-blue-400"
                            >
                              {link.shortUrl}
                            </a>
                            <Badge tone="sky">
                              {link.clicks.toLocaleString()} clicks
                            </Badge>
                          </div>
                          <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-300">
                            {link.originalUrl}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {link.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-lg bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                            <Share2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteLink(link.id)}
                            className="rounded-lg p-2 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* LINKS */}
            {activeTab === "links" && (
              <Card className="p-6">
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-extrabold">
                      All Links ({filteredLinks.length})
                    </h3>
                    <Button
                      variant="secondary"
                      onClick={() => alert("Filter (demo)")}
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() =>
                        paid
                          ? alert("Export (demo)")
                          : setShowUpgradeModal(true)
                      }
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export
                      {!paid && (
                        <span className="ml-2 rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-bold text-amber-700 dark:text-amber-300">
                          Pro
                        </span>
                      )}
                    </Button>
                  </div>

                  <div className="text-sm text-slate-500 dark:text-slate-300">
                    {user.plan === "free" &&
                      `Free plan: ${links.length}/${planFeatures.free.maxLinks} links`}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-left dark:border-slate-800">
                        <th className="py-3 pr-4">Short URL</th>
                        <th className="py-3 pr-4">Clicks</th>
                        <th className="py-3 pr-4">Created</th>
                        <th className="py-3 pr-4">Status</th>
                        <th className="py-3 pr-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLinks.map((link) => (
                        <tr
                          key={link.id}
                          className="border-b border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40"
                        >
                          <td className="py-3 pr-4">
                            <div className="min-w-0">
                              <a
                                href={`https://${link.shortUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-extrabold text-blue-600 hover:underline dark:text-blue-400"
                              >
                                {link.shortUrl}
                              </a>
                              <p className="max-w-[520px] truncate text-xs text-slate-500 dark:text-slate-300">
                                {link.originalUrl}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 pr-4 font-semibold">
                            {link.clicks.toLocaleString()}
                          </td>
                          <td className="py-3 pr-4">{link.createdAt}</td>
                          <td className="py-3 pr-4">
                            <Badge
                              tone={
                                link.status === "active" ? "emerald" : "slate"
                              }
                            >
                              {link.status}
                            </Badge>
                          </td>
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-2">
                              <button className="rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() =>
                                  !paid
                                    ? setShowUpgradeModal(true)
                                    : alert("QR (demo)")
                                }
                                className="rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-slate-700"
                                title={
                                  !paid
                                    ? "Upgrade to use QR codes"
                                    : "Generate QR"
                                }
                              >
                                <QrCode className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteLink(link.id)}
                                className="rounded-lg p-2 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/20"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredLinks.length === 0 && (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800">
                      <LinkIcon className="h-8 w-8 text-slate-400" />
                    </div>
                    <h4 className="mb-2 text-lg font-extrabold">
                      No links found
                    </h4>
                    <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">
                      {searchTerm
                        ? "Try a different search term."
                        : "Create your first short link."}
                    </p>
                    <Button onClick={() => alert("Create link modal (demo)")}>
                      Create Link
                    </Button>
                  </div>
                )}
              </Card>
            )}

            {/* ANALYTICS (locked for free) */}
            {
              activeTab === "analytics" && (
                // (paid ? (
                <Card className="p-6">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-extrabold">
                      Detailed Analytics
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => alert("Date range (demo)")}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Last 30 days
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => alert("Export (demo)")}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Export Data
                      </Button>
                    </div>
                  </div>

                  <div className="mb-8 flex h-64 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
                    <div className="text-center">
                      <BarChart3 className="mx-auto mb-4 h-12 w-12 text-slate-400" />
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Replace with real charts later (Recharts/Chart.js).
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <div>
                      <h4 className="mb-3 font-extrabold">Top Referrers</h4>
                      <div className="space-y-2 text-sm">
                        {analytics.topReferrers.map((r) => (
                          <div
                            key={r.source}
                            className="flex items-center justify-between"
                          >
                            <span>{r.source}</span>
                            <span className="font-semibold">
                              {r.clicks.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-3 font-extrabold">Devices</h4>
                      <div className="space-y-2 text-sm">
                        {analytics.devices.map((d) => (
                          <div
                            key={d.device}
                            className="flex items-center justify-between"
                          >
                            <span>{d.device}</span>
                            <span className="font-semibold">
                              {d.percentage}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-3 font-extrabold">Top Countries</h4>
                      <div className="space-y-2 text-sm">
                        {analytics.topCountries.map((c) => (
                          <div
                            key={c.country}
                            className="flex items-center justify-between"
                          >
                            <span>{c.country}</span>
                            <span className="font-semibold">
                              {c.clicks.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )
              // ) : (
              // <LockedFeature
              //   title="Analytics is a Pro feature"
              //   description="Upgrade to Pro to unlock advanced analytics, charts, exports, and real-time insights."
              //   onUpgrade={() => setShowUpgradeModal(true)}
              // />
              // ))
            }

            {/* DOMAINS (locked for free) */}
            {activeTab === "domains" &&
              (paid ? (
                <Card className="p-6">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-extrabold">Custom Domains</h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        Add and manage domains for branded links.
                      </p>
                    </div>
                    <Button onClick={() => alert("Add Domain (demo)")}>
                      <Plus className="mr-2 h-5 w-5" />
                      Add Domain
                    </Button>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 p-6 dark:from-blue-900/20 dark:to-cyan-900/20">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
                          <Globe className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-extrabold">Add New Domain</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            Connect your custom domain
                          </p>
                        </div>
                      </div>
                      <Input placeholder="yourdomain.com" className="mb-3" />
                      <Button className="w-full">Verify Domain</Button>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-6 dark:from-purple-900/20 dark:to-pink-900/20">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
                          <Shield className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-extrabold">Domain Security</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            SSL + HTTPS enforcement
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
                        <li className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />{" "}
                          Auto SSL enabled
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />{" "}
                          DNS validation required
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />{" "}
                          HTTPS enforced
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>
              ) : (
                <LockedFeature
                  title="Custom Domains are Pro"
                  description="Upgrade to Pro to use branded domains for better trust and conversion."
                  onUpgrade={() => setShowUpgradeModal(true)}
                />
              ))}

            {/* BILLING (locked for free) */}
            {activeTab === "billing" &&
              (paid ? (
                <Card className="p-6">
                  <h3 className="text-lg font-extrabold">Billing</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Manage subscription, invoices, and payment methods (UI
                    demo).
                  </p>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <Card className="p-5">
                      <div className="flex items-center justify-between">
                        <div className="font-extrabold">Current Plan</div>
                        <Badge tone={toneForPlan(user.plan)}>
                          {user.plan.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Next renewal: {user.planExpiry}
                      </p>
                      <div className="mt-4 flex gap-2">
                        <Button onClick={() => alert("Change plan (demo)")}>
                          Change Plan
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => alert("Download invoice (demo)")}
                        >
                          Download Invoice
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-5">
                      <div className="flex items-center justify-between">
                        <div className="font-extrabold">Payment Method</div>
                        <CreditCard className="h-5 w-5 text-slate-400" />
                      </div>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Visa •••• 4242
                      </p>
                      <div className="mt-4">
                        <Button
                          variant="secondary"
                          onClick={() => alert("Update payment (demo)")}
                        >
                          Update Payment
                        </Button>
                      </div>
                    </Card>
                  </div>
                </Card>
              ) : (
                <LockedFeature
                  title="Billing is for paid plans"
                  description="Upgrade to Pro/Business to manage subscriptions, invoices and payments."
                  onUpgrade={() => setShowUpgradeModal(true)}
                />
              ))}

            {/* PROFILE */}
            {activeTab === "profile" && (
              <Card className="p-6">
                <h3 className="text-lg font-extrabold">Profile</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Manage your personal information.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300">
                      Name
                    </label>
                    <Input defaultValue={user.name} />
                  </div>
                  <div>
                    <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300">
                      Email
                    </label>
                    <Input defaultValue={user.email} type="email" />
                  </div>
                </div>

                <div className="mt-5 flex gap-2">
                  <Button onClick={() => alert("Save profile (demo)")}>
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => alert("Cancel (demo)")}
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            )}

            {/* SECURITY */}
            {activeTab === "security" && (
              <Card className="p-6">
                <h3 className="text-lg font-extrabold">Security</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Password, sessions and account security.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <Card className="p-5">
                    <div className="flex items-center gap-2">
                      <KeyRound className="h-5 w-5 text-slate-400" />
                      <div className="font-extrabold">Change Password</div>
                    </div>
                    <div className="mt-3 grid gap-3">
                      <Input type="password" placeholder="Current password" />
                      <Input type="password" placeholder="New password" />
                      <Button onClick={() => alert("Change password (demo)")}>
                        Update
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-5">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-slate-400" />
                      <div className="font-extrabold">2FA (Coming Soon)</div>
                    </div>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      Enable two-factor authentication for extra security.
                    </p>
                    <div className="mt-4">
                      <Button
                        variant="secondary"
                        onClick={() => alert("2FA (demo)")}
                      >
                        Setup 2FA
                      </Button>
                    </div>
                  </Card>
                </div>
              </Card>
            )}

            {/* SETTINGS */}
            {activeTab === "API" && (
              <div className="space-y-6">
                {/* Developer API Token (FREE & PAID both can generate, but different token + limits) */}
                <Card className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-extrabold">
                          Developer API Token
                        </h4>
                        {/* <Badge tone={apiAccess.badgeTone}>
                          {apiAccess.tier}
                        </Badge> */}
                      </div>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        Generate a token to integrate slightURL into your app.
                        {/* Token type & limits depend on your plan. */}
                      </p>
                    </div>

                    {/* <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-900/40 dark:text-slate-200 dark:ring-slate-800">
                      {apiAccess.rpm} rpm • {apiAccess.daily}/day
                    </div> */}
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {/* Token panel */}
                    <div className="md:col-span-4">
                      <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300">
                        API Token
                      </label>

                      <div className="mt-2 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-900/40 dark:ring-slate-800">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              {/* <div className="text-xs text-slate-500 dark:text-slate-400">
                                Authorization: Bearer &lt;token&gt;
                              </div> */}

                              <div className="mt-2 break-all font-mono text-sm font-bold text-slate-900 dark:text-white">
                                {devToken
                                  ? tokenRevealed
                                    ? devToken
                                    : `${devToken.slice(0, 12)}••••••••••••••••••••${devToken.slice(-6)}`
                                  : "No token generated yet."}
                              </div>

                              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                {/* {apiAccess.note} */}
                                Access this token via our API to seamlessly
                                integrate and enhance your development workflow.
                              </p>
                            </div>

                            {!devToken && listkeys.length > 0 ? (
                              <button
                                onClick={() => setkeyShow(true)}
                                className="h-fit rounded-xl bg-white px-3 py-2 text-xs font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-950 dark:text-white dark:ring-slate-800 dark:hover:bg-slate-900"
                              >
                                Show key
                              </button>
                            ) : null}
                            {devToken && (
                              <button
                                onClick={() => setTokenRevealed((v) => !v)}
                                className="h-fit rounded-xl bg-white px-3 py-2 text-xs font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-950 dark:text-white dark:ring-slate-800 dark:hover:bg-slate-900"
                              >
                                {tokenRevealed ? "Hide" : "Reveal"}
                              </button>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Button
                              onClick={genTokenForPlan}
                              // onClick={() => {
                              //   const t = genTokenForPlan(user.plan);
                              //   setDevToken(t);
                              //   setTokenRevealed(false);
                              //   alert(
                              //     `${apiAccess.tier} generated (demo). Connect backend later.`,
                              //   );
                              // }}
                            >
                              {devToken ? "Regenerate" : "Generate"} token
                            </Button>

                            <Button
                              variant="secondary"
                              onClick={() =>
                                devToken
                                  ? copyToClipboard(devToken)
                                  : alert("Generate token first")
                              }
                            >
                              Copy
                            </Button>

                            {/* <Button
                              variant="secondary"
                              onClick={() => {
                                if (!devToken)
                                  return alert("No token to revoke.");
                                if (
                                  window.confirm(
                                    "Revoke this token? Your integrations will stop working.",
                                  )
                                ) {
                                  setDevToken("");
                                  setTokenRevealed(false);
                                  alert("Token revoked (demo).");
                                }
                              }}
                            >
                              Revoke
                            </Button> */}

                            {/* Upgrade CTA visible for free */}
                            {user.plan === "free" && (
                              <Button
                                variant="secondary"
                                onClick={() => setShowUpgradeModal(true)}
                                className="border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200 dark:hover:bg-amber-900/30"
                              >
                                Upgrade for higher limits
                              </Button>
                            )}
                          </div>

                          {devToken && (
                            <div className="text-xs text-red-700 dark:text-red-300">
                              API key generated (copy it now, it won’t be shown
                              again)
                            </div>
                          )}
                          <div className="text-xs text-amber-700 dark:text-amber-300">
                            Security tip: store token in server env vars. Never
                            expose token in client-side code.
                          </div>
                        </div>
                      </div>
                      {keyShow && (
                        <div className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-900/40 dark:ring-slate-800">
                          <div className="mb-3 text-sm font-extrabold text-slate-700 dark:text-slate-200">
                            Your API Keys
                          </div>

                          <div className="space-y-3">
                            {listkeys.map((k) => {
                              console.log(k);
                              // const displayToken = displayTokenFromKeyRow(k);
                              const displayToken = k.keyHash;
                              const shown = tokenRevealed
                                ? displayToken
                                : maskValue(displayToken);

                              return (
                                <div
                                  key={k.id}
                                  className="flex flex-col gap-3 rounded-xl bg-white p-3 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800 sm:flex-row sm:items-center sm:justify-between"
                                >
                                  <div className="min-w-0">
                                    <div className="break-all font-mono text-sm font-bold text-slate-900 dark:text-white">
                                      {shown}
                                    </div>
                                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                      Created:{" "}
                                      {new Date(k.created_at).toLocaleString()}{" "}
                                      • Limit: {k.dailyLimit ?? "Unlimited"} •
                                      Status:{" "}
                                      {k.isActive ? "Active" : "Revoked"}
                                    </div>
                                  </div>

                                  <div className="flex flex-wrap gap-2">
                                    {/* <Button
                                      variant="secondary"
                                      onClick={() =>
                                        setTokenRevealed((v) => !v)
                                      }
                                    >
                                      {tokenRevealed ? "Hide" : "Reveal"}
                                    </Button> */}

                                    <Button
                                      variant="secondary"
                                      onClick={() =>
                                        copyToClipboard(displayToken)
                                      }
                                    >
                                      Copy
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="mt-3 text-xs text-amber-700 dark:text-amber-300">
                            Note: Stored keys are shown in masked form. Full raw
                            token is only shown once at creation.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
                {/* Allowed endpoints + example */}
                <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:from-gray-900 dark:to-gray-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                        API Access
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Integrate with our URL shortening service
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                        Available Endpoints
                      </h4>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        {apiAccess.endpoints.length} endpoints
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {apiAccess.endpoints.map((endpoint, index) => {
                        const method = endpoint.split(" ")[0];
                        const path = endpoint.split(" ")[1];
                        const methodColor =
                          {
                            GET: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
                            POST: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
                            PUT: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
                            DELETE:
                              "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
                          }[method] ||
                          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";

                        return (
                          <div
                            key={endpoint}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
                          >
                            <div
                              className={`font-bold text-xs px-2 py-1 rounded ${methodColor}`}
                            >
                              {method}
                            </div>
                            <code className="text-sm font-mono text-slate-800 dark:text-slate-200 flex-1 truncate">
                              {path}
                            </code>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              #{index + 1}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        Try It Out
                      </h4>
                      <div className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        POST Example
                      </div>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between bg-slate-800 px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-sm font-mono text-slate-300">
                          Create Link Endpoint
                        </div>
                      </div>

                      <div className="bg-slate-950 p-4">
                        <div className="flex flex-col space-y-4">
                          <div>
                            <div className="text-xs font-medium text-slate-400 mb-1">
                              Request
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="font-bold text-xs px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                                POST
                              </span>
                              <code className="text-sm font-mono text-slate-100">
                                {baseurl}api/links/create
                              </code>
                            </div>
                          </div>

                          <div>
                            <div className="text-xs font-medium text-slate-400 mb-1">
                              Headers
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-blue-300">
                                  Authorization:
                                </span>
                                <code className="text-xs font-mono text-slate-300">
                                  YOUR_API_KEY
                                </code>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-blue-300">
                                  Content-Type:
                                </span>
                                <code className="text-xs font-mono text-slate-300">
                                  application/json
                                </code>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="text-xs font-medium text-slate-400 mb-1">
                              Body
                            </div>
                            <pre className="text-xs font-mono text-slate-100 p-3 rounded bg-slate-900 overflow-x-auto">
                              {`{
  "longUrl": "https://example.com",
  "alias": "optional-custom-alias",
  "expiresAt": "2025-12-31",(optional)
}`}
                            </pre>
                          </div>

                          <div className="pt-2">
                            <div className="text-xs font-medium text-slate-400 mb-1">
                              cURL Command
                            </div>
                            <div className="relative">
                              <pre className="text-xs font-mono text-slate-100 p-3 rounded bg-slate-900 overflow-x-auto">
                                {`curl -X POST https://slighturl.com/api/links/create \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"longUrl":"https://example.com"}'`}
                              </pre>
                              <button
                                onClick={() =>
                                  navigator.clipboard
                                    .writeText(`curl -X POST https://slighturl.com/api/links/create \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"longUrl":"https://example.com"}'`)
                                }
                                className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                                aria-label="Copy cURL command"
                              >
                                <Copy className="h-4 w-4 text-slate-300" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0">
                        <InfoIcon />
                      </div>
                      <div>
                        <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
                          Getting Started
                        </h5>
                        <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                            Replace{" "}
                            <code className="px-1 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-xs">
                              YOUR_TOKEN
                            </code>{" "}
                            with your actual API key
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                            All requests require authentication via the
                            Authorization header
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                            View detailed documentation for additional
                            parameters and examples
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Dashboard Bottom Ad */}
            {!planFeatures[currentPlan].adFree && (
              <div>
                <AdPlacement
                  position="Dashboard Bottom"
                  size="728x90"
                  recommended="Dashboard-optimized ads"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
