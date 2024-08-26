import { Link } from "react-router-dom";
import { FaLocationArrow, FaClock } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

const formatTime = (date) => {
  const distance = formatDistanceToNow(new Date(date), { addSuffix: true });
  return distance
    .replace("about ", "")
    .replace(" hours", "h")
    .replace(" minutes", "m")
    .replace(" days", "d");
};

const CarCard = ({ car }) => {
  const timePosted = formatTime(car.createdAt);

  // Format the price with Pound sign and thousand separator
  const formattedPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(car.price);

  const formattedMileage = new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(car.mileage);

  return (
    <div className="w-full flex items-center justify-center p-2">
      {/* <!-- product card --> */}
      <article className="w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] bg-white rounded-xl shadow-lg overflow-hidden dark:bg-gray-800">
        <div className="relative">
          <img
            className="object-cover h-64 w-full rounded-t-xl"
            src={car.imageUrls[0]}
            alt="Car image"
          />
        </div>
        <div className="border-t border-gray-200 dark:border-gray-500"></div>

        <div className="flex flex-col gap-2 mt-1 px-4 py-2">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-50 truncate">
            {car.title}
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
            <span>{car.carName}</span> - <span>{car.year}</span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-50">
              <strong>{formattedPrice}</strong>
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300">
              <FaClock className="h-4 w-4" />
              <span>{timePosted}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-2 mt-1 px-3 pb-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex-1 min-w-[calc(50%-0.5rem)]">
            <span className="block">Top Speed</span>
            <span className="block font-semibold">{car.topSpeed} km/h</span>
          </div>
          <div className="flex-1 min-w-[calc(50%-0.5rem)]">
            <span className="block">Engine Power</span>
            <span className="block font-semibold">{car.enginePower} HP</span>
          </div>
          <div className="flex-1 min-w-[calc(50%-0.5rem)]">
            <span className="block">Miles</span>
            <span className="block font-semibold">{formattedMileage}</span>
          </div>
          <div className="flex-1 min-w-[calc(50%-0.5rem)]">
            <span className="block">Colour</span>
            <span className="block font-semibold">{car.colour}</span>
          </div>
        </div>

        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-50 rounded-b-xl">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300">
              <FaLocationArrow className="w-4 h-4" />
              <span>{car.city}</span>
            </div>
            <Link
              to={`/used-cars/${car._id}`}
              className="text-blue-600 hover:text-blue-800 font-semibold py-1 px-3 rounded-md transition duration-300 ease-in-out text-xs"
            >
              See details to bid
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default CarCard;
