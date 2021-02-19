const express = require('express'); // ini default from express
// import express from 'express'    ..ni syntax Es6

const app = express();

app.use(() => {
    console.log('Hello server...');
    console.log('Hello server...1');
    console.log('Hello server...2');
})

app.listen(4000);