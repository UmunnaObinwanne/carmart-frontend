import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus, logout } from "../Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const AuthChecker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.userId);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Await the dispatch and unwrap the result
        await dispatch(checkAuthStatus()).unwrap();
      } catch (error) {
        // Handle authentication failure
        dispatch(logout());
        setShowModal(true); // Show modal if auth check failed
      }
    };

    // Initial check
    checkAuth();

    // Set up interval to check auth status every 60 seconds
    const interval = setInterval(() => {
      checkAuth();
    }, 60000);

    // Cleanup function to clear interval
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated || !userId) {
      dispatch(logout());
      setShowModal(true); // Show modal if user is not authenticated or userId is missing
      navigate("/login");
    }
  }, [isAuthenticated, userId, dispatch, navigate]);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/login"); // Redirect to login when the modal is closed
  };

  return (
    <>
      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel="Authentication Required"
        ariaHideApp={false} // Optional: If you want to hide the app content behind the modal
      >
        <h2>Session Expired</h2>
        <p>Your session has expired. Please log in again.</p>
        <button onClick={handleCloseModal}>Log In</button>
      </Modal>
    </>
  );
};

export default AuthChecker;
