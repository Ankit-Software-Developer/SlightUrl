"use client";

import { motion } from "framer-motion";
import Card from "./Card";
import Button from "./Button";
import { Shield, Zap, Users, BarChart } from "lucide-react";

export default function EnterpriseSection() {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "SOC 2 compliant, SSO, audit logs, and dedicated security team.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Custom SLAs",
      description: "99.9% uptime guarantee with priority support and escalation.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Management",
      description: "Advanced roles, permissions, and collaboration tools.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Custom reporting, API access, and data export capabilities.",
      color: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Enterprise-Grade Solutions
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Custom solutions for large organizations with complex link management needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full p-6 hover:shadow-xl transition-shadow">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="max-w-4xl mx-auto p-8 border-2 border-dashed border-blue-300 dark:border-blue-700">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Need Custom Pricing?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                For large organizations with unique requirements, our enterprise team
                can create a custom plan tailored to your specific needs.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Volume discounts available</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Custom contract terms</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Dedicated account manager</span>
                </li>
              </ul>
            </div>
            <div className="text-center lg:text-right">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg">
                Contact Enterprise Sales
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Typically responds within 2 hours
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}