require('dotenv').config();
require('./config/database');

const Category = require('./models/category');
const MenuItem = require('./models/menuItem');
const Restaurant = require('./models/restaurant');
const Schema = require('mongoose').Schema;

(async function() {
  await Category.deleteMany({});
  const categories = await Category.create([
    { name: 'Sandwiches', sortOrder: 10 },
    { name: 'Seafood', sortOrder: 20 },
    { name: 'Mexican', sortOrder: 30 },
    { name: 'Italian', sortOrder: 40 },
    { name: 'Sides', sortOrder: 50 },
    { name: 'Desserts', sortOrder: 60 },
    { name: 'Drinks', sortOrder: 70 },
  ]);

  const menuItems = await MenuItem.find();
  const category = await Category.find();

  await Restaurant.deleteMany({});
  const restaurants = await Restaurant.create([
    {
      restaurant_id: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
      vendor_id: "123456",
      restaurant_name: "Gu Wei Noodles & Grill",
      description: "Szechuan, Noodles, Restaurants, Chinese",
      // menu: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
      menu: menuItems.length > 0 ? [menuItems[0]._id] : [],
      address: {
        street: "18101 Highwoods Preserve Pkwy, Ste 100",
        city: "Tampa",
        state: "FL",
        postal_code: "33647",
      },
      category: categories[0],
      open_hours: {
        Monday: "0:0-0:0",
        Wednesday: "17:0-21:0",
        Thursday: "17:0-21:0",
        Friday: "17:0-21:0",
        Saturday: "17:0-21:0",
        Sunday: "17:0-21:0"
      },
    },
  ]);

 if (menuItems.length === 0) {
    await MenuItem.deleteMany({});
    await MenuItem.create([
      {
        item_name: "Oodles of Noodles",
        item_cost: 12.00,
        restaurant_id: restaurants[0]._id
      }
    ]);
  }

  console.log(menuItems);
  console.log(restaurants);
  console.log(categories);

  process.exit();
})();