const express = require('express'); // ini default from express
// import express from 'express'    ..ni syntax Es6


const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');


app.use(bodyParser.json()); //type JSON


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

