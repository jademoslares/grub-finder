import React, { useState, useEffect } from "react";
import RestaurantForm from "../../components/RestaurantForm/RestaurantForm";

export default function RestaurantPage({ user }) {

    return (
        <div>
            
            <RestaurantForm user={user}/>
        </div>
    );
}