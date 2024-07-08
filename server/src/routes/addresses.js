const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const auth = require('../middleware/auth');

router.get('/', addressController.getAddresses);

router.post('/', addressController.addAddress);

router.get('/:userId', auth, addressController.getAddressesByUserId);

module.exports = router;
