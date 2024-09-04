import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Ads from "../../assets/car.svg";
import DOMPurify from "dompurify"; // Import DOMPurify

function AdsBackend() {
  const userId = useSelector((state) => state.user.userId);
  const [userAds, setUserAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noAdsMessage, setNoAdsMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAds = async () => {
      try {
        const response = await axios.get(`/api/user-adverts/${userId}`, {
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

  const handleDeleteClick = (adId) => {
    setAdToDelete(adId);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/api/delete-advert/${adToDelete}`, {
        withCredentials: true,
      });
      setUserAds(userAds.filter((ad) => ad._id !== adToDelete));
      alert("Ad deleted successfully");
      setShowModal(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting ad:", error);
      alert("Failed to delete the ad");
      setShowModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    navigate("/dashboard/my-ads");
  };

  // Sanitize HTML function
  const sanitizeHTML = (html) => {
    return DOMPurify.sanitize(html);
  };

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
          <Link to="/post-ad">
            <button className="mx-2 btn btn-accent transition-transform transform hover:scale-105">
              Sell Car
            </button>
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
            <button className="mx-2 btn btn-accent transition-transform transform hover:scale-105">
              Sell Car
            </button>
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
                    <td className="p-4">
                      {/* Sanitize and render the description */}
                      <div
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHTML(ad.description),
                        }}
                      />
                    </td>
                    <td className="p-4 text-green-600 font-semibold">
                      ${ad.price}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center space-x-4">
                        <Link
                          to={`/edit-ad/${ad._id}`}
                          className="text-blue-500 transition-transform transform hover:scale-105"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(ad._id)}
                          className="text-red-500 transition-transform transform hover:scale-105"
                        >
                          <FaTrash />
                        </button>
                        <Link
                          to={`/used-cars/${ad._id}`}
                          className="text-gray-600 transition-transform transform hover:scale-105"
                        >
                          <FaEye />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for confirming deletion */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">Confirm Deletion</h2>
            <p>Are you sure you want to delete this ad?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md transition-transform transform hover:scale-105"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md transition-transform transform hover:scale-105"
              >
                No, Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdsBackend;
