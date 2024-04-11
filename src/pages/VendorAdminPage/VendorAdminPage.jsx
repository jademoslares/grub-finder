import React from 'react';
import { getUser } from '../../utilities/users-service';

export default function VendorAdminPage() {
  const user = getUser();


  // Check if the user is auth with 'vendor' role
  if (!user || user.role !== 'vendor') {
    return (
      <div>
        <h1>Error 403: Access Denied</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Vendor Admin Page</h1>
    </div>
  );
}