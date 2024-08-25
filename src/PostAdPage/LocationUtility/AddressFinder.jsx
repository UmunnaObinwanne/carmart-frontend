import { useState, useEffect, useRef } from "react";
import axios from "axios";

function AddressFinder({ onChange }) {
  const [query, setQuery] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const apiKey = `${import.meta.env.VITE_ADDRESS_FINDER}`; // Use VITE_ prefix for Vite

  // Ref to keep track of the input element
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.trim() === "") {
      setAddresses([]);
      setIsDropdownOpen(false);
      return;
    }

    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          "https://api.radar.io/v1/geocode/forward",
          {
            params: { query },
            headers: { Authorization: `${apiKey}` }, // Ensure correct header format
          }
        );

        console.log("API Response:", response.data); // Log API response

        if (response.data && response.data.addresses) {
          setIsDropdownOpen(true);
          setAddresses(response.data.addresses);

          setError("");
        } else {
          setAddresses([]);
          setIsDropdownOpen(false);
        }
      } catch (err) {
        console.error("Error fetching address data:", err);
        setError("Error fetching address data");
        setAddresses([]);
        setIsDropdownOpen(false);
      }
    };

    // Debounce the fetch function to avoid too many requests
    const debounceFetch = setTimeout(() => fetchAddresses(), 300);

    return () => clearTimeout(debounceFetch);
  }, [query, apiKey]);

  // Function to handle address selection
  const handleAddressSelect = (address) => {
    console.log("Address Selected:", address); // Log selected address

    setQuery(address); // Set the input field to the selected address
    setAddresses([]); // Clear the suggestions
    setIsDropdownOpen(false); // Close the dropdown
    inputRef.current.blur(); // Optionally, blur the input field to hide the keyboard (on mobile)

    // Notify parent component of the selected address
    onChange(address);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Find Your Address
      </h1>
      <div className="relative">
        <input
          type="text"
          id="address"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          placeholder="Type your address..."
          ref={inputRef}
        />
        {isDropdownOpen && addresses.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {addresses.map((address, index) => (
              <li
                key={index}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition duration-150 ease-in-out"
                onClick={() => handleAddressSelect(address.formattedAddress)}
              >
                {address.formattedAddress}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
}

export default AddressFinder;
