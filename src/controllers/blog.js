const {validationResult} = require('express-validator');
const { remove } = require('../models/blog');
const BlogPost = require('../models/blog');
const path = require('path');
const fs = require('fs') // file system

exports.createBlogPost = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Invalid Value');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file){
        const err = new Error('Image need to be Upload');
        err.errorStatus = 422;
        err.data = errors.array();
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;

    const Posting = new BlogPost({
        title: title,
        body: body,
        image: image,
        author: {
            uid: 1,
            name: 'Sapit'
        }
    })

    Posting.save()
    .then(result => {
        res.status(201).json({
            message: "Create Blog Post Success",
            data: result
        });
    })
    .catch(err => {
        console.log('err : ', err);
    });
    
}

exports.getAllBlogPost = (req, res, next) => {
    const currentPage = req.query.page || 1; // ( ... || default value)
    const perPage = req.query.perPage || 5;
    let totalItems;

    BlogPost.find()
    .countDocuments()
    .then(count => {
        // pagination formula
        totalItems = count;
        return BlogPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then(result => {
        res.status(200).json({
            message: 'Data Blog Post Called Successfully',
            data: result,
            total_data: totalItems, //response using underscore '_'
            per_page: parseInt(perPage),
            current_page: parseInt(currentPage),
        })
    })
    .catch(err => {
        next(err);
    })

}

exports.getBlogPostById = (req, res, next) => {
    const postId = req.params.postId;
    BlogPost.findById(postId)
    .then(result => {
        if(!result){
            const error = new Error('Blog Post not found');
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Data Blog Post called Successfully',
            data: result,
        })
    })
    .catch( err => {
        next(err);
    })
}

exports.updateBlogPost = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Invalid Value');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file){
        const err = new Error('Image need to be Upload');
        err.errorStatus = 422;
        err.data = errors.array();
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;
    const postId = req.params.postId;

    BlogPost.findById(postId)
    .then(post => {
        if(!post){
            const err = new Error('Blog Post not found')
            err.errorStatus = 404;
            throw err;
        }

        post.title = title;
        post.body = body;
        post.image = image;

        return post.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Update Success',
            data: result,
        })
    })
    .catch(err => {
        next(err);
    })

  
}

exports.deleteBlogPost = (req, res, next) => {
    const postId = req.params.postId;

    BlogPost.findById(postId)
    .then(post => {
        if(!post){
            const err = new Error('Blog Post not found')
            err.errorStatus = 404;
            throw err;
         }

         removeImage(post.image);
         return BlogPost.findByIdAndRemove(postId) // remove posting
        
    })
    .then(result => {
        res.status(200).json({
            message: 'Delete Success',
            data: result,
        })
    })
    .catch(err => {
        next(err);
    })
}

const removeImage = (filePath) => {
    console.log('filePath: ', filePath);
    console.log('dir name: ', __dirname);

    // ex: D:\Web Development\React\Workspace\Projects\mern-api\src\controllers\images\1613983255024-scizor.png
    filePath = path.join(__dirname, '../../', filePath);
    fs.unlink(filePath, err => console.log(err)) // cara remove

}