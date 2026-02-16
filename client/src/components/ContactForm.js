"use client";

import { useState } from "react";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";
import Badge from "./Badge";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    inquiryType: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    alert(`Message sent successfully!\n\nWe'll get back to you at ${formData.email} soon.`);
    
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      inquiryType: "",
      message: ""
    });
  };

  return (
    <Card className="p-8 shadow-2xl border-0">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Send us a Message
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            We'll get back to you within 24 hours
          </p>
        </div>
        <Badge tone="emerald">Priority Response</Badge>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              First Name
            </label>
            <Input 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John" 
              className="w-full px-4 py-3 rounded-xl border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Last Name
            </label>
            <Input 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe" 
              className="w-full px-4 py-3 rounded-xl border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <Input 
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com" 
            className="w-full px-4 py-3 rounded-xl border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Company
          </label>
          <Input 
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your Company Name" 
            className="w-full px-4 py-3 rounded-xl border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Inquiry Type
          </label>
          <select 
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
          >
            <option value="">Select an option</option>
            <option value="partnership">Partnership Opportunity</option>
            <option value="sponsorship">Sponsored Content</option>
            <option value="enterprise">Enterprise Pricing</option>
            <option value="technical">Technical Support</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Your Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
            placeholder="Tell us about your project or inquiry..."
            required
          />
        </div>

        <Button 
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 text-lg font-semibold rounded-xl"
        >
          ✨ Send Message
        </Button>
      </form>
    </Card>
  );
}