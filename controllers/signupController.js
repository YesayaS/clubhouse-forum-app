const User = require("../models/user");
const Passcode = require("../models/passcode");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.get = asyncHandler(function (req, res, next) {
  if (req.user) {
    res.redirect("/");
    return;
  }
  res.render("signup_form", {});
});

exports.post = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .custom((value) => !/\s/.test(value))
    .withMessage("Username should not have a space")
    .isAlphanumeric()
    .withMessage("Username should not have a special character")
    .escape(),
  body("password", "Password must be at least 6 characters")
    .isLength({ min: 6 })
    .escape(),
  body("password-confirm", "Confirmation password must same as password")
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .escape(),
  body("member").trim().isLength({ min: 1 }).escape(),
  body("isadmin").trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("signup_form", { errors: errors.array() });
      return;
    } else {
      const passcode = await Passcode.findOne({}).exec();
      let isAdmin = false;

      if (req.body.member !== passcode.member) {
        res.render("signup_form", {
          errors: [{ msg: "Wrong member passcode!" }],
        });
        return;
      }

      if (req.body.admin && req.body.admin !== passcode.admin) {
        res.render("signup_form", {
          errors: [{ msg: "Wrong admin passcode!" }],
        });
        return;
      } else if (req.body.admin && req.body.admin === passcode.admin) {
        isAdmin = true;
      }

      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try {
          const user = new User({
            username: req.body.username,
            password: hashedPassword,
            is_admin: isAdmin,
          });
          const result = await user.save();
          res.redirect("/login");
        } catch (err) {
          return next(err);
        }
      });
    }
  }),
];
