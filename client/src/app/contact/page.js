import { Mail, Globe, Users } from "lucide-react";
import { AdPlacement } from "@/components/AdSlots";
import Navbar from "@/components/Navbar";
import Badge from "@/components/Badge";
import Card from "@/components/Card";
// import Input from "@/components/Input";
// import Button from "@/components/Button";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact SlightURL — Partnerships, Sponsorships & Enterprise Pricing",
  description:
    "Get in touch with our team for partnerships, sponsored content opportunities, and enterprise pricing solutions.",
};

// This will be a client component that handles interactivity
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Navbar />

      <main className="container mx-auto px-4 py-16 md:py-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge tone="sky" className="mb-6 animate-slide-up">
            🤝 Partnership Opportunities
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Let's Build Something
            </span>
            <span className="block mt-2">Amazing Together</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400">
            Whether you're interested in partnerships, sponsored content, or
            enterprise solutions, we're here to help scale your business with
            intelligent link management.
          </p>
        </div>

        {/* AD PLACEMENT 1: Top of Contact Form */}
        <div className="mb-8">
          <AdPlacement
            position="Contact Page Top"
            size="728x90"
            recommended="Sponsorship opportunities ad"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          {/* <div className="space-y-6">
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">General Inquiries</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">For all questions</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                support@slighturl.com
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Response time: within 24 hours
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Partnerships</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Brand collaborations</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                partnerships@slighturl.com
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Let's explore synergies
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Enterprise</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Custom solutions</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                enterprise@slighturl.com
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Volume pricing available
              </p>
            </Card>
          </div> */}

          {/* Contact Form (Client Component) */}
          <div className="lg:col-span-4">
            <ContactForm />
          {/* </div> */}

          {/* <div className="lg:col-span-2"> */}
            {/* AD PLACEMENT 2: After Contact Form */}
            <div className="mt-8">
              <AdPlacement
                position="Contact Form Bottom"
                size="300x250"
                recommended="Sponsored partnership ad"
              />
            </div>
          </div>
          {/* <div className="lg:col-span-2">
            <div className="mt-8">
              <AdPlacement
                position="Contact Form Bottom"
                size="300x250"
                recommended="Sponsored partnership ad"
              />
            </div>
          </div> */}
        </div>

        {/* Stats Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  24h
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Avg. Response Time
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  150+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Active Partners
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  95%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Satisfaction Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                  $1M+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Revenue Shared
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
