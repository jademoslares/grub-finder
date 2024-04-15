const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User,Customer,Vendor} = require('../../models/user');

const SALT_ROUNDS = 6;

module.exports = {
  create,
  login,
  checkToken,
  getUser,
  updateUser
};

async function updateUser(req, res) {
  try {
    const user = await User.findOne({email: req.params.id});
    const userId = user._id;

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    }
    
    // Update the user in the db
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    console.log(updatedUser);

    // Depending on the role, update corresponding entries
    if (updatedUser.role === 'customer') {
      // Update the customer linked to the user
      const updatedCustomerData = {
        firstname: req.body.firstname || 'Default First Name',
        lastname: req.body.lastname || 'Default Last Name',
        address: req.body.address || 'Default Address',
        phone: req.body.phone || 'Default Phone Number',
        paymentinfo: req.body.paymentinfo || 'Default Info Name',
      };
      await Customer.findOneAndUpdate({ user: userId }, updatedCustomerData);
    } else if (updatedUser.role === 'vendor') {
      // Update the customer linked to the user
      const updatedCustomerData = {
        firstname: req.body.firstname || 'Default First Name',
        lastname: req.body.lastname || 'Default Last Name',
        address: req.body.address || 'Default Address',
        phone: req.body.phone || 'Default Phone Number',
        paymentinfo: req.body.paymentinfo || 'Default Info Name',
      };
      await Customer.findOneAndUpdate({ user: userId }, updatedCustomerData);

      // Update the vendor linked to the user
      const updatedVendorData = {
        companyname: req.body.companyname || 'Default Company Name',
        address: req.body.address || 'Default Address',
        phone: req.body.phone || 'Default Phone Number',
      };
      await Vendor.findOneAndUpdate({ user: userId }, updatedVendorData);
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}


async function create(req, res) {
  try {
    // Add the user to the db
    const user = await User.create(req.body);
    console.log(user)
    // Depending on the role, create a corresponding entry
    if (user.role === 'customer') {
      // Create a customer linked to the user
      const customerData = {
        user: user._id,
        firstname: 'Fist Name',
        lastname: 'Last Name',
        address: 'Default Address',
        phone: 'Default Phone Number',
        paymentinfo: 'Default Info Name',
      };
      await Customer.create(customerData);
    } else if (user.role === 'vendor') {
      // Create a customer linked to the user
      const customerData = {
        user: user._id,
        firstname: 'Fist Name',
        lastname: 'Last Name',
        address: 'Default Address',
        phone: 'Default Phone Number',
        paymentinfo: 'Default Info Name',
      };
      
      await Customer.create(customerData);
      // Create a vendor linked to the user
      const vendorData = {
        user: user._id,
        companyname: 'Default Company Name',
        address: 'Default Address',
        phone: 'Default Phone Number',
      };
      await Vendor.create(vendorData);
    }

    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log('req.user', req.user);
  res.json(req.exp);
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json('Bad Credentials');
  }
}

async function getUser(req, res) {
  try{
    const user = await User.findOne({email: req.params.id});
    if (!user) throw new Error();
    if (user.role === 'customer') {
      const customer = await Customer.findOne({user: user._id});
      res.json({user, customer});
    } else if (user.role === 'vendor') {
      const customer = await Customer.findOne({user: user._id});
      const vendor = await Vendor.findOne({user: user._id});
      res.json({user, customer, vendor});
    }
  } catch (err) {
    res.status(400).json('Profile not found');
  }
}

/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}