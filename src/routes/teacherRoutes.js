const express = require("express");
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.post('/teacher/create', teacherController.createTeacher);
router.get('/teachers', teacherController.getTeachers);
router.get('/teacher/:id', teacherController.getTeacherById);
router.put('/teacher/:id', teacherController.updateTeacher);
router.delete('/teacher/:id', teacherController.deleteTeacher);

module.exports = router;
