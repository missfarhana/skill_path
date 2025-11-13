// controllers/classController.js
const classes = require('../data/classes');

// Get all classes
exports.getAllClasses = (req, res) => {
  res.json(classes);
};

// Get a single class by ID
exports.getClassById = (req, res) => {
  const classItem = classes.find(c => c.id === parseInt(req.params.id));
  if (!classItem) return res.status(404).json({ message: 'Class not found' });
  res.json(classItem);
};
