const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const classRoutes = require('./routes/classes');
const cartRoutes = require('./routes/cart');

const MONGO_URI = process.env.DB_URI;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection URL
const client = new MongoClient(MONGO_URI);

async function startServer() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Connected to MongoDB');

    // Select database and collections
    const db = client.db('extra_classes'); 
    const classesCollection = db.collection('classes'); // collection name
    const cartCollection = db.collection('cart');

    app.use((req, res, next) => {
      req.db = db;
      req.classes = classesCollection;
      req.cart = cartCollection;
      next();
    });

    // Routes
    app.use('/api/classes', classRoutes);
    app.use('/api/cart', cartRoutes);

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
  }
}

startServer();
