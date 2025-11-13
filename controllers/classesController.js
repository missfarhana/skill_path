// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await req.classes.find().toArray(); // fetch all documents
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching classes', error: err });
  }
};

// Get a single class by ID
exports.getClassById = async (req, res) => {
  try {
    const id = parseInt(req.params.id); // assuming numeric ID
    const classItem = await req.classes.findOne({ id });
    if (!classItem) return res.status(404).json({ message: 'Class not found' });
    res.json(classItem);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching class', error: err });
  }
};
