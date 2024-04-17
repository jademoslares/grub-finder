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
    <>
     {user && user.role === 'vendor' ? (
      <div className="settings">
        <h1>Settings</h1>

      </div>
    ) : (
      <VendorAdminPage />
    )}
    </>
);
}
