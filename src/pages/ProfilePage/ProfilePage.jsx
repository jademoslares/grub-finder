import React, { useState, useEffect } from 'react';
import { getOne } from "../../utilities/users-api";
import * as usersService from "../../utilities/users-service";

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
      <h1>Profile</h1>
      {userData && ( // Conditionally render only when userData is not null
      <>
        <div>
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
        </div>
        {userData.user.role === "vendor" && (
          <div>
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
