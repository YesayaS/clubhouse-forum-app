var createError = require("http-errors");
var express = require("express");
var path = require("path");
const session = require("express-session");
const passport = require("passport");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

var indexRouter = require("./routes/index");
var signupRouter = require("./routes/signup");
var loginRouter = require("./routes/login");
var usersRouter = require("./routes/users");

const passportMW = require("./middleware/passportMw");

var app = express();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI || "";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// session
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

passport.use(passportMW.login);
passport.serializeUser(passportMW.serializeUser);
passport.deserializeUser(passportMW.deserializeUser);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
//

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
