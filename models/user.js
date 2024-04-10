const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

// Define a base user schema
const userSchema = new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['customer', 'vendor'], // Enumerating the possible roles
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

// Define schema for customer extending base user schema
const customerSchema = new Schema({
  // Add any additional fields specific to customers
  address: { type: String, required: true },
});

// Define schema for vendor extending base user schema
const vendorSchema = new Schema({
  // Add any additional fields specific to vendors
  company: { type: String, required: true },
});

// Extend base user schema with discriminator based on 'role'
const User = mongoose.model('User', userSchema);
User.discriminator('customer', customerSchema);
User.discriminator('vendor', vendorSchema);

module.exports = User;
