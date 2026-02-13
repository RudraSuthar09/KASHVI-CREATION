import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import img1 from '../../components/images/19491-2.png';
import Footer from '../../components/common/Footer';
import Head from "../../components/shopping-view/header";
import WhatsAppButton from "../../components/common/WhatsAppButton";
import Chatbot from '@/components/chatbot/chatbot';
const AboutUs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heritageRef = useRef(null);

  const handleExploreClick = () => {
    heritageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // <div className="bg-gradient-to-b from-[#f8f4f0] to-white min-h-screen flex flex-col font-serif">
    //   {/* Enhanced Navbar */}
    //   <motion.nav
    //     initial={{ opacity: 0 }}
    //     animate={{ opacity: 1 }}
    //     className={`transition-all duration-300 ${
    //       scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    //     } py-6 px-8 fixed w-full top-0 z-50`}
    //   >
    //     <div className="max-w-7xl mx-auto flex justify-between items-center">
    //       <motion.h1
    //         initial={{ y: -50, opacity: 0 }}
    //         animate={{ y: 0, opacity: 1 }}
    //         transition={{ duration: 0.5 }}
    //         className="text-3xl font-bold text-[#c19a6b] font-serif"
    //       >
    //         Kashvi Creation
    //       </motion.h1>

    //       {/* Desktop Menu */}
    //       <ul className="hidden md:flex space-x-8 text-gray-800">
    //         {['Home', 'About', 'Collections', 'Contact'].map((item) => (
    //           <motion.li
    //             key={item}
    //             initial={{ y: -50, opacity: 0 }}
    //             animate={{ y: 0, opacity: 1 }}
    //             transition={{ duration: 0.5, delay: 0.1 * (['Home', 'About', 'Collections', 'Contact'].indexOf(item) + 1) }}
    //           >
    //             <a href="#" className="hover:text-[#c19a6b] transition-colors duration-300 relative group">
    //               {item}
    //               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c19a6b] transition-all duration-300 group-hover:w-full"></span>
    //             </a>
    //           </motion.li>
    //         ))}
          // </ul>

      //     {/* Mobile Menu Button */}
      //     <button className="md:hidden text-gray-800" onClick={() => setIsOpen(!isOpen)}>
      //       {isOpen ? <X size={24} /> : <Menu size={24} />}
      //     </button>
      //   </div>

      //   {/* Mobile Menu */}
      //   {isOpen && (
      //     <motion.div
      //       initial={{ opacity: 0 }}
      //       animate={{ opacity: 1 }}
      //       transition={{ duration: 0.3 }}
      //       className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm transition-all duration-300"
      //     >
      //       <ul className="py-4 px-8 space-y-4">
      //         {['Home', 'About', 'Collections', 'Contact'].map((item) => (
      //           <li key={item}>
      //             <a href="#" className="block text-gray-800 hover:text-[#c19a6b] transition-colors duration-300">
      //               {item}
      //             </a>
      //           </li>
      //         ))}
      //       </ul>
      //     </motion.div>
      //   )}
      // </motion.nav>
<div> <Head/>
      {/* Enhanced Hero Section */}
      <div className="relative h-screen flex items-center justify-center text-center text-white mt-16">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1700869228119-1bab9ba6fc9b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-6xl font-bold font-serif mb-6"
          >
             प्रेम और विश्वास का अनोखा संगम <span className="text-[#c19a6b]">Kashvi Creation</span>
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl mb-8 font-serif"
          > 
          </motion.p>
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={handleExploreClick}
            className="bg-[#c19a6b] hover:bg-[#a87b4d] text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Explore About us
          </motion.button>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div ref={heritageRef} className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative order-2 md:order-1"
          >
            <img 
              src={img1} 
              alt="Elegant Saree Collection" 
              className="rounded-lg shadow-2xl w-3/5 mx-auto object-cover"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#c19a6b]/10 rounded-lg -z-10" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#c19a6b]/10 rounded-lg -z-10" />
          </motion.div>
          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-4xl font-bold text-gray-900 font-serif">Our Heritage</h2>
            <div className="w-24 h-1 bg-[#c19a6b]" />
            <p className="text-lg text-gray-700 leading-relaxed">
              At Kashvi Creation, we weave stories of tradition with threads of innovation. Each saree in our collection 
              is a masterpiece that celebrates the rich heritage of Indian craftsmanship while embracing contemporary design sensibilities.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#f8f4f0] rounded-lg shadow-lg p-6 border border-[#e8e4e0]"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">1000+</h3>
                <p className="text-gray-600">Unique Designs</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#f8f4f0] rounded-lg shadow-lg p-6 border border-[#e8e4e0]"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">50+</h3>
                <p className="text-gray-600">Artisan Partners</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* New Section - Our Journey */}
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 font-serif">Our Journey</h2>
            <div className="w-24 h-1 bg-[#c19a6b]" />
            <p className="text-lg text-gray-700 leading-relaxed">
              Since our establishment, Kashvi Creation has been at the forefront of saree innovation. 
              Our journey began with a simple vision - to create sarees that tell stories. Today, we 
              proudly serve customers across India and internationally, bringing the rich heritage of 
              Indian textiles to the global stage.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Each piece in our collection is carefully curated, combining traditional craftsmanship 
              with contemporary designs. We work directly with artisans from various regions of India, 
              ensuring that every saree reflects the authentic essence of its origin.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <img 
              src={img1} 
              alt="Journey of Kashvi Creation" 
              className="rounded-lg shadow-2xl w-3/5 ml-auto object-cover"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#c19a6b]/10 rounded-lg -z-10" />
          </motion.div>
        </div>

        {/* Our Artisans Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative order-2 md:order-1"
          >
            <img 
              src={img1} 
              alt="Our Skilled Artisans" 
              className="rounded-lg shadow-2xl w-3/5 mr-auto object-cover"
            />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#c19a6b]/10 rounded-lg -z-10" />
          </motion.div>
          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-4xl font-bold text-gray-900 font-serif">Our Artisans</h2>
            <div className="w-24 h-1 bg-[#c19a6b]" />
            <p className="text-lg text-gray-700 leading-relaxed">
              Behind every Kashvi Creation saree is a team of skilled artisans who pour their heart 
              and soul into their craft. Many of our artisans come from families that have been 
              practicing these traditional techniques for generations, ensuring that each piece 
              carries forward India's rich textile heritage.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We take pride in providing fair wages and sustainable working conditions for our 
              artisans, supporting not just their craft but their communities as well. Through 
              our work, we aim to preserve and promote these ancient crafting techniques for 
              future generations.
            </p>
          </div>
        </div>

        {/* Our Commitment Section */}
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-gray-900 font-serif">Our Commitment</h2>
          <div className="w-24 h-1 bg-[#c19a6b] mx-auto" />
          <p className="text-lg text-gray-700 leading-relaxed">
            At Kashvi Creation, our commitment extends beyond creating beautiful sarees. We are 
            dedicated to sustainable practices, using eco-friendly materials and processes wherever 
            possible. Our packaging is minimalist and recyclable, reflecting our responsibility 
            towards the environment.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We believe in transparency and authenticity in all our dealings. Each saree comes with 
            detailed information about its origin, the techniques used in its creation, and the 
            artisans who crafted it. This connection between the creator and the wearer is what 
            makes each Kashvi Creation piece special.
          </p>
          <div className="grid grid-cols-3 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-[#f8f4f0] rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">Premium materials and expert craftsmanship</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 bg-[#f8f4f0] rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600">Eco-friendly practices and materials</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 bg-[#f8f4f0] rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">Heritage</h3>
              <p className="text-gray-600">Preserving traditional craftsmanship</p>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Enhanced Footer */}
      <div className="fixed bottom-4 right-4 z-50">
        <Chatbot/>
    <WhatsAppButton />
  </div>
      <Footer />
    </div>
  );
};

export default AboutUs;