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

module.exports = router;