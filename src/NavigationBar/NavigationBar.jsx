import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Slices/AuthSlice";
import {
  FaSignInAlt,
  FaUserPlus,
  FaInfoCircle,
  FaPhone,
  FaClipboardList,
} from "react-icons/fa";
import {
  HiInbox,
  HiTable,
  HiPlus,
  HiHome,
  HiDocumentText,
  HiShieldCheck,
} from "react-icons/hi";
import Footer from "../UtilityComponents/Footer";
import { Sidebar } from "flowbite-react";

export default function NavigationBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login"); // Redirect after successful logout
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
          <div className="w-64 h-full bg-gray-800 text-white p-4">
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
                  <Sidebar.Item href="/dashboard" icon={HiHome}>
                    Dashboard
                  </Sidebar.Item>
                  <Sidebar.Item href="/dashboard/messages" icon={HiInbox}>
                    Inbox
                  </Sidebar.Item>

                  {/* Collapsible Section with Icons */}
                  <Sidebar.Collapse label="Pages" icon={HiDocumentText}>
                    <Sidebar.Item href="/about" icon={FaInfoCircle}>
                      About Us
                    </Sidebar.Item>
                    <Sidebar.Item href="/contact" icon={FaPhone}>
                      Contact
                    </Sidebar.Item>
                    <Sidebar.Item href="/what-we-do" icon={FaClipboardList}>
                      What We Do
                    </Sidebar.Item>
                    <Sidebar.Item href="/privacy-policy" icon={HiShieldCheck}>
                      Privacy Policy
                    </Sidebar.Item>
                  </Sidebar.Collapse>

                  <Sidebar.Item href="/post-ad" icon={HiPlus}>
                    Sell Car
                  </Sidebar.Item>
                  <Sidebar.Item icon={HiTable}>
                    <button onClick={handleLogout}>Logout</button>
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </div>
        </div>

        <div className="navbar bg-gray-800 text-white">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl text-white">
              Carmart UK
            </Link>
          </div>

          {/* Centered Links */}
          <div className="navbar-center hidden lg:flex ml-10">
            <ul className="menu menu-horizontal px-1 space-x-6">
              <li>
                <Link
                  to="/about"
                  className="text-white hover:text-gray-300 transition-all duration-300 flex items-center space-x-2"
                >
                  <FaInfoCircle />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white hover:text-gray-300 transition-all duration-300 flex items-center space-x-2"
                >
                  <FaPhone />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/what-we-do"
                  className="text-white hover:text-gray-300 transition-all duration-300 flex items-center space-x-2"
                >
                  <FaClipboardList />
                  <span>What We Do</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-white hover:text-gray-300 transition-all duration-300 flex items-center space-x-2"
                >
                  <HiShieldCheck />
                  <span>Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Sell Car and Dashboard */}
          <div className="navbar-end hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-6">
              <li>
                <Link
                  to="/post-ad"
                  className="text-white hover:text-gray-300 flex items-center space-x-2"
                >
                  <HiPlus className="text-lg" />
                  <span>Sell Car</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-gray-300 flex items-center space-x-2"
                >
                  <HiHome className="text-lg" />
                  <span>Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Auth buttons */}
          <div className="flex-none">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar text-white"
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
                    className="menu menu-sm dropdown-content bg-gray-800 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <Link to="/dashboard/profile" className="text-red">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/messages">Messages</Link>
                    </li>
                    <li>
                      <Link onClick={handleLogout}>Logout</Link>
                    </li>
                  </ul>
                </div>
                <button
                  className="btn btn-ghost lg:hidden text-white"
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
                  className="btn btn-ghost flex items-center space-x-2 text-white"
                >
                  <FaSignInAlt className="text-lg" />
                  <span>Log In</span>
                </Link>
                <Link
                  to="/register"
                  className="btn btn-ghost flex items-center space-x-2 text-white"
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
