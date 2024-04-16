import React, { useState, useEffect } from "react";
import "./RestaurantPage.css";
import CardRestaurant from "react-tinder-card";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import { restaurants } from "../../Data/dummyData";
// import yelpData from "../../data/yelpData";

export default function RestaurantPage() {
  // const [restaurants, setRestaurants] = useState(yelpData);
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

  // useEffect(() => {
  //   setRestaurants(shuffleArray(yelpData));
  // }, []);

  const resetFilters = () => {
    console.log('Resetting filtered restaurants...');
    setFilteredRestaurants([...restaurants]);
  };

  // const shuffleArray = (array) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // };

  return (
    <div className="CardRestaurant">
      <SearchFilter
        setFilterOptions={setFilterOptions}
        resetFilters={resetFilters}
      />
      <div className="cardRestaurant_container">
      {/* {restaurants.map((restaurant) => ( */}
        {filteredRestaurants.map((restaurant) => (
          <CardRestaurant
            className="swipe"
            // key={restaurant.restaurant_name}
            key={restaurant.name}
            preventSwipe={["up", "down"]}
          >
            <div className="card">
              {/* <h1>{restaurant.restaurant_name}</h1> */}
              <br />
              <h2>Restaurant: {restaurant.categories}</h2>
              <br />
              <h2>{restaurant.name}</h2>
            </div>
          </CardRestaurant>
        ))}
      </div>
    </div>
  );
}

