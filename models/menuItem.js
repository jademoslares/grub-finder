const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const restaurant_id = require('./restaurant');

const menuItemSchema = new Schema({
  item_name: { type: String, required: true },
  item_cost: { type: Number, required: true },
  restaurant_id: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
}, {
  timestamps: true
});

module.exports = menuItemSchema;