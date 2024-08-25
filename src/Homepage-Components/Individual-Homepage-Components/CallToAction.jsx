import { Link } from "react-router-dom";
import carImage from "../../assets/call car action.jpg";

const CallToAction = () => {
  return (
    <div className="mt-10 mx-10 bg-white rounded-md px-4 py-12 shadow-lg">
      <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto items-center">
        <div className="text-center md:text-left">
          <h2 className="md:text-4xl text-3xl font-extrabold mb-6 text-gray-800">
            Sell Your Car Faster than the speed of this car
          </h2>
          <p className="text-gray-600 mb-6">
            Sellers using Carmart UK sell their cars faster than sellers on
            other platform. Do you need quick bucks for your car, then list it
            now.
          </p>
          <button
            type="button"
            className="px-6 py-3 rounded-xl text-white bg-blue-600 transition-all hover:bg-cyan-800"
          >
            <Link to="/post-ad">Get Started</Link>
          </button>
        </div>
        <div className="flex justify-center">
          <img
            src={carImage} // Add your image URL here
            alt="Premium Benefits"
            className="w-full max-w-sm mx-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
