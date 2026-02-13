import { LogOut, Menu, ShoppingCart, Search, UserCog, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Input } from "../ui/input";
import logo from "../../assets/logo.jpg";
import axios from "axios";


function MenuItems({ isColumn = false }) {
  const navigate = useNavigate(); // ✅ Fix: Define navigate inside the component

  const handleNavigateToListingPage = (getSectionId, getCurrentOption) => {
    sessionStorage.removeItem("filters"); // Clear previous filters
  
    const currentFilter = { [getSectionId]: [getCurrentOption] };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
  
    // Navigate with a query param to ensure reloading
    navigate(`/shop/listing?filter=${getSectionId}-${getCurrentOption}`, { replace: true })
    window.location.reload();
  };
  
  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }
  const handleItemClick = (menuItem) => {
    if (menuItem.subMenu) return; // ✅ Ignore submenu items for direct navigation
    sessionStorage.removeItem("filters");
    navigate(menuItem.path);
    window.location.reload(); // ✅ Navigate if there’s no submenu
  };

  
  return (
    <nav
      className={`flex ${
        isColumn ? "flex-col gap-4" : "justify-center gap-6"
      } py-4`}
    >
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <div key={menuItem.id} className="relative group">
          {/* ✅ Main menu item navigation */}
          <div
            onClick={() => handleItemClick(menuItem)}
            className="text-sm font-semibold text-gray-700 cursor-pointer transition-all duration-200 hover:text-[#b2996c] hover:scale-105"
          >
            {menuItem.label}
          </div>

          {/* ✅ Submenu items with filter-based navigation */}
          {menuItem.subMenu && (
            <div
              className="absolute left-0 w-56 bg-[#F8F4F0] z-50 opacity-0 invisible transform scale-95 
                         group-hover:visible group-hover:opacity-100 group-hover:scale-100 
                         transition-all duration-300 ease-in-out shadow-lg rounded-md border border-gray-200"
            >
              <div className="py-2">
                {menuItem.subMenu.map((subItem) => (
                  <div
                    key={subItem.id}
                    onClick={() => handleNavigateToListingPage(menuItem.label,subItem.id)}
                   // console.log(menuItem.label, subItem.id);

                    className="hover:bg-[#b2996c] hover:text-white px-4 py-2 cursor-pointer transition-all duration-200"
                  >
                    {subItem.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}



function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { items: wishlist } = useSelector((state) => state.wishlist);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("token");
      window.location.href = "/shop/home";
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems(user?._id));
    }
  }, [dispatch, user?._id]);

  return (
    <div className="flex items-center gap-5">
      <Link to="/shop/search" className="flex items-center ml-4">
      <Search
        className="h-6 w-6 text-black transition-transform duration-300 hover:scale-110 md:h-6"
      />
    </Link>
      <Link to="/wishlist" className="relative">
        <Heart className="w-6 h-6 text-red-500" />
        {wishlist?.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            {wishlist.length}
          </span>
        )}
      </Link>
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
        
          <ShoppingCart className="w-6 h-6" />
          {cartItems?.items?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems?.items?.length}
            </span>
          )}
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.items?.length > 0 ? cartItems.items : []}
        />
      </Sheet>

      

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black transition-colors duration-200 cursor-pointer">
              <AvatarFallback className="text-white font-extrabold">
                {user?.userName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56 bg-[#F8F4F0]">
            <DropdownMenuLabel className="text-[#b2996c]">Logged in as {user?.userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/shop/account")} className="hover:bg-[#b2996c] hover:text-white">
              <UserCog className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="hover:bg-[#b2996c] hover:text-white">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant="outline"
          onClick={() => navigate("/auth/login")}
          className="flex items-center gap-2 px-4 py-2 border border-[#0a373b] text-[#0a373b] hover:bg-[#085b60] hover:text-white transition-colors duration-200"
        >
          <UserCog className="h-4 w-4" />
          Login
        </Button>
      )}
    </div>
  );
}

function ShoppingHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (searchQuery) {
      navigate(`/shop/search?q=${searchQuery}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-md">
        <div className="flex h-16 items-center justify-between px-4 md:px-8">

      <Link to="/shop/home" className="flex items-center ml-4">
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-110 md:h-14"
            />
          </Link>


          <div className="hidden lg:block">
        <MenuItems />
      </div>

      <div className="flex">
            <HeaderRightContent />

          {/* <button
            onClick={handleSearchClick}
            className="lg:hidden p-2 bg-[#b2996c] text-white rounded-full"
          >
            <Search className="h-5 w-5" />
          </button> */}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden hover:border-[#b2996c] ml-4 transition-all duration-200"
              >
                <Menu className="h-6 w-6 text-gray-600 hover:text-[#b2996c]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs bg-[#F8F4F0]">
              <div className="flex flex-col gap-6 p-4">
                <MenuItems isColumn />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        </div>
      </header>

     
    </>
  );
}

export default ShoppingHeader;
