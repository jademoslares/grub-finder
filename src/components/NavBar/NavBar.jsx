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
      <div className="logo">
      🔍🐛 Grub Finder
      </div>
      <p>Welcome, {user.username}</p>
      
        <Link to="/restaurants" id="restaurants">Restaurants</Link>
        <Link to="/settings" id="settings">Settings</Link>
        <Link className="logout" to="" onClick={handleLogOut}>
            Log Out
        </Link>
        <Link to="/test" id="test">Test</Link>
      </nav>
    </>
  );
}
