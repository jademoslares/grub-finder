const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: {type: String, required: true},
    description: { type: String, required: true },
    price: { type: Number, required: true },
}, { 
    timestamps: true 
});

module.exports = menuSchema;