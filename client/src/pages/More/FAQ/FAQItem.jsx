import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md transition-all">
      {/* Question */}
      <button
        className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-100 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base font-medium text-gray-900">{faq.question}</span>
        <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} size={20} />
      </button>

      {/* Answer - Animated */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-5 bg-gray-50 border-t border-gray-200 text-gray-600">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQItem;
