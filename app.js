const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const dotenv = require("dotenv");
const env = process.env;
const teacherRoutes = require('./src/routes/teacherRoutes');
const teacherAuthRoutes= require('./src/routes/teacherAuthRoutes'); 
const { requireAuth } = require('./src/middleware/authmiddleware');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

dotenv.config();

app.use('/home', teacherRoutes);
app.use('/teachers', teacherAuthRoutes);
app.use('/students', requireAuth)


app.listen(env.PORT, () => {
  console.log("DB CONNECTED!");
  // console.log(env);
})



