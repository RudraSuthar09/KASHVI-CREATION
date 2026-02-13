import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";

// Layouts
import AuthLayout from "./components/auth/layout";
import AdminLayout from "./components/admin-view/layout";
import ShoppingLayout from "./components/shopping-view/layout";

// Auth Pages
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import OtpLogin from "./pages/auth/OtpLogin";  // ✅ Added OTP Login
import OtpResetPassword from "./pages/auth/OtpResetPassword";  // ✅ Added OTP Password Reset

// Admin Pages
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import InquiryPage from "./pages/admin-view/InquiryPage";
import EmailForm from "./pages/admin-view/EmailForm";  // ✅ Import EmailForm

// Shopping Pages
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import LocateUsPage from "./pages/shopping-view/locate_us";
import Wishlist from "./components/shopping-view/wishlist"; 

// Common Components
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import PrivacyPolicy from "./pages/user-policy/PrivacyPolicy";
import TermsConditions from "./pages/user-policy/TermsConditions";
import Disclaimer from "./pages/user-policy/Disclaimer";
import AboutUs from "./pages/More/AboutUs";
import FAQ from "./pages/More/FAQ/FAQPage";
import Event from "./pages/More/event";
import WhatsAppButton from "./components/common/WhatsAppButton";
import Invoice from "./pages/Invoice/Invoice";
import ContactUs from "./pages/More/contactus/ContactForm";


function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  console.log(isLoading, user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Redirect root to shop home */}
        <Route path="/" element={<Navigate to="/shop/home" replace />} />

        {/* Authentication Routes */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="otp-login" element={<OtpLogin />} />  {/* ✅ Added OTP Login */}
          <Route path="otp-reset-password" element={<OtpResetPassword />} />  {/* ✅ Added OTP Reset Password */}
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="inquiries" element={<InquiryPage />} />
          <Route path="sendEmail" element={<EmailForm />} />  {/* ✅ Added Send Email Route */}
          
        </Route>

        {/* Shopping Routes */}
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route
            path="checkout"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingCheckout />
              </CheckAuth>
            }
          />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
          <Route path="locate-us" element={<LocateUsPage />} />
          <Route path="wishlist" element={<Wishlist />} /> 
        </Route>

        {/* Direct Wishlist Route */}
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Other Routes */}
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/reach-us/contact-page" element={<ContactUs />} />
        <Route path="/event" element={<Event />} />
        <Route path="/whatsappbutton" element={<WhatsAppButton />} />
        <Route path="shop/checkout/invoice" element={<Invoice />} />
        <Route path="/contactus" element={<ContactUs />} />
        
      </Routes>
    </div>
  );
}

export default App;