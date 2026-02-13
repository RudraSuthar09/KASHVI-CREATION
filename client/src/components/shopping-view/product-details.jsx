import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import StarRatingComponent from "../common/star-rating";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const MAGNIFIER_SIZE = 200;
  const ZOOM = 2;

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMagnifierPosition({ x, y });
  };

  useEffect(() => {
    if (open && productDetails?._id) {
      dispatch(getReviews(productDetails._id));
    }
  }, [open, productDetails, dispatch]);

  const handleRatingChange = (getRating) => {
    setRating(getRating);
  };

  const handleAddToCart = (getCurrentProductId) => {
    if (!user?._id) {
      toast({
        title: "Login Required",
        description: "Please log in to add items to cart.",
        variant: "destructive",
      });
      return;
    }

    dispatch(addToCart({ userId: user._id, productId: getCurrentProductId, quantity: 1 }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user._id));
          toast({
            title: "Added to Cart",
            description: "The product has been added to your cart.",
            variant: "success",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to add product to cart.",
            variant: "destructive",
          });
        }
      })
      .catch(() => {
        toast({
          title: "Something went wrong!",
          description: "Please try again later.",
          variant: "destructive",
        });
      });
  };

  const handleAddReview = async () => {
    if (!user?._id) {
      toast({
        title: "Login Required",
        description: "Please log in to submit a review.",
        variant: "destructive",
      });
      return;
    }

    if (!reviewMsg.trim() || rating === 0) {
      toast({
        title: "Incomplete Review",
        description: "Please add a review message and select a rating.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await dispatch(
        addReview({
          productId: productDetails?._id,
          userId: user._id,
          userName: user?.userName || "Anonymous",
          reviewMessage: reviewMsg.trim(),
          reviewValue: rating,
        })
      );

      if (response.payload?.success) {
        setRating(0);
        setReviewMsg("");
        await dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review Added",
          description: "Thank You! Your review has been successfully submitted!",
          variant: "success",
        });
      } else {
        throw new Error(response.payload?.message || "Failed to add review");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + (reviewItem.reviewValue || 0), 0) / reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="flex p-0 max-w-[1200px] h-[90vh] overflow-hidden">
        {/* Product Image (Left) */}
        <div className="w-1/2 h-full bg-[#F8F4F0]">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="h-full"
            onSlideChange={(swiper) => setCurrentImage(swiper.activeIndex)}
          >
            {productDetails?.media?.map((media, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative h-full flex items-center justify-center"
                  onMouseEnter={() => setShowMagnifier(true)}
                  onMouseLeave={() => setShowMagnifier(false)}
                  onMouseMove={handleMouseMove}
                  ref={index === currentImage ? imageRef : null}
                >
                  {
                    media ? (
                      media.endsWith(".mp4") || media.endsWith(".mov") ? (
                        <video
                          src={media}
                          autoPlay
                          muted
                          loop
                          playsInline
                          alt={productDetails?.title}
                          className="object-contain max-h-full"
                        />
                      ) : (
                        <img
                          src={media || "/placeholder.svg"}
                          alt={productDetails?.title}
                          className="object-contain max-h-full"
                        />
                      )
                    ) : (
                      <img
                        src="/placeholder.svg"
                        alt={productDetails?.title}
                        className="object-contain max-h-full"
                      />
                    )
                  }

{showMagnifier && index === currentImage && media && 
  (media.endsWith(".jpg") || media.endsWith(".jpeg") || media.endsWith(".png") || media.endsWith(".webp")) && (
    <div
      className="absolute pointer-events-none"
      style={{
        width: `${MAGNIFIER_SIZE}px`,
        height: `${MAGNIFIER_SIZE}px`,
        left: `${magnifierPosition.x - MAGNIFIER_SIZE / 2}px`,
        top: `${magnifierPosition.y - MAGNIFIER_SIZE / 2}px`,
        border: "2px solid #fff",
        borderRadius: "50%",
        overflow: "hidden",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        zIndex: 50,
      }}
    >
      <img
        src={media || "/placeholder.svg"}
        alt={productDetails?.title}
        style={{
          width: `${imageRef.current?.offsetWidth * ZOOM}px`,
          height: `${imageRef.current?.offsetHeight * ZOOM}px`,
          maxWidth: "none",
          maxHeight: "none",
          position: "absolute",
          left: `${-magnifierPosition.x * ZOOM + MAGNIFIER_SIZE / 2}px`,
          top: `${-magnifierPosition.y * ZOOM + MAGNIFIER_SIZE / 2}px`,
        }}
      />
    </div>
  )}

                </div>
              </SwiperSlide>
            ))}
            <style jsx>{`
              .swiper-button-next,
              .swiper-button-prev {
                color: #0a373b;
              }

              .swiper-pagination-bullet-active {
                background-color: #0a373b;
              }
            `}</style>
          </Swiper>
        </div>

        {/* Product Details (Right) */}
        <div className="w-1/2 h-full overflow-y-auto bg-white">
          <div className="px-8 py-6">
            <div className="text-sm text-gray-500 uppercase mb-2">
              {productDetails?.designNumber || "DESIGN NUMBER"}
            </div>

            <h1 className="text-2xl font-medium mb-4">{productDetails?.title || "Product Title"}</h1>
            <p className="text-base text-gray-600 my-2">{productDetails?.description || "No description available."}</p>

            <div className="mt-6  rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-4">Product Specifications</h2>
              <table className="min-w-full table-auto bg-gray-100">
                <thead>
                  <tr className="bg-[#F8F4F0] text-left">
                    <th className="px-4 py-2 text-sm font-medium text-gray-700">Specification</th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#F8F5F0]">
                    <td className="px-4 py-2 text-sm text-gray-600">Category</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{productDetails?.category || "Not Available"}</td>
                  </tr>
                  <tr className="bg-[#F8F4F0]">
                    <td className="px-4 py-2 text-sm text-gray-600">Occasion</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{productDetails?.occasion || "Not Available"}</td>
                  </tr>
                  <tr className="bg-[#F8F5F0]">
                    <td className="px-4 py-2 text-sm text-gray-600">Color</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{productDetails?.color || "Not Available"}</td>
                  </tr>
                  <tr className="bg-[#F8F4F0]">
                    <td className="px-4 py-2 text-sm text-gray-600">Fabric</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{productDetails?.fabric || "Not Available"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Star Rating & Average */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Average Rating</h3>
              <div className="flex items-center gap-3 rounded-sm">
                <StarRatingComponent rating={averageReview} className="flex gap-1 text-yellow-500" />
                <span className="text-gray-800 text-sm">({averageReview.toFixed(2)})</span>
              </div>
            </div>

            <Button
              className="w-full bg-[#0a373b] hover:bg-[#085b60] text-white font-bold text-base py-2"
              onClick={() => handleAddToCart(productDetails?._id)}
            >
              Add to Cart
            </Button>

            <Separator className="my-4" />

            {/* Customer Reviews */}
            <h2 className="text-xl font-semibold mb-3">Customer Reviews</h2>
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 border border-[#F8F4F0] p-3 rounded-lg shadow-sm bg-[#F8F4F0]">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review._id} className="border border-[#F8F4F0] p-3 rounded-lg shadow-sm bg-[#F8F4F0]">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarFallback>{review.userName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{review.userName}</p>
                        <StarRatingComponent rating={review.reviewValue} className="flex gap-1" />
                      </div>
                    </div>
                    <p className="mt-1 text-gray-600 text-sm">{review.reviewMessage}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No reviews yet.</p>
              )}
            </div>

            {/* Add Review Form */}
            <div className="mt-6 flex flex-col gap-3 bg-[#F8F4F0] p-4 rounded-lg shadow-md">
              <Label className="text-base font-semibold">Write Your Review</Label>
              <div className="flex gap-2">
                <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} className="flex gap-1" />
              </div>
              <Input value={reviewMsg} onChange={(e) => setReviewMsg(e.target.value)} placeholder="Write a review..." className="text-base p-2" />
              <Button onClick={handleAddReview} disabled={isSubmitting || !reviewMsg.trim()} className="bg-[#0a373b] hover:bg-[#085b60] text-base py-2">
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;