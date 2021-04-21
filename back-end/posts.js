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
  likes: [String],
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

router.put("/:_id", validUser, async (req, res) => {
  try {
    let post = await Post.findOne({
      _id: req.params._id,
    }).populate('user');
    let check = true;
    let likeNum = -1;
    for (let i = 0; i < post.likes.length; i++) {
      if (post.likes[i] == req.body._id) {
        check = false;
        likeNum = i;
      }
    }
    if (check) {
      post.likes.push(req.body._id);
      await post.save();
      return res.sendStatus(200);
    }
    else {
      post.likes.splice(likeNum, 1);
      await post.save();
      return res.sendStatus(200);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
});

router.delete("/:_id", validUser, async (req, res) => {
  try {
    await Post.deleteOne({
      _id: req.params._id
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: Post,
};