import React, { useState, useEffect } from "react";
import "./RestaurantPage.css";
import CardRestaurant from "react-tinder-card";
import yelpData from "../../data/yelpData";

export default function RestaurantPage() {
  const [restaurants, setRestaurants] = useState(yelpData);

  return (
    <div className="CardRestaurant">
      <div className="cardRestaurant_container">
        {restaurants.map((restaurant) => (
          <CardRestaurant
            className="swipe"
            key={restaurant.name}
            preventSwipe={["up", "down"]}
            >
              <h1>Restaurants</h1>
            <div className="card">
              <h1>Name: {restaurant.name}</h1>
              <h2>Categories: {restaurant.categories}</h2>
            </div>
          </CardRestaurant>
        ))}
      </div>
    </div>
  );
}
