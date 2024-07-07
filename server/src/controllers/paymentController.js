const Payment = require('../models/payment');
const Order = require('../models/order');

exports.processPayment = async (req, res) => {
  const { orderId, userId, amount, paymentMethod } = req.body;
  try {
    const newPayment = new Payment({
      orderId,
      userId,
      amount,
      paymentMethod,
    });

    const payment = await newPayment.save();

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    order.status = 'Paid';
    await order.save();

    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
