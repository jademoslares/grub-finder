import React, { useState } from 'react';
import { getUser } from '../../utilities/users-service';
import "./VendorAdminPage.css";



export default function VendorAdminPage() {
  const user = getUser();

  // State for menu items
  const [menuItems, setMenuItems] = useState([]);
  // State for new menu item input fields
  const [newMenuItem, setNewMenuItem] = useState({ name: '', description: '', price: '' });
  // State for opening hours
  const [openingHours, setOpeningHours] = useState({});

  // Function to handle changes in the new menu item input fields
  function handleMenuItemChange(evt) {
    const { name, value } = evt.target;
    setNewMenuItem({ ...newMenuItem, [name]: value });
  }

  // Function to add a new menu item
  function addMenuItem(evt) {
    evt.preventDefault();
    setMenuItems([...menuItems, newMenuItem]);
    setNewMenuItem({ name: '', description: '', price: '' });
  }

  // Function to handle changes in the opening hours input fields
  function handleOpeningHoursChange(evt) {
    const { name, value } = evt.target;
    setOpeningHours({ ...openingHours, [name]: value });
  }

  // Function to save opening hours
  function saveOpeningHours(evt) {
    evt.preventDefault();
    // Send a request to save the opening hours (to be implemented)
    console.log('Opening hours saved:', openingHours);
  }

  // Function to delete a menu item
  function deleteMenuItem(index) {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  }

  return (
    <div>
      <h1>Vendor Admin Page</h1>
      {user && user.role === 'vendor' ? (
        <div>
          <h2>Add Menu Item</h2>
          <form onSubmit={addMenuItem}>
            <label>
              Name:
              <input type="text" name="name" value={newMenuItem.name} onChange={handleMenuItemChange} />
            </label>
            <label>
              Description:
              <input type="text" name="description" value={newMenuItem.description} onChange={handleMenuItemChange} />
            </label>
            <label>
              Price:
              <input type="text" name="price" value={newMenuItem.price} onChange={handleMenuItemChange} />
            </label>
            <button type="submit">Add Menu Item</button>
          </form>

          <h2>Edit Opening Hours</h2>
          <form onSubmit={saveOpeningHours}>
            <label>
              {/* add later, tryna figure out an efficient way to do this */}
            </label>
            <button type="submit">Save Opening Hours</button>
          </form>

          <h2>Menu Items</h2>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.name} - {item.description} - {item.price}
                <button onClick={() => deleteMenuItem(index)}>Delete</button>
              </li>
            ))}
          </ul>
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