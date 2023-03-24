exports.teacherQueryList = {
    GET_ALL_TEACHERS: 'SELECT * FROM teacher',
    GET_TEACHER_BY_ID: 'SELECT * FROM teacher WHERE teacher_id = ?',
    GET_TEACHER_BY_EMAIL: 'SELECT * FROM teacher WHERE email = ?',
    INSERT_TEACHER: 'INSERT INTO teacher (first_name, last_name, email, password, image, phone_num) VALUES (?, ?, ?, ?, ?, ?)',
    UPDATE_TEACHER: 'UPDATE teacher SET first_name = ?, last_name = ?, email = ?, password = ?, image = ?, phone_num = ? WHERE teacher_id = ?',
    DELETE_TEACHER: 'DELETE FROM teacher WHERE teacher_id = ?'
}

exports.studentQueryList = {
    GET_ALL_STUDENTS: 'SELECT * FROM student',
    GET_STUDENT_BY_ID: 'SELECT * FROM student WHERE student_id=?',
    GET_STUDENT_BY_USERNAME: 'SELECT * FROM student WHERE username=?',
    INSERT_STUDENT: 'INSERT INTO student (first_name, last_name, age, username, password, image, academic_year_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    UPDATE_STUDENT: 'UPDATE student SET first_name=?, last_name=?, age=?, username=?, password=?, image=?, academic_year_id=? WHERE student_id=?',
    DELETE_STUDENT: 'DELETE FROM student WHERE student_id=?'
}