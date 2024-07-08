const Address = require('../models/address');

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addAddress = async (req, res) => {
  const { fName,lName,email,pincode,addressLine1,addressLine2,district,state,userId,mobile} = req.body;
  try {
    const newAddress = new Address({
      fName,lName,email,pincode,addressLine1,addressLine2,district,state,
      mobile,
      userId
    });

    const address = await newAddress.save();
    res.json(address);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAddressesByUserId = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.params.userId });
    if (!addresses.length) {
      return res.status(404).json({ msg: 'No addresses found for this user' });
    }
    res.json(addresses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};