import { useState, useEffect } from "react";
import axios from "axios";

function Location({
  initialPostalCode,
  initialCity,
  initialCountry,
  onChange,
}) {
  const [postalCode, setPostalCode] = useState(initialPostalCode || "");
  const [city, setCity] = useState(initialCity || "");
  const [country, setCountry] = useState(initialCountry || "");
  const [error, setError] = useState("");

  const apiKey = `${import.meta.env.VITE_LOCATION_FINDER}`;

  useEffect(() => {
    setPostalCode(initialPostalCode || "");
    setCity(initialCity || "");
    setCountry(initialCountry || "");
  }, [initialPostalCode, initialCity, initialCountry]);

  const handlePostalCodeChange = async (e) => {
    const value = e.target.value;
    setPostalCode(value);

    if (value) {
      try {
        const response = await axios.get(
          `https://app.zipcodebase.com/api/v1/search?apikey=${apiKey}&codes=${value}`
        );

        if (response.data.results && response.data.results[value]) {
          const { city, state: country } = response.data.results[value][0];
          setCity(city || "");
          setCountry(country || "");
          setError("");

          // Notify parent component of changes
          onChange({ postalCode: value, city, country });
        } else {
          setCity("");
          setCountry("");
          setError("Invalid postal code");
        }
      } catch (error) {
        console.error("Error fetching postal code data:", error);
        setCity("");
        setCountry("");
        setError("Error fetching postal code data");
      }
    } else {
      setCity("");
      setCountry("");
      setError("");
    }
  };

  return (
    <>
      <div className="mb-6">
        <label
          htmlFor="postalCode"
          className="font-mono px-3 py-3 mt-1 bg-gray-100 w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
        >
          Postal Code
        </label>
        <input
          id="postalCode"
          type="text"
          value={postalCode}
          onChange={handlePostalCodeChange}
          className="font-mono w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="city"
          className="font-mono px-3 py-3 mt-1 bg-gray-100 w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
        >
          City
        </label>
        <input
          id="city"
          type="text"
          value={city}
          readOnly
          className="font-mono w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="country"
          className="font-mono px-3 py-3 mt-1 bg-gray-100 w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
        >
          Country
        </label>
        <input
          id="country"
          type="text"
          value={country}
          readOnly
          className="font-mono w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </>
  );
}

export default Location;
