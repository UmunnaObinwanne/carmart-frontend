import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Ads from "../../assets/car.svg";

function AdsBackend() {
  const userId = useSelector((state) => state.user.userId);
  const [userAds, setUserAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noAdsMessage, setNoAdsMessage] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserAds = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user-adverts/${userId}`, {
          withCredentials: true,
        });

        if (response.data.message === "No adverts found for this user") {
          setNoAdsMessage(response.data.message);
        } else {
          setUserAds(response.data);
        }

        setLoading(false);
      } catch (error) {
        if (error.response?.statusText === "Not Found") {
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
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
        <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Your Ads</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Description</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-center p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userAds.map((ad) => (
                  <tr key={ad._id} className="border-b">
                    <td className="p-4">{ad.title}</td>
                    <td className="p-4">{ad.description}</td>
                    <td className="p-4 text-green-600 font-semibold">
                      ${ad.price}
                    </td>
                    <td className="p-4 text-center">
                      <Link
                        to={`/edit-ad/${ad._id}`}
                        className="text-blue-500 mx-2"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(ad._id)}
                        className="text-red-500 mx-2"
                      >
                        <FaTrash />
                      </button>
                      <Link
                        to={`/view-ad/${ad._id}`}
                        className="text-gray-600 mx-2"
                      >
                        <FaEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const handleDelete = (adId) => {
  // Function to handle the deletion of an ad
  if (window.confirm("Are you sure you want to delete this ad?")) {
    // Add your delete logic here
    console.log(`Deleted ad with ID: ${adId}`);
  }
};

export default AdsBackend;
