"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Digital Marketer",
    company: "Growth Hacks Inc.",
    avatar: "AM",
    rating: 5,
    content: "SlightURL transformed how we track campaigns. The analytics dashboard is incredibly detailed, and the ad monetization is perfectly balanced.",
    revenue: "+$45K",
    color: "from-blue-500 to-cyan-500",
    delay: 0.1
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Content Creator",
    company: "TechTube",
    avatar: "SC",
    rating: 5,
    content: "As a creator, I love how I can monetize my links without annoying my audience. The light interstitial option is genius!",
    revenue: "+$12K/month",
    color: "from-purple-500 to-pink-500",
    delay: 0.2
  },
  {
    id: 3,
    name: "Marcus Rodriguez",
    role: "E-commerce Owner",
    company: "StyleTrend",
    avatar: "MR",
    rating: 4,
    content: "The branded domains feature increased our click-through rates by 38%. Customer trust has never been higher.",
    revenue: "+62% CTR",
    color: "from-green-500 to-emerald-500",
    delay: 0.3
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "SaaS Founder",
    company: "CloudScale",
    avatar: "PS",
    rating: 5,
    content: "We switched from Bitly and never looked back. The revenue from dashboard ads alone covers our subscription.",
    revenue: "100% ROI",
    color: "from-amber-500 to-orange-500",
    delay: 0.4
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Non-Profit Director",
    company: "HopeFoundation",
    avatar: "JW",
    rating: 3,
    content: "Even our non-profit benefits from the free tier. The analytics help us understand our donor engagement better.",
    revenue: "+300% Donations",
    color: "from-red-500 to-rose-500",
    delay: 0.5
  },
  {
    id: 6,
    name: "Lisa Park",
    role: "Agency Owner",
    company: "DigitalPeak",
    avatar: "LP",
    rating: 4,
    content: "Client reporting became 10x easier. The export features and white-label options are perfect for our agency.",
    revenue: "+25 Clients",
    color: "from-indigo-500 to-blue-500",
    delay: 0.6
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);
  if (visibleTestimonials.length < 3) {
    visibleTestimonials.push(...testimonials.slice(0, 3 - visibleTestimonials.length));
  }

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Trusted by 50K+ Users
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Loved by Marketers & Creators
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            See how businesses of all sizes are transforming their link management
            and generating revenue with SlightURL
          </p>
        </motion.div>

        {/* Carousel Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold">Success Stories</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Showing {currentIndex + 1}-{Math.min(currentIndex + 3, testimonials.length)} of {testimonials.length}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: testimonial.delay }}
                onMouseEnter={() => setHoveredCard(testimonial.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative ${
                  hoveredCard && hoveredCard !== testimonial.id ? "opacity-75" : "opacity-100"
                } transition-all duration-300`}
              >
                <Card className="h-full p-6 hover:shadow-2xl transition-shadow duration-300">
                  {/* Background gradient effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-5 rounded-xl`} />
                  
                  {/* Avatar with gradient border */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`relative bg-gradient-to-br ${testimonial.color} p-0.5 rounded-full`}>
                          <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                            <span className="font-bold text-gray-800 dark:text-gray-200">
                              {testimonial.avatar}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.role}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                      
                      {/* Revenue badge */}
                      <div className={`bg-gradient-to-r ${testimonial.color} text-white text-sm font-bold px-3 py-1 rounded-full`}>
                        {testimonial.revenue}
                      </div>
                    </div>

                    {/* Rating stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-gray-300 text-gray-300 dark:fill-gray-700 dark:text-gray-700"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Testimonial content */}
                    <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Platform indicators */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                          <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                          <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Uses: Analytics, Ads, Domains
                        </span>
                      </div>
                      
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Verified User
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 w-8"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  4.6/5
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Average Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  94%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Customer Satisfaction
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  3.2%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Average Ad CTR
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Support Response
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AD PLACEMENT COMMENT */}
        {/* This is a perfect spot for a testimonial-style native ad */}
        {/* <div className="mt-12">
          <AdPlacement 
            position="After Testimonials" 
            size="728x90 or 970x90" 
            recommended="Native ad matching testimonials style"
          />
        </div> */}
      </div>
    </section>
  );
}