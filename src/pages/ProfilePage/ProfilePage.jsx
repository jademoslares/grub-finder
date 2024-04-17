import React, { useState, useEffect } from "react";
import * as usersService from "../../utilities/users-service";
import * as restaurantService from "../../utilities/restaurant-service";
import ProfileUpdateForm from "../../components/ProfileUpdateForm/ProfileUpdateForm";
import "./ProfilePage.css";

export default function ProfilePage({ user }) {
  const [userData, setUserData] = useState(null);
  const [updateForm, setUpdateForm] = useState(false);
  const [userRestaurants, setUserRestaurants] = useState(null);

  useEffect(
    function () {
      async function fetchUser() {
        try {
          const profile = await usersService.getOne(user.email);
          setUserData(profile);

          const userRestaurants = await restaurantService.getUserRestaurants(user.email);
          setUserRestaurants(userRestaurants);
        } catch (err) {
          console.log(err);
        }
      }
      fetchUser();
    },
    [user.email]
  );

  return (
    <>
      {userData && ( // Conditionally render only when userData is not null
        <>
          {!updateForm ? (
            <div className="test-container">
              <img src={userData.user.urlImage} alt="profile" />
              <h2>User Information</h2>
              <label>
                <strong>Name:</strong>
              </label>
              <label>{userData.user.username}</label>

              <label>
                <strong>Email:</strong>
              </label>
              <label>{userData.user.email}</label>

              <label>
                <strong>Address:</strong>
              </label>
              <label>{userData.customer.address}</label>

              <label>
                <strong>First Name:</strong>
              </label>
              <label>{userData.customer.firstname}</label>

              <label>
                <strong>Last Name:</strong>
              </label>
              <label>{userData.customer.lastname}</label>

              <label>
                <strong>Payment Info:</strong>
              </label>
              <label>{userData.customer.paymentinfo}</label>

              <label>
                <strong>Phone Number:</strong>
              </label>
              <label>{userData.customer.phone}</label>

              {userData.user.role === "vendor" && (
                <>
                  <h2>Vendor Information</h2>
                  <label>
                    <strong>Company Name:</strong>
                  </label>
                  <label>{userData.vendor.companyname}</label>

                  <label>
                    <strong>Address:</strong>
                  </label>
                  <label>{userData.vendor.address}</label>

                  <label>
                    <strong>Phone Number:</strong>
                  </label>
                  <label>{userData.vendor.phone}</label>
                  </>
              )}
            </div>
          ) : (
            // If updateForm is true, render the form
            <ProfileUpdateForm user={user} setUpdateForm={setUpdateForm} />
          )}
          <button className="edit-button" onClick={() => setUpdateForm(!updateForm)}>
            {updateForm ? "X" : "Edit"}
          </button>
          {userData.user.role === "vendor" && !updateForm && (
            <>
              <h2>Restaurants Owned</h2>
              <div>
                {userRestaurants && userRestaurants.map((restaurant) => (
                  <div key={restaurant._id} className="restaurant-card">
                    <div>
                      <strong>Name:</strong> {restaurant.name}
                    </div>
                    <div>
                      <strong>Description:</strong> {restaurant.description}
                    </div>
                    <div>
                      <strong>Location:</strong> {restaurant.location}
                    </div>
                    <div>
                      <strong>Cuisine:</strong> {restaurant.cuisine}
                    </div>
                    <div>
                      <strong>Open Hours:</strong> {restaurant.open_hours}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
