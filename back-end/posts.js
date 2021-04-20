const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  content: String,
  likes: Number,
  created: {
    type: Date,
    default: Date.now
  },
});

const Post = mongoose.model('Post', postSchema);

// make a post
router.post("/", validUser, async (req, res) => {
  let post = new Post({
    content: req.body.content,
    user: req.user,
    likes: 0,
  });
  try {
    await post.save();
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

// get all posts
router.get("/", async (req, res) => {
  try {
    let posts = await Post.find().sort({
      created: -1
    }).populate('user');
    return res.send(posts);
  } catch (error) {
    return res.sendStatus(500);
  }
});