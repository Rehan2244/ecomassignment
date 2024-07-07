const Order = require('../models/order');

exports.createOrder = async (req, res) => {
  const { userId, products, totalAmount } = req.body;
  try {
    const newOrder = new Order({
      userId,
      products,
      totalAmount,
    });

    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.confirmOrder = async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    order.status = 'Confirmed';
    await order.save();

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
