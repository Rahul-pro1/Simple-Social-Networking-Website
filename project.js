const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const Local = require('passport-local').Strategy;
const { User, Post, Comment } = require('./models.js');

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://Rahul:Vid24Siv@myfirstcluster.gmr3a.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected')
    })
    .catch(err => {
        console.log(err)
    })

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // Set session expiration time
    },
  }));
  
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Local(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", async function(req, res) {
    const posts = await Post.find({});
    const posts_sent = await Promise.all(posts.map(async post => {
        const user = await User.findById(post.user);
        return { _id: post._id, title: post.title, user: user.username }
    }))
    console.log(posts_sent);
    res.json(posts_sent);
    
})

app.post('/register', async function (req, res) {
    const { name, username, password } = req.body;
    const user = new User({ name, username, followers:0, following:0 });
    await User.register(user, password)
});

app.post('/login', passport.authenticate('local'), function (req, res) {
    res.cookie('sessionID', req.sessionID, { httpOnly: true });
    res.json({ success: true, user: req.user });
})

app.get('/user', checkLogin, async function (req, res){
    const user = await User.findById(req.user._id);
    const posts = await Promise.all(user.posts.map(async postID => {
        const post = await Post.findById(postID);
        return post;
    }))
    const { name, username } = user;
    console.log(posts);
    res.json({name, username, posts});
})

app.get('/logout', function(req, res) {
    req.logout(function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.redirect('/'); 
    });
});

app.post("/", checkLogin, async function(req, res) {
    console.log(req.body);
    const { title, content, img, vid } = req.body;
    const user = req.user;
    console.log(user)
    let likes = 0;
    const newPost = new Post({ title, user, content, likes, img, vid });
    await newPost.save();
    const acc = await User.findById(user._id);
    console.log(acc)
    acc.posts.push(newPost);
    await acc.save();
    res.redirect('/');
})

app.get('/:id', async function(req, res) {
    const { id } = req.params;
    const post = await Post.findById(id);
    const user = await User.findById(post.user);
    const comments = await Promise.all(post.comments.map(async commentID => {
        const comment = await Comment.findById(commentID);
        const user = await User.findById(comment.user);
        return { text: comment.text, user: user.username };
    }))
    const username = user.username;
    res.json({ title: post.title, content: post.content, img: post.img, vid: post.vid,user: username, comments: comments, likes: post.likes });
})

app.get('/:id/update', checkLogin, async function(req, res) {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.json(post);
})

app.put('/:id', async function(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;
    await Post.findByIdAndUpdate(id, { $set : { title, content } });
})

app.delete('/:id', checkLogin, async function (req, res) {
    const { id } = req.params;
    const userID = req.user._id;
    const user = await User.findById(userID);
    const postID = mongoose.Types.ObjectId(id);
    user.posts = user.posts.filter(post => !post.equals(postID));
    console.log(user.posts);
    await Post.findByIdAndDelete(id);
})

app.post('/:id/comment', checkLogin, async function(req, res) {
    console.log(req.body)
    const { text } = req.body;
    const { id } = req.params;
    const user = req.user._id;
    const comment = new Comment({ user, text });
    await comment.save();
    const post = await Post.findById(id);
    post.comments.push(comment);
    await post.save();
})

app.get('/:id/like', async function(req, res) {
    const { id } = req.params;
    const post = await Post.findById(id);
    const likes = post.likes+1;
    console.log(likes);
    await Post.findByIdAndUpdate(id, { $set: { likes } });
})

function checkLogin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else { 
        console.log('Not authenticated')
        res.status(401).json({ message: 'Unauthorized' }); 
    }
}

app.listen(3000, function() {
    console.log("Listening on port 3000"); 
});