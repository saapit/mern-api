const express = require('express'); // ini default from express
// import express from 'express'    ..ni syntax Es6


const bodyParser = require('body-parser');

const app = express();
const productRoutes = require('./src/routes/products');
const authRoutes = require('./src/routes/auth');


app.use(bodyParser.json()); //type JSON


// configuration for CORS Policy - Web Browser
app.use((req, res, next) => {
    // give permisson codepen.io -> CORS policy / https://codepen.io / '*' for allowing all origin /
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})


app.use('/', productRoutes);

// auth
app.use('/v1/auth', authRoutes);

app.listen(4000);