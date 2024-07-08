const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({

  fName:{
    type: String,
    required: true,
  },
  lName:{
    type: String,
    required: true,
  },
  addressLine1:{
    type: String,
    required: true,
  },
  addressLine2:{
    type: String,
    required: true,
  },
  state:{
    type: String,
    required: true,
  },
  district:{
    type: String,
    required: true,
  },
  pincode:{
    type: String,
    required: true,
  },
  mobile:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
