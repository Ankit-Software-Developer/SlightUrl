"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Zap,
  Shield,
  Users,
  Globe,
  Link as LinkIcon,
} from "lucide-react";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import axios from "axios";
import { baseurl } from "@/utils/constant";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AlertBox from "@/components/alertbox";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [alert, setAlert] = useState({
    type: "success",
    message: "",
  });

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const hideAlert = () => {
    setAlert({ ...alert, message: "" });
  };
  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Track clicks, locations, devices, and referral sources.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Links",
      description:
        "HTTPS encryption, password protection, and expiration dates.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Custom Domains",
      description: "Use your own domain for branded, trustworthy links.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Share links with team members and manage permissions.",
    },
  ];

  const stats = [
    { value: "10M+", label: "Links Shortened" },
    { value: "50K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "150+", label: "Countries" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await axios.post(`${baseurl}api/auth/login`, {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      const { token, user } = resp.data;
      // console.log(resp);
      if (token) {
        Cookies.set("slightUrl_token", token, {
          expires: 30,
          sameSite: "lax",
        });
        showAlert("success", `Welcome ${user.name}! Account created 🎉`);
        setTimeout(() => router.push("/dashboard"), 1200);
      }
    } catch (err) {
      showAlert("error", err?.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSSO = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      alert(`Redirecting to ${provider} authentication...`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Information Panel */}
        <div className="hidden lg:flex flex-col bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 md:p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl" />

          <div className="relative z-10 flex-1">
            {/* Header */}
            <Link href="/" className="inline-flex items-center gap-3 mb-12">
              <div className="w-55 bg-white rounded-xl flex items-center justify-center">
                <Image
                  src="/logo1.png" // <-- put your logo in /public/logo.png
                  alt="SlightURL"
                  width={300}
                  height={80}
                  className="h-20 w-45 object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg"
            >
              <Badge tone="white" className="mb-6">
                🚀 Welcome Back
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Short Links,
                <span className="block mt-2">Big Insights</span>
              </h1>

              <p className="text-xl text-white/90 mb-10">
                Access your dashboard to manage links, view analytics, and
                monetize your content with our intelligent platform.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  >
                    <div className="text-white mb-2">{feature.icon}</div>
                    <h3 className="font-semibold text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/70">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">AJ</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Alex Johnson</div>
                    <div className="text-sm text-white/70">
                      Marketing Director
                    </div>
                  </div>
                </div>
                <p className="text-white/90 italic">
                  "SlightURL helped us increase our campaign CTR by 42%. The
                  analytics are incredibly detailed and the monetization options
                  are game-changing."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="relative z-10 pt-6 border-t border-white/20">
            <div className="flex items-center justify-between text-white/70 text-sm">
              <span>© 2024 SlightURL. All rights reserved.</span>
              <div className="flex gap-4">
                <Link href="/terms" className="hover:text-white">
                  Terms
                </Link>
                <Link href="/privacy" className="hover:text-white">
                  Privacy
                </Link>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Panel */}
        <div className="flex items-center justify-center p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-8 text-center">
              <Link href="/" className="inline-block">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">S</span>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    SlightURL
                  </span>
                </div>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Short links, big insights
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 shadow-xl border-0">
                <div className="text-center mb-8">
                  <Badge tone="sky" className="mb-4">
                    🔐 Secure Login
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Welcome Back
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Log in to access your dashboard and analytics
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
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Password
                      </label>
                      <Link
                        href="/auth/forgot-password"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="rememberMe"
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                      >
                        Remember me for 30 days
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Secure</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 text-lg font-semibold"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Signing in...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Sign In <ArrowRight className="ml-2 w-5 h-5" />
                      </span>
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* SSO Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => handleSSO("Google")}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 py-3"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => handleSSO("Microsoft")}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 py-3"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 23 23">
                      <path fill="#f35325" d="M1 1h10v10H1z" />
                      <path fill="#81bc06" d="M12 1h10v10H12z" />
                      <path fill="#05a6f0" d="M1 12h10v10H1z" />
                      <path fill="#ffba08" d="M12 12h10v10H12z" />
                    </svg>
                    Microsoft
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link
                      href="/auth/signup"
                      className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Sign up for free
                    </Link>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    By continuing, you agree to our{" "}
                    <Link href="/terms" className="hover:underline">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </Card>

              {/* Mobile Features */}
              <div className="lg:hidden mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                  <div className="text-blue-600 dark:text-blue-400 text-2xl mb-2">
                    ⚡
                  </div>
                  <div className="text-sm font-semibold">Instant Setup</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Start in 60 seconds
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                  <div className="text-green-600 dark:text-green-400 text-2xl mb-2">
                    📈
                  </div>
                  <div className="text-sm font-semibold">
                    Advanced Analytics
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Track every click
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <AlertBox type={alert.type} message={alert.message} onClose={hideAlert} />
    </div>
  );
}
