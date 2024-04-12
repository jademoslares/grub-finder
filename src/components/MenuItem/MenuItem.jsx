import React from 'react';

function MenuItem({ menuItem }) {
  return (
    <li>
      {menuItem.name} - {menuItem.description} - ${menuItem.price}
    </li>
  );
}

export default MenuItem;