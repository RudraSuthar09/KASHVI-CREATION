import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  // Routes that unauthenticated users can access
  const publicRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
  ];

  // Allow reset password pages with dynamic tokens
  const isResetPasswordRoute = location.pathname.startsWith("/auth/reset-password");

  // Redirect to login if trying to access a protected route without authentication
  if (!isAuthenticated && !publicRoutes.includes(location.pathname) && !isResetPasswordRoute) {
    return <Navigate to="/auth/login" />;
  }

  // Redirect to appropriate dashboard if visiting "/"
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      return user?.role === "admin"
        ? <Navigate to="/admin/dashboard" />
        : <Navigate to="/shop/home" />;
    }
  }

  // Prevent authenticated users from accessing login or register pages
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") || location.pathname.includes("/register"))
  ) {
    return user?.role === "admin"
      ? <Navigate to="/admin/dashboard" />
      : <Navigate to="/shop/home" />;
  }

  // Prevent non-admin users from accessing admin pages
  if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")) {
    return <Navigate to="/unauth-page" />;
  }

  // Prevent admin users from accessing shopping pages
  if (isAuthenticated && user?.role === "admin" && location.pathname.includes("shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
