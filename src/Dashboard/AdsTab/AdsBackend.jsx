import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Ads from "../../assets/car.svg";

function AdsBackend() {
  const userId = useSelector((state) => state.user.userId); // Get the user ID from the Redux state
  const [userAds, setUserAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noAdsMessage, setNoAdsMessage] = useState(null); // State for no ads message
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserAds = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user-adverts/${userId}`, {
          withCredentials: true,
        });
        console.log(response.data);
        // Check if the response has a no adverts message
        if (response.data.message === "No adverts found for this user") {
          setNoAdsMessage(response.data.message);
        } else {
          setUserAds(response.data);
        }

        setLoading(false);
      } catch (error) {
        if (error.response.statusText === "Not Found") {
          setNoAdsMessage("No Ads Yet");
        }
        setError(error.message);
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserAds();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {noAdsMessage ? (
        <>
          <img src={Ads} className="w-auto h-20" alt="No ads" />
          <h2 className="text-xl font-semibold mb-2">{noAdsMessage}</h2>
          <p className="text-gray-500 mb-4">
            Sell Your Used Car and Turn it Into Cash.
          </p>
          <Link to="/sell-car">
            <button className="mx-2 btn btn-accent">Sell Car</button>
          </Link>
        </>
      ) : userAds.length === 0 ? (
        <>
          <img src={Ads} className="w-auto h-20" alt="No ads" />
          <h2 className="text-xl font-semibold mb-2">You have no ads</h2>
          <p className="text-gray-500 mb-4">
            Clean up your clutter and turn it into extra cash.
          </p>
          <Link to="/sell-car">
            <button className="mx-2 btn btn-accent">Sell Car</button>
          </Link>
        </>
      ) : (
        <div className="w-full px-4">
          <h2 className="text-2xl font-semibold mb-4">Your Ads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userAds.map((ad) => (
              <div key={ad._id} className="border p-4 rounded shadow">
                <h3 className="text-xl font-semibold">{ad.title}</h3>
                <p>{ad.description}</p>
                <p className="text-gray-500">{ad.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdsBackend;
