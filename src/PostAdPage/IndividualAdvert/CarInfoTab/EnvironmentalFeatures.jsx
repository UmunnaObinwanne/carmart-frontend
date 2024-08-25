import React from "react";
import {
  FaLeaf, // Placeholder for environmental features
  FaGasPump, // Fuel consumption
  FaCloud, // CO2 emissions
  FaSeedling, // Euro emissions
} from "react-icons/fa";

const environmentalFeatureIconMap = {
  "Fuel consumption": FaGasPump,
  "CO2 emissions": FaCloud,
  "Euro emissions": FaSeedling,
};

const environmentalFeatureUnits = {
  "Fuel consumption": "L/100km",
  "CO2 emissions": "g/km",
  "Euro emissions": "",
};

const EnvironmentalFeatures = ({ advert }) => {
  const environmentalFeatures = [
    {
      name: "Fuel consumption",
      value: `${advert.fuelConsumption} ${environmentalFeatureUnits["Fuel consumption"]}`,
    },
    {
      name: "CO2 emissions",
      value: `${advert.co2Emissions} ${environmentalFeatureUnits["CO2 emissions"]}`,
    },
    { name: "Euro emissions", value: `Euro ${advert.euroEmissions}` },
  ];

  return (
    <section className="w-full px-6 py-6 bg-white">
      <div className="flex justify-between items-center w-full gap-2 border-b py-8">
        <p className="uppercase text-gray-500 font-semibold">
          Environmental Features:
        </p>
      </div>

      <div className="grid grid-cols-1 py-4 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {environmentalFeatures.map((feature, index) => {
          const Icon = environmentalFeatureIconMap[feature.name] || FaLeaf;

          return (
            <div
              key={index}
              className="border p-2 rounded-md bg-white flex items-center"
            >
              <Icon className="text-gray-500 mr-2" />
              <div>
                <p className="text-gray-700 text-lg font-bold">
                  {feature.name}
                </p>
                <p className="text-gray-500 text-sm font-semibold">
                  {feature.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EnvironmentalFeatures;
