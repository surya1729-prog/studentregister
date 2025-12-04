const Student = require('../models/Student');

// Create student
exports.createStudent = async (req, res) => {
  try {
    const { name, email, course, phone } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });

    const exists = await Student.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const student = await Student.create({ name, email, course, phone });
    res.status(201).json(student);
  } catch (err) {
    console.error('createStudent error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// List all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    console.error('getStudents error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single student by id
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    console.error('getStudentById error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const { name, email, course, phone } = req.body;
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (email && email !== student.email) {
      const exists = await Student.findOne({ email });
      if (exists) return res.status(400).json({ message: 'Email already used' });
      student.email = email;
    }

    if (name) student.name = name;
    if (course !== undefined) student.course = course;
    if (phone !== undefined) student.phone = phone;

    await student.save();
    res.json(student);
  } catch (err) {
    console.error('updateStudent error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    console.error('deleteStudent error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
