"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

import Card from "@/components/Card";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { baseurl } from "@/utils/constant";

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const email = useMemo(() => searchParams.get("email") || "", [searchParams]);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const canSubmit =
    token &&
    email &&
    password.length >= 6 &&
    confirm.length >= 6 &&
    password === confirm &&
    !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token || !email) {
      setError("Invalid reset link. Please request a new password reset.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);

      // IMPORTANT: backend expects { email, token, password } (based on your controller)
      await axios.post(`${baseurl}api/auth/reset-password`, {
        email,
        token,
        password,
      });

      setDone(true);

      // optional auto-redirect
      setTimeout(() => router.push("/auth/login"), 1500);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Reset failed. The link may be expired. Please request again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-3"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur" />
                <div className="relative h-12 w-12 grid place-items-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold text-2xl">
                  S
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SlightURL
              </h1>
            </motion.div>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Set a new password
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <Card className="p-8 shadow-2xl border-0">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>

              {!done ? (
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">Reset Password</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Create a new password for your account.
                    </p>

                    {/* If link missing */}
                    {!token || !email ? (
                      <div className="mt-4 text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3">
                        This reset link is missing required information. Please go back and request a new reset email.
                      </div>
                    ) : (
                      <p className="mt-3 text-xs text-gray-500 dark:text-gray-500 break-all">
                        Resetting for: <span className="font-semibold">{email}</span>
                      </p>
                    )}
                  </div>

                  {error ? (
                    <div className="mb-5 flex items-start gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                      <div className="text-sm text-red-700 dark:text-red-300">
                        {error}
                      </div>
                    </div>
                  ) : null}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        New Password
                      </label>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                        Minimum 6 characters.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Confirm Password
                      </label>
                      <Input
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Confirm new password"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={!canSubmit}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 text-lg font-semibold"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Updating...
                        </span>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Remembered your password?{" "}
                    <Link href="/auth/login" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                      Log in
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">Password Updated</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      You can now log in with your new password.
                    </p>
                  </div>

                  <Link href="/auth/login">
                    <Button className="w-full">Go to Login</Button>
                  </Link>
                </>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
