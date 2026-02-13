"use client"
import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react"
import Footer from '../../components/common/Footer';
import Head from "../../components/shopping-view/header";
import WhatsAppButton from "../../components/common/WhatsAppButton";
import Chatbot from '@/components/chatbot/chatbot';
export default function Events() {
  const events = [
    {
      id: 1,
      title: "Traditional Saree Exhibition 2024",
      date: "January 15-20, 2024",
      location: "Grand Convention Center, Mumbai",
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Discover the rich heritage of traditional Indian sarees featuring master weavers from across the country.",
      time: "10:00 AM - 8:00 PM",
    },
    {
      id: 2,
      title: "Modern Draping Masterclass",
      date: "February 5, 2024",
      location: "Fashion Studio, Delhi",
      image: "/placeholder.svg?height=400&width=600",
      description: "Learn innovative draping styles from celebrity stylists and fashion experts.",
      time: "2:00 PM - 6:00 PM",
    },
    {
      id: 3,
      title: "Bridal Saree Showcase",
      date: "March 10-12, 2024",
      location: "Luxury Hotel, Bangalore",
      image: "/placeholder.svg?height=400&width=600",
      description: "Exclusive showcase of designer bridal sarees and wedding collection.",
      time: "11:00 AM - 9:00 PM",
    },
  ]

  return (
    <div>
      <Head/>
    <div className="min-h-screen bg-[#f8f4f0] py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join us at our exclusive events and exhibitions to explore the wonderful world of sarees
          </p>
        </motion.div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1) }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-muted-foreground mb-4">{event.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <button className="mt-6 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <Chatbot/>
        <WhatsAppButton/>
        <Footer />
      </div>
    </div>
    </div>
  )
}
