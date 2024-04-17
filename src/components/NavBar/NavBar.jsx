import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import "./NavBar.css";
import { IoRestaurant } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";


export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <>
      <nav id="mySidenav" className="navbar">
        <Link to="/" id="restaurants">
           Restaurant &nbsp; <span className="Icon"> <IoRestaurant /></span>
        </Link>
        {user.role === "vendor" && (
          <Link to="/VendorAdminPage" id="settings">
            Settings &nbsp; <span className="Icon"> <IoSettingsSharp /></span>
          </Link>
        )}
      </nav>
      <div className="logo">Grub Finder</div>
      <div className="dropdown">
        <button className="dropbtn">Welcome, {user.username}</button>
        <div className="dropdown-content">
          <Link to="/profile">Profile</Link>
          <Link to="" onClick={handleLogOut}>
            Log Out
          </Link>
        </div>
      </div>
    </>
  );
}
