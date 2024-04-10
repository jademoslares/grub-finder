const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  sortOrder: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);







// {"business_id":"TAXOV3hGl4imRp4OgS7Yqw",
// "name":"Roger-Wilco Liquor Stores",
// "address":"State Highway 73 N",
// "city":"Palmyra",
// "state":"NJ",
// "postal_code":"08065",
// "latitude":39.991525,
// "longitude":-75.027688,
// "stars":4.0,
// "review_count":6,
// "is_open":1,
// "attributes":
// {
//   "BusinessAcceptsCreditCards":"True",
//   "RestaurantsPriceRange2":"2",
//   "BikeParking":"False",
//   "RestaurantsTakeOut":"False",
//   "BusinessParking":"{'garage': False, 'street': False, 'validated': False, 'lot': True, 'valet': False}",
//   "categories":"Beer, Wine & Spirits, Food",
//   "hours":null
// },
// }



// {
//   "business_id":"qbPsfIKJZQAlrPaYmSyZuQ",
//   "name":"All Wrapped Up",
//   "address":"",
//   "city":"Sparks",
//   "state":"NV",
//   "postal_code":"89431",
//   "latitude":39.5401545,
//   "longitude":-119.7483949,
//   "stars":4.0,
//   "review_count":7,
//   "is_open":1,
//   "attributes":
//   {
//     "RestaurantsDelivery":"False",
//     "GoodForMeal":"{'dessert': False, 'latenight': False, 'lunch': False, 'dinner': False, 'brunch': False, 'breakfast': False}",
//     "BikeParking":"False",
//     "Caters":"True",
//     "RestaurantsPriceRange2":"1",
//     "BusinessAcceptsCreditCards":"True",
//     "BusinessParking":"{'garage': None, 'street': None, 'validated': None, 'lot': False, 'valet': False}",
//     "RestaurantsTakeOut":"True",
//     "categories":"Food Trucks, Food, Salad, Sandwiches, Caterers, Event Planning & Services, Restaurants, Wraps",
//     "hours":null,}
// }


// {"business_id":"_uQEKHH0R5fxrYkLrUI9pQ",
// "name":"Gu Wei Noodles & Grill",
// "address":"18101 Highwoods Preserve Pkwy, Ste 100",
// "city":"Tampa",
// "state":"FL",
// "postal_code":"33647",
// "latitude":28.1316091,
// "longitude":-82.3691327,
// "stars":4.5,
// "review_count":40,
// "is_open":1,
// "attributes":
//   {
//     "Alcohol":"u'beer_and_wine'",
//     "OutdoorSeating":"False",
//     "Caters":"True",
//     "WiFi":"u'free'",
//     "WheelchairAccessible":"True",
//     "BusinessAcceptsCreditCards":"True",
//     "HasTV":"True",
//     "RestaurantsDelivery":"True",
//     "RestaurantsTableService":"True",
//     "RestaurantsTakeOut":"True",
//     "BikeParking":"False",
//     "categories":"Szechuan, Noodles, Restaurants, Chinese",
//     "hours":{"Monday":"0:0-0:0","Wednesday":"17:0-21:0","Thursday":"17:0-21:0","Friday":"17:0-21:0","Saturday":"17:0-21:0","Sunday":"17:0-21:0"},
//   }
// }


// {"business_id":"4xhGQGdGqU60BIznBjqnuA",
// "name":"California Tacos and Taproom",
// "address":"956 Embarcadero Del Norte",
// "city":"Isla Vista",
// "state":"CA",
// "postal_code":"93117",
// "latitude":34.4115552,
// "longitude":-119.8550772,
// "stars":4.0,
// "review_count":49,
// "is_open":0,
// "attributes":
// {
//   "Music":"{'dj': False, 'background_music': False, 'no_music': False, 'jukebox': False, 'live': False, 'video': False, 'karaoke': False}",
//   "BestNights":"{'monday': False, 'tuesday': False, 'friday': False, 'wednesday': False, 'thursday': False, 'sunday': False, 'saturday': False}",
//   "Ambience":"{'touristy': False, 'hipster': False, 'romantic': False, 'divey': False, 'intimate': False, 'trendy': False, 'upscale': False, 'classy': False, 'casual': False}",
//   "RestaurantsDelivery":"True",
//   "BikeParking":"True",
//   "GoodForMeal":"{'dessert': False, 'latenight': False, 'lunch': False, 'dinner': False, 'brunch': False, 'breakfast': False}",
//   "CoatCheck":"False",
//   "BusinessAcceptsCreditCards":"True",
//   "Smoking":"u'no'",
//   "BusinessParking":"{'garage': False, 'street': False, 'validated': False, 'lot': False, 'valet': False}",
//   "RestaurantsTakeOut":"True",
//   "HasTV":"True",
//   "RestaurantsReservations":"False",
//   "OutdoorSeating":"True",
//   "Alcohol":"u'beer_and_wine'",
//   "WheelchairAccessible":"True",
//   "WiFi":"u'free'",
//   "Caters":"True",
//   "BYOB":"False"},
//   "categories":"Mexican, Beer Bar, Bars, Sports Bars, Nightlife, Restaurants, Tacos",
//   "hours":{"Monday":"0:0-0:0","Tuesday":"10:0-22:0","Wednesday":"10:0-22:0","Thursday":"10:0-22:0","Friday":"10:0-22:0","Saturday":"12:0-22:0","Sunday":"12:0-20:30"}
// }
