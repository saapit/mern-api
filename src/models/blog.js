const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPost = new Schema({
    // id generate using MonggDB
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String, //MongoDB hanya simpan path image
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: Object,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('BlogPost', BlogPost);