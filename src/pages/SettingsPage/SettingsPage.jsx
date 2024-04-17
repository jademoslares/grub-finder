import React, { useState } from 'react';
import { getUser } from '../../utilities/users-service';
import MenuItems from '../../components/MenuItemForm/MenuItemForm';
import OpeningHours from '../../components/OpeningHoursForm/OpeningHoursForm';
import ProfilePage from '../ProfilePage/ProfilePage';
import { Link } from 'react-router-dom';
import VendorAdminPage from '../VendorAdminPage/VendorAdminPage';
import ProfileUpdateForm from '../../components/ProfileUpdateForm/ProfileUpdateForm';
import './SettingsPage.css';


export default function SettingsPage() {
  const user = getUser();
  return (
      <div className='profile'>
      <img className="profile-photo" src={user.urlImage} alt="profile" width="150" height="150" />
      <br />
      <br />
      <div className='setting-profile-details'>
              <strong>User Name:</strong> {user.username}
      <br />
              <strong>Email:</strong> {user.email}
      <br />
              <strong>Full Name:</strong> {user.firsrname} {user.lastname}
      <br />
              <strong>Phone #:</strong> {user.customerphone}
      <br />
              <strong>Payment Details</strong> {user.paymentinfo}
      </div>
      <br />
      <Link to="/profile">
            <button>Edit my Profile</button>
          </Link>
      {/* < ProfilePage user={user} /> */}
      <br />
      <br />
      <hr />
      <br />
      {user && user.role === 'vendor' ? (
        <div>
          <br />
        <h1>Vendor Portal</h1>
          <br />
        <Link to="/VendorAdminPage"><button>View my Vendor Portal</button></Link>
        </div>
        ) : (
        <div>
        {/* Add content for non-vendors here */}
        </div>
        )}
        </div>
);
}
