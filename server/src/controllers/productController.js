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