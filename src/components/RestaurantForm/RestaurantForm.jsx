import React, { useState, useEffect } from 'react';

export default function RestaurantForm() {
    const [restaurant, setFormData] = useState({
        vendor_id: '',
        restaurant_name: '',
        description: '',
        category: '',
        street: '',
        city: '',
        state: '',
        postal_code: '',
        open_hours: {},
    });

    const handleChange = (e) => {
        setFormData({ ...restaurant, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Restaurant:', restaurant)
    };

    return (
        <div>
            <h2>Add Restaurant</h2>
        <form onSubmit={handleSubmit}>
            <input type="number" name="vendor_id" value={restaurant.vendor_id} onChange={handleChange} placeholder="Vendor ID" required />
            <input type="text" name="restaurant_name" value={restaurant.restaurant_name} onChange={handleChange} placeholder="Restaurant Name" required />
            <textarea name="description" value={restaurant.description} onChange={handleChange} placeholder="Description" required />
            <input type="text" name="category" value={restaurant.category} onChange={handleChange} placeholder="Category" required />
            <input type="text" name="street" value={restaurant.street} onChange={handleChange} placeholder="Street" required />
            <input type="text" name="city" value={restaurant.city} onChange={handleChange} placeholder="City" required />
            <input type="text" name="state" value={restaurant.state} onChange={handleChange} placeholder="State" required />
            <input type="text" name="postal_code" value={restaurant.postal_code} onChange={handleChange} placeholder="Postal Code" required />
            <button type="submit">Submit</button>
        </form>

        </div>
    );
}