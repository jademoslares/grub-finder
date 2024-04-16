const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const restaurant_id = require('./restaurant');

const menuItemSchema = new Schema({
  item_name: { type: String, required: true },
  serving_size: { type: String, required: true },
  item_cost: { type: Number, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
