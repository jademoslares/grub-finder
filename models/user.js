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
  },
  urlImage: { type: String, required: false }
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
  next();
});

// Define customer schema
const customerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  paymentinfo: { type: String, required: true },
});

// Define vendor schema
const vendorSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  companyname: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
});

// Define models
const User = mongoose.model('User', userSchema);
const Customer = mongoose.model('Customer', customerSchema);
const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = { User, Customer, Vendor };