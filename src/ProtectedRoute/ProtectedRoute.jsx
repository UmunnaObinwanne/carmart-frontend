import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthChecker from "../AuthState/AuthChecker";

function ProtectedRoute() {
  const isAuthenticated = AuthChecker();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
