const express = require('express');
const cors = require("cors");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const connectDB = require('./config/db.js');
const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://internet-technologies-final-project-one.vercel.app/"  // ← fix this
  ],
  credentials: true
}));

app.use(express.json());

const orderRoutes = require('./Routes/orderRoutes.js');
app.use('/api/orders/', orderRoutes);

const reviewRoutes = require('./Routes/reviewRoutes.js');
app.use('/api/reviews/', reviewRoutes);

const productRoutes = require('./Routes/productRoutes.js');
app.use('/api/products/', productRoutes);

const userRoutes = require('./Routes/userRoutes.js');
app.use('/api/users/', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

connectDB();


module.exports = app;
