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
import Test from "./Test";
import CarDetailsFetch from "./PostAdPage/IndividualAdvert/CarDetailsFetch";
import MessagesList from "./Dashboard/Messages/MessageList";
import ChatDetails from "./Dashboard/Messages/ChatDetails";
import SellerProfile from "./UserProfile/SellerProfile";
import PageDetails from "./ContentManagement/PageDetails";
import HomepageContainer from "./Homepage-Components/HomepageContainer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavigationBar />}>
          <Route index element={<HomepageContainer />} />
          <Route path="/test" element={<Test />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/used" element={<Location />} />
          <Route path="/used-cars" element={<CarGrid />} />
          <Route path="/:slug" element={<PageDetails />} />

          <Route path="/sell" element={<SellerProfile />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/used-cars/:id" element={<CarDetailsFetch />} />
            <Route path="/post-ad" element={<PostAd />} />

            <Route path="/messages/:chatId" element={<ChatDetails />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="/dashboard/my-ads" element={<AdsBackend />} />
              <Route path="/dashboard/messages" element={<MessagesList />} />

              <Route path="/dashboard/profile" element={<UserProfile />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
