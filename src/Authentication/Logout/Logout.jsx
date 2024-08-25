import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Slices/AuthSlice";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login", { replace: true }); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return <div onClick={handleLogout}>Logout</div>;
}

export default Logout;
