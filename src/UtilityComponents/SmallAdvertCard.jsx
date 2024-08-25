import { Link } from "react-router-dom";

const SmallAdvertCard = ({ advert }) => {
  return (
    <Link to={`/used-cars/${advert._id}`} className="block mb-4">
      <div className="flex items-center border rounded-lg overflow-hidden shadow-md">
        <img
          src={advert.imageUrls[0]} // Use the first image from the array
          alt={advert.title}
          className="w-24 h-24 object-cover"
        />
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-semibold truncate">{advert.title}</h3>
          <p className="text-gray-700">Price: ${advert.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default SmallAdvertCard;
