import React, { useState } from 'react';
import { getUser } from '../../utilities/users-service';
import MenuItems from '../../components/MenuItemForm/MenuItemForm';
import OpeningHours from '../../components/OpeningHoursForm/OpeningHoursForm';

export default function VendorAdminPage() {
  const user = getUser();
  const [menuItems, setMenuItems] = useState([]);

  function addMenuItem(newItem) {
    setMenuItems([...menuItems, newItem]);
  }

  function deleteMenuItem(index) {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  }

  return (
    <div>
      <h1>Vendor Portal</h1>
      {user && user.role === 'vendor' ? (
        <div>
          <MenuItems addMenuItem={addMenuItem} menuItems={menuItems} deleteMenuItem={deleteMenuItem} />
        <hr /> 
          <OpeningHours />
        </div>
      ) : (
        <div>
          <h2>Error: Access Denied</h2>
          <p>You do not have permission to access this page.</p>
        </div>
      )}
    </div>
  );
}

