const express = require('express'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images'); //file path in project 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

//cb is callback
const fileFilter = (req, file, cb) => {
    if( file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// middlewares

app.use(bodyParser.json()); //type JSON
app.use('/images', express.static(path.join(__dirname, 'images'))) //handle error for image call from server
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
})
.single('image'));


// configuration for CORS Policy - Web Browser
app.use((req, res, next) => {
    // give permisson codepen.io -> CORS policy / https://codepen.io / '*' for allowing all origin /
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})



// auth
app.use('/v1/auth', authRoutes);
//blog
app.use('/v1/blog', blogRoutes);

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json(
        {
            message: message,
            data: data
        })
    });

    mongoose.connect('mongodb+srv://sapit:mmXJlxCgdX4Zn06N@cluster0.63gmh.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => { //if success connect
        app.listen(4000, () => console.log('Connection Success'));
    })
    .catch(err => console.log(err)); //if connection fail

