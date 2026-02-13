import React, { useEffect, useRef } from "react";
import Footer from "../../components/common/Footer";
import { BookText, Scale, ShoppingBag, CreditCard, RefreshCcw, Copyright, GavelIcon, FileText, BoxIcon, TruckIcon } from "lucide-react";
import Head from "../../components/shopping-view/header";
import WhatsAppButton from "../../components/common/WhatsAppButton";
import Chatbot from "@/components/chatbot/chatbot";
const TermsConditions = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      sectionsRef.current.forEach(section => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const startExpand = windowHeight * 0.8;
        const fullExpand = windowHeight * 0.3;
        
        let scale;
        if (rect.top > startExpand) {
          scale = 0.8;
        } else if (rect.top < fullExpand) {
          scale = 1;
        } else {
          scale = 0.8 + (0.2 * ((startExpand - rect.top) / (startExpand - fullExpand)));
        }
        
        section.style.transform = `scale(${scale})`;
        section.style.opacity = scale;
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

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
            <BookText className="text-[#6b3d2f] h-12 w-12" />
          </div>
          <h1 className="text-4xl font-bold text-[#6b3d2f] mt-4">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-lg text-[#8b5e52] max-w-2xl mx-auto">
            Welcome to Kashvi Creations. These terms establish our commitments to you and your responsibilities as our valued customer.
          </p>
        </div>

        {/* Scrolling Sections */}
        <div className="max-w-3xl mx-auto mt-12 space-y-8">
          {[
            {
              icon: <FileText />,
              title: "Agreement to Terms",
              content: "By accessing or using Kashvi Creations' website and services, you acknowledge that you have read, understood, and agree to be bound by these terms. These terms form a legally binding agreement between you and Kashvi Creations for your use of our website and services."
            },
            {
              icon: <ShoppingBag />,
              title: "Product Information",
              content: "Each saree in our collection is unique and handcrafted, making slight variations in color, texture, and design inherent to the product. While we strive to display colors accurately, we cannot guarantee that your device's display accurately reflects the actual colors. Measurements provided are approximate, and slight variations are normal for handcrafted items."
            },
            {
              icon: <CreditCard />,
              title: "Pricing & Payments",
              content: "All prices are listed in the specified currency and are subject to change without prior notice. Payment must be made through our secure payment gateway. Orders are processed only after successful payment confirmation. Additional charges such as customs duties or taxes may apply for international orders and are the responsibility of the customer."
            },
            {
              icon: <TruckIcon />,
              title: "Shipping & Delivery",
              content: "We partner with reliable courier services to ensure safe delivery of your products. Delivery times are estimates and may vary based on your location and other factors. Risk of loss and title for items purchased pass to you upon delivery to the carrier. We provide tracking information for all shipments."
            },
            {
              icon: <RefreshCcw />,
              title: "Returns & Exchanges",
              content: "We accept returns within 7 days of delivery for unused items in their original packaging. Custom orders and sale items are final sale. Returned items must be in their original condition with all tags attached. Shipping costs for returns are the customer's responsibility unless the item received was defective."
            },
            {
              icon: <Copyright />,
              title: "Intellectual Property",
              content: "All content on our website, including but not limited to text, graphics, logos, images, and software, is the property of Kashvi Creations and is protected by copyright laws. You may not reproduce, distribute, modify, or create derivative works without our explicit permission."
            },
            {
              icon: <Scale />,
              title: "Dispute Resolution",
              content: "Any disputes arising from your use of our website or services will be governed by the laws of [Jurisdiction]. We encourage you to contact us first to resolve any issues amicably. Any legal proceedings must be filed in the courts of [Jurisdiction]."
            }
          ].map((section, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg transform-gpu transition-all duration-300 ease-out"
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
        <div 
          ref={addToRefs}
          className="mt-12 text-center bg-white/60 backdrop-blur-sm p-8 rounded-xl shadow-lg transform-gpu transition-all duration-300 ease-out"
        >
          <h2 className="text-2xl font-semibold text-[#6b3d2f] mb-4">
            Questions About Our Terms?
          </h2>
          <p className="text-[#8b5e52]">
            If you have any questions about these terms, please contact our customer service team at{" "}
            <a href="mailto:support@kashvi.com" className="text-[#0a373b] font-medium hover:underline">
              support@kashvi.com
            </a>
          </p>
        </div>
      </main>
      <Chatbot />
      <WhatsAppButton />
      <Footer />
    </div>
  );
};
export default TermsConditions;