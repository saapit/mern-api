const express = require('express'); // ini default from express
// import express from 'express'    ..ni syntax Es6

const app = express();
const productRoutes = require('./src/routes/products');


app.use('/', productRoutes);

app.listen(4000);