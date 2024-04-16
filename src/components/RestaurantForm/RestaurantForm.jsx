import React, { useState } from 'react';
import * as restaurantService from "../../utilities/restaurant-service";

export default function RestaurantForm({ user }) {
    const [formData, setFormData] = useState({
        vendor_id: user.email,
        name: '',
        description: '',
        cuisine: '',
        location: '',
        open_hours: '',
    });


    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            restaurantService.create(formData);
        } catch {

        }
    };

    return (
        <>
        <h1>Add a Restaurant</h1>
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            <label>Description</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} required />
            <label>Cuisine</label>
            <input type="text" name="cuisine" value={formData.cuisine} onChange={handleChange} required />
            <label>Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            <label>Open Hours</label>
            <input type="text" name="open_hours" value={formData.open_hours} onChange={handleChange} required />
            <button type="submit">Add Restaurant</button>
        </form>
        </>
    );
}