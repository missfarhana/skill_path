const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} = require('../controllers/cart');

router.get('/', getCart);
router.post('/', addToCart);
router.delete('/:classId', removeFromCart);
router.delete('/', clearCart);

module.exports = router;
