const { User, Customer, Vendor } = require("../../models/user");
const Restaurant = require("../../models/restaurant");


module.exports = {
  newRestaurant,
  index,
};

async function newRestaurant(req, res) {
    try {
      const user = await User.findOne({ email: req.body.vendor_id });
      
      if (!user) {
        return res.status(400).json({ error: 'User with the provided email not found.' });
      }
  
      const vendor = await Vendor.findOne({ user: user._id });
  
      if (!vendor) {
        return res.status(400).json({ error: 'Vendor not found for the user.' });
      }
      
      req.body.vendor_id = vendor._id;
      
      const restaurant = await Restaurant.create(req.body);
  
      res.json("Restaurant created successfully");
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while creating the restaurant.' });
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
