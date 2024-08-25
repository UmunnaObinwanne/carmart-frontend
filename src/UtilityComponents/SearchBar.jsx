import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa"; // Import search icon

const SearchBar = ({ onSearch }) => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    // Fetch models when component mounts
    axios
      .get("http://localhost:5000/models")
      .then((response) => setModels(response.data))
      .catch((error) => console.error("Error fetching models:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass search criteria to the parent component
    onSearch({
      model: selectedModel,
      minPrice,
      maxPrice,
      city,
    });
  };

  return (
    <div className="relative max-w-4xl w-full mx-auto p-8">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 rounded-lg blur-lg"></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center gap-4"
        >
          {/* Model Dropdown */}
          <div className="w-full md:w-1/5">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-200"
            >
              <option value="">Select Model</option>
              {models.map((model) => (
                <option key={model._id} value={model._id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          {/* Min Price Input */}
          <div className="w-full md:w-1/5">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-200"
            />
          </div>

          {/* Max Price Input */}
          <div className="w-full md:w-1/5">
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-200"
            />
          </div>

          {/* Location Input */}
          <div className="w-full md:w-1/5">
            <input
              type="text"
              placeholder="Enter Location"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-200"
            />
          </div>

          {/* Search Button with Icon */}
          <div className="w-full md:w-1/5">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg flex justify-center items-center gap-2 shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              <FaSearch /> Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
