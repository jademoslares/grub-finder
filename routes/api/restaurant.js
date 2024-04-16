const express = require('express');
const router = express.Router();
const restaurantCtrl = require('../../controllers/api/restaurant');


// All paths start with '/api/restaurant'

// GET /api/restaurant
router.get('/', restaurantCtrl.index);
// POST /api/restaurant/new
router.post('/new', restaurantCtrl.newRestaurant);

module.exports = router;