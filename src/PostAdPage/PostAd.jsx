import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CurrencyInput from "react-currency-input-field";
import Location from "./LocationUtility/Location";
import AddressFinder from "./LocationUtility/AddressFinder";
import Modal from "react-modal";
import Description from "./Description";

// Set the app element for accessibility
Modal.setAppElement("#root");

const PostAd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    model: "",
    price: "",
    description: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    isFeatured: false,
    transmission: "",
    driveType: "",
    features: [],
    transaction: "",
    fuelType: "",
    year: "",
    mileage: "",
    bodyType: "",
    colour: "",
    seats: "",
    doors: "",
    enginePower: "",
    engineSize: "",
    brochureEngineSize: "",
    topSpeed: "",
    acceleration: "",
    fuelConsumption: "",
    fuelCapacity: "",
    urbanMpg: "",
    extraUrbanMpg: "",
    insuranceGroup: "",
    co2Emissions: "",
    euroEmissions: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [models, setModels] = useState([]);
  const [transmissions, setTransmissions] = useState([]);
  const [driveTypes, setDriveTypes] = useState([]);
  const [features, setFeatures] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [
          transmissionOptions,
          driveOptions,
          featureOptions,
          transactionOptions,
          fuelTypeOptions,
          categoryOptions,
          modelOptions,
        ] = await Promise.all([
          axios.get(`${apiUrl}/transmission-options`),
          axios.get(`${apiUrl}/drive-options`),
          axios.get(`${apiUrl}/feature-options`),
          axios.get(`${apiUrl}/transaction-options`),
          axios.get(`${apiUrl}/fuel-type`),
          axios.get(`${apiUrl}/categories`),
          axios.get(`${apiUrl}/models`),
        ]);

        setTransmissions(transmissionOptions.data);
        setDriveTypes(driveOptions.data);
        setFeatures(featureOptions.data);
        setTransactions(transactionOptions.data);
        setFuelTypes(fuelTypeOptions.data);
        setCategories(categoryOptions.data);
        setModels(modelOptions.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

 const handleChange = (e) => {
   if (e && e.target) {
     const { name, value, type, checked } = e.target;
     setFormData((prev) => ({
       ...prev,
       [name]: type === "checkbox" ? checked : value,
     }));
   }
 };

 const handleDescriptionChange = (content) => {
   setFormData((prev) => ({
     ...prev,
     description: content,
   }));
 };


  const handlePriceChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      price: value || "", // Ensure price is set to an empty string if value is null
    }));
  };

  const handleAddressChange = (address) => {
    setFormData((prev) => ({
      ...prev,
      address: address,
    }));
  };

  const handleLocationChange = (location) => {
    setFormData((prev) => ({
      ...prev,
      country: location.country || "",
      city: location.city || "",
      postalCode: location.postalCode || "", // Ensure postalCode is set
    }));
  };

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  function handleImageChange(event) {
    const files = Array.from(event.target.files).map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setImageFiles(files);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/login");
  };

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedFeatures = checked
        ? [...prev.features, value]
        : prev.features.filter((feature) => feature !== value);

      // Logging for debugging purposes
      console.log("Updated Features:", updatedFeatures);

      return {
        ...prev,
        features: updatedFeatures,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrls = [];

    const imageFormData = new FormData();
    imageFiles.forEach((images) => {
      imageFormData.append(`images`, images);
    });

    try {
      const imageUploadResponse = await axios.post(
        `${apiUrl}/image/upload-image`,
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Include cookies for authentication
        }
      );
      imageUrls = imageUploadResponse.data.imageUrls || []; // Default to empty array if imageUrls is undefined
      console.log("Image uploaded successfully:", imageUploadResponse.data);
    } catch (error) {
      console.error("Image upload failed:", error);
      // Proceed with empty imageUrls in case of failure
      // You might want to set imageUrls to empty if upload fails
    }

    // Include the imageUrls in the formData
    const adData = { ...formData, imageUrls };
    console.log("Ad data to be posted:", adData);

    try {
      const response = await fetch(`${apiUrl}/create-advert`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adData),
      });

      if (response.ok) {
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Error creating post:", errorData);
        setShowModal(true); // Show modal on error
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setShowModal(true); // Show modal on error
    }
  };

  return (
    <div className=" container mx-auto p-6 bg-slate-800 min-h-screen">
      <h1 className="text-3xl font-extrabold text-black-900 mb-6 text-center font-mono">
        Create a New Advert
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Car Description */}
        <div className=" p-6 border border-gray-300 rounded-lg shadow-lg bg-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Car Description
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-5">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Title of Advert
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="shadow-md w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="font-mono px-3 py-3 mt-1 w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm "
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Model */}
            <div>
              <label
                htmlFor="model"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Model
              </label>
              <select
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select a model</option>
                {models.map((model) => (
                  <option key={model._id} value={model._id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Price
              </label>
              <CurrencyInput
                id="price"
                name="price"
                value={formData.price}
                decimalsLimit={2}
                onValueChange={handlePriceChange}
                prefix="£"
                className="font-mono w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="font-mono px-3 py-3 mt-1 w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Description
              </label>
              <Description
                content={formData.description}
                setContent={handleDescriptionChange} // Use the new handler for Quill
              />
            </div>

            {/* Image */}

            <div className="font-mono">
              <label className="text-base text-gray-500 font-semibold mb-2 block">
                Upload Car Image files (Max 10)
              </label>
              <input
                type="file"
                name="images"
                multiple
                onChange={handleImageChange}
                className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
              />
              <p className="text-xs text-gray-400 mt-2">
                Only PNGs & JPGs, are allowed.
              </p>
            </div>
          </div>
        </div>

        {/* Car Location */}
        <div className=" p-6 border border-gray-300 rounded-lg shadow-lg mt-3 text-2xl font-semibold text-gray-800 mb-4 font-mono bg-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Car Location{" "}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Location */}
            <div className="col-span-2 lg:col-span-1 m-3">
              <Location onChange={handleLocationChange} />
            </div>

            {/* Address Finder */}
            <div className="col-span-2 lg:col-span-1">
              <AddressFinder onChange={handleAddressChange} />
            </div>
          </div>
        </div>

        {/* Is Featured */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="isFeatured"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="isFeatured"
            className="ml-2 text-sm font-medium text-gray-700"
          >
            Featured
          </label>
        </div>

        {/* Additional Details */}
        <div className=" p-6 border border-gray-300 rounded-lg shadow-lg font-mono bg-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Additional Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Transmission */}
            <div>
              <label
                htmlFor="transmission"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Transmission
              </label>
              <select
                id="transmission"
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select a transmission</option>
                {transmissions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Drive Type */}
            <div>
              <label
                htmlFor="driveType"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Drive Type
              </label>
              <select
                id="driveType"
                name="driveType"
                value={formData.driveType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select a drive type</option>
                {driveTypes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Transaction */}
            <div>
              <label
                htmlFor="transaction"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Transaction
              </label>
              <select
                id="transaction"
                name="transaction"
                value={formData.transaction}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select a transaction type</option>
                {transactions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label
                htmlFor="fuelType"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Fuel Type
              </label>
              <select
                id="fuelType"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select a fuel type</option>
                {fuelTypes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className=" p-6 border border-gray-300 rounded-lg shadow-lg font-mono bg-gray-100">
          <label
            htmlFor="features"
            className="block text-2xl font-semibold text-gray-800 mb-4 text-center"
          >
            Additional Features
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  id={feature}
                  name="features"
                  value={feature}
                  checked={formData.features.includes(feature)}
                  onChange={handleFeatureChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={feature}
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* Overview */}
        <div className=" p-6 border border-gray-300 rounded-lg shadow-lg mt-6 font-mono bg-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Year */}
            <div>
              <label
                htmlFor="year"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Mileage */}
            <div>
              <label
                htmlFor="mileage"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Mileage
              </label>
              <input
                type="number"
                id="mileage"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Body Type */}
            <div>
              <label
                htmlFor="bodyType"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Body Type
              </label>
              <input
                type="text"
                id="bodyType"
                name="bodyType"
                value={formData.bodyType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Colour */}
            <div>
              <label
                htmlFor="colour"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Colour
              </label>
              <input
                type="text"
                id="colour"
                name="colour"
                value={formData.colour}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Seats */}
            <div>
              <label
                htmlFor="seats"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Seats
              </label>
              <input
                type="number"
                id="seats"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Doors */}
            <div>
              <label
                htmlFor="doors"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Doors
              </label>
              <input
                type="number"
                id="doors"
                name="doors"
                value={formData.doors}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className=" p-6 border border-gray-300 rounded-lg shadow-lg mt-6 font-mono bg-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Engine Power */}
            <div>
              <label
                htmlFor="enginePower"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Engine Power
              </label>
              <input
                type="text"
                id="enginePower"
                name="enginePower"
                value={formData.enginePower}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Engine Size */}
            <div>
              <label
                htmlFor="engineSize"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Engine Size
              </label>
              <input
                type="text"
                id="engineSize"
                name="engineSize"
                value={formData.engineSize}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Brochure Engine Size */}
            <div>
              <label
                htmlFor="brochureEngineSize"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Brochure Engine Size
              </label>
              <input
                type="text"
                id="brochureEngineSize"
                name="brochureEngineSize"
                value={formData.brochureEngineSize}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Top Speed */}
            <div>
              <label
                htmlFor="topSpeed"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Top Speed
              </label>
              <input
                type="text"
                id="topSpeed"
                name="topSpeed"
                value={formData.topSpeed}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Acceleration (0-62mph) */}
            <div>
              <label
                htmlFor="acceleration"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Acceleration (0-62mph)
              </label>
              <input
                type="text"
                id="acceleration"
                name="acceleration"
                value={formData.acceleration}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Running Cost */}
        <div className=" p-6 border border-gray-300 rounded-lg shadow-lg mt-6 font-mono bg-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Running Cost
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Fuel Consumption */}
            <div>
              <label
                htmlFor="fuelConsumption"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Fuel Consumption
              </label>
              <input
                type="text"
                id="fuelConsumption"
                name="fuelConsumption"
                value={formData.fuelConsumption}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Fuel Capacity */}
            <div>
              <label
                htmlFor="fuelCapacity"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Fuel Capacity
              </label>
              <input
                type="text"
                id="fuelCapacity"
                name="fuelCapacity"
                value={formData.fuelCapacity}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Urban Mpg */}
            <div>
              <label
                htmlFor="urbanMpg"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Urban Mpg
              </label>
              <input
                type="text"
                id="urbanMpg"
                name="urbanMpg"
                value={formData.urbanMpg}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Extra Urban Mpg */}
            <div>
              <label
                htmlFor="extraUrbanMpg"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Extra Urban Mpg
              </label>
              <input
                type="text"
                id="extraUrbanMpg"
                name="extraUrbanMpg"
                value={formData.extraUrbanMpg}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Insurance Group */}
            <div>
              <label
                htmlFor="insuranceGroup"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Insurance Group
              </label>
              <input
                type="text"
                id="insuranceGroup"
                name="insuranceGroup"
                value={formData.insuranceGroup}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* CO2 Emissions */}
            <div>
              <label
                htmlFor="co2Emissions"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                CO2 Emissions
              </label>
              <input
                type="text"
                id="co2Emissions"
                name="co2Emissions"
                value={formData.co2Emissions}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Euro Emissions */}
            <div>
              <label
                htmlFor="euroEmissions"
                className="font-mono px-3 py-3 mt-1  w-full text-sm lg:text-base bg-gray-900 text-white border-b-2 rounded mb-3"
              >
                Euro Emissions
              </label>
              <input
                type="text"
                id="euroEmissions"
                name="euroEmissions"
                value={formData.euroEmissions}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Error Modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel="Error"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 className="text-lg font-bold mb-4">Submission Error</h2>
        <p className="mb-4">
          There was an error while creating the post. Please try again.
        </p>
        <button
          onClick={handleCloseModal}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default PostAd;
