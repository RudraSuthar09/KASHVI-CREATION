import React, { useEffect, useRef } from "react";
import Footer from "../../components/common/Footer";
import { ShieldAlert, ScrollText, ExternalLink, Scale, Tag, Clock } from "lucide-react";
import Head from "../../components/shopping-view/header";
import WhatsAppButton from "../../components/common/WhatsAppButton";
import Chatbot from "@/components/chatbot/chatbot";
const Disclaimer = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      sectionsRef.current.forEach((section, index) => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const startExpand = windowHeight * 0.8; // Start expansion when element is 80% up the screen
        const fullExpand = windowHeight * 0.3;  // Full size when element is 30% up the screen
        
        let scale;
        if (rect.top > startExpand) {
          scale = 0.8; // Initial small size
        } else if (rect.top < fullExpand) {
          scale = 1; // Full size
        } else {
          // Smooth scaling between small and full size
          scale = 0.8 + (0.2 * ((startExpand - rect.top) / (startExpand - fullExpand)));
        }
        
        section.style.transform = `scale(${scale})`;
        section.style.opacity = scale;
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f4f0] to-[#f0e9e4]">
      <Head />
      <main className="container mx-auto px-4 py-12">
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-[#f8f4f0] to-transparent py-6 text-center">
          <div className="inline-block p-4 bg-white/50 rounded-full shadow-lg">
            <ShieldAlert className="text-[#6b3d2f] h-12 w-12" />
          </div>
          <h1 className="text-4xl font-bold text-[#6b3d2f] mt-4">
            Our Commitment to Transparency
          </h1>
        </div>

        {/* Scrolling Sections */}
        <div className="max-w-3xl mx-auto mt-6 space-y-1">
          {[
            {
              icon: <ScrollText />,
              title: "About Our Information",
              content: "Welcome to Kashvi Creations, where we take pride in bringing you authentic Indian craftsmanship. While we strive to maintain the highest standards of accuracy in presenting our collection, please note that the information provided here serves as a general guide."
            },
            {
              icon: <ExternalLink />,
              title: "Connected Resources",
              content: "Our website features carefully chosen links to complementary resources and partners in the textile industry. While these connections enrich your shopping experience, we maintain our independence from these external platforms."
            },
            {
              icon: <Scale />,
              title: "Our Responsibility",
              content: "As a curator of fine textiles, Kashvi Creations is dedicated to providing an exceptional shopping experience. We carefully manage our platform to ensure accuracy and quality."
            },
            {
              icon: <Tag />,
              title: "Product Imagery & Descriptions",
              content: "Each saree in our collection is photographed to showcase its true beauty. Due to variations in screen settings and the handcrafted nature of our products, slight variations in color and texture may occur."
            },
            {
              icon: <Clock />,
              title: "Dynamic Pricing & Offers",
              content: "To provide you with the best value, our pricing and promotional offers are regularly reviewed and updated. These adjustments reflect market conditions, seasonal collections, and special occasions."
            }
          ].map((section, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg transform-gpu transition-all duration-300 ease-out origin-bottom"
              style={{
                transformOrigin: 'center bottom',
                willChange: 'transform, opacity'
              }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#6b3d2f]/10 rounded-lg shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#6b3d2f] mb-2">
                    {section.title}
                  </h2>
                  <p className="text-[#8b5e52] leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className="text-[#8b5e52]">
            Questions? Contact us at{" "}
            <a href="mailto:hello@kashvi.com" className="text-[#0a373b] font-medium hover:underline">
              hello@kashvi.com
            </a>
          </p>
        </div>
      </main>
      <Chatbot/>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Disclaimer;