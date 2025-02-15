import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { removeFromWishlist } from "../../store/shop/wishlist-slice";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import Footer from "../common/Footer";
import WhatsAppButton from "../common/WhatsAppButton";
import Header from "./header";
const Wishlist = () => {
  const dispatch = useDispatch();
  const { items: wishlist } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  if (!user || !user._id) {
    return <div className="text-center text-lg font-medium p-6">Please log in to view your wishlist.</div>;
  }

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (productId, stock) => {
    if (!user || !user._id) {
      toast({
        title: "Login Required",
        description: "Please log in to add items to cart.",
        variant: "destructive",
      });
      return;
    }

    if (stock === 0) {
      toast({
        title: "Out of Stock",
        description: "This item is currently unavailable.",
        variant: "destructive",
      });
      return;
    }

    dispatch(addToCart({ userId: user._id, productId, quantity: 1 })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user._id));
        dispatch(removeFromWishlist(productId));
        toast({
          title: "Added to Cart",
          description: "The item has been added to your cart.",
          variant: "success",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add product to cart.",
          variant: "destructive",
        });
      }
    });
  };

  return (
  
    <div className="">
      <Header/>
      <h1 className="text-5xl font-extrabold text-center p-6 text-black mb-8">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <div key={product._id} className="bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center transform transition duration-300 hover:scale-105">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover rounded-xl"
                />
              </Link>
              <h2 className="text-xl font-semibold mt-4 text-center text-gray-800">{product.title}</h2>
              <p className="text-gray-600 text-center mt-2">{product.description}</p>
              <div className="flex flex-col w-full mt-4 gap-3">
                <Button
                  className="w-full py-3 bg-red-500 hover:bg-red-600 text-white text-lg font-bold rounded-xl shadow-lg transition"
                  onClick={() => handleRemoveFromWishlist(product._id)}
                >
                  Remove from Wishlist
                </Button>
                <Button
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-bold rounded-xl shadow-lg transition"
                  onClick={() => handleAddToCart(product._id, product.totalStock)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        
        </div>
      )}

      <div className="text-center mt-8">
        <Link to="/" className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition underline">← Back to Shop</Link>
      </div>
      <WhatsAppButton/>
          <Footer/>
    </div>
  );
};

export default Wishlist;