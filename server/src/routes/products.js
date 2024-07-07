const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
// use to fill some random product data
router.post('/fill', productController.fillProductData);
module.exports = router;
