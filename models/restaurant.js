const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Vendor} = require('./user');

const menuItemSchema = new Schema({
  item_name: { type: String, required: true },
  serving_size: { type: String, required: true },
  item_cost: { type: Number, required: true },
}, {
  timestamps: true
});

const restaurantSchema = new Schema({
  vendor_id: {type: Schema.Types.ObjectId, ref: 'Vendor' },
  name: { type: String, required: true },
  description: { type: String, required: true },
  cuisine: { type: String, required: true },
  menu: [menuItemSchema],
  location: { type: String, required: true },
  open_hours: { type: String },
}, {
  timestamps: true
});
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
