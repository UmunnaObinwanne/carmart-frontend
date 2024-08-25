//import CarInfoTab from "./CarInfoTab";

import {
  FaTachometerAlt,
  FaRoad,
  FaHorse,
  FaBolt,
  FaGasPump,
  FaRulerVertical,
  FaOilCan,
  FaThermometerHalf,
} from "react-icons/fa";

const CarInformation = ({ advert }) => {
  return (
    <section>
      <div className="grid grid-cols-1 py-4 gap-2 md:grid-cols-2 lg:grid-cols-3">
        <div className="border p-2 rounded-md bg-white flex items-center">
          <FaRoad className="text-gray-500 mr-2" />
          <div>
            <p className="text-gray-500 text-xs font-semibold">Mileage:</p>
            <p className=" text-xl">{advert.mileage || "Unknown"} miles</p>
          </div>
        </div>
        <div className="border p-2 rounded-md bg-white flex items-center">
          <FaHorse className="text-gray-500 mr-2" />
          <div>
            <p className="text-gray-500 text-xs font-semibold">Engine Power:</p>
            <p className=" text-xl">{advert.enginePower || "Unknown"} HP</p>
          </div>
        </div>
        <div className="border p-2 rounded-md bg-white flex items-center">
          <FaTachometerAlt className="text-gray-500 mr-2" />
          <div>
            <p className="text-gray-500 text-xs font-semibold">Top Speed:</p>
            <p className=" text-xl">{advert.topSpeed || "Unknown"} km/h</p>
          </div>
        </div>
        <div className="border p-2 rounded-md bg-white flex items-center">
          <FaBolt className="text-gray-500 mr-2" />
          <div>
            <p className="text-gray-500 text-xs font-semibold">Acceleration:</p>
            <p className=" text-xl">{advert.acceleration || "Unknown"} s</p>
          </div>
        </div>
        <div className="border p-2 rounded-md bg-white flex items-center">
          <FaGasPump className="text-gray-500 mr-2" />
          <div>
            <p className="text-gray-500 text-xs font-semibold">
              Fuel Consumption:
            </p>
            <p className=" text-xl">
              {advert.fuelConsumption || "Unknown"} L/100km
            </p>
          </div>
        </div>
        <div className="border p-2 rounded-md bg-white flex items-center">
          <FaRulerVertical className="text-gray-500 mr-2" />
          <div>
            <p className="text-gray-500 text-xs font-semibold">
              Fuel Capacity:
            </p>
            <p className=" text-xl">{advert.fuelCapacity || "Unknown"} L</p>
          </div>
        </div>
        <div className="border p-2 rounded-md bg-white flex items-center">
          <FaOilCan className="text-gray-500 mr-2" />
          <div>
            <p className="text-gray-500 text-xs font-semibold">Urban MPG:</p>
            <p className=" text-xl">{advert.urbanMpg || "Unknown"} mpg</p>
          </div>
        </div>
        <div className="border p-2 rounded-md bg-white flex items-center">
          <FaThermometerHalf className="text-gray-500 mr-2" />
          <div>
            <p className="text-gray-500 text-xs font-semibold">
              Extra Urban MPG:
            </p>
            <p className=" text-xl">{advert.extraUrbanMpg || "Unknown"}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarInformation;

/*
  
     
        <div className="border p-2 rounded-md bg-white">
          <p className="text-gray-500 text-xs font-semibold">
            Insurance Group:
          </p>
          <p className=" text-xl">{advert.insuranceGroup}</p>
        </div>
        <div className="border p-2 rounded-md bg-white">
          <p className="text-gray-500 text-xs font-semibold">Euro Emissions:</p>
          <p className=" text-xl">{advert.euroEmissions}</p>
        </div>
      </div>


      */
