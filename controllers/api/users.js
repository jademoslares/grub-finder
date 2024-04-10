const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User,Customer,Vendor} = require('../../models/user');

module.exports = {
  create,
  login,
  checkToken
};

async function create(req, res) {
  try {
    // Add the user to the db
    const user = await User.create(req.body);
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

/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}