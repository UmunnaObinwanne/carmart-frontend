import React, { useState } from "react";

const carmartAccordionData = [
  {
    title: "What is Carmart?",
    content:
      "Carmart is an online marketplace where users can buy, sell, and explore a wide range of vehicles. Whether you're looking for a new car, a used car, or simply want to browse, Carmart provides a platform that connects buyers with sellers.",
  },
  {
    title: "How does Carmart work?",
    content:
      "Carmart operates as a listing platform where sellers can post their vehicles for sale and buyers can browse through various listings. Users can filter search results based on make, model, price, and other criteria. Once a buyer finds a car they are interested in, they can contact the seller directly through the platform.",
  },
  {
    title: "What types of vehicles can I find on Carmart?",
    content:
      "Carmart offers a variety of vehicles including cars, trucks, motorcycles, and even specialty vehicles like RVs and boats. Whether you're in the market for a luxury sedan, a compact car, or a family SUV, you'll find a diverse selection to choose from.",
  },
  {
    title: "Is it safe to buy a car through Carmart?",
    content:
      "Carmart prioritizes the safety of its users by implementing secure communication channels between buyers and sellers. However, as with any online transaction, users are advised to take precautions, such as meeting in safe locations and verifying the authenticity of the seller and the vehicle before completing a purchase.",
  },
  {
    title: "How can I list my vehicle on Carmart?",
    content:
      "Listing your vehicle on Carmart is easy. Simply create an account, navigate to the 'Sell' section, and fill out the details of your vehicle. You'll need to provide information such as the make, model, year, mileage, and condition of the vehicle. You can also upload photos to make your listing more attractive to potential buyers.",
  },
  {
    title: "Are there any fees for using Carmart?",
    content:
      "Carmart offers free basic listings, but there are premium listing options available for sellers who want more visibility. Premium listings may include features like highlighted listings, more photos, and top placement in search results.",
  },
];

const CarmartAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mt-28 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="mb-10 text-center">
          <h2 className="md:text-4xl text-3xl font-semibold mb-6 text-gray-800">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Explore common questions and find answers to help you make the most
            out of our services. If you don't see your question here, feel free
            to contact us for assistance.
          </p>
        </div>
        <div className="divide-y divide-gray-200">
          {carmartAccordionData.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-lg mb-4"
            >
              <button
                type="button"
                className="w-full text-base text-left font-semibold py-6 px-6 flex items-center rounded-t-lg hover:bg-gray-50 transition"
                onClick={() => toggleAccordion(index)}
              >
                <span className="mr-4 text-gray-800">{item.title}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 fill-current ml-auto shrink-0 transform transition-transform duration-200 ${
                    activeIndex === index ? "rotate-90" : ""
                  }`}
                  viewBox="0 0 124 124"
                >
                  <path
                    d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                    data-original="#000000"
                  />
                </svg>
              </button>
              <div
                className={`${
                  activeIndex === index ? "block" : "hidden"
                } px-6 py-4 bg-gray-50 rounded-b-lg`}
              >
                <p className="text-gray-700">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarmartAccordion;
