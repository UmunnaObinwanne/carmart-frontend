import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Slices/AuthSlice";
import { FaSignInAlt, FaUserPlus, FaEnvelope } from "react-icons/fa";
import Footer from "../UtilityComponents/Footer";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";

export default function NavigationBar() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <>
      <div className="relative">
        {/* Sidebar */}
        <div
          className={`fixed inset-0 z-40 transform transition-transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
        >
          <div className="w-64 h-full bg-gray-900 p-4">
            <button
              className="text-white hover:text-gray-400 mb-4"
              onClick={() => setSidebarOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Sidebar aria-label="Sidebar with multi-level dropdown example">
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Sidebar.Item href="/" icon={HiChartPie}>
                    Dashboard
                  </Sidebar.Item>
                  <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
                    <Sidebar.Item href="#">Products</Sidebar.Item>
                    <Sidebar.Item href="#">Sales</Sidebar.Item>
                    <Sidebar.Item href="#">Refunds</Sidebar.Item>
                    <Sidebar.Item href="#">Shipping</Sidebar.Item>
                  </Sidebar.Collapse>
                  <Sidebar.Item href="/dashboard/messages" icon={HiInbox}>
                    Inbox
                  </Sidebar.Item>
                  <Sidebar.Item href="/profile" icon={HiUser}>
                    Profile
                  </Sidebar.Item>
                  <Sidebar.Item href="/products" icon={HiShoppingBag}>
                    Products
                  </Sidebar.Item>
                  <Sidebar.Item href="/login" icon={HiArrowSmRight}>
                    Sign In
                  </Sidebar.Item>
                  <Sidebar.Item href="/register" icon={HiTable}>
                    Sign Up
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </div>
        </div>

        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl">
              Carmart Uk
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/post-ad" className="text-gray-800">
                  Sell Car
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-800">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-none">
            {isAuthenticated && (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <FaEnvelope className="h-5 w-5 text-gray-900" />
                    <span className="badge badge-sm indicator-item">8</span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold">8 Messages</span>
                    <span className="text-info">You have new messages</span>
                    <div className="card-actions">
                      <button className="btn btn-primary btn-block">
                        <Link to="/dashboard/messages">View Messages</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="User Avatar"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <Link to="/dashboard/profile">Profile</Link>
                    </li>
                    <li>
                      <Link to="/settings">Settings</Link>
                    </li>
                    <li>
                      <a onClick={handleLogout}>Logout</a>
                    </li>
                  </ul>
                </div>
                <button
                  className="btn btn-ghost lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="btn btn-ghost flex items-center space-x-2"
                >
                  <FaSignInAlt className="text-lg" />
                  <span>Log In</span>
                </Link>
                <Link
                  to="/register"
                  className="btn btn-ghost flex items-center space-x-2"
                >
                  <FaUserPlus className="text-lg" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
