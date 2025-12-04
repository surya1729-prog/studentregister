const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/studentCtrl.js'); 

// GET all students
router.get('/', ctrl.getStudents);

// GET one student
router.get('/:id', ctrl.getStudentById);

// Create student
router.post('/', ctrl.createStudent);

// Update student
router.put('/:id', ctrl.updateStudent);

// Delete student
router.delete('/:id', ctrl.deleteStudent);

module.exports = router;
