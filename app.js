require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const userContact = require("./api/contacts/contact.router")
const cors = require("cors")

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.use(express.json());
app.use(cors(corsOptions))
app.get('/', function(req, res){ 
  
    // Equivalent to res.status(200).send('OK') 
    res.send("ok");  
})



app.use("/api/users", userRouter);
app.use("/api/contact", userContact)
const port = process.env.PORT || 4000;
//const port = process.env.PORT
// const port = 4000
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
