const express = require('express');
const router = express.Router();
const teacherAuthController = require('../controllers/teacherAuthController');

router.post('/register', teacherAuthController.registerNewTeacher);
router.post('/login', teacherAuthController.authenticateTeacher);

module.exports = router;