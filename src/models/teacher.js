// importing database connection pool
const dbConnection = require('../db/dbConnection');

// to get the queries of the teacher
const teacherQueries = require('../db/queries').teacherQueryList;

// teacher model constructor
class Teacher {
    constructor(teacher_id, first_name, last_name, email, password, image, phone_num) {
      this.teacher_id = teacher_id;
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.password = password;
      this.phone_num = phone_num;
      this.image = image; 
    }
  
    static async getAllTeachers() {
      let queryText = teacherQueries.GET_ALL_TEACHERS;
      try {
        const result = await dbConnection.dbQuery(queryText);
        let teachersArray = [];
        result.forEach(teacherJson => {
          teachersArray.push(new Teacher(teacherJson.teacher_id, teacherJson.first_name, teacherJson.last_name, teacherJson.email, teacherJson.password, teacherJson.image, teacherJson.phone_num));
        });
        return teachersArray;
      } catch(err) {
        console.log("Model-Handling-Error: Failed to fetch all teachers\n", err);
        return null;
      }
    }
  
    static async getTeacherById(id) {
      let queryText = teacherQueries.GET_TEACHER_BY_ID;
      let values = [id];
      try {
        const [result] = await dbConnection.dbQuery(queryText, values);
        let teacher = new Teacher(result.teacher_id, result.first_name, result.last_name, result.email, result.password, result.image, result.phone_num);
        return teacher;
      } catch(err) {
        console.log("Model-Handling-Error: Failed to get teacher entity\n", err);
        return null;
      } 
    }
  
    static async getTeacherByEmail(email) {
      let queryText = teacherQueries.GET_TEACHER_BY_EMAIL;
      let values = [email];
      try {
        const [result] = await dbConnection.dbQuery(queryText, values);
        let teacher = new Teacher(result.teacher_id, result.first_name, result.last_name, result.email, result.password, result.image, result.phone_num);
        return teacher;
      } catch(err) {
        console.log("Model-Handling-Error: Failed to get teacher entity\n", err);
        return null;
      } 
    }
  
    static async createTeacher(first_name, last_name, email, password, image, phone_num) {
      let queryText = teacherQueries.INSERT_TEACHER;
      let values = [first_name, last_name, email, password, image, phone_num];
      try {
        const { insertId } = await dbConnection.dbQuery(queryText, values);
        let teacher = await this.getTeacherById(insertId);
        return teacher;
      } catch (err) {
        console.log("Model-Handling-Error: Failed to create a teacher entity\n", err);
        return null;
      }
    }
  
    static async updateTeacher(first_name, last_name, email, password, image, phone_num, id) {
      let queryText = teacherQueries.UPDATE_TEACHER;
      let values = [first_name, last_name, email, password, image, phone_num, id];
      try {
        const result = await dbConnection.dbQuery(queryText, values);
        return await this.getTeacherById(id);
      } catch(err) {
        console.log("Model-Handling-Error: Failed to update teacher entity\n", err);
        return null;
      }
    }
  
    static async deleteTeacher(id) {
      let queryText = teacherQueries.DELETE_TEACHER;
      let values = [id];
      try {
        const [result] = await dbConnection.dbQuery(queryText, values);
        return result;
      }catch(err) {
        console.log("Model-Handling-Error: Failed to delete a teacher entity\n", err);
            return null;
        }
    }
}

module.exports = Teacher;