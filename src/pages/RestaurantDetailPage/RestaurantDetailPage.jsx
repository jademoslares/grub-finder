import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as restaurantService from "../../utilities/restaurant-service";
import "./RestaurantDetailPage.css";
import RestaurantUpdateForm from "../../components/RestaurantUpdateForm/RestaurantUpdateForm";

export default function RestaurantDetailPage({ user }) {
  const [restaurant, setRestaurant] = useState(null);
  const { id } = useParams();
  const [updateForm, setUpdateForm] = useState(false);
  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const restaurantData = await restaurantService.getOneRestaurant(id);
        if (restaurantData) {
          setRestaurant(restaurantData);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchRestaurant();
  }, []);

  // Log restaurant outside of useEffect
  console.log(restaurant);
  return (
    <>
      <h1>Restaurant Detail</h1>
      <div>
        {restaurant && !updateForm && (
          <div>
            <img className="image"src={restaurant.urlImage} alt={restaurant.name} />
            <div>
              <strong>Name:</strong> {restaurant.name}
            </div>
            <div>
              <strong>Description:</strong> {restaurant.description}
            </div>
            <div>
              <strong>Location:</strong> {restaurant.location}
            </div>
            <div>
              <strong>Cuisine:</strong> {restaurant.cuisine}
            </div>
            <div>
              <strong>Open Hours:</strong> {restaurant.open_hours}
            </div>
          </div>
        )}
        {updateForm && (
          <>
            <RestaurantUpdateForm setUpdateForm={setUpdateForm} id={id} />
          </>
        )}

        <button
          className="edit-button"
          onClick={() => setUpdateForm(!updateForm)}
        >
          {updateForm ? "X" : "Edit"}
        </button>
        <div>
          <h2>Menu</h2>
        </div>
      </div>
    </>
  );
}
