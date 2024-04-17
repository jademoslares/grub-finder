import React, { useState, useEffect } from "react";
import RestaurantForm from "../../components/RestaurantForm/RestaurantForm";
import RestaurantDetailPage from "../RestaurantDetailPage/RestaurantDetailPage";
export default function RestaurantPage({ user }) {

    return (
        <div>
            <RestaurantForm user={user}/>
            {/* <RestaurantDetailPage user={user}/> */}
        </div>
    );
}