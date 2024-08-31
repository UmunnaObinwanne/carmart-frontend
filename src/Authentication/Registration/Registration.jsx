// RegistrationForm.jsx

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../../Slices/UserSlice";
import GoogleLogo from "../../assets/google.svg"; // Path to your Google logo

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loggingIn, loginError } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setErrorMessage("");

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      await dispatch(
        registerUser({
          email: formData.email,
          password: formData.password,
          username: formData.username,
        })
      ).unwrap();
      toast.success("Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || "Registration failed");
      toast.error(error.message || "Registration failed");
    }
  };

  const handleGoogleSignIn = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000"; // Fallback to localhost if env variable is not set
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full py-2 mb-4 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200"
        >
          <img src={GoogleLogo} alt="Google Logo" className="w-6 h-6 mr-2" />
          <span className="text-gray-700 font-medium">Sign up with Google</span>
        </button>

        <div className="flex items-center justify-center mb-4">
          <span className="border-t border-gray-300 flex-grow mr-3"></span>
          <span className="text-gray-500">or</span>
          <span className="border-t border-gray-300 flex-grow ml-3"></span>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Your username"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Your password"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            disabled={loggingIn}
          >
            {loggingIn ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
