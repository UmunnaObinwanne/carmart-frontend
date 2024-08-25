import Loader from "../../UtilityComponents/Loader"; // Custom loader component
//import ErrorMessage from "../../UtilityComponents/ErrorMessage"; // Custom error component
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

const formatTime = (date) => {
  const distance = formatDistanceToNow(new Date(date), { addSuffix: true });
  return distance
    .replace("about ", "")
    .replace(" hours", "h")
    .replace(" minutes", "m")
    .replace(" days", "d");
};

const AdvertDetails = ({ advert }) => {
  console.log(advert);
  //if (loading) return <Loader />;

  //if (!advert) return <div>No advert found</div>;

  return (
    <>
      {/* Content */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image and Thumbnails */}
            <aside className="lg:col-span-1">
              <div className="border rounded-lg mb-6 flex justify-center">
                <a
                  href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big.webp"
                  className="rounded-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="rounded-lg object-cover"
                    src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big.webp"
                    alt="Product"
                  />
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {[
                  "big1.webp",
                  "big2.webp",
                  "big3.webp",
                  "big4.webp",
                  "big.webp",
                ].map((image, index) => (
                  <a
                    key={index}
                    href={`https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/${image}`}
                    className="border rounded-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      width="60"
                      height="60"
                      className="rounded-lg object-cover"
                      src={`https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/${image}`}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </a>
                ))}
              </div>
            </aside>

            {/* Product Details */}
            <main className="lg:col-span-1">
              <div className="p-4 bg-white border rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-2">Title</h2>
                <div className="flex items-center mb-3">
                  <div className="text-yellow-500 flex items-center mr-4">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                    <span className="ml-2">Time Posted:</span>
                  </div>
                  <span className="text-gray-600">
                    <i className="fas fa-shopping-basket fa-sm mr-1"></i>154
                    orders
                  </span>
                  <span className="text-green-500 ml-4">In stock</span>
                </div>

                <div className="mb-4">
                  <span className="text-2xl font-semibold">$75.00</span>
                  <span className="text-gray-600"> / per box</span>
                </div>

                <p className="mb-4">
                  Modern look and quality demo item is a streetwear-inspired
                  collection that continues to break away from the conventions
                  of mainstream fashion. Made in Italy, these black and brown
                  clothing low-top shirts for men.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <dt className="font-medium">Type:</dt>
                    <dd>Regular</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Color:</dt>
                    <dd>Brown</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Material:</dt>
                    <dd>Cotton, Jeans</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Brand:</dt>
                    <dd>Reebook</dd>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Size
                    </label>
                    <select className="form-select block w-full border-gray-300 rounded-md shadow-sm">
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        className="form-control w-20 border-gray-300 rounded-md shadow-sm"
                        defaultValue="1"
                      />
                      <button className="btn btn-primary shadow-md">
                        Buy now
                      </button>
                      <button className="btn btn-light border">
                        <i className="fas fa-heart text-secondary"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Tabs and Similar Items */}
      <section className="bg-gray-100 border-t py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tabs */}
            <div className="lg:col-span-2">
              <Tabs aria-label="Default tabs" variant="default">
                <Tabs.Item active title="Profile" icon={HiUserCircle}>
                  This is{" "}
                  <span className="font-medium text-gray-800 dark:text-white">
                    Profile tab's associated content
                  </span>
                  . Clicking another tab will toggle the visibility of this one
                  for the next. The tab JavaScript swaps classes to control the
                  content visibility and styling.
                </Tabs.Item>
                <Tabs.Item title="Dashboard" icon={MdDashboard}>
                  This is{" "}
                  <span className="font-medium text-gray-800 dark:text-white">
                    Dashboard tab's associated content
                  </span>
                  . Clicking another tab will toggle the visibility of this one
                  for the next. The tab JavaScript swaps classes to control the
                  content visibility and styling.
                </Tabs.Item>
                <Tabs.Item title="Settings" icon={HiAdjustments}>
                  This is{" "}
                  <span className="font-medium text-gray-800 dark:text-white">
                    Settings tab's associated content
                  </span>
                  . Clicking another tab will toggle the visibility of this one
                  for the next. The tab JavaScript swaps classes to control the
                  content visibility and styling.
                </Tabs.Item>
                <Tabs.Item title="Contacts" icon={HiClipboardList}>
                  This is{" "}
                  <span className="font-medium text-gray-800 dark:text-white">
                    Contacts tab's associated content
                  </span>
                  . Clicking another tab will toggle the visibility of this one
                  for the next. The tab JavaScript swaps classes to control the
                  content visibility and styling.
                </Tabs.Item>
                <Tabs.Item disabled title="Disabled">
                  Disabled content
                </Tabs.Item>
              </Tabs>
            </div>

            {/* Similar Items */}
            <div className="border rounded-lg bg-white shadow-md">
              <div className="p-4">
                <h5 className="text-lg font-bold mb-4">Similar items</h5>
                {[
                  {
                    img: "https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/8.webp",
                    title: "Rucksack Backpack Large Line Mounts",
                    price: "$38.90",
                  },
                  {
                    img: "https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/9.webp",
                    title: "Summer New Men's Denim Jeans Shorts",
                    price: "$29.50",
                  },
                  {
                    img: "https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/10.webp",
                    title: "T-shirts with multiple colors for men and lady",
                    price: "$120.00",
                  },
                  {
                    img: "https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/11.webp",
                    title: "Blazer Suit Dress Jacket for Men Blue color",
                    price: "$339.90",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center mb-4">
                    <a href="#" className="mr-4">
                      <img
                        src={item.img}
                        className="w-24 h-24 object-cover rounded-lg"
                        alt={`Similar Item ${index + 1}`}
                      />
                    </a>
                    <div>
                      <a href="#" className="text-sm font-medium text-blue-600">
                        {item.title}
                      </a>
                      <strong className="block text-gray-800">
                        {item.price}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Content */}
    </>
  );
};

export default AdvertDetails;
