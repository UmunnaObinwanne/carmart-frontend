import axios from "axios";
import { store } from "../../Store/Store"; // Adjust the path to your Redux store
import { logout } from "../Slices/AuthSlice"; // Adjust the path to your logout action

const setupInterceptors = (handleError) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 403) {
        store.dispatch(logout());
        handleError(
          "You are not authorized to view this page. You have been logged out."
        );
      }
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
