"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  ShieldCheck,
  FileText,
  Clock,
  Eye,
  AlertTriangle,
  ExternalLink,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

// NOTE: Update these imports to your project paths
import Card from "@/components/Card";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { baseurl } from "@/utils/constant";

// Your existing ad slots
import { AdPlacement, SidebarAd } from "@/components/AdSlots";
import Image from "next/image";
import Link from "next/link";

/**
 * Download Page (Ad-heavy monetization layout)
 * - Surrounding ads (top, bottom, left rail, right rail, inline)
 * - Center "Download" hero card
 * - Looks consistent with your "slightURL" portal design
 *
 * Replace mock file data with real API fetch if needed.
 */

const mockFile = {
  filename: "slighturl-shareable-file.zip",
  size: "24.8 MB",
  type: "ZIP Archive",
  uploadedAt: "2026-02-07",
  downloads: 12403,
  safeScan: "Clean",
  expiresIn: "1 days",
  downloadUrl: "#", // <-- replace with real signed URL
};

function fmt(n) {
  const x = Number(n || 0);
  return x.toLocaleString();
}
function formatBytes(bytes = 0) {
  const units = ["B", "KB", "MB", "GB"];
  let b = Number(bytes);
  let i = 0;
  while (b >= 1024 && i < units.length - 1) {
    b /= 1024;
    i++;
  }
  return `${b.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function expiresIn(expiresAt) {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return "Expired";
  const hrs = Math.ceil(diff / (1000 * 60 * 60));
  return `${hrs} hours`;
}
function prettyFileType(mime = "") {
  const map = {
    "application/pdf": "PDF Document",
    "application/zip": "ZIP Archive",
    "application/x-zip-compressed": "ZIP Archive",

    "application/msword": "DOC Document",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX Document",

    "application/vnd.ms-excel": "Excel Spreadsheet",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      "Excel Spreadsheet",

    "application/vnd.ms-powerpoint": "PowerPoint Presentation",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      "PowerPoint Presentation",

    "text/plain": "Text File",
    "text/csv": "CSV File",

    "image/jpeg": "Image (JPG)",
    "image/png": "Image (PNG)",
    "image/webp": "Image (WEBP)",
    "image/gif": "Image (GIF)",

    "video/mp4": "Video (MP4)",
    "video/webm": "Video (WEBM)",

    "audio/mpeg": "Audio (MP3)",
    "audio/wav": "Audio (WAV)",
  };

  if (map[mime]) return map[mime];

  // Fallback: infer from major type
  if (mime.startsWith("image/")) return "Image File";
  if (mime.startsWith("video/")) return "Video File";
  if (mime.startsWith("audio/")) return "Audio File";
  if (mime.startsWith("text/")) return "Text File";

  return "File";
}

export default function DownloadPortalPage() {
  const [file, setFile] = useState(mockFile);
  const [isPreparing, setIsPreparing] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [meta, setMeta] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [downloadRequested, setDownloadRequested] = useState(false);

  const canDownload = useMemo(
    () => !isPreparing && countdown === 0,
    [isPreparing, countdown],
  );

  // Optional “prep” + countdown (encourages ad view; purely UX)
  const startDownloadFlow = async () => {
    // console.log("clicked");
    if (!file?.downloadUrl) return;
    setDownloadRequested(true);
    setIsPreparing(true);

    // Simulate server “preparing secure link”
    await new Promise((r) => setTimeout(r, 900));

    setIsPreparing(false);
    setCountdown(3);
  };
  const sp = useSearchParams();

  const code = useMemo(() => {
    return sp.get("code") || "";
  }, [sp]);

  useEffect(() => {
    if (!code) {
      setErr("Missing file code");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await axios.get(`${baseurl}api/files/${code}/meta`);

        const m = res.data;
        console.log(m);
        // 🔥 Map backend → UI model
        setFile({
          filename: m.name,
          size: formatBytes(m.sizeBytes),
          type: prettyFileType(m.mimeType),
          uploadedAt: new Date(m.created_at || Date.now()).toLocaleDateString(),
          downloads: m.downloadedCount,
          expiresIn: expiresIn(m.expiresAt),
          safeScan: "Clean",
          downloadUrl: `${baseurl}${m.downloadUrl}`,
        });

        setMeta(m);
      } catch (e) {
        setErr(e?.response?.data?.message || "File not found");
      } finally {
        setLoading(false);
      }
    })();
  }, [code]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  useEffect(() => {
    if (!downloadRequested) return;
    if (isPreparing) return;
    if (countdown !== 0) return;
    if (!file?.downloadUrl) return;

    // ✅ trigger browser download
    window.location.href = file.downloadUrl;
  }, [downloadRequested, countdown, isPreparing, file?.downloadUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Top bar */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/logo1.png" // <-- put your logo in /public/logo.png
                  alt="SlightURL"
                  width={300}
                  height={80}
                  className="h-10 w-45 object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Badge tone="sky">Ad-supported</Badge>
            <div className="text-xs text-slate-500 dark:text-slate-300">
              Please support us by keeping ads enabled
            </div>
          </div>
        </div>
      </div>

      {/* Top mega ad */}
      <div className="mx-auto max-w-7xl px-4 pt-5">
        <AdPlacement
          position="Download Top Leaderboard"
          size="728x90"
          recommended="High CPM top banner"
        />
      </div>

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left rail ads */}
          <div className="lg:col-span-3">
            <div className="space-y-6 lg:sticky lg:top-6">
              <Card className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-extrabold">Sponsored</div>
                  <span className="text-xs text-slate-500 dark:text-slate-300">
                    Ads
                  </span>
                </div>
                <SidebarAd />
              </Card>

              <Card className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-extrabold">Recommended</div>
                  <span className="text-xs text-slate-500 dark:text-slate-300">
                    Ads
                  </span>
                </div>
                <AdPlacement
                  position="Download Left Rail 300x600"
                  size="300x600"
                  recommended="Sticky skyscraper unit"
                />
              </Card>

              <Card className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-extrabold">Promoted</div>
                  <span className="text-xs text-slate-500 dark:text-slate-300">
                    Ads
                  </span>
                </div>
                <AdPlacement
                  position="Download Left Inline 300x250"
                  size="300x250"
                  recommended="Mid-rail rectangle"
                />
              </Card>
            </div>
          </div>

          {/* Center content */}

          <div className="lg:col-span-6">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <Card className="relative overflow-hidden p-6">
                {/* Fancy background glow */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -left-20 -bottom-24 h-64 w-64 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 blur-3xl" />
                {loading ? (
                  <div className="p-10 text-center">Loading download…</div>
                ) : err ? (
                  <div className="p-10 text-center text-red-600">
                    File not found
                  </div>
                ) : (
                  <div className="relative">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600">
                          <Download className="h-6 w-6 text-white" />
                        </div>

                        <div className="min-w-0">
                          <h1 className="text-2xl font-extrabold leading-tight">
                            Your download is ready
                          </h1>
                          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            This portal is ad-supported. Thanks for helping keep
                            slightURL free.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          tone="emerald"
                          className="inline-flex items-center gap-1"
                        >
                          <BadgeCheck className="h-4 w-4" />
                          Verified
                        </Badge>
                        <Badge
                          tone="sky"
                          className="inline-flex items-center gap-1"
                        >
                          <Sparkles className="h-4 w-4" />
                          Fast CDN
                        </Badge>
                      </div>
                    </div>

                    {/* File card */}
                    <div className="mt-6 rounded-2xl bg-white/70 p-5 ring-1 ring-slate-200 backdrop-blur dark:bg-slate-950/40 dark:ring-slate-800">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-900">
                            <FileText className="h-6 w-6 text-slate-500" />
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-base font-extrabold text-slate-900 dark:text-white">
                              {file?.filename || "Untitled file"}
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                              <span className="rounded-full bg-slate-200/70 px-2 py-1 font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                {file?.type || "FILE"}
                              </span>
                              <span>•</span>
                              <span>{file?.size || "—"}</span>
                              <span>•</span>
                              <span>Uploaded {file?.uploadedAt || "—"}</span>
                            </div>
                          </div>
                        </div>

                        {/* Small stats */}
                        <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-1 sm:text-right">
                          <div className="inline-flex items-center justify-start gap-2 sm:justify-end">
                            <Eye className="h-4 w-4 text-slate-400" />
                            <span className="font-bold text-slate-700 dark:text-slate-200">
                              {fmt(file?.downloads)} downloads
                            </span>
                          </div>
                          <div className="inline-flex items-center justify-start gap-2 sm:justify-end">
                            <Clock className="h-4 w-4 text-slate-400" />
                            <span className="font-bold text-slate-700 dark:text-slate-200">
                              Expires in {file?.expiresIn || "—"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Safety strip */}
                      <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-900/40 dark:ring-slate-800 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-5 w-5 text-emerald-500" />
                          <div className="text-sm">
                            <span className="font-extrabold text-slate-900 dark:text-white">
                              Security scan:
                            </span>{" "}
                            <span className="font-bold text-slate-700 dark:text-slate-200">
                              {file?.safeScan || "Unknown"}
                            </span>
                          </div>
                        </div>

                        <div className="text-xs text-slate-500 dark:text-slate-300">
                          Tip: Avoid downloading from suspicious popups.
                        </div>
                      </div>

                      {/* Primary CTA */}
                      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-xs text-slate-500 dark:text-slate-300">
                          {isPreparing ? (
                            <span className="inline-flex items-center gap-2">
                              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                              Preparing secure link…
                            </span>
                          ) : countdown > 0 ? (
                            <span className="inline-flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-emerald-500" />
                              Download starts in{" "}
                              <span className="font-extrabold">
                                {countdown}s
                              </span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-slate-400" />
                              Click download to begin
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row">
                          <Button
                            onClick={startDownloadFlow}
                            disabled={
                              !file?.downloadUrl || isPreparing || countdown > 0
                            }
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          >
                            <Download className="mr-2 h-5 w-5" />
                            {isPreparing
                              ? "Preparing…"
                              : countdown > 0
                                ? `Starting in ${countdown}s`
                                : "Download File"}
                          </Button>

                          {/* <Button
                            variant="secondary"
                            onClick={() => {
                              if (!file?.downloadUrl)
                                return alert("No download link available.");
                              navigator.clipboard
                                .writeText(file.downloadUrl)
                                .then(() => alert("Download link copied!"))
                                .catch(() => alert("Copy failed."));
                            }}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Copy link
                          </Button> */}
                        </div>
                      </div>

                      {/* Disclaimer */}
                      <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-xs text-amber-900 ring-1 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-200 dark:ring-amber-800">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="mt-0.5 h-4 w-4" />
                          <div className="leading-relaxed">
                            Downloads are provided by the uploader. slightURL
                            may display ads around the download button to
                            support hosting and bandwidth costs.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              {/* Inline ad between hero + footer */}
              <Card className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-sm font-extrabold">Sponsored</div>
                  <span className="text-xs text-slate-500 dark:text-slate-300">
                    Advertisement
                  </span>
                </div>
                <AdPlacement
                  position="Download Center Inline"
                  size="728x90"
                  recommended="Inline banner for high viewability"
                />
              </Card>

              {/* Secondary info */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-slate-500" />
                    <div className="font-extrabold">Safe download tips</div>
                  </div>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
                    <li>Use the main “Download File” button only.</li>
                    <li>Avoid third-party “Download now” popups.</li>
                    <li>Keep your browser and antivirus updated.</li>
                  </ul>
                </Card>

                <Card className="p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-slate-500" />
                    <div className="font-extrabold">File details</div>
                  </div>
                  <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center justify-between">
                      <span>Type</span>
                      <span className="font-extrabold text-slate-900 dark:text-white">
                        {file?.type || "—"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Size</span>
                      <span className="font-extrabold text-slate-900 dark:text-white">
                        {file?.size || "—"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Scan</span>
                      <span className="font-extrabold text-slate-900 dark:text-white">
                        {file?.safeScan || "—"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Expires</span>
                      <span className="font-extrabold text-slate-900 dark:text-white">
                        {file?.expiresIn || "—"}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>

          {/* Right rail ads */}
          <div className="lg:col-span-3">
            <div className="space-y-6 lg:sticky lg:top-6">
              <Card className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-extrabold">Sponsored</div>
                  <span className="text-xs text-slate-500 dark:text-slate-300">
                    Ads
                  </span>
                </div>
                <AdPlacement
                  position="Download Right Rail 300x600"
                  size="300x600"
                  recommended="High viewability rail unit"
                />
              </Card>

              <Card className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-extrabold">More ads</div>
                  <span className="text-xs text-slate-500 dark:text-slate-300">
                    Ads
                  </span>
                </div>
                <SidebarAd />
              </Card>

              <Card className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-extrabold">Promoted</div>
                  <span className="text-xs text-slate-500 dark:text-slate-300">
                    Ads
                  </span>
                </div>
                <AdPlacement
                  position="Download Right Inline 300x250"
                  size="300x250"
                  recommended="Rectangle unit"
                />
              </Card>
            </div>
          </div>
        </div>

        {/* Bottom mega ad */}
        <div className="mt-6">
          <AdPlacement
            position="Download Bottom Leaderboard"
            size="728x90"
            recommended="Strong bottom banner"
          />
        </div>

        {/* Footer */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-4 text-xs text-slate-600 backdrop-blur dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              © {new Date().getFullYear()} slightURL • Ad-supported downloads •
              Terms • Privacy
            </div>
            <div className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-bold">Tip:</span> Keep ads enabled to
              support bandwidth costs.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
