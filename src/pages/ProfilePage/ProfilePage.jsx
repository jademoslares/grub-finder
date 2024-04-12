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
        <div>
          <div>
            <strong>Name:</strong> {userData.user.username}
          </div>
          <div>
            <strong>Email:</strong> {userData.email}
          </div>
          <div>
            <strong>Role:</strong> {userData.role}
          </div>
        </div>
      )}
    </div>
  );
}
