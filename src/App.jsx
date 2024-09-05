import { Routes, Route } from "react-router-dom";
import LoginForm from "./Authentication/LoginForm/LoginForm";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Registration from "../src/Authentication/Registration/Registration";
import NavigationBar from "./NavigationBar/NavigationBar";
import PostAd from "./PostAdPage/PostAd";
import Location from "./PostAdPage/LocationUtility/Location";
import CarGrid from "./CarDisplay/CarGrid";
import UserProfile from "./UserProfile/UserProfile";
import Dashboard from "./Dashboard/Dashboard";
import AdsBackend from "./Dashboard/AdsTab/AdsBackend";
import CarDetailsFetch from "./PostAdPage/IndividualAdvert/CarDetailsFetch";
import MessagesList from "./Dashboard/Messages/MessageList";
import ChatDetails from "./Dashboard/Messages/ChatDetails";
import SellerProfile from "./UserProfile/SellerProfile";
import PageDetails from "./ContentManagement/PageDetails";
import HomepageContainer from "./Homepage-Components/HomepageContainer";
import LoginRedirect from "./UtilityComponents/LoginRedirect";
import EditAd from "./Dashboard/AdsTab/EditAd";

function App() {
  return (
    <div className="bg-white min-h-screen dark:bg-white">
      <Routes>
        <Route path="/" element={<NavigationBar />}>
          <Route index element={<HomepageContainer />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/login-redirect" element={<LoginRedirect />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/used" element={<Location />} />
          <Route path="/used-cars" element={<CarGrid />} />
          <Route path="/:slug" element={<PageDetails />} />
          <Route path="/sell" element={<SellerProfile />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/used-cars/:id" element={<CarDetailsFetch />} />
            <Route path="/post-ad" element={<PostAd />} />
            <Route path="/edit-ad/:id" element={<EditAd />} />
            <Route path="/chats/:chatId" element={<ChatDetails />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="/dashboard/my-ads" element={<AdsBackend />} />
              <Route path="/dashboard/messages" element={<MessagesList />} />
              <Route path="/dashboard/profile" element={<UserProfile />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
