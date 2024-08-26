import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuthStatus } from "../Slices/AuthSlice"; // Adjust path as needed

function ProtectedRoute() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Fetch authentication status on mount
  useEffect(() => {
    // Dispatch checkAuthStatus action
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // Debugging
  console.log("Authenticated:", isAuthenticated);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
}

export default ProtectedRoute;
