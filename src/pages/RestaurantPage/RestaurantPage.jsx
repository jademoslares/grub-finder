import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RestaurantPage.css";
import CardRestaurant from "react-tinder-card";
import yelpData from "../../data/yelpData";
import * as restaurantService from "../../utilities/restaurant-service";

export default function RestaurantPage() {
  const [restaurants, setRestaurants] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    async function getAllRestaurant() {
      const fetchRestaurants = await restaurantService.getAllRestaurant();
      const shuffledRestaurants = shuffleArray(fetchRestaurants);
      setRestaurants(shuffledRestaurants);
    }
    getAllRestaurant();
  }, []);
  return (
    <div className="CardRestaurant">
      <div className="cardRestaurant_container">
      {/* {restaurants.map((restaurant) => ( */}
        {restaurants.map((restaurant) => (
          <CardRestaurant
            className="swipe"
            key={restaurant.name}
            preventSwipe={["up", "down"]}
          >
            
            <div className="card">
            <img className="image" src={restaurant.urlImage} alt={restaurant.name} />
              <h2>{restaurant.name}</h2>
              <br />
              <h2>Description: {restaurant.description}</h2>
              <br />
              <h2>Cuisine: {restaurant.cuisine}</h2>
              <br />
              <h2>Location: {restaurant.location}</h2>
              <br />
              <h2>Open Hours: {restaurant.open_hours}</h2>
              <br />
              <Link to={`/${restaurant._id}`}>View Restaurant</Link>
            </div>
          </CardRestaurant>
        ))}
      </div>
    </div>
  );
}

