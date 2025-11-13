const express = require('express');
const router = express.Router();
const { getAllClasses, getClassById } = require('../controllers/classes');

router.get('/', getAllClasses);
router.get('/:id', getClassById);

module.exports = router;
