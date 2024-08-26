import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    profilePicture: "",
    Location: "",
    City: "",
    Area: "",
    Street: "",
    ZIP: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${apiUrl}/profile`, {
          withCredentials: true, // Include cookies in the request
        });
        const userData = response.data.user || {};
        setProfile({
          username: userData.username || "",
          email: userData.email || "",
          profilePicture: userData.profilePicture || "",
          Location: userData.Location || "",
          City: userData.City || "",
          Area: userData.Area || "",
          Street: userData.Street || "",
          ZIP: userData.ZIP || "",
          phone: userData.phone || "",
        });
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/profile`, profile, {
        withCredentials: true, // Include cookies in the request
      });

      setProfile(response.data);
      toast.success("Profile Updated");
      setSuccess("Profile updated successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Profile Picture</label>
          <input
            type="text"
            name="profilePicture"
            value={profile.profilePicture}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="Location"
            value={profile.Location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            name="City"
            value={profile.City}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Area</label>
          <input
            type="text"
            name="Area"
            value={profile.Area}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Street</label>
          <input
            type="text"
            name="Street"
            value={profile.Street}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">ZIP</label>
          <input
            type="text"
            name="ZIP"
            value={profile.ZIP}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
