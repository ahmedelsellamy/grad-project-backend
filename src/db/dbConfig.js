require("dotenv").config();
const env = process.env;


// MySQL database connection settings
exports.dbconfig = {
    connection:'mysql2',
    host: env.MYSQL_HOST,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    port: env.MYSQL_PORT
};
