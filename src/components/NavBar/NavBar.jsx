import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <>
      <nav id="mySidenav" className="navbar">
        <Link to="/orders" id="orderhistory">
          Order History
        </Link>
        <Link to="/orders/new" id="neworder">
          New Order
        </Link>
        <Link to="/restaurants" id="restaurants">
          Restaurants
        </Link>
        {user.role === "vendor" && (
          <Link to="/settings" id="settings">
            Settings
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
