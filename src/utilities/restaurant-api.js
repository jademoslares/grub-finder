import sendRequest from './send-request';
const BASE_URL = '/api/restaurant';

export function addRestaurant(restaurantData) {
  return sendRequest(`${BASE_URL}/new`, 'POST', restaurantData);
}

export function getAllRestaurant() {
  return sendRequest(BASE_URL);
}