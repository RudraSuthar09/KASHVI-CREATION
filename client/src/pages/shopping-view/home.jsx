"use client"

import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import ShoppingProductTile from "@/components/shopping-view/product-tile"
import ProductDetailsDialog from "@/components/shopping-view/product-details"
import Footer from "@/components/common/Footer"
import { useToast } from "@/components/ui/use-toast"
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice"
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"
import { getFeatureImages } from "@/store/common-slice"
import WhatsAppButton from "@/components/common/WhatsAppButton"
import Chatbot from "@/components/chatbot/chatbot"


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TopReviews from "@/components/shopping-view/TopReviews"
//import { Button } from '@shadcn/ui';  


const randomCategories = [
  { id: "kanjivaram_sarees", label: "Kanjivaram Sarees", imageUrl: "https://res.cloudinary.com/doytxxdrl/image/upload/v1739454629/kanchipuram_gnvr1k.webp" },
  { id: "banarasi_sarees", label: "Banarasi Sarees", imageUrl: "https://res.cloudinary.com/doytxxdrl/image/upload/v1739455101/banarasi_jbhooc.webp" },
  { id: "silk_sarees", label: "Silk Sarees", imageUrl: "https://res.cloudinary.com/doytxxdrl/image/upload/v1739455379/silk_qekfpe.jpg" },
  { id: "net_sarees", label: "Net Sarees", imageUrl: "https://res.cloudinary.com/doytxxdrl/image/upload/v1739462478/Screenshot_2025-02-13_at_9.27.51_PM_qjra4y.png" },
  { id: "chiffon_sarees", label: "Chiffon Sarees", imageUrl: "https://res.cloudinary.com/doytxxdrl/image/upload/c_crop,h_2000/v1739455379/chiffon_x7tcb3.webp" },
];

const categoriesWithImage = [
  { id: "green_sarees", videoUrl: "https://res.cloudinary.com/doytxxdrl/video/upload/v1739481049/1739479481909999_aglgea.mp4" },
  { id: "brown_sarees", videoUrl: "https://res.cloudinary.com/doytxxdrl/video/upload/v1739481033/1739480209975956_yto06l.mp4" },
  { id: "pink_sarees", videoUrl: "https://res.cloudinary.com/doytxxdrl/video/upload/v1739583001/1739582913279706_l9bmlg.mp4" },
  { id: "teal_sarees", videoUrl: "https://res.cloudinary.com/doytxxdrl/video/upload/v1739481025/1739480103851834_y5ozt1.mp4" },
  { id: "chiffon_sarees", videoUrl: "https://res.cloudinary.com/doytxxdrl/video/upload/v1739481029/1739479962341330_r2pltz.mp4" },
];

const brandsWithIcon = [
  { id: "wedding_sarees", label: "Wedding Sarees", imageUrl: "https://res.cloudinary.com/doytxxdrl/image/upload/v1739591502/wedding_e1f0hl.webp" },
  { id: "party_wear_sarees", label: "Party Wear Sarees", imageUrl: "https://res.cloudinary.com/doytxxdrl/image/upload/v1739591501/party_wear_sarees_ucifec.webp" },
  { id: "casual_sarees", label: "Casual Sarees", imageUrl: "https://res.cloudinary.com/doytxxdrl/image/upload/v1739591504/casual_jegizu.webp" },
  { id: "festive_sarees", label: "Festive Sarees", imageUrl: "https://res.cloudinary.com/doytxxdrl/image/upload/v1739591500/festive_hnjui9.webp" },
]



function AboutUsSection() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/AboutUs");
  };

  return (
    <div
      className="bg-gradient-to-b from-[#FAF1E4] to-[#F8EDE3] py-12 px-9 mt-12 text-center cursor-pointer "
      onClick={handleNavigation}
    >
      <h2 className="text-4xl font-extrabold text-[#0a373b] mb-3 tracking-wide">
        ABOUT KASHVI CREATION
      </h2>
      <h3 className="text-2xl font-semibold text-[#0a373b] mb-3">
        Exclusive Designer Sarees
      </h3>
      <p className="text-lg text-gray-800 font-medium leading-relaxed max-w-3xl mx-auto">
        With each stitch, Kashvi Creation combines love and trust to craft sarees that not only celebrate India’s heritage but also inspire modern elegance.
      </p>
    </div>
  );
}

function VideoBackground() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://res.cloudinary.com/doytxxdrl/video/upload/v1739589193/final_fashion_visuals_i0czzy.mp4" // Replace with your video URL
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay for better contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
        <h1 className="text-5xl font-bold mb-2">FASHION VISUALS</h1>
        <h3 className="text-2xl font-semibold mb-4">KASHVI CREATION</h3>
      </div>
    </div>
  );
}

