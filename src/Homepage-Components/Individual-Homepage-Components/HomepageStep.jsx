function HomepageStep() {
  return (
    <div className="bg-gray-50 py-8 px-4 md:px-6 lg:px-8 rounded-xl shadow-lg w-full">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6 animate-fadeIn">
          Get Your Dream Car in a Few Steps
        </h2>
        <ul className="steps flex flex-col md:flex-row md:gap-6 gap-4 w-full">
          <li className="step bg-blue-600 text-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-blue-700 animate-fadeIn flex-1 text-center">
            <span className="text-sm md:text-base font-medium">Register</span>
          </li>
          <li className="step bg-teal-600 text-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-teal-700 animate-fadeIn flex-1 text-center">
            <span className="text-sm md:text-base font-medium">
              Search Your Dream
            </span>
          </li>
          <li className="step bg-gray-600 text-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-gray-700 animate-fadeIn flex-1 text-center">
            <span className="text-sm md:text-base font-medium">
              Contact Seller
            </span>
          </li>
          <li className="step bg-indigo-600 text-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-indigo-700 animate-fadeIn flex-1 text-center">
            <span className="text-sm md:text-base font-medium">
              Complete Purchase
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HomepageStep;
