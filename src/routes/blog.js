const express = require('express');
const {body} = require('express-validator');

const router = express.Router();

const blogController = require('../controllers/blog');

// [POST] : /v1/blog/post
router.post('/post', [ 
    body('title').isLength({min: 5}).withMessage('Input title not valid'),
    body('body').isLength({min: 5}).withMessage('input body not valid')],
    blogController.createBlogPost);

router.get('/posts', blogController.getAllBlogPost);


module.exports = router;