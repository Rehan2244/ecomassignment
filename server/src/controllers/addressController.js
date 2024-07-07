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
  const { street, city, state, country, zipCode, userId } = req.body;
  try {
    const newAddress = new Address({
      street,
      city,
      state,
      country,
      zipCode,
      userId
    });

    const address = await newAddress.save();
    res.json(address);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
