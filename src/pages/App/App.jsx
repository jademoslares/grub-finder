import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../components/NavBar/NavBar";
import ProfilePage from "../ProfilePage/ProfilePage";
import RestaurantPage from '../RestaurantPage/RestaurantPage';
import SettingsPage from '../SettingsPage/SettingsPage';
import VendorAdminPage from '../VendorAdminPage/VendorAdminPage';
import RestaurantForm from '../../components/RestaurantForm/RestaurantForm';
import RestaurantDetailPage from "../RestaurantDetailPage/RestaurantDetailPage";
import Test from '../../pages/Test/Test';


export default function App() {
  const [user, setUser] = useState(getUser());
  document.title = `Grub Finder`;

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <div className="pageHolder">
            <div className="background-card">
              {/* Route components in here */}
            <Routes>
              <Route path="/" element={<RestaurantPage />}/>
              <Route path="/profile" element={<ProfilePage user={user} />} />
              <Route path="/addRestaurant" element={<Test user={user} />} />
              <Route path="/VendorAdminPage" element={<VendorAdminPage />} />
              <Route path="/test" element={<Test user={user}/>} />
              <Route path="/:id/detail" element={<RestaurantDetailPage user={user}/>} />
            </Routes>
            </div>
          </div>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
