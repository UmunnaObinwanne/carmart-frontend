import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdsBackend from "./AdsTab/AdsBackend";
import UserProfile from "../UserProfile/UserProfile";
import MessagesList from "./Messages/MessageList";

// Placeholder SVG components
const AdsIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 4v16m8-8H4"
    />
  </svg>
);
const MessagesIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2m14-4h-8a2 2 0 00-2 2v4H5l7 7 7-7h-4V6a2 2 0 012-2h8"
    />
  </svg>
);
const SettingsIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8v4l3 3m6-3a9 9 0 11-6-8.95"
    />
  </svg>
);
const FavoritesIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 12l5 5L20 7"
    />
  </svg>
);

const tabData = [
  {
    label: "My Ads",
    value: "my-ads",
    icon: AdsIcon,
    component: <AdsBackend />,
  },
  {
    label: "Messages",
    value: "messages",
    icon: MessagesIcon,
    component: <MessagesList />,
  },
  {
    label: "Profile",
    value: "profile",
    icon: SettingsIcon,
    component: <UserProfile />,
  },
  {
    label: "Favorites",
    value: "favorites",
    icon: FavoritesIcon,
    component: <div>Favorites Component</div>,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const defaultTab = tabData[0].value;
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname.split("/").pop();
    const activeTab = tabData.find((tab) => tab.value === path);
    return activeTab ? activeTab.value : defaultTab;
  });

  useEffect(() => {
    navigate(`/dashboard/${activeTab}`);
  }, [activeTab, navigate]);

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto mb-4 w-full bg-gray-100 shadow-md py-3 px-2">
        {tabData.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            className={`flex items-center justify-center gap-2 px-4 py-2 flex-shrink-0 ${
              activeTab === value
                ? "text-blue-500 border-b-2 border-blue-500 font-semibold"
                : "text-gray-700"
            } hover:text-blue-500 whitespace-nowrap`}
            onClick={() => handleTabChange(value)}
          >
            <Icon />
            <span className="text-base">{label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="flex-grow w-full overflow-auto">
        {tabData.map(
          ({ value, component }) =>
            activeTab === value && (
              <div key={value} className="p-4">
                {component}
              </div>
            )
        )}
      </div>
    </div>
  );
}
