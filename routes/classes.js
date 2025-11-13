// routes/classRoutes.js
const express = require('express');
const router = express.Router();
const { getAllClasses, getClassById } = require('../controllers/classesController'); // <-- correct file

router.get('/', getAllClasses);
router.get('/:id', getClassById);

module.exports = router;
