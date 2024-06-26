const express = require('express');
const router = express.Router();
const restaurantCtrl = require('../../controllers/api/restaurant');


// All paths start with '/api/restaurant'

// GET /api/restaurant
router.get('/', restaurantCtrl.index);
// POST /api/restaurant/new
router.post('/new', restaurantCtrl.newRestaurant);
// GET /api/restaurant/id
router.get('/:id', restaurantCtrl.getOneRestaurant);
// POST /api/restaurant/id/update
router.post('/:id/update', restaurantCtrl.updateRestaurant);
// POST /api/restaurant/id/menu
router.post('/:id/menu', restaurantCtrl.addMenu);
// GET /api/restaurant/user/id
router.get('/user/:id', restaurantCtrl.getUserRestaurants);

module.exports = router;