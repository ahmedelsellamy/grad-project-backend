require("dotenv").config();
const env = process.env;


// MySQL database connection settings
module.exports = {
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    database: env.MYSQL_DATABASE,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
};