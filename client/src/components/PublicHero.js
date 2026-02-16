"use client";

import { useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";
import Badge from "./Badge";
import { baseurl } from "@/utils/constant";
import axios from "axios";
import Link from "next/link";

export default function PublicHero() {
  const [longUrl, setLongUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [genlink, setgenlink] = useState("https://slighturl.com/{var}");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadPct, setUploadPct] = useState(0);
  const [shareUrl, setShareUrl] = useState("");
  const [expiresAt, setExpiresAt] = useState(null);

  const fileInputRef = useRef(null);

  const onPickFile = (e) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const onDropFile = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  };

  const onDragOver = (e) => {
    e.preventDefault(); // IMPORTANT
    e.stopPropagation(); // IMPORTANT
  };
  const createlink = async () => {
    setLoading(true);
    if (!longUrl) {
      alert("Please enter a URL to shorten");
      return;
    }

    try {
      const payload = {
        longUrl,
        useralias: alias,
      };
      const res = await axios.post(`${baseurl}api/links`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      if (res?.data?.shortUrl) {
        setgenlink(res.data.shortUrl);
      } else {
        alert("Something went wrong: shortUrl not received");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Server error");
      setLoading(false);
    }
  };

  const uploadFile = async () => {
    setLoading(true);
    if (!file) return alert("Select a file first");

    setUploading(true);
    setUploadPct(0);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await axios.post(`${baseurl}api/files/upload`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (evt) => {
          const total = evt.total || 0;
          if (!total) return;
          const pct = Math.round((evt.loaded / total) * 100);
          setUploadPct(pct);
        },
      });

      setShareUrl(res.data.shareUrl);
      setExpiresAt(res.data.expiresAt);
      alert("Uploaded!");
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Upload failed");
      setLoading(false);
    } finally {
      setUploading(false);
      setLoading(false);
    }
  };
  return (
    <section className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 gradient-bg opacity-10" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent" />

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow delay-1000" />

      <div className="container mx-auto px-4 py-10 md:py-18">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge tone="sky" className="mb-6 animate-slide-up">
              ⚡ Fast, clean links — built for sharing
            </Badge>

            <h1 className="text-4xl md:text-4xl font-bold tracking-tight">
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Short Links & File Sharing,
              </span>
              <span className="block mt-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                All in one place — always free
              </span>
            </h1>

            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Create short, reliable links and share files by link — no signup
              required. Keep things simple for your audience while you get a
              polished dashboard to manage everything in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">Unlimited Short Links</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                <span className="font-medium">
                  Simple Analytics (Dashboard)
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                <span className="font-medium">Share Files by Link</span>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <Link href="/auth/login">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg">
                  Login In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="secondary" className="px-8 py-4 text-lg">
                  Get Started Free →
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12">
              <div className="flex items-center gap-6 opacity-70">
                <div className="h-8 w-auto bg-gray-200 dark:bg-gray-800 rounded px-3 py-1">
                  Built for speed • privacy-friendly • HTTPS
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Card className="p-8 shadow-2xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
              <div className="absolute -top-3 -right-3">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  FREE FOREVER
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Shorten a link in seconds
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Paste your URL, choose an alias (optional), and share
                  instantly.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Your long URL
                  </label>
                  <Input
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="https://example.com/some/long/link?utm_source=..."
                    className="w-full px-4 py-3 rounded-xl border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Works with HTTPS links, UTM parameters, and long URLs.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Domain
                    </label>
                    <div className="relative">
                      <Input
                        value="slighturl.com/"
                        readOnly
                        className="w-full bg-gray-50 dark:bg-gray-800"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">
                          HTTPS
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Clean links that look professional anywhere.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Custom alias (optional)
                    </label>
                    <Input
                      value={alias}
                      onChange={(e) => setAlias(e.target.value)}
                      placeholder="my-campaign"
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Make it readable and easy to remember.
                    </p>
                  </div>
                </div>
                <Button
                  onClick={createlink}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 text-lg font-semibold rounded-xl"
                >
                  {loading ? "Creating..." : "✨ Create Short Link"}
                </Button>

                {genlink && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Your short link
                        </p>
                        <p className="font-mono font-bold text-lg break-all">
                          {genlink}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">
                            📊 Trackable
                          </span>
                          <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">
                            🔒 Secure
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(genlink);
                          alert("Copied!");
                        }}
                        className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        📋 Copy
                      </button>
                    </div>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <p>Share it anywhere — social, email, ads, or SMS.</p>
                    </div>
                  </motion.div>
                )}

                {/* Features Preview */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Included features:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Unlimited short links
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Dashboard analytics
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        QR codes (optional)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        File sharing links
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* File Share Section */}
        <section className="container mx-auto px-4 my-10">
          <Card className="p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Badge tone="emerald">New</Badge>
                  <h2 className="text-2xl font-extrabold tracking-tight">
                    Share files with a simple link
                  </h2>
                </div>
                <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-300">
                  Upload a file and instantly get a short download link. No
                  accounts, no complicated steps — just quick sharing that
                  works.
                </p>

                <ul className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-200">
                  <li>• Upload → get a shareable link</li>
                  <li>• Simple download experience for anyone</li>
                  <li>• Optional expiry + limits can be added later</li>
                </ul>
              </div>

              {/* UI demo only */}
              <div className="w-full max-w-md">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold">Upload</div>
                    <span className="text-xs text-slate-500 dark:text-slate-300">
                      No signup
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3">
                    <Input
                      ref={fileInputRef}
                      type="file"
                      // className="hidden"
                      onChange={onPickFile}
                      placeholder="File name (optional)"
                    />
                    <div
                      onDragOver={onDragOver}
                      onDrop={onDropFile}
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer rounded-xl border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-300"
                    >
                      {!file ? (
                        <>
                          Drag & drop a file here <br />
                          <span className="text-xs opacity-80">
                            or click to choose a file
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="font-bold text-slate-700 dark:text-slate-100">
                            Selected:
                          </div>
                          <div className="mt-1 break-all font-mono text-xs">
                            {file.name}
                          </div>
                          <div className="mt-2 text-xs opacity-80">
                            Click to change file
                          </div>
                        </>
                      )}
                    </div>
                    {/* Progress Bar */}
                    {uploading && (
                      <div className="mt-3">
                        <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                          <span>Uploading…</span>
                          <span>{uploadPct}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all"
                            style={{ width: `${uploadPct}%` }}
                          />
                        </div>
                      </div>
                    )}
                    <Button className="w-full" onClick={uploadFile}>
                      Upload & Generate Link
                    </Button>
                    {/* Share URL Preview */}
                    {shareUrl ? (
                      <div className="rounded-xl bg-white p-3 text-xs text-slate-600 dark:bg-slate-950 dark:text-slate-200">
                        <div className="font-bold mb-1">Share link:</div>
                        <div className="break-all font-mono">{shareUrl}</div>

                        {expiresAt && (
                          <div className="mt-2 text-[11px] opacity-80">
                            Expires: {new Date(expiresAt).toLocaleString()}
                          </div>
                        )}

                        <div className="mt-2 flex gap-2">
                          <Button
                            variant="secondary"
                            onClick={() =>
                              navigator.clipboard.writeText(shareUrl)
                            }
                          >
                            Copy link
                          </Button>
                          <Button
                            onClick={() => (window.location.href = shareUrl)}
                          >
                            Open
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl bg-white p-3 text-xs text-slate-600 dark:bg-slate-950 dark:text-slate-200">
                        Example link:{" "}
                        <span className="font-bold">
                          slighturl.com/download?XXXX..
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Security Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl">🔒</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Security you can trust</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    HTTPS links • safe redirects • privacy-friendly defaults
                  </p>
                </div>
              </div>
              <Button variant="secondary" className="whitespace-nowrap">
                Learn more →
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
