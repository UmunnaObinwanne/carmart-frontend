import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../../UtilityComponents/Loader";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useLocation } from "react-router-dom";
import {
  FaLocationArrow,
  FaClock,
  FaCar,
  FaPalette,
  FaChair,
  FaCarAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import SellerProfile from "../../UserProfile/SellerProfile";
import CarInformation from "./CarInfoTab/CarInformation";
import CarInteriorCard from "./CarInfoTab/CarInteriorCard";
import EnvironmentalFeatures from "./CarInfoTab/EnvironmentalFeatures";
import AdvertDescription from "./AdvertDescription";

function CarDetailsFetch() {
  const location = useLocation();
  const { id: advertId } = useParams();
  const [advert, setAdvert] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [showBidModal, setShowBidModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [revealPhone, setRevealPhone] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    // Scroll to the top of the page on location change
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);

        // Fetch advert information
        const advertResponse = await axios.get(`${apiUrl}/adverts/${advertId}`);
        setAdvert(advertResponse.data);
        setMainImage(advertResponse.data.imageUrls[0]);

        // Fetch current user's profile
        const userResponse = await axios.get(`${apiUrl}/profile`, {
          withCredentials: true,
        });

        setCurrentUserId(userResponse.data.user._id);

        // Fetch seller information based on postedBy ID from advert
        const sellerResponse = await axios.get(
          `${apiUrl}/profile/${advertResponse.data.postedBy._id}`
        );
        setSeller(sellerResponse.data);
        setPhoneNumber(sellerResponse.data.phoneNumber);
      } catch (error) {
        console.error("Error fetching options:", error);
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [advertId]);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;
  if (!advert) return <div>No advert found</div>;
  const timePosted = formatDistanceToNow(new Date(advert.createdAt), {
    addSuffix: true,
  });

  const formattedPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(advert.price);

  const handleBidSubmit = async () => {
    try {
      await axios.post(`${apiUrl}/bids`, {
        advertId,
        amount: bidAmount,
      });
      alert("Bid submitted successfully!");
    } catch (error) {
      console.error("Error submitting bid:", error);
    }
    setShowBidModal(false);
  };

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/user/send-message`,
        {
          recipientId: advert.postedBy._id,
          content: message,
          advertId: advert._id,
        },
        { withCredentials: true }
      );

      const chat = response.data.chat;
      console.log("Chat details:", chat);

      const recipient = chat.participants.find(
        (participant) => participant._id !== currentUserId
      );

      alert(`Message sent successfully to ${recipient.username}!`);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setShowMessageModal(false);
  };

  return (
    <>
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <aside className="lg:col-span-1 mb-6">
              <div className="border rounded-lg flex justify-center mb-4 overflow-hidden shadow-lg">
                <img
                  className="rounded-lg object-cover w-full h-auto transition-transform duration-500 hover:scale-105"
                  src={mainImage}
                  alt="Product"
                />
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {advert.imageUrls.map((image, index) => (
                  <img
                    key={index}
                    width="60"
                    height="60"
                    className="rounded-lg object-cover cursor-pointer transition-transform duration-300 hover:scale-110"
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setMainImage(image)}
                  />
                ))}
              </div>
            </aside>

            <main className="lg:col-span-1">
              <div className="p-4 bg-white border rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {advert.title} - Posted By {advert.postedBy.username}
                </h2>
                <div className="flex flex-wrap items-center mb-3 text-gray-600">
                  <div className="flex items-center mr-4">
                    <FaClock className="w-5 h-5 mr-1 text-gray-700" />
                    <span>{timePosted}</span>
                  </div>
                  <div className="flex items-center ml-auto">
                    <FaLocationArrow className="w-5 h-5 mr-1 text-gray-700" />
                    <span>{advert.city}</span>,
                    <span className="text-gray-500 ml-1">{advert.country}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-2xl font-semibold text-gray-800">
                    {formattedPrice}
                  </span>
                </div>

                <AdvertDescription description={advert.description} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-800">
                    <FaCar className="w-5 h-5 mr-2 text-gray-700" />
                    <div className="font-medium">Name:</div>
                    <div className="ml-2">{advert.carName}</div>
                  </div>
                  <div className="flex items-center text-gray-800">
                    <FaPalette className="w-5 h-5 mr-2 text-gray-700" />
                    <div className="font-medium">Color:</div>
                    <div className="ml-2">{advert.colour}</div>
                  </div>
                  <div className="flex items-center text-gray-800">
                    <FaChair className="w-5 h-5 mr-2 text-gray-700" />
                    <div className="font-medium">Seats:</div>
                    <div className="ml-2">{advert.seats}</div>
                  </div>
                  <div className="flex items-center text-gray-800">
                    <FaCarAlt className="w-5 h-5 mr-2 text-gray-700" />
                    <div className="font-medium">Model:</div>
                    <div className="ml-2">
                      {advert.model?.name || "Unknown"}
                    </div>
                  </div>
                </div>

                <hr className="my-4 border-gray-300" />

                <div className="flex flex-wrap gap-4 mb-4 items-center">
                  <button
                    onClick={() => setShowBidModal(true)}
                    className="btn btn-primary shadow-md w-full sm:w-auto transition-transform duration-300 hover:scale-105"
                  >
                    Make a Bid
                  </button>
                  <button
                    onClick={() => setShowMessageModal(true)}
                    className="btn btn-secondary shadow-md w-full sm:w-auto transition-transform duration-300 hover:scale-105"
                  >
                    Compose Message
                  </button>
                  <button
                    onClick={() => setRevealPhone(!revealPhone)}
                    className="btn btn-accent w-full sm:w-auto transition-transform duration-300 hover:scale-105"
                  >
                    {revealPhone
                      ? "Hide Phone Number"
                      : "Show seller's Phone Number"}
                  </button>
                  {revealPhone && (
                    <Link className="link link-accent w-full sm:w-auto text-blue-600 hover:underline">
                      {phoneNumber}
                    </Link>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {showBidModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Make a Bid</h3>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter your bid amount"
              className="form-input block w-full border-gray-300 rounded-md shadow-sm mb-4"
            />
            <button
              onClick={handleBidSubmit}
              className="btn btn-primary shadow-md w-full transition-transform duration-300 hover:scale-105"
            >
              Submit Bid
            </button>
            <button
              onClick={() => setShowBidModal(false)}
              className="btn btn-light border mt-2 w-full transition-transform duration-300 hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showMessageModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Send a Message
            </h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              className="form-textarea block w-full border-gray-300 rounded-md shadow-sm mb-4"
            />
            <button
              onClick={handleSendMessage}
              className="btn btn-primary shadow-md w-full transition-transform duration-300 hover:scale-105"
            >
              Send Message
            </button>
            <button
              onClick={() => setShowMessageModal(false)}
              className="btn btn-light border mt-2 w-full transition-transform duration-300 hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <section className="bg-gray-100 border-t py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs aria-label="Default tabs" variant="default">
                <Tabs.Item active title="Seller Profile" icon={HiUserCircle}>
                  {seller ? <SellerProfile seller={seller} /> : <Loader />}
                </Tabs.Item>
                <Tabs.Item title="Specifications" icon={MdDashboard}>
                  <CarInformation key={advert._id} advert={advert} />
                </Tabs.Item>
                <Tabs.Item title="Car Features" icon={HiAdjustments}>
                  <CarInteriorCard key={advert._id} advert={advert} />
                </Tabs.Item>
                <Tabs.Item
                  title="Environmental Features"
                  icon={HiClipboardList}
                >
                  <EnvironmentalFeatures advert={advert} />
                </Tabs.Item>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CarDetailsFetch;
