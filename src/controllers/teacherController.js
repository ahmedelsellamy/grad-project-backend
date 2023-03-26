const Teacher = require('../models/teacher');
const bcrypt = require('bcrypt');


exports.getTeachers = async (req, res) => {
    let result = await Teacher.getAllTeachers();
    if(result){
        return res.status(200).json(result);
    }else{
        return res.status(400).json({error: "Failed to get teachers list!"});
    }
};

exports.getTeacherById = async (req,res) => {
    const { id } = req.params;
    let [result] = await Teacher.getTeacherById(id);
    if(result){
        return res.status(200).json(result[0]);
    }else{
        return res.status(400).json({error: "Failed to get teacher!"})
    }
};

// exports.getTeacherByEmail = async (req,res) => {
//     const { email } = req.body;
//     let result = await Teacher.getTeacherByEmail(email);
//     if(result){
//         return res.status(200).json(result);
//     }else{
//         return res.status(400).json({error: "Failed to get teacher!"})
//     }
// };

exports.createTeacher = async (req, res) => {
    const salt = await  bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const {first_name, last_name, email, image, phone_num} = req.body;
    let result = await Teacher.createTeacher(first_name, last_name, email, hashedPassword, image, phone_num);
    if(result){
        return res.status(200).json(result);
    }else{
        return res.status(400).json({error: 'Failed to create teacher!'});
    }
};

exports.updateTeacher = async (req, res) => {
    const { id } = req.params;
    const {first_name, last_name, email, password, image, phone_num} = req.body;
    let result = await Teacher.updateTeacher(first_name, last_name, email, password, image, phone_num, id);
    if(result){
        return res.status(200).json(result);
    }else{
        return res.status(400).json({error: `Failed to update teacher!`});
    }
};

exports.deleteTeacher = async (req, res) => {
    const {id} = req.params;
    try{
        await Teacher.deleteTeacher(id);
        res.status(204).end();
    }catch(err){
        res.status(400)
    }

};