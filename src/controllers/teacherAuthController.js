const Teacher = require('../models/teacher');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const createToken = (id) => {
    return jwt.sign({id}, '7masa', {
        expiresIn: 1000 * 60 * 60 * 24
    });
}
exports.registerNewTeacher = async (req, res) => {
    const salt = await  bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const {first_name, last_name, email, image, phone_num} = req.body;

    let teacher = await Teacher.createTeacher(first_name, last_name, email, hashedPassword, image, phone_num);

    if(teacher){
        const token = createToken(teacher.teacher_id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24}); 
        return res.status(200).json(teacher);

    }else{

        return res.status(400).json({error: 'Failed to create teacher!'});
    };
};

exports.authenticateTeacher = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // check if user exists in DB
        const teacher = await Teacher.getTeacherByEmail(email);
        if (!teacher) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // check if password is correct
        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = createToken(teacher.teacher_id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24}); 
        return res.status(200).json(teacher);

    } catch (error) {
        next(error);
    }
};