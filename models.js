const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    posts: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Post'
    }],
})
userSchema.plugin(plm);

    
const User = mongoose.model("User", userSchema);

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        },
    content: {type: String, required: true},
    likes: {type: Number, required: true},
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }],
    img: { type: String },
    vid: { type: String },
})

const Post = mongoose.model("Post", postSchema);

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {type: String, required:true}
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { User, Post, Comment };