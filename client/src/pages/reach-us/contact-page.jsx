"use client"

import { motion } from "framer-motion"
import { MapPin, Mail, Phone, MessageSquare } from "lucide-react"
import { useState } from "react"
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import Footer from '../../components/common/Footer';
import Head from "../../components/shopping-view/header";
import WhatsAppButton from "../../components/common/WhatsAppButton";
export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div>
      <Head/>
<div className="min-h-screen bg-[#f8f4f0]">

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl font-bold mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-muted-foreground text-lg"
          >
            Email, call, or complete the form to learn how we can solve your messaging problem.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form - Now on the left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="bg-gray-50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="How can we help?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-[120px] bg-gray-50"
                />
              </div>
<Button type="submit" className="w-full bg-[#0a373b] hover:bg-[#0a373b]">


                Send Message
              </Button>
            </form>
          </motion.div>

          {/* Map and Contact Info - Now separated */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
                <div className="aspect-square rounded-xl overflow-hidden h-64 w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.3767175032663!2d72.84547657508517!3d21.177188780509614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e359c73988d%3A0x6d903fe43a38fde3!2sMillennium%20Textile%20Market%204!5e0!3m2!1sen!2sin!4v1739467722085!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
<MapPin className="h-5 w-5 text-[#0a373b]" />


                    <p>123 Business Street, San Francisco, CA 94105</p>
                  </div>
                  <div className="flex items-center space-x-3">
<Mail className="h-5 w-5 text-[#0a373b]" />


                    <p>contact@company.com</p>
                  </div>
                  <div className="flex items-center space-x-3">
<Phone className="h-5 w-5 text-[#0a373b]" />


                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Support Sections - MessageSquare adjusted upwards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          {[
            {
              title: "Customer Support",
              description: "Our support team is available 24/7 to assist with any concerns or queries you may have."
            },
            {
              title: "Feedback and Suggestions",
              description: "We value your feedback and are continuously working to improve our services."
            },
            {
              title: "Media Inquiries",
              description: "For media-related questions or press inquiries, please contact our media team."
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow relative"
            >
<MessageSquare className="h-8 w-8 text-[#0a373b] absolute -top-4 left-6 bg-white p-1 rounded-lg shadow-md" />


              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.section>
      <WhatsAppButton/>
      <Footer />
    </div>
    </div>
  )
}
