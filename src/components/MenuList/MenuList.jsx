import React from 'react';
import MenuItem from './MenuItem';

function MenuList({ menuItems }) {
  return (
    <div>
      <h2>Menu Items</h2>
      <ul>
        {menuItems.map((menuItem) => (
          <MenuItem key={menuItem._id} menuItem={menuItem} />
        ))}
      </ul>
    </div>
  );
}

export default MenuList;