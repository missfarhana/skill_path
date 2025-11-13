const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} = require('../controllers/cartController'); // Correct file name

router.get('/', getCart);
router.post('/', addToCart);
router.delete('/:classId', removeFromCart);
router.delete('/', clearCart);

module.exports = router;
