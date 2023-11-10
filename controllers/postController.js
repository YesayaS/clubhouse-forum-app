const Post = require("../models/post");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.create_get = asyncHandler(function (req, res, next) {
  if (!req.user) {
    res.redirect("/");
    return;
  }
  res.render("post_form", {});
});

exports.create_post = [
  body("title", "Title is required").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("post_form", { errors: errors.array() });
      return;
    } else {
      const post = new Post({
        title: req.body.title,
        body: req.body.body,
        post_date: new Date().toISOString(),
        author: req.user,
      });
      const result = await post.save();
      res.redirect("/");
    }
  }),
];

exports.delete_post = [
  asyncHandler(async function (req, res, next) {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/");
  }),
];
