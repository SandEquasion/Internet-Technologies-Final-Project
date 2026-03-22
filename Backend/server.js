const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db.js');
const app = express();

// ← CORS before routes
app.use(cors({
  origin: [
    "http://localhost:5173",          // keep for local development
    "https://vercel.com/sandequasions-projects/internet-technologies-final-project-nvh5/3ai7dMYrtW4FhycJdG2CMWsVcse6"  // add production URL
  ],
  credentials: true
}));

// ← body parser before routes
app.use(express.json());

// routes
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

// connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});