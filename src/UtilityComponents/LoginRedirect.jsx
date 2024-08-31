import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus } from "../Slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const LoginRedirect = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await dispatch(checkAuthStatus()).unwrap();
console.log('Login Redirect ran', isAuthenticated);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login"); // Redirect to login if something goes wrong
      }
    };

    checkAuthStatus();
  }, [dispatch, navigate]);

  return null; // This component doesn't render anything
};

export default LoginRedirect;
