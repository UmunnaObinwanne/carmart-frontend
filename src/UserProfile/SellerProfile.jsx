import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import UserAdverts from "../UtilityComponents/userAdverts";
import { fetchUserAdverts } from "../Slices/AdvertSlices";
import { useSelector, useDispatch } from "react-redux";

const formatTime = (date) => {
  const distance = formatDistanceToNow(new Date(date), { addSuffix: true });
  return distance
    .replace("about ", "")
    .replace(" hours", "h")
    .replace(" minutes", "m")
    .replace(" days", "d");
};


//
function SellerProfile({ seller }) { //seller props was passed from carDetailsFetch inside of the PostAdPage
  const [showAdverts, setShowAdverts] = useState(false);
  const [revealPhone, setRevealPhone] = useState(false);
  const [revealEmail, setRevealEmail] = useState(false);

  const dispatch = useDispatch();
  const {
    userAdverts,
    loading: advertsLoading,
    error: advertsError,
  } = useSelector((state) => state.userAdverts);

  //fetching seller's adverts
  useEffect(() => {
    if (showAdverts) {
      dispatch(fetchUserAdverts(seller._id));
    }
  }, [showAdverts, seller._id, dispatch]);

  const timeJoined = seller.createdAt ? formatTime(seller.createdAt) : "N/A";

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border font-sans text-black">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-xl leading-6 font-medium text-black">
          {seller.username}
        </h3>
        <p className="mt-3 max-w-2xl text-sm text-black">{seller.about}</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-black">Full name</dt>
            <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
              {seller.fullName}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-black">Email address</dt>
            <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setRevealEmail(!revealEmail)}
              >
                {revealEmail ? seller.email : "Show Email"}
              </button>
            </dd>
          </div>
<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
  <dt className="text-sm font-medium text-black">Phone number</dt>
  <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2 flex items-center">
    {revealPhone && <span className="mr-3">{seller.phone}</span>}
    <button
      className="text-blue-500 hover:underline"
      onClick={() => setRevealPhone(!revealPhone)}
    >
      {revealPhone ? "Hide Phone Number" : "Show Phone Number"}
    </button>
  </dd>
</div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-black">Seller Since:</dt>
            <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
              {timeJoined}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-black">Ads Posted:</dt>
            <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setShowAdverts(!showAdverts)}
              >
                {showAdverts ? "Hide Ads" : "Show Ads"}
              </button>
            </dd>
          </div>
        </dl>
      </div>

      <div className="relative w-full flex gap-4 py-6 overflow-x-auto mx-2">
        {showAdverts && (
          <div>
            {advertsLoading ? (
              <div>Loading Adverts...</div>
            ) : advertsError ? (
              <div>Error: {advertsError}</div>
            ) : (
              <UserAdverts adverts={userAdverts} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerProfile;
