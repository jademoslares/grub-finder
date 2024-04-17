import React, { useState, useEffect } from "react";
import ProfileUpdateForm from "../../components/ProfileUpdateForm/ProfileUpdateForm";
import { Link } from 'react-router-dom';
import './ProfilePage.css';
export default function ProfilePage({ user }) {

  return (
    <>
      <Link to="/settings">
      <button className="nav-button">Back to Settings</button>
      </Link>
          <ProfileUpdateForm user={user}/>
  </>
  );
}