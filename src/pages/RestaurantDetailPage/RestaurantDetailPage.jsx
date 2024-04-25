import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as restaurantService from "../../utilities/restaurant-service";
import * as usersService from "../../utilities/users-service";
import "./RestaurantDetailPage.css";
import RestaurantUpdateForm from "../../components/RestaurantUpdateForm/RestaurantUpdateForm";
import MenuItemForm from "../../components/MenuItemForm/MenuItemForm";

export default function RestaurantDetailPage({ user }) {
  const [restaurant, setRestaurant] = useState(null);
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const [updateForm, setUpdateForm] = useState(false);
  const [menuForm, setMenuForm] = useState(false);
  const [owner , setOwner] = useState(null);

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const restaurantData = await restaurantService.getOneRestaurant(id);
        if (restaurantData) {
          setRestaurant(restaurantData);
        }
        const vendorid = restaurantData.vendor_id;
        const userData = await usersService.getOwner(vendorid);
        
        if (userData){
            setUserData(userData);
        }

        if (userData) {
            if (userData.email === user.email) {
              setOwner(true);
            } else {
              setOwner(false);
            }
          }
      } catch (err) {
        console.log(err);
      }
    }
    fetchRestaurant();
  }, []);
  return (
    <>
      <div>
        {restaurant && !updateForm && !menuForm && (
          <div>
            <h1>Restaurant Detail</h1>
            <img
              className="image"
              src={restaurant.urlImage}
              alt={restaurant.name}
            />
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
            <h2>Menu</h2>
          {restaurant && restaurant.menu.map((item) => (
            <div className="menuCard" key={item._id}>
              <div>
                <strong>Item Name:</strong> {item.item_name}
              </div>
              <div>
                <strong>Serving Size:</strong> {item.serving_size}
              </div>
              <div>
                <strong>Item Cost:</strong> {item.item_cost}
              </div>
            </div>
          ))}
          </div>
        )}
        {updateForm && owner && (
          <>
            <RestaurantUpdateForm setUpdateForm={setUpdateForm} id={id} />
          </>
        )}
        {!menuForm && owner && (
        <button
          className="edit-button"
          onClick={() => setUpdateForm(!updateForm)}
        >
          {updateForm ? "X" : "Edit"}
        </button>
        )}
        {menuForm && owner && (
          <>
            <MenuItemForm setMenuForm={setMenuForm} id={id} />
          </>
        )}
        
        {!updateForm && owner && (
        <button
          className=""
          onClick={() => setMenuForm(!menuForm)}
        >
          {menuForm ? "Cancel" : "Add Menu Item"}
        </button>
        )}
      </div>
    </>
  );
}