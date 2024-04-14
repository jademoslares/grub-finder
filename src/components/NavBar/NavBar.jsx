import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <span>Welcome, {user.username}</span>
      &nbsp; | &nbsp;
      {user.role === 'vendor' && <Link to="/vendor">Vendor Settings</Link>}
      &nbsp; | &nbsp;
      <Link to="/restaurants">Restaurants</Link>
      &nbsp; | &nbsp;
      <Link to="/orders">Order History</Link>
      &nbsp; | &nbsp;
      <Link to="/orders/new">New Order</Link>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}

