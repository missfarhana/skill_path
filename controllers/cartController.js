
exports.getCart = async (req, res) => {
  try {
    const cartItems = await req.cart.find().toArray();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', error: err });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { classId } = req.body;

    // Check if the class exists
    const classItem = await req.classes.findOne({ id: classId });
    if (!classItem) return res.status(404).json({ message: 'Class not found' });

    // Check if item already exists in cart
    const existing = await req.cart.findOne({ classId });
    if (existing) {
      await req.cart.updateOne({ classId }, { $inc: { quantity: 1 } });
    } else {
      await req.cart.insertOne({
        classId,
        name: classItem.name,
        price: classItem.price,
        quantity: 1
      });
    }

    const updatedCart = await req.cart.find().toArray();
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: 'Error adding to cart', error: err });
  }
};

// Remove one item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const classId = parseInt(req.params.classId);
    await req.cart.deleteOne({ classId });
    const updatedCart = await req.cart.find().toArray();
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: 'Error removing item', error: err });
  }
};

// Clear entire cart
exports.clearCart = async (req, res) => {
  try {
    await req.cart.deleteMany({});
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Error clearing cart', error: err });
  }
};
