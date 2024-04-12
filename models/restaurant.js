const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  vendor_id: { type: Number, required: true },
  restaurant_name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  menu: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postal_code: { type: String, required: true },
  },
  open_hours: { type: String },
  sortOrder: Number
}, {
  timestamps: true
});

const restaurant_id = restaurantSchema.virtual('restaurant_id').get(function() {
  return this._id;
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
