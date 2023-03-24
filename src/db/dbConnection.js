const mysql = require('mysql2/promise');
const dbConfig = require('./dbConfig');
require('dotenv').config();
const env  = process.env;

// Create new connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'graduation_project',
  port: 3306
});

// const pool = mysql.createPool("mysql://root:admin@localhost:3306/graduation_project");

// Database query method
exports.dbQuery = async (queryText, queryParams) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(queryText, queryParams);
    console.log('\nQuery executed successfully.....', { query: queryText, result: rows });
    return rows;
  } catch (err) {
    console.log('Failed to execute the query.....', { query: queryText, result: err.message });
    throw err;
  }
};