require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const userContact = require("./api/contacts/contact.router")
const cors = require("cors")
const bodyParser = require('body-parser');


//kunal
const uploadRoute = require('./routes/upload');
const multer = require('multer');
const sharp = require('sharp');
//kunal

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



// //kunal changes
// // app.use(bodyParser.urlencoded({ extended: false }))

// var storagePhotos = multer.diskStorage({
// destination: function (req, file, cb){
//   // cb(null,'/desktop/verbackend/uploads')
//   cb(null,'uploads')
// },

//   filename: (req, file, cb) => {
//     console.log(file);
//     var filetype = '';
//     if(file.mimetype === 'image/gif') {
//       filetype = 'gif';
//     }
//     if(file.mimetype === 'image/png') {
//       filetype = 'png';
//     }
//     if(file.mimetype === 'image/jpeg') {
//       filetype = 'jpg';
//     }
//     cb(null, 'profile-' + new Date().toISOString() + '.' + filetype);
//     // cb(null, 'profile-' + new Date().toISOString() + '.' + file.mimetype.substr(0,6));
//   }
// });

// var uploadPhoto = multer({storage: storagePhotos})

// app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/uploads',express.static('uploads'));

// app.post('/UploadPhoto', uploadPhoto.single('photo'), (req, res) => {
// 	var _uid = req.body.uid;
// 	var file = req.file;
//     if(file) {
// 			sharp(file.path).resize(300,300).toFile('./uploads/'+'300x300-'+file.filename,function(err){
// 				if(err){
// 					console.log('sharp>>>',err);
// 				}
// 				else{
// 					console.log('resize ok !');
// 				}
// 			})
//     }
//     else throw 'error';
// });
// //kunal




//kunal changes /
app.use(uploadRoute);
//kunal changes \

app.use("/api/users", userRouter);
app.use("/api/contact", userContact)
const port = process.env.PORT || 4000;
//const port = process.env.PORT
// const port = 4000
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
