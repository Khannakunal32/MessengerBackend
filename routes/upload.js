const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router()

// Image Upload
const imageStorage = multer.diskStorage({
    destination: 'images', // Destination to store image 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
        // file.fieldname is name of the field (image), path.extname get the uploaded file extension
    }
});

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
        console.log("profilepic uploaded");

    }
})  

// For Single image upload
router.post('/uploadImage', imageUpload.single('image'), (req, res) => {
    console.log("profilepic uploaded");
    res.send(req.file)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})



// ---------------------------------------------------------------------------- //


module.exports = router