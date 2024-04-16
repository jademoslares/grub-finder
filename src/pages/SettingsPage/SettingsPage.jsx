import React, { useState } from 'react';
import { getUser } from '../../utilities/users-service';
import MenuItems from '../../components/MenuItemForm/MenuItemForm';
import OpeningHours from '../../components/OpeningHoursForm/OpeningHoursForm';
import ProfilePage from '../ProfilePage/ProfilePage';
import { Link } from 'react-router-dom';
import VendorAdminPage from '../VendorAdminPage/VendorAdminPage';


export default function SettingsPage() {
  const user = getUser();
  return (
    <div>
      < ProfilePage user={user} />
      <hr />
      <br />
      {user && user.role === 'vendor' ? (
        <div>

        <h1>Vendor Portal</h1>
        <Link to="/VendorAdminPage">View my Vendor Portal</Link>

          <Link to="/restaurant/form">
            <button>Add Restaurant</button>
          </Link>
       
        </div>
        ) : (
        <div>
        {/* Add content for non-vendors here */}
        </div>
        )}
        </div>
);
}
