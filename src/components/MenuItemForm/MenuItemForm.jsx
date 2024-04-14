import React, { useState } from 'react';

export default function MenuItems({ addMenuItem, menuItems, deleteMenuItem }) {
  const [newMenuItem, setNewMenuItem] = useState({ name: '', description: '', price: '' });

  function handleMenuItemChange(evt) {
    const { name, value } = evt.target;
    setNewMenuItem({ ...newMenuItem, [name]: value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    addMenuItem(newMenuItem);
    setNewMenuItem({ name: '', description: '', price: '' });
  }

  return (
    <div>
      <h2>Add Menu Item</h2>
      <form onSubmit={handleSubmit}>
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
      <div>
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
    </div>
  );
}


// hererere