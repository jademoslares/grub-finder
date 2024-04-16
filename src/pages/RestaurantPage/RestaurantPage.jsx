import React, { useState, useEffect } from "react";
import "./RestaurantPage.css";
import CardRestaurant from "react-tinder-card";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import { restaurants } from "../../Data/dummyData";

export default function RestaurantPage() {
  const [filteredRestaurants, setFilteredRestaurants] = useState([
    ...restaurants,
  ]);
  const [filterOptions, setFilterOptions] = useState({
    category: "",
    priceRange: "",
    distance: "",
  });

  useEffect(() => {
    let filteredResults = [...restaurants];
  
    if (filterOptions.category) {
      filteredResults = filteredResults.filter(
        (restaurant) => restaurant.category === filterOptions.category
      );
    }
    if (filterOptions.priceRange) {
      filteredResults = filteredResults.filter(
        (restaurant) => restaurant.price <= filterOptions.priceRange
      );
    }
    setFilteredRestaurants(filteredResults);
  }, [filterOptions]);

  const resetFilters = () => {
    console.log('Resetting filtered restaurants...');
    setFilteredRestaurants([...restaurants]);
  };

  return (
    <div className="RestaurantPage">
      <SearchFilter
        setFilterOptions={setFilterOptions}
        resetFilters={resetFilters}
      />
      <div className="cardRestaurant_container">
        {filteredRestaurants.map((restaurant) => (
          <CardRestaurant
            className="swipe"
            key={restaurant.name}
            preventSwipe={["up", "down"]}
          >
            <div
              className="card"
              style={{ backgroundImage: `url(${restaurant.url}` }}
            >
              <h2>{restaurant.name}</h2>
            </div>
          </CardRestaurant>
        ))}
      </div>
    </div>
  );
}

