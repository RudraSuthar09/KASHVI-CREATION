import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaYoutube, FaTwitter, FaGlobe } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-[#f8f4f0] text-[#6b3d2f]">
      {/* Newsletter Section */}
      <div className="bg-[#0a373b] text-white py-8 text-center">
        <h2 className="text-2xl font-semibold uppercase">
          Stay Updated on Our Elegant Collections
        </h2>
        <div className="mt-4 flex justify-center">
          <input
            type="email"
            placeholder="Enter your email address"
            className="px-4 py-2 rounded-l-md text-black focus:outline-none w-64"
          />
          <button className="bg-white text-[#0a373b] px-6 py-2 rounded-r-md font-semibold hover:bg-gray-200">
            Subscribe
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Contact Us & User Policy */}
        <div className="space-y-8">
          {/* Contact Us */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0" />
                <span>+91 93784 21333</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0" />
                <span>kashvicreation10@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="flex-shrink-0" />
                <span>
                  Shop No.113, Millennium Textile Market - 2, Ring Road, Surat -
                  395002
                </span>
              </div>
              <div className="flex items-start gap-3">
              <ul>
                <a
                  href="/contactus"
                  className="hover:text-[#0a373b] transition-colors"
                >
                Contact us
                </a>
              </ul>
              </div>
            </div>
          </div>

          {/* User Policy */}
          <div>
            <h2 className="text-xl font-semibold mb-4">User Policy</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-[#0a373b] transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-conditions"
                  className="hover:text-[#0a373b] transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/disclaimer"
                  className="hover:text-[#0a373b] transition-colors"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* More */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">More</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="/AboutUs"
                  className="hover:text-[#0a373b] transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/event"
                  className="hover:text-[#0a373b] transition-colors"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="/FAQ"
                  className="hover:text-[#0a373b] transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex gap-4">
            <a
                href="https://www.instagram.com/yourprofile" 
                className="text-[#0a373b] text-2xl hover:text-[#6b3d2f] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.threads.net/yourprofile" 
                className="text-[#0a373b] text-2xl hover:text-[#6b3d2f] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGlobe />
              </a>
              <a
                href="https://www.facebook.com/yourprofile" 
                className="text-[#0a373b] text-2xl hover:text-[#6b3d2f] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.youtube.com/yourchannel" 
                className="text-[#0a373b] text-2xl hover:text-[#6b3d2f] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
              <a
                href="https://twitter.com/yourprofile" 
                className="text-[#0a373b] text-2xl hover:text-[#6b3d2f] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Our Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Our Location</h2>
          <div className="aspect-video rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.3767175032663!2d72.84547657508517!3d21.177188780509614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e359c73988d%3A0x6d903fe43a38fde3!2sMillennium%20Textile%20Market%204!5e0!3m2!1sen!2sin!4v1739467722085!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>
      </div>

      {/* Branding & Socials */}
      <div className="border-t border-[#6b3d2f]/20 pt-8 pb-6">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-2">Kashvi Creations</h2>
          <p className="text-sm opacity-75">Crafting Elegance Since 1943</p>
          <p className="mt-8 text-sm opacity-75">
            Shop No. 6115 To 6124,Millennium Textile Market - 4,Bhathena,
            Surat-395002
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
