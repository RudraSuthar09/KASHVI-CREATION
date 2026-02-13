import React, { useEffect, useRef } from "react";
import Footer from "../../components/common/Footer";
import { Lock, Shield, Database, Share2, Cookie, Key, UserCheck } from "lucide-react";
import Head from "../../components/shopping-view/header";
import WhatsAppButton from "../../components/common/WhatsAppButton";
import Chatbot from "@/components/chatbot/chatbot";
const PrivacyPolicy = () => {
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
            <Lock className="text-[#6b3d2f] h-12 w-12" />
          </div>
          <h1 className="text-4xl font-bold text-[#6b3d2f] mt-4">
            Protecting Your Privacy
          </h1>
          <p className="mt-4 text-lg text-[#8b5e52] max-w-2xl mx-auto">
            At Kashvi Creations, we're committed to safeguarding your personal information and ensuring transparency in our data practices.
          </p>
        </div>

        {/* Scrolling Sections */}
        <div className="max-w-3xl mx-auto mt-12 space-y-4">
          {[
            {
              icon: <Shield />,
              title: "Our Privacy Commitment",
              content: "Your trust is our top priority. We maintain strict privacy standards and implement comprehensive measures to protect your personal information. Our commitment extends beyond legal requirements to ensure you feel secure while exploring our collection of fine textiles."
            },
            {
              icon: <Database />,
              title: "Information We Collect",
              content: "To provide you with a personalized shopping experience, we collect essential information such as your name, contact details, and shopping preferences. We also gather browsing data to understand how you interact with our website, helping us improve our services and curate collections that match your interests."
            },
            {
              icon: <Share2 />,
              title: "How We Use Your Information",
              content: "Your information helps us create a tailored shopping experience. We use it to process orders, provide customer support, and send personalized style recommendations. We analyze shopping patterns to improve our collection and ensure we meet your expectations for quality and design."
            },
            {
              icon: <Cookie />,
              title: "Cookie Policy & Tracking",
              content: "Our website uses cookies to enhance your browsing experience. These small files help us remember your preferences, maintain your shopping cart, and provide relevant content. You can manage cookie settings through your browser, though this may affect certain website features."
            },
            {
              icon: <Key />,
              title: "Data Security Measures",
              content: "We employ industry-standard encryption and security protocols to protect your data. Our systems are regularly updated and monitored to prevent unauthorized access. Your payment information is processed through secure, certified payment gateways."
            },
            {
              icon: <UserCheck />,
              title: "Your Privacy Rights",
              content: "You have complete control over your personal data. You can request access to your information, update your preferences, or ask for data deletion at any time. We respect your privacy choices and promptly respond to all data-related requests."
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
            Need More Information?
          </h2>
          <p className="text-[#8b5e52]">
            For any privacy-related questions or concerns, please contact our dedicated privacy team at{" "}
            <a href="mailto:privacy@kashvi.com" className="text-[#0a373b] font-medium hover:underline">
              privacy@kashvi.com
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

export default PrivacyPolicy;