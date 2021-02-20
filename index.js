const express = require('express'); // ini default from express
// import express from 'express'    ..ni syntax Es6

const app = express();
const router = express.Router();

router.use('/products', (req, res, next) => {
    console.log(' url: ', req.originalUrl);
    console.log(' method: ', req.method);
    res.json({name : "Muhammad Syafiq", email: "sapit@gmail.com"});
    next(); // move to next method 
})

router.use('/price', (req, res, next) => {
    res.json({price: "RM 25.00"});
    next();
})

app.use('/', router);

app.listen(4000);