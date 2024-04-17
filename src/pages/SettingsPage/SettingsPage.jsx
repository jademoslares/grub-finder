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
    <div>
      <div className='profile'>
      <img className="profile-avi" src={user.urlImage} alt="profile" width="150" height="150" />
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
      <Link to="/profile">
            <button>Edit my Profile</button>
          </Link>


    </div>
      {/* < ProfilePage user={user} /> */}
      <hr />
      <br />
      {user && user.role === 'vendor' ? (
        <div>
        <h1>Vendor Portal</h1>
        <Link to="/VendorAdminPage">View my Vendor Portal</Link>
        </div>
        ) : (
        <div>
        {/* Add content for non-vendors here */}
        </div>
        )}
        </div>
);
}