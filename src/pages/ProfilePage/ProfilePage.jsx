import React, { useState, useEffect } from 'react';
import { getOne } from "../../utilities/users-api";
import './ProfilePage.css';
import { Link } from 'react-router-dom';

export default function ProfilePage({ user }) {
  const [userData, setUserData] = useState(null);

  useEffect(function () {
    async function fetchUser() {
      try {
        const profile = await getOne(user.email);
        setUserData(profile);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, [user.email]);
  return (
    <div>
      <h1>Settings</h1>
      <br />
      {userData && ( // Conditionally render only when userData is not null
      <>
        <div className='profile'>
        <img className="profile-photo" src="https://source.unsplash.com/random/1000x1000?persona" alt={userData.user.name} />
          <br />
          <br />
          <div>
            <strong>Name:</strong> {userData.user.username}
          </div>
          <div>
            <strong>Email:</strong> {userData.user.email}
          </div>
          <div>
            <strong>First Name:</strong> {userData.customer.firstname}
          </div>
          <div>
            <strong>Last Name:</strong> {userData.customer.lastname}
          </div>
          <div>
            <strong>Payment Info:</strong> {userData.customer.paymentinfo}
          </div>
          <div>
            <strong>Phone Number:</strong> {userData.customer.phone}
          </div>
          <Link to="/profile">Edit my Profile</Link>
        </div>
        <hr />
        {userData.user.role === "vendor" && (
          <div className='listed-restaurants'>
            <h2>Restaurants Owned</h2>
            <div>
              <strong>Company Name:</strong> {userData.vendor.companyname}
            </div>
            <div>
              <strong>Address:</strong> {userData.vendor.address}
            </div>
            <div>
              <strong>Phone Number:</strong> {userData.vendor.phone}
            </div>
          </div>
        )}
        </>
      )}
    </div>
    
  );
}
