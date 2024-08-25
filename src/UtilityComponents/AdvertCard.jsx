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

const AdvertCard = ({ advert }) => {
  const timePosted = formatTime(advert.createdAt);

  // Format the price with Pound sign and thousand separator
  const formattedPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(advert.price);

  const formattedMileage = new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(advert.mileage);

  return (
    <div className="w-full flex items-center justify-center p-1">
      <article className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700 w-full max-w-xs m-0">
        <img
          className="object-cover h-48 w-full"
          src={advert.imageUrls[0]}
          alt="advert image"
        />
        <div className="border-t border-gray-200 dark:border-gray-500"></div>

        <div className="flex flex-col gap-1 mt-1 px-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-50 truncate">
            {advert.title}
          </h2>
          <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1">
            <span>{advert.advertBrandModel}</span> - <span>{advert.year}</span>
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
        <div className="flex justify-between gap-2 mt-1 px-2 text-xs text-gray-600 dark:text-gray-300">
          <div>
            <span className="block">{advert.topSpeed}</span>
            <span className="block">Top Speed</span>
          </div>
          <div>
            <span className="block">{advert.enginePower}</span>
            <span className="block">Engine Power</span>
          </div>
          <div>
            <span className="block">{formattedMileage}</span>
            <span className="block">Miles</span>
          </div>
          <div>
            <span className="block">{advert.colour}</span>
            <span className="block">Colour</span>
          </div>
        </div>

        <div className="mt-1 p-2 border-t border-gray-200 dark:border-gray-500">
          <div className="w-full flex justify-between items-center text-xs text-gray-800 dark:text-gray-50">
            <div className="flex items-center gap-1">
              <FaLocationArrow className="w-4" />
              <span>{advert.city}</span>
            </div>
            <Link
              to={`/used-cars/${advert._id}`}
              className="text-blue-600 hover:underline"
            >
              See details to bid
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default AdvertCard;
