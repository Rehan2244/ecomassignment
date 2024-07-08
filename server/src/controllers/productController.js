const Product = require('../models/product');
const {faker} = require('@faker-js/faker');
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server error');
  }
};

exports.searchProducts = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ msg: 'Query parameter is required' });
  }

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } },
      ],
    });
    if (products.length === 0) {
      return res.status(404).json({ msg: 'No products found' });
    }

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.fillProductData = async (req, res) => {
  const { count } = req.body;
  try {
    const products = [];
    for (let i = 0; i < count; i++) {
      const newProduct = new Product({
        name: faker.commerce.productName(),
        brand: faker.company.name(),
        price: faker.commerce.price(),
        qty: faker.datatype.number({ min: 1, max: 100 }),
        id: faker.datatype.uuid(),
        mrp: faker.commerce.price(),
        imagesUrl: [{url:faker.image.imageUrl()}, {url:faker.image.imageUrl()}],
      });
      products.push(newProduct);
    }
    await Product.insertMany(products);
    res.json({ message: `${count} products added successfully` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};