// controllers/cartController.js
const classes = require('../data/classes');
let cart = []; // In-memory cart

// Get all items in cart
exports.getCart = (req, res) => {
  res.json(cart);
};

// Add item to cart
exports.addToCart = (req, res) => {
  const { classId } = req.body;
  const classItem = classes.find(c => c.id === classId);
  if (!classItem) return res.status(404).json({ message: 'Class not found' });

  const existing = cart.find(i => i.classId === classId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ classId, name: classItem.name, price: classItem.price, quantity: 1 });
  }
  res.json(cart);
};

// Remove one item from cart
exports.removeFromCart = (req, res) => {
  const id = parseInt(req.params.classId);
  cart = cart.filter(i => i.classId !== id);
  res.json(cart);
};

// Clear entire cart
exports.clearCart = (req, res) => {
  cart = [];
  res.json({ message: 'Cart cleared' });
};
