import React, { useEffect, useState } from "react";
import * as restaurantService from "../../utilities/restaurant-service";

export default function MenuItemForm({ id }) {
  const [newMenuItem, setNewMenuItem] = useState({
    item_name: "",
    serving_size: "",
    item_cost: "",
  });

  function handleMenuItemChange(evt) {
    const { name, value } = evt.target;
    setNewMenuItem({ ...newMenuItem, [name]: value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    try {
      restaurantService.addMenu(id, newMenuItem);
      setNewMenuItem({
        item_name: "",
        serving_size: "",
        item_cost: "",
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>Add Menu Item</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="item_name">Item Name:</label>
          <input
            type="text"
            id="item_name"
            name="item_name"
            value={newMenuItem.item_name}
            onChange={handleMenuItemChange}
          />
        </div>
        <div>
          <label htmlFor="serving_size">Serving Size:</label>
          <input
            type="text"
            id="serving_size"
            name="serving_size"
            value={newMenuItem.serving_size}
            onChange={handleMenuItemChange}
          />
        </div>
        <div>
          <label htmlFor="item_cost">Item Cost:</label>
          <input
            type="text"
            id="item_cost"
            name="item_cost"
            value={newMenuItem.item_cost}
            onChange={handleMenuItemChange}
          />
        </div>
        <button type="submit">Add Menu Item</button>
      </form>
    </>
  );
}
