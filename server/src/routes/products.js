const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

router.get('/', productController.getProducts);
// use to fill some random product data
router.post('/fill', productController.fillProductData);

router.get('/search', auth,productController.searchProducts);
router.get('/:id', productController.getProductById);

module.exports = router;
