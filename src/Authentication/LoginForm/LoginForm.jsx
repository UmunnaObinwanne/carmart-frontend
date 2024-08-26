import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../../Slices/UserSlice";
import { checkAuthStatus } from "../../Slices/AuthSlice"; // Assumes this handles session checks
import GoogleIcon from "../../../src/assets/google.svg";
import LoginImage from "../../assets/ecommercelede.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/shopmart logo.jpg";

const LoginForm = () => {
  const location = useLocation();
  const redirectTo = location.state?.from || "/used-cars"; // Default redirect if state is null
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select authentication state from AuthSlice
  const { isAuthenticated, loginError, loggingIn } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loginError: state.user.loginError,
    loggingIn: state.user.loggingIn,
  }));

  console.log()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (loginError) {
      toast.error(loginError);
    }
  }, [loginError]);

  useEffect(() => {
    if (isAuthenticated && location.pathname === "/login") {
      // Redirect only after login
      toast.success("Login successful!");
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, redirectTo, location.pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setPasswordError("Email and Password are required.");
      return;
    }

    setPasswordError("");

    try {
      await dispatch(loginUser(formData)).unwrap();
      // Check auth status after login
      await dispatch(checkAuthStatus()).unwrap();
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
      console.error("Login Submission Error:", error.message);
    }
  };

  const handleGoogleSignIn = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    window.location.href = `${apiUrl}/auth/google`; // Your backend Google OAuth route
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img src={Logo} className="mx-auto w-24" alt="Logo" />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                >
                  <div className="bg-white p-2 rounded-full">
                    <img src={GoogleIcon} alt="Google Icon" className="w-4" />
                  </div>
                  <span className="ml-4">Sign In with Google</span>
                </button>
              </div>

              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign in with your Email and Password
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {passwordError && (
                  <p className="text-red-500 mt-2">{passwordError}</p>
                )}
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-green-400 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  disabled={loggingIn}
                >
                  <span className="ml-1">
                    {loggingIn ? "Signing In..." : "Sign In"}
                  </span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by ShopMart's{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Terms of Service
                  </a>{" "}
                  and its{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-green-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${LoginImage})`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
