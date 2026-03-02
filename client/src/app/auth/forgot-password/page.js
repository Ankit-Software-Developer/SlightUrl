"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Button from "@/components/Button";
import axios from "axios";
import { baseurl } from "@/utils/constant";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${baseurl}api/auth/forgot-password`,
        { email }, // ✅ object
        { headers: { "Content-Type": "application/json" } },
      );

      console.log(res.data);
      setIsSubmitted(true);
    } catch (err) {
      console.log(err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    // setTimeout(() => {
    //   alert(`Password reset email resent to ${email}`);
    //   setIsLoading(false);
    // }, 1000);
    try {
      const res = await axios.post(
        `${baseurl}api/auth/forgot-password`,
        { email }, // ✅ object
        { headers: { "Content-Type": "application/json" } },
      );

      console.log(res.data);
      alert(`Password reset email resent to ${email}`);
      setIsSubmitted(true);
    } catch (err) {
      console.log(err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Background Elements */}
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
                <Image
                  src="/logo1.png" // <-- put your logo in /public/logo.png
                  alt="SlightURL"
                  width={300}
                  height={80}
                  className="h-20 w-55 mr-3 object-contain"
                  priority
                />
              </div>
            </motion.div>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Reset your password
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-8 shadow-2xl border-0">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>

              {!isSubmitted ? (
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Forgot Password?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Enter your email address and we'll send you a link to
                      reset your password
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading || !email}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 text-lg font-semibold"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending reset link...
                        </span>
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                      📢 What to expect:
                    </h3>
                    <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Reset link valid for 24 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Check your spam folder if you don't see it</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Link expires after first use</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Check Your Email!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      We've sent a password reset link to:
                    </p>
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-2">
                      {email}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                      <h3 className="font-semibold mb-2">📋 Instructions:</h3>
                      <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2 pl-5 list-decimal">
                        <li>Open the email from SlightURL</li>
                        <li>Click the "Reset Password" button</li>
                        <li>Create your new password</li>
                        <li>Log in with your new credentials</li>
                      </ol>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleResend}
                        disabled={isLoading}
                        variant="secondary"
                        className="flex-1"
                      >
                        {isLoading ? "Resending..." : "Resend Email"}
                      </Button>
                      <Link href="/auth/login" className="flex-1">
                        <Button className="w-full">Back to Login</Button>
                      </Link>
                    </div>

                    <div className="text-center text-sm text-gray-500 dark:text-gray-500">
                      Didn't receive the email?{" "}
                      <button
                        onClick={handleResend}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Click to resend
                      </button>
                    </div>
                  </div>
                </>
              )}

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Still having trouble?{" "}
                    <Link
                      href="/contact"
                      className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Contact Support
                    </Link>
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Security Info */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span>
                Never share your password. We'll never ask for it via email.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
