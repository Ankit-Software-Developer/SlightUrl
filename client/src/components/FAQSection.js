"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does the ad monetization work?",
    answer: "We offer responsible monetization through dashboard ads, public page placements, and optional light interstitials (0-2 seconds). Premium users can disable ads completely.",
    category: "Monetization"
  },
  {
    question: "Can I use my own domain?",
    answer: "Yes! All paid plans include custom domain support. You can connect unlimited domains on Business and Enterprise plans.",
    category: "Domains"
  },
  {
    question: "What analytics do you provide?",
    answer: "We provide detailed analytics including click counts, geographic data, device breakdown, referral sources, and custom UTM parameter tracking.",
    category: "Analytics"
  },
  {
    question: "Is there an API available?",
    answer: "Yes, we offer a comprehensive REST API on Pro and higher plans. Enterprise plans include GraphQL API and dedicated support.",
    category: "API"
  },
  {
    question: "How secure is my data?",
    answer: "We use enterprise-grade encryption, regular security audits, and comply with global data protection regulations. All data is encrypted at rest and in transit.",
    category: "Security"
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely. You can cancel your subscription at any time. You'll retain access to premium features until the end of your billing period.",
    category: "Billing"
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get answers to common questions about SlightURL's features and pricing
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 bg-white dark:bg-gray-900 rounded-xl hover:shadow-lg transition-shadow flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full">
                    {faq.category}
                  </span>
                  <span className="font-bold text-lg">{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
                      <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400">
            Still have questions?{" "}
            <a href="/contact" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Contact our support team →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}