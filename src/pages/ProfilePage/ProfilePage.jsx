import React, { useState, useEffect } from "react";
import * as usersService from "../../utilities/users-service";
import ProfileUpdateForm from "../../components/ProfileUpdateForm/ProfileUpdateForm";

export default function ProfilePage({ user }) {
  const [userData, setUserData] = useState(null);
  const [updateForm, setUpdateForm] = useState(false);

  useEffect(
    function () {
      async function fetchUser() {
        try {
          const profile = await usersService.getOne(user.email);
          setUserData(profile);
        } catch (err) {
          console.log(err);
        }
      }
      fetchUser();
    },
    [user.email]
  );

  return (
    <div>
      <h1>Profile</h1>
      {userData && ( // Conditionally render only when userData is not null
        <>
          {!updateForm ? (
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
              {userData.user.role === "vendor" && (
                <div>
                  <h2>Vendor Information</h2>
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
            </div>
          ) : (
            // If updateForm is true, render the form
            <ProfileUpdateForm user={user} />
          )}
          <button onClick={() => setUpdateForm(!updateForm)}>
            {updateForm ? "Cancel" : "Update Profile"}
          </button>
          {userData.user.role === "vendor" && (
            <>
              <h2>Restaurants Owned</h2>
            </>
          )}
        </>
      )}
    </div>
  );
}
