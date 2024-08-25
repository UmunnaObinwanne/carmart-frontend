import AdvertCard from "./AdvertCard";

const UserAdverts = ({ adverts }) => {
  if (!adverts || adverts.length === 0) {
    return <div>No adverts found for this user.</div>;
  }

  return (
    <div className="w-full carousel carousel-end rounded-box bg-neutral rounded-box  space-x-4 p-4">
      {adverts.map((advert) => (
        <div key={advert._id} className="carousel-item">
          <AdvertCard advert={advert} />
        </div>
      ))}
    </div>
  );
};

export default UserAdverts;
