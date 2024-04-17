import * as restaurantAPI from './restaurant-api';

export function getAllRestaurant() {
    return restaurantAPI.getAllRestaurant();
}

export function create(restaurantData) {
    return restaurantAPI.addRestaurant(restaurantData);
}

export function getOneRestaurant(id) {
    return restaurantAPI.getOneRestaurant(id);
}
export function updateRestaurant(id, data) {
    return restaurantAPI.updateRestaurant(id, data);
}

export function addMenu(id, data) {
    return restaurantAPI.addMenu(id, data);
}