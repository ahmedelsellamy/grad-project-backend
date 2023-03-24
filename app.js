const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const env = process.env;
const teacherRouter = require('./src/routes/teacherRoutes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


dotenv.config();

app.use('/', teacherRouter);

app.listen(env.PORT, () => {
  console.log("DB CONNECTED!");
  // console.log(env);
})

