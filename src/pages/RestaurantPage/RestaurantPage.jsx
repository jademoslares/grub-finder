import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RestaurantPage.css";
import CardRestaurant from "react-tinder-card";
import * as restaurantService from "../../utilities/restaurant-service";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
// import { restaurants as r } from "../../Data/dummyData";

export default function RestaurantPage() {
  const [restaurants, setRestaurants] = useState([]);

  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    cuisine: "",
    priceRange: "",
    distance: "",
  });

  useEffect(() => {
    async function getAllRestaurant() {
      const fetchRestaurants = await restaurantService.getAllRestaurant();
      const shuffledRestaurants = shuffleArray(fetchRestaurants);
      setRestaurants(shuffledRestaurants);
    }
    getAllRestaurant();
  }, []);

  
  useEffect(() => {
    let filteredResults = [...restaurants];
  
    if (filterOptions.cuisine) {
      filteredResults = filteredResults.filter(
        (restaurant) => restaurant.cuisine === filterOptions.cuisine
      );
    }
    if (filterOptions.priceRange) {
      filteredResults = filteredResults.filter(
        (restaurant) => restaurant.price <= filterOptions.priceRange
      );
    }
    setFilteredRestaurants(filteredResults);
  }, [filterOptions, restaurants]);

const resetFilters = () => {
    setFilteredRestaurants([...restaurants]);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // useEffect(() => {
  //   async function mergeRestaurants() {
  //     const userRestaurants = await restaurantService.getAllRestaurant();
  //     const combinedRestaurants = [...userRestaurants];
  //     const shuffledRestaurants = shuffleArray(combinedRestaurants);
  //     setRestaurants(shuffledRestaurants);
  //   }
  //   mergeRestaurants();
  // }, []);

  return (
    <div className="CardRestaurant">
      <SearchFilter setFilterOptions={setFilterOptions} resetFilters={resetFilters} />
      <div className="cardRestaurant_container">
      
        {filteredRestaurants.map((restaurant) => (
          <CardRestaurant
            className="swipe"
            key={restaurant._id}
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
              <Link to={`/${restaurant._id}/detail`}>View Restaurant</Link>
            </div>
          </CardRestaurant>
        ))}
      </div>
    </div>
  );
}