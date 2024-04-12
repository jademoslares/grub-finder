const mongoose = require('mongoose');
//require the restaurant to be sure the restaurant model is loaded before the menu model

require('./restaurant');
const menuSchema = require('./menuItemSchema');

module.exports = mongoose.model('Menu', menuSchema);