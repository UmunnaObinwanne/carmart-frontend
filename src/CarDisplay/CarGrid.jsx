import { useState, useEffect } from "react";
import axios from "axios";
import CarCard from "./CarCard";
import Loader from "../UtilityComponents/Loader";
import SearchBar from "../UtilityComponents/SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

const CarGrid = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const params = queryString.parse(location.search); // Parse the URL params
        const response = await axios.get(`${apiUrl}/filter`, {
          params,
        });
        setCars(response.data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching the cars.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [location.search]); // Trigger effect when location.search changes

  const handleSearch = (searchCriteria) => {
    const queryParams = queryString.stringify(searchCriteria);
    navigate(`?${queryParams}`); // Update the URL with new search parameters
  };

  if (loading) return <Loader />;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen p-4">
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
        {cars.length > 0 ? (
          cars.map((car) => <CarCard key={car._id} car={car} />)
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No cars found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CarGrid;
