const Schema = require('mongoose').Schema;

const menuItemSchema = new Schema({
  name: { type: String, required: true },
  emoji: String,
  category: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
  price: { type: Number, required: true }
}, {
  timestamps: true
});

module.exports = menuItemSchema;