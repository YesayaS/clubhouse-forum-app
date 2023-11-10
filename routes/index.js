var express = require("express");
var router = express.Router();
const asyncHandler = require("express-async-handler");

const User = require("../models/user");
const Post = require("../models/post");

/* GET home page. */
router.get(
  "/",
  asyncHandler(async function (req, res, next) {
    let post = "";

    if (req.user) {
      post = await Post.find({})
        .sort({
          post_date: -1,
        })
        .populate({ path: "author", model: User, select: "username -_id" });
      res.render("index", {
        title: "Express",
        user: req.user.username,
        posts: post,
      });
      return;
    }

    post = await Post.find({}, "title body post_date").sort({
      post_date: -1,
    });
    res.render("index", { title: "Express", user: req.user, posts: post });
  })
);

module.exports = router;
