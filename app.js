require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const cors = require("cors")

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.use(express.json());
app.use(cors(corsOptions))



app.use("/api/users", userRouter);
// const port = process.env.PORT || 4000;
const port = process.env.PORT
// const port = 4000
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
