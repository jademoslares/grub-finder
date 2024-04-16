import * as restaurantAPI from './restaurant-api';

export function getAllRestaurant() {
    return restaurantAPI.getAllRestaurant();
}

export function create(restaurantData) {
    return restaurantAPI.addRestaurant(restaurantData);
}