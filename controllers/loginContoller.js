const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

exports.get = asyncHandler(function (req, res, next) {
  res.render("login_form", {});
});

exports.post = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("username must be filled")
    .escape(),
  body("password", "Password must be filled").isLength({ min: 1 }).escape(),

  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("login_form", { errors: errors.array() });
      return;
    } else {
      passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
      })(req, res, next);
    }
  }),
];
