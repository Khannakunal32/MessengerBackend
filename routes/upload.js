// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const router = express.Router()

// // Image Upload
// const imageStorage = multer.diskStorage({
//     destination: 'images', // Destination to store image 
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
//         // file.fieldname is name of the field (image), path.extname get the uploaded file extension
//     }
// });

// const imageUpload = multer({
//     storage: imageStorage,
//     limits: {
//         fileSize: 50000000   // 1000000 Bytes = 1 MB
//     }
//     ,
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(png|jpg)$/)) {     // upload only png and jpg format
//             return cb(new Error('Please upload a Image'))
//         }
//         cb(undefined, true)
//         console.log("profilepic uploaded");

//     }
// })  

// // For Single image upload
// router.post('/uploadImage', Upload.single('image'), (req, res) => {
//     console.log("profilepic uploaded");
//     res.send(req.file)
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })



// // ---------------------------------------------------------------------------- //


// module.exports = router



const express = require('express')
const bodyParser = require('body-parser')
var multer  = require('multer')
const app = express()
const fs = require('fs')
const http =  require('http')
const router = express.Router()
const path = require('path');
// const port = 3000

const imageStorage = multer.diskStorage({
  destination: 'images', // Destination to store image 
  filename: (req, file, cb) => {
    // cb(null, file.fieldname + '_' + Date.now()+ file.originalname )
    cb(null, file.fieldname +'_' + Date.now() + path.extname(file.originalname))
    // file.fieldname is name of the field (image), path.extname get the uploaded file extension
  }
});

var upload = multer({ dest: imageStorage })

const imageUpload = multer({
  storage: imageStorage,
  limits: {
      fileSize: 50000000   // 1000000 Bytes = 1 MB
  }
  ,
  fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) {     // upload only png and jpg format
          return cb(new Error('Please upload a Image'))
      }
      cb(undefined, true)


  }
})  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req,res) => {
//     res.json({
//         success: true
//     })
// })


// app.post('/', (req, res) => {
//     console.log(req.body)
//     res.status(200)
//   })

// app.post('/uploadImage', imageUpload.single('document'),(req , res) => {
//   console.log(req.file, req.body)
//   res.send(req.file)}, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// });
router.post('/uploadImage', imageUpload.single('document'),(req , res) => {
  console.log(req.file, req.body)
  res.send(req.file)}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
});


module.exports = router

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })