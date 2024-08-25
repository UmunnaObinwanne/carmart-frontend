import React from "react";
import {
  FaBluetooth, // Bluetooth
  FaUsb, // USB port
  FaChargingStation, // Wireless charge
  FaBolt, // Fast charge
  FaMapMarkedAlt, // GPS navigation
  FaHeadset, // Headup display
  FaInternetExplorer, // Internet access
  FaFire, // Heated driver seat
  FaFan, // Heated passenger seat
  FaWind, // Ventilated front seats
  FaSnowflake, // Ventilated back seats, Seasonal tires
  FaMemory, // Seats position memory
  FaThermometerThreeQuarters, // Heated windscreen, Independent heating
  FaCarCrash, // Sport suspension
  FaAirFreshener, // Air suspension
  FaKey, // Keyless entry
  FaParking, // Front parking sensor
  FaCameraRetro, // Rear parking camera
  FaCamera, // 360° camera
  FaEyeDropper, // Blind spot assist
  FaRoad, // Lane assist
  FaLightbulb, // Dynamic cornering lights
  FaExclamationTriangle, // ABS
  FaExclamationCircle, // ESP
  FaClock, // Tempomat
  FaHourglassHalf, // Distance control
  FaWrench, // Towing equipment
  FaPlay, // Start & stop
  FaHistory, // Full service history
  FaCloudSunRain, // Fog lights
  FaCloudRain, // Rain sensor
  FaBox, // Electronic trunk opening/closing
  FaTachometerAlt, // Tire pressure indicator
  FaStopCircle, // Brake assistant (BAS)
  FaQuestionCircle, // Default icon for unknown features
  FaCarAlt,
} from "react-icons/fa";
import {
  MdAirlineSeatReclineExtra, // Sports seats
  MdAirlineSeatLegroomExtra, // Multifunctional steering wheel
  MdSportsMartialArts, // Sport steering wheel
  MdAutorenew, // Autonomous steering system
  MdMergeType, // Folding mirrors
  MdDriveEta, // Right-hand drive
  MdIso, // Isofix
  MdCarRental, // New tires
} from "react-icons/md";
import {
  IoIosKey, // Keyless Go
  IoIosCar, // Rear parking sensor
  IoMdCar, // Independent parking
} from "react-icons/io";

const featureIconMap = {
  Bluetooth: FaBluetooth,
  "USB port": FaUsb,
  "Wireless charge": FaChargingStation,
  "Fast charge": FaBolt,
  "GPS navigation": FaMapMarkedAlt,
  "Headup display": FaHeadset,
  "Internet access": FaInternetExplorer,
  "Heated driver seat": FaFire,
  "Heated passenger seat": FaFan,
  "Sports seats": MdAirlineSeatReclineExtra,
  "Ventilated front seats": FaWind,
  "Ventilated back seats": FaSnowflake,
  "Seats position memory": FaMemory,
  "Heated windscreen": FaThermometerThreeQuarters,
  "Independent heating": FaThermometerThreeQuarters,
  "Multifunctional steering wheel": MdAirlineSeatLegroomExtra,
  "Sport steering wheel": MdSportsMartialArts,
  "Sport suspension": FaCarCrash,
  "Air suspension": FaAirFreshener,
  "Keyless entry": FaKey,
  "Keyless Go": IoIosKey,
  "Front parking sensor": FaParking,
  "Rear parking sensor": IoIosCar,
  "Parking assistant": FaParking,
  "Rear parking camera": FaCameraRetro,
  "Independent parking": IoMdCar,
  "360° camera": FaCamera,
  "Folding mirrors": MdMergeType,
  "Blind spot assist": FaEyeDropper,
  "Lane assist": FaRoad,
  "Autonomous steering system": MdAutorenew,
  Isofix: MdIso,
  "Dynamic cornering lights": FaLightbulb,
  "Right-hand drive": MdDriveEta,
  ABS: FaExclamationTriangle,
  ESP: FaExclamationCircle,
  Tempomat: FaClock,
  "Distance control": FaHourglassHalf,
  "Steering wheel booster": MdAirlineSeatLegroomExtra,
  "Towing equipment": FaWrench,
  "Start & stop": FaPlay,
  "Full service history": FaHistory,
  "Fog lights": FaCloudSunRain,
  "Seasonal tires": FaSnowflake,
  "New tires": MdCarRental,
  "Rain sensor": FaCloudRain,
  "Electronic trunk opening": FaBox,
  "Electronic trunk closing": FaBox,
  "Tire pressure indicator": FaTachometerAlt,
  "Brake assistant (BAS)": FaStopCircle,
};

const CarInteriorCard = ({ advert }) => {
  return (
    <section className="w-full px-6 py-6 bg-white">
      <div className="flex justify-between items-center w-full gap-2 border-b py-8">
        <p className="uppercase text-gray-500 font-semibold">
          Car Interior Features:
        </p>
      </div>

      <div className="grid grid-cols-1 py-4 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {advert.features.map((feature, index) => {
          const Icon = featureIconMap[feature] || FaQuestionCircle;

          return (
            <div
              key={index}
              className="border p-2 rounded-md bg-white flex items-center"
            >
              <Icon className="text-gray-500 mr-2" />
              <div>
                <p className="text-gray-700 text-lg font-bold">{feature}</p>
                <p className="text-gray-500 text-sm ">
                  {featureIconMap[feature] ? "Available" : "Unknown"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CarInteriorCard;
