const { User, Customer, Vendor } = require("../../models/user");
const Restaurant = require("../../models/restaurant");

module.exports = {
  newRestaurant,
  index,
  getOneRestaurant,
  updateRestaurant,
  addMenu,
  getUserRestaurants,
};

async function newRestaurant(req, res) {
  try {
    const user = await User.findOne({ email: req.body.vendor_id });

    if (!user) {
      return res
        .status(400)
        .json({ error: "User with the provided email not found." });
    }

    const vendor = await Vendor.findOne({ user: user._id });

    if (!vendor) {
      return res.status(400).json({ error: "Vendor not found for the user." });
    }

    req.body.vendor_id = vendor._id;

    const restaurant = await Restaurant.create(req.body);

    res.json("Restaurant created successfully");
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the restaurant." });
  }
}

async function index(req, res) {
  try {
    const restaurants = await Restaurant.find({}).sort("name");
    res.json(restaurants);
  } catch (err) {
    res.json(err);
  }
}


async function getOneRestaurant(req, res) {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.json(restaurant);
  } catch (err) {
    res.json(err);
  }
}
async function updateRestaurant(req, res) {
    try{
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({ message: 'Restaurant updated successfully' });
    }catch (err){
        res.json(err);
    }
}

async function addMenu(req, res) {
  const restaurant = await Restaurant.findById(req.params.id);
  restaurant.menu.push(req.body);
  try{
      await restaurant.save();
      res.json(restaurant);
  } catch (err) {
      res.status(400).json(err);
  }
}


async function getUserRestaurants(req, res) {
    try {
      const user = await User.findOne({email: req.params.id});
      const vendor = await Vendor.findOne({user: user._id});
      const restaurant = await Restaurant.find({vendor_id: vendor._id});
      res.json(restaurant);
    } catch (err) {
      res.json(err);
    }
  }
