const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const addressRoutes = require('./routes/addresses');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payments');

require('dotenv').config();

const app = express();
  
mongoose
  .connect('mongodb://localhost:27017/user-auth', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error(err));

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
