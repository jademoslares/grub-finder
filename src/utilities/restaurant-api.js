import sendRequest from './send-request';
const BASE_URL = '/api/restaurant';

export function addRestaurant(restaurantData) {
  return sendRequest(`${BASE_URL}/new`, 'POST', restaurantData);
}

export function getAllRestaurant() {
  return sendRequest(BASE_URL);
}

export function getOneRestaurant(id){
    return sendRequest(`${BASE_URL}/${id}`);
}

export function updateRestaurant(id, data){
    return sendRequest(`${BASE_URL}/${id}/update`, 'POST', data);
}