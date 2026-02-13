import React from "react";
import { Search } from "lucide-react";

const FAQSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full max-w-xl">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Search FAQs..."
        className="w-full pl-12 pr-4 py-3 text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default FAQSearch;