function TrustSection() {
  return (
    <section className="bg-[#F8F4F0] py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {/* Made in India */}
          <div className="flex flex-col items-center space-y-2">
            <img src="https://cdn-icons-png.flaticon.com/128/7410/7410134.png" alt="Made in India" className="h-12" />
            <p className="font-semibold text-lg text-[#5b2e1e]">Made in India</p>
          </div>

          {/* Assured Quality */}
          <div className="flex flex-col items-center space-y-2">
            <img src="https://cdn-icons-png.flaticon.com/128/190/190411.png" alt="Assured Quality" className="h-12" />
            <p className="font-semibold text-lg text-[#5b2e1e]">Assured Quality</p>
          </div>

          {/* Secure Payments */}
          <div className="flex flex-col items-center space-y-2">
            <img src="https://cdn-icons-png.flaticon.com/128/833/833593.png" alt="Secure Payments" className="h-12" />
            <p className="font-semibold text-lg text-[#5b2e1e]">Secure Payments</p>
          </div>

          {/* Empowering Weavers */}
          <div className="flex flex-col items-center space-y-2">
            <img src="https://cdn-icons-png.flaticon.com/128/3063/3063081.png" alt="Empowering Weavers" className="h-12" />
            <p className="font-semibold text-lg text-[#5b2e1e]">Empowering Weavers</p>
          </div>
        </div>
      </div>
    </section>
  );
}
// ho gya
function ExtraAdd() {
  return (
    <div className="hidden md:grid gap-4 mt-9 grid-cols-2 place-items-center">
      <div>
        <img
          src="https://res.cloudinary.com/doytxxdrl/image/upload/v1739541948/image_2_zdewvb.png"
          alt="Image 1"
          className="w-full h-auto object-cover"
        />
      </div>

      <div>
        <img
          src="https://res.cloudinary.com/doytxxdrl/image/upload/v1739541947/image_1_rb3ocb.png"
          alt="Image 2"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const { productList, productDetails } = useSelector((state) => state.shopProducts)
  const { featureImageList } = useSelector((state) => state.commonFeature)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  //navigation
  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters")
    const currentFilter = {
      [section]: [getCurrentItem.id],
    }
    sessionStorage.setItem("filters", JSON.stringify(currentFilter))
    navigate(`/shop/listing`)
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId))
  }
  function handleAddtoCart(getCurrentProductId) {
    if (!user?._id) {
      toast({
        title: "Please sign in to your account first!",
        status: "warning",
      });
      return;
    }

    dispatch(
      addToCart({
        userId: user._id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user._id));
        toast({
          title: "Product is added to cart successfully!",
          status: "success",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true)
  }, [productDetails])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [featureImageList])

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      }),
    )
    dispatch(getFeatureImages())
  }, [dispatch])


  // const ImageSlider = ({ featureImageList }) => {
  //   const [currentSlide, setCurrentSlide] = useState(0);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
  //     }, 3000);
  //     return () => clearInterval(interval);
  //   }, [featureImageList.length]);



  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[500px] bg-[#f8f4f0] overflow-hidden">

        {/* Image Slider  */}
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((slide, index) => (
            <img
              key={index}
              src={slide?.image}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500
  ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
              alt={`Saree ${index + 1}`}
            />
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            No Images Available
          </div>
        )}


        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length)
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 text-gray-800 z-20"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 text-gray-800 z-20"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </Button>
      </div>
      {/* Text Overlay with Gradient */}

      {/* </motion.div> */}

      <AboutUsSection />

      {/* random categories */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="py-16 bg-white"
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-14">
          <h2 className="text-4xl text-[#0a373b] mb-7 tracking-wide font-semibold text-center">
            SAREES OF INDIA
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4 md:gap-4">
            {/* Featured Category (Large grid on the left) */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-2 relative">
              <motion.div
                className="group h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  handleNavigateToListingPage(randomCategories[0], "Category");
                }}
              >
                <div className="relative h-full w-full overflow-hidden">
                  <img
                    src={randomCategories[0].imageUrl}
                    alt={randomCategories[0].label}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <span className="text-white text-2xl font-medium">
                      {randomCategories[0].label}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Remaining Categories */}
            {randomCategories.slice(1).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, delay: (index + 1) * 0.05 }}
                className="relative"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  handleNavigateToListingPage(category, "Category");
                }}
              >
                <div className="relative w-full h-80 overflow-hidden">
                  <img
                    src={category.imageUrl}
                    alt={category.label}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <span className="text-white text-xl font-medium">
                      {category.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* featured products */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
        className="py-4  bg-white"
      >
        <div className="max-w-screen-xl mx-auto pl-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Left Side - Text & Button */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col justify-center lg:col-span-1 max-w-md "
          >
            {/* Large Screen Heading */}
            <h2 className="hidden sm:block text-4xl lg:text-3xl text-[#0a373b] text-center leading-tight font-serif max-w-2xl mx-auto">
              Your <br /> Favorites, Our <br /> Best-Sellers.
            </h2>

            {/* Small Screen Heading */}
            <h2 className="block sm:hidden text-3xl text-[#0a373b] text-center leading-tight font-serif max-w-xl mx-auto">
              Your Favorites, Our Best-Sellers
            </h2>

            <p className="text-sm lg:text-base text-center text-gray-600 mt-3 leading-tight max-w-xl mx-auto">
              Shop the styles everyone’s loving now!
            </p>

            <button
              onClick={() => {
                // Scroll to the top of the page

                window.scrollTo({ top: 0, behavior: "smooth" });

                // Navigate to the listing page
                navigate("/shop/listing");
              }}
              className="hidden mt-6 bg-[#0a373b] hover:bg-[#085b60]
 text-white rounded-md text-lg font-semibold  transition w-auto lg:block lg:px-6 lg:py-3 max-w-xs mx-auto">
              SHOP NOW
            </button>
          </motion.div>

          {/* Right Side - Product Slider */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 relative px-4 md:px-6"
          >
            <Swiper
              slidesPerView={1.2}
              spaceBetween={16}
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              modules={[Navigation]}
              breakpoints={{
                480: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 1, spaceBetween: 20 },
                900: { slidesPerView: 2, spaceBetween: 22 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              className="!py-4 !px-2"
            >
              {productList && productList.length > 0
                ? productList.map((productItem, index) => (
                  <SwiperSlide key={productItem.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="h-full"
                    >
                      <ShoppingProductTile
                        handleGetProductDetails={handleGetProductDetails}
                        product={productItem}
                        handleAddtoCart={handleAddtoCart}
                      />
                    </motion.div>
                  </SwiperSlide>
                ))
                : null}
            </Swiper>

            {/* Improved Navigation Buttons */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 w-full pointer-events-none">
              <div className="container mx-auto px-4 flex justify-between">
                <Button
                  variant="outline"
                  size="icon"
                  className="swiper-button-prev !pointer-events-auto h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-700" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="swiper-button-next !pointer-events-auto h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
                >
                  <ChevronRight className="h-6 w-6 text-gray-700" />
                </Button>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.section>

      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />

      {/* <img 
  src="https://res.cloudinary.com/doytxxdrl/image/upload/v1739485623/Screenshot_2025-02-14_at_3.50.52_AM_g71zai.png" 
  alt="Example Image" 
  className="w-full h-full object-cover"
/> */}

      <ExtraAdd />

      {/* CategorywithVideo Color */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-12 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#0a373b] mb-9 mt-12">SHOP BY COLOURS</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categoriesWithImage.map((categoryItem, index) => (
              <motion.div
                key={categoryItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative cursor-pointer  hover:shadow-lg"
              >
                <Card
                  className="overflow-hidden"
                  onClick={() => {
                    // Scroll to the top of the page

                    window.scrollTo({ top: 0, behavior: "smooth" });

                    // Navigate to the listing page
                    handleNavigateToListingPage(categoryItem, "Color");
                  }}
                >
                  <video
                    src={categoryItem.videoUrl}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>


      {/* Image */}
      <div className="relative hidden md:mt-12  w-full h-full md:block ">

        <img
          src="https://res.cloudinary.com/doytxxdrl/image/upload/v1739486005/final_x0qmho.webp"
          alt="Festive Edit"
          className="w-full h-full object-cover"
        />

        {/* Shop Now Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => {
              // Scroll to the top of the page
              window.scrollTo({ top: 0, behavior: "smooth" });

              navigate("/shop/listing?Occasion=festive_sarees")
            }}
            className="bg-gradient-to-r from-[#b2966c] to-[#a2835d] text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold 
                     hover:from-[#a2835d] hover:to-[#8f724a] transition-all duration-300 transform hover:scale-105"
          >
            Shop Now
          </button>
        </div>
      </div>




      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-12 bg-white"
      >
        <div className="container mx-auto px-4 my-6 mb-10">
          <h2 className="text-3xl text-[#0a373b] font-bold text-center mb-8">SHOP BY OCCASIONS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brandsWithIcon.map((brandItem, index) => (
              <motion.div
                key={brandItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group cursor-pointer"
                onClick={() => {
                  // Scroll to the top of the page
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  handleNavigateToListingPage(brandItem, 'Occasion')

                }}
              >
                {/* Image */}
                <div className="w-full h-[400px] overflow-hidden rounded-lg">
                  <img
                    src={brandItem.imageUrl} // Replace with correct image URL
                    alt={brandItem.label}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Label */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-2 text-sm rounded-sm opacity-90">
                  {brandItem.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>


      <VideoBackground />
      <TopReviews />
      <TrustSection />
      <Chatbot />
      <WhatsAppButton />
      <Footer />
    </div>
  )
}

export default ShoppingHome
