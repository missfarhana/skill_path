// GET ALL
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await req.classes.find().toArray();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching classes', error: err });
  }
};

// GET ONE BY ID
exports.getClassById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const classItem = await req.classes.findOne({ id });

    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json(classItem);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching class', error: err });
  }
};

// CREATE
exports.createClass = async (req, res) => {
  try {
    const newClass = req.body;

    // Generate next ID manually if needed
    const last = await req.classes.find().sort({ id: -1 }).limit(1).toArray();
    newClass.id = last.length > 0 ? last[0].id + 1 : 1;

    await req.classes.insertOne(newClass);
    res.status(201).json({ message: 'Class created', class: newClass });
  } catch (err) {
    res.status(500).json({ message: 'Error creating class', error: err });
  }
};

// UPDATE
exports.updateClass = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updates = req.body;

    const result = await req.classes.updateOne({ id }, { $set: updates });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json({ message: 'Class updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating class', error: err });
  }
};

// DELETE
exports.deleteClass = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await req.classes.deleteOne({ id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json({ message: 'Class deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting class', error: err });
  }
};
