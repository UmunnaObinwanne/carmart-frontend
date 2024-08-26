import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


function ProtectedRoute() {
  const location = useLocation();
 const { isAuthenticated } = useSelector((state) => state.auth);
console.log('protected route', isAuthenticated)
  // Fetch authentication status on mount

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
}

export default ProtectedRoute;
