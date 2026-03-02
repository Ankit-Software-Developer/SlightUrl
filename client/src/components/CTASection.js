"use client";

import { motion } from "framer-motion";
import Button from "./Button";

export default function CTASection() {
  return (
    <section className="py-5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-90" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          
          {/* Floating Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Links?
            </motion.h2>
            
            <motion.p 
              className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Start shortening links, tracking analytics, and QR Codes — all in one platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl">
                Get Started Free
              </Button>
              <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30 px-8 py-4 text-lg font-semibold rounded-xl border-white/30">
                Schedule Demo
              </Button>
            </motion.div>

            <motion.p 
              className="text-white/70 mt-8 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              No credit card required • free trial available • Cancel anytime
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}