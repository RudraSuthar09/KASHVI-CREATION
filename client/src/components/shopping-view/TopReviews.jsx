import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TopReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchTopReviews = async () => {
      try {
        const response = await axios.get("/api/shop/review/top-reviews");
        setReviews(response.data.data);
      } catch (error) {
        console.error("Error fetching top reviews:", error);
        setError("Failed to load top reviews. Please try again later.");
      }
    };

    fetchTopReviews();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -400 : 400, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full p-6 bg-gray-100">
      <h2 className="text-xl font-semibold mb-4">Top Reviews</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="relative">
          <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10">
            <FaChevronLeft size={20} />
          </button>

          <div ref={scrollRef} className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth px-8">
            {reviews.length > 0 ? (
              reviews
                .filter((review) => review.reviewValue === 5)
                .map((review, index) => (
                  <div key={review._id} className={`p-6 shadow-md rounded-lg min-w-[400px] max-w-md ${index % 2 === 0 ? 'bg-gray-50' : 'bg-[#F8F4F0]'}`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 text-gray-800 font-bold uppercase">
                        {review.userName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{review.userName}</h3>
                      </div>
                    </div>
                    <p className="mt-2 font-semibold">{review.reviewTitle}</p>
                    <p className="text-gray-600 text-sm mt-1">{review.reviewMessage}</p>
                    <div className="text-yellow-500 mt-2">★★★★★</div>
                  </div>
                ))
            ) : (
              <p>No 5-star reviews yet!</p>
            )}
          </div>

          <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10">
            <FaChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TopReviews;