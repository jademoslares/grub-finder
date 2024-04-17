const mongoose = require('mongoose');

require('./')
const MenuSchema = require('./menuSchema');


module.exports = mongoose.model('Menu', MenuSchema);