import React, { useState, useEffect } from "react";
import "./RestaurantPage.css";
import CardRestaurant from "react-tinder-card";
import yelpData from "../../data/yelpData";

export default function RestaurantPage() {
  const [restaurants, setRestaurants] = useState(yelpData);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    setRestaurants(shuffleArray(yelpData));
  }, []);

  return (
    <div className="CardRestaurant">
      <div className="cardRestaurant_container">
        {restaurants.map((restaurant) => (
          <CardRestaurant
            className="swipe"
            key={restaurant.restaurant_name}
            preventSwipe={["up", "down"]}
          >
            <div className="card">
              <h1>{restaurant.restaurant_name}</h1>
              <br />
              <h2>Categories: {restaurant.categories}</h2>
              <br />
            </div>
          </CardRestaurant>
        ))}
      </div>
    </div>
  );
}
