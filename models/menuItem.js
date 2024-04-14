const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const restaurant_id = require('./restaurant');

const menuItemSchema = new Schema({
  item_name: { type: String, required: true },
  item_cost: { type: Number, required: true },
  restaurant_id: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true } // Define restaurant_id as ObjectId referencing the Restaurant model
}, {
  timestamps: true
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
